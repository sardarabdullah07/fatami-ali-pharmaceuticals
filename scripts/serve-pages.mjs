/**
 * Serve `dist/` the way GitHub Pages serves a project repository, so a
 * base-path build can be checked before it is pushed.
 *
 *   BASE_PATH=/my-repo/ node scripts/serve-pages.mjs [port]
 *
 * Two behaviours matter and neither is what a plain static server does:
 * the site is mounted under `/<repo>/`, and an unknown path is answered with
 * `404.html` at status 404 without a redirect — which is how the SPA shell
 * boots on a deep link.
 */
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(fileURLToPath(new URL('../dist', import.meta.url)))
const BASE = process.env.BASE_PATH ?? '/'
const PORT = Number(process.argv[2] ?? 5303)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
}

const readIfFile = async (path) => {
  try {
    return (await stat(path)).isFile() ? path : null
  } catch {
    return null
  }
}

createServer(async (req, res) => {
  const url = decodeURIComponent((req.url ?? '/').split('?')[0])

  if (!url.startsWith(BASE)) {
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end(`Not found — this deployment is mounted at ${BASE}`)
    return
  }

  const rel = normalize('/' + url.slice(BASE.length)).replace(/^(\.\.[/\\])+/, '')
  let file = await readIfFile(join(ROOT, rel))
  if (!file && !extname(rel)) file = await readIfFile(join(ROOT, rel, 'index.html'))

  // GitHub Pages hands an unknown path to 404.html, keeping the URL intact.
  const missing = !file
  if (missing) file = await readIfFile(join(ROOT, '404.html'))

  if (!file) {
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end('Not found')
    return
  }

  res.writeHead(missing ? 404 : 200, {
    'content-type': TYPES[extname(file)] ?? 'application/octet-stream',
    'cache-control': 'public, max-age=0, must-revalidate',
  })
  res.end(await readFile(file))
}).listen(PORT, () => {
  console.log(`serving dist/ at http://localhost:${PORT}${BASE}`)
})
