import { Section } from '@/components/ui'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion'
import { leadershipPrinciples } from '@/data/company'
import { promise } from '@/data/profile'

/**
 * Leadership philosophy and the company's promise, on the deep navy-teal panel. Four
 * principles, set as a numbered set because the profile states them as four
 * numbered principles.
 */
export function Leadership() {
  return (
    <Section id="leadership" tone="deep" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(46% 42% at 88% 10%, #3CB49C 0%, transparent 66%), radial-gradient(42% 44% at 6% 92%, #006F68 0%, transparent 70%)',
        }}
      />

      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-1 w-8 rounded-full bg-teal-400" />
                <p className="font-sans text-label uppercase text-teal-300">Leadership philosophy</p>
              </div>
              <h2 className="mt-5 text-display-lg text-white">
                Leadership is defined not by hierarchy but by responsibility
              </h2>
              <p className="mt-6 max-w-measure text-lead text-ink-200">
                Every member of our organisation plays a vital role in improving healthcare delivery
                throughout Afghanistan. Whether working in regulatory affairs, logistics, sales,
                customer service, finance or technical support, each contributes to a common
                mission.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10 rounded-panel border border-white/10 bg-white/[0.04] p-7 sm:p-8">
                <p className="font-sans text-label uppercase text-teal-300">Our promise</p>
                <p className="mt-4 max-w-measure text-body-sm leading-relaxed text-ink-200">
                  {promise}
                </p>
              </div>
            </Reveal>
          </div>

          <StaggerGroup as="ol" className="grid gap-5 sm:grid-cols-2">
            {leadershipPrinciples.map((principle, i) => (
              <StaggerItem
                as="li"
                key={principle.title}
                className="group rounded-panel border border-white/10 bg-ink-950/50 p-7 transition-all duration-400 ease-out hover:-translate-y-1 hover:border-teal-300/40"
              >
                <span
                  aria-hidden="true"
                  className="nums font-display text-[0.8125rem] font-bold tracking-[0.1em] text-teal-300"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-display-sm text-white">{principle.title}</h3>
                <p className="mt-3 text-body-sm leading-relaxed text-ink-200">{principle.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </Section>
  )
}
