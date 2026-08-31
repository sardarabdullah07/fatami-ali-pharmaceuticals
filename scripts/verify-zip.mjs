/**
 * Confirms the deploy archive actually contains the files a host needs —
 * including the dotfiles, which some zip tools silently skip.
 *
 *   node scripts/verify-zip.mjs <archive.zip>
 */
import { readFileSync } from 'node:fs'

const archive = process.argv[2]
if (!archive) {
  console.error('usage: node scripts/verify-zip.mjs <archive.zip>')
  process.exit(1)
}

const buf = readFileSync(archive)
const names = []

// walk central-directory headers
for (let i = 0; i < buf.length - 4; i++) {
  if (buf.readUInt32LE(i) === 0x02014b50) {
    const len = buf.readUInt16LE(i + 28)
    names.push(buf.toString('utf8', i + 46, i + 46 + len).replace(/\\/g, '/'))
  }
}

const required = [
  'index.html',
  '404.html',
  '.htaccess',
  '_redirects',
  'favicon.ico',
  'DEPLOY.md',
]

console.log(`entries: ${names.length}\n`)
console.log('root-level:')
names.filter((n) => !n.includes('/')).sort().forEach((n) => console.log('  ' + n))

console.log('\nrequired files:')
let missing = 0
for (const f of required) {
  const ok = names.includes(f)
  if (!ok) missing += 1
  console.log(`  ${ok ? 'OK  ' : 'MISS'}  ${f}`)
}

const counts = {
  js: names.filter((n) => n.endsWith('.js')).length,
  css: names.filter((n) => n.endsWith('.css')).length,
  webp: names.filter((n) => n.endsWith('.webp')).length,
}
console.log(`\nassets: ${counts.js} js · ${counts.css} css · ${counts.webp} webp`)

console.log('\n' + (missing === 0 ? 'PASS — archive is complete.' : `${missing} file(s) missing.`))
process.exit(missing === 0 ? 0 : 1)
