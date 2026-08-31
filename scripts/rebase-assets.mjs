/**
 * Point the photograph URLs at the deployment's base path.
 *
 *   BASE_PATH=/my-repo/ node scripts/rebase-assets.mjs
 *
 * The images in `public/assets` are referenced as absolute strings in the
 * source — `/assets/gallery/storefront.webp` — because they are static files
 * the site names, not modules it imports. Vite rewrites the base prefix for
 * everything it bundles, but a string literal is opaque to it, so on a project
 * page served from `/<repo>/` those URLs would all 404.
 *
 * The match is anchored on what may NOT precede it: a word character, a dash
 * or a dot. Vite's own output already carries the prefix —
 * `"/my-repo/assets/index-abc.js"` — and that contains `/assets/` as a
 * substring, so an unanchored replace would rewrite it a second time into
 * `/my-repo/my-repo/assets/`.
 *
 * Anchoring on a leading quote instead is not enough: a `srcSet` holds two
 * URLs in one string — `"/a-800.webp 800w, /a.webp 1280w"` — and the second is
 * preceded by a space, so it would be left behind and 404 on the deployment.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const base = process.env.BASE_PATH ?? '/'

if (base === '/') {
  console.log('rebase-assets: base is "/", nothing to do')
  process.exit(0)
}
if (!base.startsWith('/') || !base.endsWith('/')) {
  throw new Error(`rebase-assets: BASE_PATH must start and end with "/" — got "${base}"`)
}

const files = []
;(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full)
    else if (['.js', '.css', '.html'].includes(extname(full))) files.push(full)
  }
})(dist)

const pattern = /(?<![\w\-.])\/assets\//g
let total = 0

for (const file of files) {
  const before = readFileSync(file, 'utf8')
  let count = 0
  const after = before.replace(pattern, () => {
    count += 1
    return `${base}assets/`
  })
  if (count) {
    writeFileSync(file, after)
    total += count
    console.log(`rebase-assets: ${count.toString().padStart(3)} in ${file.slice(dist.length + 1)}`)
  }
}

/* A missed reference 404s only on the deployment, never locally, so it has to
   be caught here rather than in review. */
for (const file of files) {
  const text = readFileSync(file, 'utf8')
  const missed = text.match(pattern)
  if (missed) {
    throw new Error(
      `rebase-assets: ${missed.length} unprefixed /assets/ reference(s) survived in ${file.slice(dist.length + 1)}`,
    )
  }
  if (text.includes(`${base}${base}`)) {
    throw new Error(`rebase-assets: a double base prefix was produced in ${file.slice(dist.length + 1)}`)
  }
}

console.log(`rebase-assets: ${total} reference(s) moved to ${base}, none missed`)
