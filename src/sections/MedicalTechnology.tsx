import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Section, SectionHead } from '@/components/ui'
import { Reveal } from '@/components/motion'
import { techAreas } from '@/data/profile'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

/**
 * The technology showcase runs on the deep navy-teal panel in both themes — the one
 * place the site goes dark on purpose. Equipment photographed against a dark
 * ground is how medical technology is presented in the trade, and it gives
 * the page a change of register between two long light sections.
 *
 * A list of eight areas on the left drives a single large plate on the right,
 * rather than eight small cards nobody reads.
 */
export function MedicalTechnology() {
  const [activeId, setActiveId] = useState(techAreas[0].id)
  const reduced = usePrefersReducedMotion()
  const active = techAreas.find((t) => t.id === activeId) ?? techAreas[0]

  return (
    <Section id="technology" tone="deep" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'radial-gradient(50% 45% at 80% 12%, #3CB49C 0%, transparent 66%), radial-gradient(45% 45% at 8% 88%, #006F68 0%, transparent 70%)',
        }}
      />

      <div className="container relative">
        <SectionHead
          onDark
          label="Medical technology"
          title="Equipment, consumables and the support around them"
          intro="Rather than simply supplying equipment, we work alongside healthcare providers to identify solutions that meet their clinical objectives and long-term development plans — from procurement and logistics through technical coordination."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* --------------------------------------------------- the index */}
          <Reveal>
            <ul className="flex snap-x gap-2 overflow-x-auto pb-2 no-scrollbar lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
              {techAreas.map((area, i) => {
                const isActive = area.id === activeId
                return (
                  <li key={area.id} className="shrink-0 snap-start lg:shrink lg:border-b lg:border-white/10">
                    <button
                      type="button"
                      onClick={() => setActiveId(area.id)}
                      aria-pressed={isActive}
                      className={cn(
                        'group flex w-full cursor-pointer items-center gap-3 whitespace-nowrap rounded-full border px-4 py-3 text-left text-[0.875rem] font-medium transition-all duration-300 ease-out lg:whitespace-normal lg:rounded-none lg:border-0 lg:px-0 lg:py-4 lg:text-[0.9375rem]',
                        isActive
                          ? 'border-teal-300/40 bg-white/10 text-white lg:bg-transparent'
                          : 'border-white/15 text-ink-200 hover:border-teal-300/40 hover:text-white lg:border-0',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'nums hidden font-display text-[0.75rem] font-bold tabular-nums transition-colors duration-300 lg:inline',
                          isActive ? 'text-teal-300' : 'text-ink-300',
                        )}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1">{area.title}</span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'hidden h-px flex-none transition-all duration-400 ease-out lg:block',
                          isActive ? 'w-8 bg-teal-300' : 'w-0 bg-transparent group-hover:w-4 group-hover:bg-teal-300/50',
                        )}
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {/* -------------------------------------------------- the plate */}
          <Reveal delay={0.06}>
            <div className="overflow-hidden rounded-plate border border-white/10 bg-ink-950/60">
              <div className="relative aspect-[16/10] overflow-hidden bg-ink-950">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active.id}
                    src={active.image}
                    alt={active.imageAlt}
                    loading="lazy"
                    decoding="async"
                    initial={reduced ? false : { opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduced ? undefined : { opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute inset-0 h-full w-full object-contain p-8 sm:p-12"
                  />
                </AnimatePresence>
              </div>

              <div className="border-t border-white/10 p-7 sm:p-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    <h3 className="text-display-sm text-white">{active.title}</h3>
                    <p className="mt-4 max-w-measure text-body-sm leading-relaxed text-ink-200">
                      {active.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
