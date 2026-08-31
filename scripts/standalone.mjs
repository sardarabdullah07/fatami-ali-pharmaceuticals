/**
 * Fold the built site into a single HTML file.
 *
 *   STANDALONE=1 VITE_HASH_ROUTER=1 vite build && node scripts/standalone.mjs
 *
 * The result has no external requests except the Google Fonts stylesheet: the
 * stylesheet, the script and every photograph are carried inline. It is meant
 * for sending a preview to someone who has no server — real hosting should
 * always use the ordinary `dist/` build, which keeps clean URLs and lets the
 * browser cache the images separately.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, 'dist-standalone')
const publicDir = resolve(root, 'public')

const MIME = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
}

/** Every file under public/assets, keyed by the URL the site refers to it by. */
const assets = new Map()
;(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      walk(full)
      continue
    }
    const mime = MIME[extname(full).toLowerCase()]
    if (!mime) continue
    const url = '/' + full.slice(publicDir.length + 1).split('\\').join('/')
    assets.set(url, `data:${mime};base64,${readFileSync(full).toString('base64')}`)
  }
})(resolve(publicDir, 'assets'))

/* Longest first, so `/assets/x.webp` never matches inside `/assets/x-800.webp`. */
const urls = [...assets.keys()].sort((a, b) => b.length - a.length)
const inlineAssets = (text) => {
  let used = 0
  for (const url of urls) {
    if (!text.includes(url)) continue
    used += 1
    text = text.split(url).join(assets.get(url))
  }
  return [text, used]
}

/* ------------------------------------------------------------------ html */

let html = readFileSync(resolve(out, 'index.html'), 'utf8')

const scriptSrc = html.match(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/)
const styleHref = html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/)
if (!scriptSrc || !styleHref) throw new Error('standalone: could not find the built script or stylesheet')

let js = readFileSync(resolve(out, scriptSrc[1].replace(/^\//, '')), 'utf8')
let css = readFileSync(resolve(out, styleHref[1].replace(/^\//, '')), 'utf8')

const [jsInlined, jsCount] = inlineAssets(js)
const [cssInlined] = inlineAssets(css)
js = jsInlined
css = cssInlined

// Drop the preload hints — the chunks they point at no longer exist.
html = html.replace(/\s*<link rel="modulepreload"[^>]*>/g, '')

/**
 * Both of these go in through a replacer *function*.
 *
 * With a plain replacement string, `replace` expands `$&`, `$'` and friends —
 * and minified React contains a literal "$&" (its key-escaping code). That
 * silently rewrote the bundle and pasted the original <script src> tag back
 * into the middle of it, so the page kept loading the external chunk instead
 * of the inlined one. A function replacement is taken verbatim.
 */
html = html.replace(styleHref[0], () => `<style>\n${css}\n</style>`)
// A literal `</script>` in the source would close the tag early.
html = html.replace(
  scriptSrc[0],
  () => `<script type="module">\n${js.split('</script>').join('<\\/script>')}\n</script>`,
)

const [htmlInlined] = inlineAssets(html)
html = htmlInlined

/* A silent partial inline is the failure mode worth guarding: the page still
   renders, it just quietly reaches for files that will not be there. */
const leftover = html.match(/["'(]\/assets\/[^"')]+/g)
if (leftover) {
  throw new Error(`standalone: ${leftover.length} asset reference(s) left, first: ${leftover[0]}`)
}
if (/<script[^>]+src=/.test(html) || /<link[^>]+rel="stylesheet"[^>]+href="\//.test(html)) {
  throw new Error('standalone: an external script or stylesheet survived inlining')
}

writeFileSync(resolve(out, 'fatami-ali-pharmaceuticals.html'), html)

/* --------------------------------------------------------------- artifact
 *
 * The same payload as a body fragment, for hosts that supply their own
 * document shell. The <title> leads so a host that scans only the first few
 * kilobytes still finds it ahead of the 40kB stylesheet.
 *
 * The boot script is the site's own, with one addition: a host may stamp its
 * chosen theme on the root element, which is a signal the site's ThemeProvider
 * knows nothing about. Reading it into the site's own storage key lets the
 * page open in the theme the reader is already looking at, while leaving the
 * in-page toggle in charge from then on.
 */
const boot = `
;(function () {
  try {
    var root = document.documentElement
    var stamped = root.getAttribute('data-theme')
    var stored = null
    try { stored = localStorage.getItem('fap-theme') } catch (e) {}
    var theme =
      stamped === 'dark' || stamped === 'light'
        ? stamped
        : stored === 'dark' || stored === 'light'
          ? stored
          : window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
    if (stamped === 'dark' || stamped === 'light') {
      try { localStorage.setItem('fap-theme', theme) } catch (e) {}
    }
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
  } catch (e) {}
})()`

const fragment = `<title>Fatami Ali Pharmaceuticals</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap"
/>
<script>${boot}</script>
<style>
${css}
</style>
<div id="root"></div>
<script type="module">
${js.split('</script>').join('<\\/script>')}
</script>
`

writeFileSync(resolve(out, 'artifact.html'), fragment)

const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`
console.log(`standalone: ${jsCount} of ${assets.size} assets inlined, no external references left`)
console.log(`standalone: fatami-ali-pharmaceuticals.html — ${mb(Buffer.byteLength(html))}`)
console.log(`standalone: artifact.html (body fragment) — ${mb(Buffer.byteLength(fragment))}`)
