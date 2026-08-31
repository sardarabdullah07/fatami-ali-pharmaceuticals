/**
 * Guards against Tailwind opacity modifiers outside the default scale.
 * Those classes never generate, so the element silently falls back to an
 * inherited colour — which is how the footer ended up with light-mode text
 * on a dark ground.
 *
 *   node scripts/tokens.mjs
 */
import { readFileSync } from 'node:fs'
import { globSync } from 'node:fs'

const VALID = new Set([0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100])
const PATTERN =
  /\b((?:text|bg|border|from|via|to|divide|ring|placeholder:text|fill|stroke)-[a-z0-9-]+)\/(\d{1,3})\b/g

const files = globSync('src/**/*.{ts,tsx}').concat(['src/index.css'])
const bad = []

for (const file of files) {
  const src = readFileSync(file, 'utf8')
  for (const m of src.matchAll(PATTERN)) {
    if (!VALID.has(Number(m[2]))) bad.push(`${file}: ${m[1]}/${m[2]}`)
  }
}

if (bad.length === 0) {
  console.log('PASS — every opacity modifier is on the Tailwind scale.')
  process.exit(0)
}
console.log(`${bad.length} invalid opacity modifier(s):`)
bad.forEach((b) => console.log(' - ' + b))
process.exit(1)
