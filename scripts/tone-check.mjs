/**
 * Pairs each <Section tone="..."> with the SectionHead inside it and reports
 * any mismatch between the section's ground and the heading's onDark flag.
 * A mismatch renders white text on white, or dark text on navy.
 *
 *   node scripts/tone-check.mjs
 */
import { readFileSync } from 'node:fs'
import { globSync } from 'node:fs'

const DARK_TONES = new Set(['deep'])
const files = globSync('src/**/*.tsx')
const problems = []

for (const file of files) {
  const src = readFileSync(file, 'utf8')

  // every <Section ...> opening tag, with its offset
  const sections = [...src.matchAll(/<Section\b[^>]*>/g)].map((m) => ({
    tag: m[0],
    start: m.index,
    tone: (m[0].match(/tone="([a-zA-Z]+)"/) ?? [, 'page'])[1],
  }))

  for (const [i, sec] of sections.entries()) {
    const end = sections[i + 1]?.start ?? src.length
    const body = src.slice(sec.start, end)

    const heads = [...body.matchAll(/<SectionHead\b[\s\S]*?\/>/g)]
    for (const h of heads) {
      const hasOnDark = /\bonDark\b(?!\s*=\s*\{false\})/.test(h[0])
      const wantsOnDark = DARK_TONES.has(sec.tone)
      if (hasOnDark !== wantsOnDark) {
        const line = src.slice(0, sec.start + h.index).split('\n').length
        problems.push(
          `${file}:${line}  tone="${sec.tone}" but SectionHead onDark=${hasOnDark}` +
            ` (expected ${wantsOnDark})`,
        )
      }
    }
  }
}

if (problems.length === 0) {
  console.log('PASS — every SectionHead matches its section ground.')
  process.exit(0)
}
console.log(`${problems.length} tone mismatch(es):`)
problems.forEach((p) => console.log(' - ' + p))
process.exit(1)
