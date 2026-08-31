/**
 * Static hosts differ in how they hand an unknown path to a single-page app.
 *
 *   Netlify / Cloudflare Pages  -> public/_redirects
 *   Apache / cPanel             -> public/.htaccess
 *   GitHub Pages                -> 404.html, which it serves for any unknown
 *                                  path without changing the URL, so a copy of
 *                                  the built shell boots the router correctly.
 *
 * This copies the built shell into place for the last of those.
 */
import { copyFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
console.log('postbuild: dist/404.html written from the built shell')
