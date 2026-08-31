/**
 * End-to-end verification for the three pages, in both themes.
 *
 *   node scripts/verify.mjs
 *
 * Checks: console errors, horizontal overflow at six widths, text contrast
 * against WCAG AA, theme persistence, navigation, the therapeutic filter, the
 * gallery lightbox (including keyboard), the mobile menu, and form validation.
 */
import { chromium } from 'playwright-core'

const BASE = process.env.BASE ?? 'http://localhost:5199'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const WIDTHS = [1440, 1280, 1024, 768, 390, 360]
const ROUTES = ['/', '/about', '/contact']

let failures = 0
let checks = 0

function ok(label) {
  checks += 1
  console.log(`  PASS  ${label}`)
}
function bad(label, detail) {
  checks += 1
  failures += 1
  console.log(`  FAIL  ${label}${detail ? `\n        ${detail}` : ''}`)
}
function expect(condition, label, detail) {
  if (condition) ok(label)
  else bad(label, detail)
}

/* ------------------------------------------------------------- contrast */

function srgb(c) {
  const v = c / 255
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}
function luminance([r, g, b]) {
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b)
}
function ratio(a, b) {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}
function parse(css) {
  const m = css.match(/rgba?\(([^)]+)\)/)
  if (!m) return null
  const parts = m[1].split(/[,\s/]+/).filter(Boolean).map(Number)
  if (parts.length < 3 || parts.some(Number.isNaN)) return null
  const alpha = parts.length > 3 ? parts[3] : 1
  return { rgb: parts.slice(0, 3), alpha }
}
/** Flattens a possibly-translucent colour onto its backdrop. */
function flatten(fg, bg) {
  return fg.rgb.map((c, i) => c * fg.alpha + bg[i] * (1 - fg.alpha))
}

const browser = await chromium.launch({ executablePath: CHROME, headless: true })

/* ==================================================================== */
/*  1. Per route, per theme: console, overflow, contrast                */
/* ==================================================================== */

for (const theme of ['light', 'dark']) {
  console.log(`\n=== THEME: ${theme} ===`)

  for (const route of ROUTES) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    await context.addInitScript((t) => {
      try {
        localStorage.setItem('fap-theme', t)
      } catch {}
    }, theme)

    const page = await context.newPage()
    const errors = []
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text())
    })
    page.on('pageerror', (e) => errors.push(String(e)))

    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 60000 })
    // Scroll the whole page so every lazy image and scroll reveal fires.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 60))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(500)

    console.log(`\n-- ${route}`)

    expect(errors.length === 0, `${route} console clean`, errors.slice(0, 3).join('\n        '))

    // Applied theme matches the stored preference.
    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'))
    expect(isDark === (theme === 'dark'), `${route} theme applied from storage`)

    // Broken images.
    const broken = await page.evaluate(() =>
      [...document.images]
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.currentSrc || i.src),
    )
    expect(broken.length === 0, `${route} all images loaded`, broken.slice(0, 3).join('\n        '))

    // Missing alt text.
    const noAlt = await page.evaluate(() =>
      [...document.images].filter((i) => !i.hasAttribute('alt')).map((i) => i.src),
    )
    expect(noAlt.length === 0, `${route} every image has alt`, noAlt.slice(0, 3).join('\n        '))

    // Heading hierarchy: exactly one h1, no skipped levels.
    const headings = await page.evaluate(() =>
      [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1])),
    )
    const h1s = headings.filter((h) => h === 1).length
    expect(h1s === 1, `${route} exactly one h1`, `found ${h1s}`)
    let skipped = null
    for (let i = 1; i < headings.length; i += 1) {
      if (headings[i] - headings[i - 1] > 1) {
        skipped = `h${headings[i - 1]} -> h${headings[i]}`
        break
      }
    }
    expect(!skipped, `${route} no skipped heading level`, skipped ?? '')

    // Text contrast across every visible text node's element.
    const samples = await page.evaluate(() => {
      const out = []
      const walk = (el) => {
        const style = getComputedStyle(el)
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return
        const direct = [...el.childNodes].some(
          (n) => n.nodeType === 3 && n.textContent.trim().length > 1,
        )
        if (direct) {
          // Collect every painted background up the chain, root last, so the
          // caller can composite them in paint order. A translucent glass
          // panel must be flattened onto what is actually behind it, which in
          // dark mode is a navy page, not white.
          const stack = []
          const box = el.getBoundingClientRect()
          let bgEl = el
          while (bgEl) {
            const c = getComputedStyle(bgEl).backgroundColor
            if (c && !/rgba\(0,\s*0,\s*0,\s*0\)|transparent/.test(c)) stack.push(c)

            // A positioned sibling painted *under* this element counts too —
            // a segmented-control pill or an image scrim is a real backdrop
            // even though it is not an ancestor.
            for (const sib of bgEl.parentElement?.children ?? []) {
              if (sib === bgEl || sib.contains(el)) continue
              const ss = getComputedStyle(sib)
              if (ss.position !== 'absolute' && ss.position !== 'fixed') continue
              if (ss.display === 'none' || Number(ss.opacity) === 0) continue
              const c2 = ss.backgroundColor
              if (!c2 || /rgba\(0,\s*0,\s*0,\s*0\)|transparent/.test(c2)) continue
              const r2 = sib.getBoundingClientRect()
              // Only when it fully covers the text box.
              if (
                r2.left <= box.left + 0.5 &&
                r2.right >= box.right - 0.5 &&
                r2.top <= box.top + 0.5 &&
                r2.bottom >= box.bottom - 0.5
              ) {
                stack.push(c2)
              }
            }
            bgEl = bgEl.parentElement
          }
          stack.push(getComputedStyle(document.documentElement).backgroundColor)
          const rect = el.getBoundingClientRect()
          if (rect.width > 0 && rect.height > 0) {
            out.push({
              tag: el.tagName.toLowerCase(),
              cls: (el.className && String(el.className).slice(0, 60)) || '',
              text: el.textContent.trim().slice(0, 40),
              color: style.color,
              bgStack: stack,
              size: parseFloat(style.fontSize),
              weight: Number(style.fontWeight) || 400,
            })
          }
        }
        for (const child of el.children) walk(child)
      }
      walk(document.body)
      return out
    })

    const contrastFails = []
    for (const s of samples) {
      const fg = parse(s.color)
      if (!fg) continue
      // Composite the background stack in paint order: furthest first.
      let bgFlat = null
      for (const raw of [...s.bgStack].reverse()) {
        const layer = parse(raw)
        if (!layer) continue
        bgFlat = bgFlat === null ? flatten(layer, [255, 255, 255]) : flatten(layer, bgFlat)
      }
      if (!bgFlat) continue
      const fgFlat = fg.alpha < 1 ? flatten(fg, bgFlat) : fg.rgb
      const r = ratio(fgFlat, bgFlat)
      const large = s.size >= 24 || (s.size >= 18.66 && s.weight >= 700)
      const need = large ? 3 : 4.5
      if (r < need) {
        contrastFails.push(`${r.toFixed(2)}:1 (need ${need}) ${s.tag}.${s.cls} "${s.text}"`)
      }
    }
    expect(
      contrastFails.length === 0,
      `${route} text contrast AA (${samples.length} elements)`,
      contrastFails.slice(0, 5).join('\n        '),
    )

    // Horizontal overflow at every target width.
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 })
      await page.waitForTimeout(220)
      const over = await page.evaluate(
        (w) => ({
          scroll: document.documentElement.scrollWidth,
          client: w,
        }),
        width,
      )
      expect(
        over.scroll <= over.client + 1,
        `${route} no horizontal scroll @ ${width}px`,
        `scrollWidth ${over.scroll} > ${over.client}`,
      )
    }

    // Tap targets: every link and button at mobile width.
    await page.setViewportSize({ width: 390, height: 900 })
    await page.waitForTimeout(250)
    const small = await page.evaluate(() =>
      [...document.querySelectorAll('a[href], button')]
        .filter((el) => {
          const r = el.getBoundingClientRect()
          if (r.width === 0 || r.height === 0) return false
          // Screen-reader-only controls are off-screen until focused.
          if (r.width <= 2 || r.height <= 2) return false
          if (el.classList.contains('sr-only')) return false
          const s = getComputedStyle(el)
          if (s.display === 'none' || s.visibility === 'hidden') return false
          // Inline links inside a paragraph are exempt; standalone controls are not.
          const inline = s.display.startsWith('inline') && !s.display.includes('flex')
          if (inline && el.tagName === 'A') return false
          return r.height < 44 || r.width < 44
        })
        .map((el) => {
          const r = el.getBoundingClientRect()
          return `${Math.round(r.width)}x${Math.round(r.height)} ${getComputedStyle(el).display} ${el.tagName} "${el.textContent.trim().slice(0, 28)}"`
        }),
    )
    expect(small.length === 0, `${route} tap targets >= 44px @ 390px`, small.slice(0, 4).join('\n        '))

    await context.close()
  }
}

/* ==================================================================== */
/*  2. Interactions                                                     */
/* ==================================================================== */

console.log('\n=== INTERACTIONS ===\n')

{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto(BASE, { waitUntil: 'networkidle' })

  // ---- theme toggle + persistence
  const before = await page.evaluate(() => document.documentElement.classList.contains('dark'))
  await page.click('button[role="switch"][aria-label="Dark mode"]')
  await page.waitForTimeout(450)
  const after = await page.evaluate(() => document.documentElement.classList.contains('dark'))
  expect(before !== after, 'theme toggle flips the theme')

  const stored = await page.evaluate(() => localStorage.getItem('fap-theme'))
  expect(stored === (after ? 'dark' : 'light'), 'theme choice is persisted', `stored=${stored}`)

  await page.reload({ waitUntil: 'networkidle' })
  const afterReload = await page.evaluate(() => document.documentElement.classList.contains('dark'))
  expect(afterReload === after, 'theme survives a reload')

  // ---- primary navigation
  for (const [label, expectedPath] of [
    ['About', '/about'],
    ['Contact', '/contact'],
    ['Home', '/'],
  ]) {
    await page.click(`nav[aria-label="Primary"] a:text-is("${label}")`)
    await page.waitForTimeout(700)
    const path = await page.evaluate(() => location.pathname)
    expect(path === expectedPath, `nav "${label}" -> ${expectedPath}`, `got ${path}`)
  }

  // ---- Products goes to the section, not just the page
  await page.click('nav[aria-label="Primary"] a:text-is("Products")')
  await page.waitForTimeout(2200)
  const productsLanding = await page.evaluate(() => {
    const el = document.getElementById('products')
    if (!el) return { found: false }
    return { found: true, top: Math.round(el.getBoundingClientRect().top), hash: location.hash }
  })
  expect(productsLanding.found, 'Products section exists on /about')
  expect(
    productsLanding.found && Math.abs(productsLanding.top - 94) < 60,
    'Products nav scrolls to the section',
    `section top = ${productsLanding.top}px`,
  )

  // ---- therapeutic filter
  await page.click('#tab-Ne')
  await page.waitForTimeout(450)
  const panelText = await page.textContent('#therapeutic-panel')
  expect(panelText.includes('Neurology'), 'therapeutic filter switches area')
  expect(panelText.includes('Recita 10'), 'therapeutic filter shows that area\u2019s product')

  await page.click('#tab-On')
  await page.waitForTimeout(450)
  const empty = await page.textContent('#therapeutic-panel')
  expect(
    empty.includes('Oncology') && empty.includes('Request the portfolio'),
    'areas without photographed products show the honest fallback',
  )

  expect(errors.length === 0, 'no runtime errors during interaction', errors.slice(0, 3).join('\n        '))
  await context.close()
}

/* ---- gallery lightbox ------------------------------------------------ */
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.getElementById('gallery')?.scrollIntoView())
  await page.waitForTimeout(700)

  await page.click('#gallery ul li button')
  await page.waitForTimeout(500)
  expect(await page.isVisible('[role="dialog"]'), 'lightbox opens')

  const focused = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'))
  expect(focused === 'Close photograph', 'lightbox moves focus to close', `focus=${focused}`)

  const first = await page.textContent('[role="dialog"] figcaption')
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(420)
  const second = await page.textContent('[role="dialog"] figcaption')
  expect(first !== second, 'arrow keys page the lightbox')

  await page.keyboard.press('Escape')
  await page.waitForTimeout(420)
  expect(!(await page.isVisible('[role="dialog"]')), 'Escape closes the lightbox')

  const bodyOverflow = await page.evaluate(() => document.body.style.overflow)
  expect(bodyOverflow !== 'hidden', 'page scroll is restored after close')

  // gallery filter — narrows the grid, and only to that group
  const total = await page.evaluate(
    () => document.querySelectorAll('#gallery ul li button').length,
  )
  await page.click('#gallery button:text-is("Partners")')
  await page.waitForTimeout(600)
  const count = await page.evaluate(
    () => document.querySelectorAll('#gallery ul li button').length,
  )
  expect(count > 0 && count < total, 'gallery filter narrows the grid', `${count} of ${total}`)

  await page.click('#gallery ul li button')
  await page.waitForTimeout(500)
  const group = await page.textContent('[role="dialog"] figcaption')
  expect(group.includes('Partners'), 'filtered grid only opens items from that group')
  await page.keyboard.press('Escape')
  await page.waitForTimeout(300)

  await context.close()
}

/* ---- mobile menu ----------------------------------------------------- */
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await page.goto(BASE, { waitUntil: 'networkidle' })

  await page.click('button[aria-label="Open menu"]')
  await page.waitForTimeout(450)
  expect(await page.isVisible('#mobile-menu'), 'mobile menu opens')
  expect(
    (await page.evaluate(() => document.body.style.overflow)) === 'hidden',
    'mobile menu locks the page scroll',
  )

  await page.keyboard.press('Escape')
  await page.waitForTimeout(400)
  expect(!(await page.isVisible('#mobile-menu')), 'Escape closes the mobile menu')

  await page.click('button[aria-label="Open menu"]')
  await page.waitForTimeout(400)
  await page.click('#mobile-menu a:text-is("Contact")')
  await page.waitForTimeout(800)
  expect(
    (await page.evaluate(() => location.pathname)) === '/contact',
    'mobile menu navigates and closes',
  )
  expect(!(await page.isVisible('#mobile-menu')), 'mobile menu closes after navigating')

  await context.close()
}

/* ---- contact form ---------------------------------------------------- */
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle' })

  await page.click('button[type="submit"]')
  await page.waitForTimeout(400)
  expect(await page.isVisible('[role="alert"]'), 'empty submit shows the error summary')
  expect(
    (await page.evaluate(() => document.activeElement?.id)) === 'field-name',
    'focus moves to the first invalid field',
  )
  const invalidCount = await page.evaluate(
    () => document.querySelectorAll('[aria-invalid="true"]').length,
  )
  expect(invalidCount === 6, 'every required field is flagged', `flagged ${invalidCount}`)

  await page.fill('#field-email', 'not-an-email')
  await page.waitForTimeout(250)
  expect(
    (await page.textContent('#field-email-error')).includes('valid email'),
    'email format is validated live after a failed submit',
  )

  await page.fill('#field-name', 'A. Rahimi')
  await page.fill('#field-organization', 'Beximco Pharmaceuticals Ltd.')
  await page.fill('#field-email', 'a.rahimi@example.com')
  await page.selectOption('#field-inquiryType', 'Pharmaceutical Partnership')
  await page.fill('#field-subject', 'Exclusive distribution enquiry')
  await page.fill('#field-message', 'We would like to discuss exclusive distribution for Afghanistan.')
  await page.click('button[type="submit"]')
  await page.waitForTimeout(600)

  const success = await page.textContent('[role="status"]')
  expect(success.includes('ready to send'), 'valid submit reaches the success state')
  expect(
    success.includes('Nothing has left your browser yet'),
    'success state does not claim the mail was sent',
  )
  const mailto = await page.getAttribute('a:text-is("Open in your email app")', 'href')
  expect(
    mailto?.startsWith('mailto:Fatima.ali011@outlook.com') && mailto.includes('Zaland1114'),
    'mailto is addressed to both company inboxes',
  )

  await context.close()
}

/* ---- reduced motion -------------------------------------------------- */
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(700)
  const hidden = await page.evaluate(
    () =>
      [...document.querySelectorAll('h2, h3, p')].filter((el) => {
        const r = el.getBoundingClientRect()
        return r.width > 0 && Number(getComputedStyle(el).opacity) < 0.5
      }).length,
  )
  expect(hidden === 0, 'nothing stays invisible under reduced motion', `${hidden} hidden`)
  expect(errors.length === 0, 'reduced motion causes no errors')
  await context.close()
}

await browser.close()

console.log(`\n${'='.repeat(60)}`)
console.log(failures === 0 ? `ALL ${checks} CHECKS PASSED` : `${failures} of ${checks} CHECKS FAILED`)
process.exit(failures === 0 ? 0 : 1)
