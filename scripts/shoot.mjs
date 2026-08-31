/**
 * Section-accurate screenshots. Scrolls to each landmark and captures the
 * viewport, which avoids the stitching artefacts of fullPage on tall pages.
 *
 *   node scripts/shoot.mjs [--theme light|dark] [--width 1440]
 */
import { chromium } from 'playwright-core'
import { mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SHOTS = resolve(__dirname, 'shots')
rmSync(SHOTS, { recursive: true, force: true })
mkdirSync(SHOTS, { recursive: true })

const BASE = process.env.BASE ?? 'http://localhost:5199'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

const args = process.argv.slice(2)
const arg = (flag, fallback) => {
  const i = args.indexOf(flag)
  return i === -1 ? fallback : args[i + 1]
}
const width = Number(arg('--width', 1440))

/** route -> the section ids worth a frame */
const PLAN = {
  '/': [
    null, // the hero, at the top
    'what-we-do',
    'products',
    'technology',
    'why-partner',
    'journey',
    'vision',
    'trusted-partnerships',
    'gallery',
    'start',
  ],
  '/about': [null, 'ceo', 'objectives', 'leadership', 'divisions', 'approach'],
  '/contact': [null, 'main'],
}

const browser = await chromium.launch({ executablePath: CHROME, headless: true })

for (const theme of ['light', 'dark']) {
  const context = await browser.newContext({ viewport: { width, height: 900 } })
  await context.addInitScript((t) => {
    try {
      localStorage.setItem('fap-theme', t)
    } catch {}
  }, theme)
  const page = await context.newPage()

  for (const [route, sections] of Object.entries(PLAN)) {
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 60000 })
    // Walk the page once so lazy images decode and scroll reveals fire.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.75
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 90))
      }
    })
    await page.waitForTimeout(400)

    const slug = route === '/' ? 'home' : route.replace(/\W+/g, '')

    for (const id of sections) {
      if (id === null) {
        await page.evaluate(() => window.scrollTo(0, 0))
      } else {
        const found = await page.evaluate((target) => {
          const el = document.getElementById(target)
          if (!el) return false
          const nav = Number.parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
            10,
          )
          window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - (nav || 78) - 8)
          return true
        }, id)
        if (!found) {
          console.log(`  (skip) ${route} #${id} not found`)
          continue
        }
      }
      await page.waitForTimeout(700)
      const name = `${slug}-${id ?? 'hero'}-${theme}-${width}.png`
      await page.screenshot({ path: resolve(SHOTS, name) })
      console.log(`  ${name}`)
    }
  }

  await context.close()
}

await browser.close()
console.log(`\nShots written to ${SHOTS}`)
