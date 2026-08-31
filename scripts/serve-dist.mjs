/**
 * Minimal static server for verifying the built artifact exactly as a host
 * would serve it — no Vite involved. Implements the same SPA rewrite the
 * `_redirects` / `.htaccess` files ask a real host to perform.
 *
 *   node scripts/serve-dist.mjs [port]
 */
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(fileURLToPath(new URL('../dist', import.meta.url)))
const PORT = Number(process.argv[2] ?? 5000)

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
  '.woff2': 'font/woff2',
}

async function tryFile(path) {
  try {
    const s = await stat(path)
    return s.isFile() ? path : null
  } catch {
    return null
  }
}

createServer(async (req, res) => {
  const url = decodeURIComponent((req.url ?? '/').split('?')[0])
  // contain the path inside dist/
  const safe = normalize(url).replace(/^(\.\.[/\\])+/, '')
  let file = await tryFile(join(ROOT, safe))

  if (!file && !extname(safe)) file = await tryFile(join(ROOT, safe, 'index.html'))
  // SPA rewrite: unmatched, extension-less paths fall through to the shell
  if (!file && !extname(safe)) file = await tryFile(join(ROOT, 'index.html'))

  if (!file) {
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end('Not found')
    return
  }

  const body = await readFile(file)
  const type = TYPES[extname(file)] ?? 'application/octet-stream'
  const immutable = /\/assets\/.*\.(js|css|woff2)$/.test(file)
  res.writeHead(200, {
    'content-type': type,
    'cache-control': immutable
      ? 'public, max-age=31536000, immutable'
      : 'public, max-age=0, must-revalidate',
  })
  res.end(body)
}).listen(PORT, () => {
  console.log(`serving dist/ on http://localhost:${PORT}`)
})
