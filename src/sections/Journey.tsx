import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Section, SectionHead } from '@/components/ui'
import { Reveal } from '@/components/motion'
import { milestones } from '@/data/company'
import { journeyIntro } from '@/data/profile'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

/**
 * The timeline draws itself as the reader scrolls: a teal rule fills the spine
 * from 2015 to today, and each year's node lands as its entry arrives. The
 * motion encodes the content — this is a genuine chronological sequence, so a
 * progressive reveal is the honest form for it.
 */
export function Journey() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 78%', 'end 65%'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })

  return (
    <Section id="journey" tone="page">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)] lg:self-start">
            <SectionHead label="Our journey" title={journeyIntro.heading} />
            <Reveal delay={0.06}>
              <div className="prose-body mt-6 max-w-measure text-fg-muted">
                {journeyIntro.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ------------------------------------------------- the timeline */}
          <div ref={ref} className="relative pl-10 sm:pl-14">
            {/* the spine */}
            <div
              aria-hidden="true"
              className="absolute bottom-2 left-[7px] top-2 w-px bg-line sm:left-[11px]"
            />
            <motion.div
              aria-hidden="true"
              style={reduced ? { scaleY: 1 } : { scaleY: fill }}
              className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-teal-400 sm:left-[11px]"
            />

            <ol className="space-y-10">
              {milestones.map((milestone, i) => (
                <motion.li
                  key={milestone.year}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                  transition={{ duration: 0.5, delay: i * 0.02, ease: [0.22, 0.61, 0.36, 1] }}
                  className="relative"
                >
                  {/* the node */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-10 top-1.5 flex h-[15px] w-[15px] items-center justify-center sm:-left-14 sm:h-[23px] sm:w-[23px]"
                  >
                    <span className="h-[15px] w-[15px] rounded-full border-2 border-teal-400 bg-bg sm:h-[15px] sm:w-[15px]" />
                  </span>

                  <p className="nums font-display text-[0.9375rem] font-bold uppercase tracking-[0.1em] text-accent">
                    {milestone.year}
                  </p>
                  <h3 className="mt-2 text-display-sm text-fg">{milestone.title}</h3>
                  <p className="mt-2.5 max-w-measure text-body-sm leading-relaxed text-fg-muted">
                    {milestone.body}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  )
}
