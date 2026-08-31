import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Handshake,
  Lightbulb,
  RefreshCw,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section, SectionHead } from '@/components/ui'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion'
import { mission, values, vision } from '@/data/company'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

const valueIcons: Record<string, LucideIcon> = {
  Integrity: ShieldCheck,
  Excellence: Sparkles,
  Partnership: Handshake,
  Innovation: Lightbulb,
  Accountability: Scale,
  'Customer Focus': UserRound,
  Respect: Handshake,
  'Continuous Improvement': RefreshCw,
}

const statements = [
  { id: 'vision', label: 'Vision', body: vision, icon: Target },
  { id: 'mission', label: 'Mission', body: mission, icon: Sparkles },
] as const

export function VisionMissionValues() {
  const [active, setActive] = useState<'vision' | 'mission'>('vision')
  const reduced = usePrefersReducedMotion()
  const current = statements.find((s) => s.id === active) ?? statements[0]

  return (
    <Section id="vision" tone="aurora">
      <div className="container">
        <SectionHead
          label="Vision, mission & values"
          title="What we are working toward"
          align="center"
        />

        {/* ------------------------------------------- vision / mission */}
        <Reveal delay={0.06}>
          <div className="mx-auto mt-12 max-w-4xl">
            <div
              role="tablist"
              aria-label="Vision and mission"
              className="mx-auto flex w-fit gap-1 rounded-full border border-line bg-surface p-1 shadow-subtle"
            >
              {statements.map((statement) => {
                const isActive = statement.id === active
                return (
                  <button
                    key={statement.id}
                    type="button"
                    role="tab"
                    id={`vm-tab-${statement.id}`}
                    aria-selected={isActive}
                    aria-controls="vm-panel"
                    onClick={() => setActive(statement.id)}
                    className={cn(
                      'relative cursor-pointer rounded-full px-7 py-3 text-[0.9375rem] font-semibold transition-colors duration-300',
                      isActive ? 'text-on-action' : 'text-fg-muted hover:text-fg',
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="vm-pill"
                        transition={
                          reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }
                        }
                        className="absolute inset-0 rounded-full bg-action"
                      />
                    ) : null}
                    <span className="relative">{statement.label}</span>
                  </button>
                )
              })}
            </div>

            <div
              id="vm-panel"
              role="tabpanel"
              aria-labelledby={`vm-tab-${current.id}`}
              className="mt-8 rounded-panel border border-line bg-surface p-8 text-center shadow-card sm:p-12"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
                    <current.icon className="h-5 w-5 text-accent" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <p className="mx-auto mt-7 max-w-3xl font-editorial text-[1.375rem] leading-[1.55] text-fg sm:text-[1.5rem]">
                    {current.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* --------------------------------------------------- the values */}
        <Reveal delay={0.1}>
          <div className="mt-16 flex items-center gap-4">
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
            <p className="label-quiet">Our core values</p>
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <StaggerGroup as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = valueIcons[value.name] ?? ShieldCheck
            return (
              <StaggerItem
                as="li"
                key={value.name}
                className="group rounded-panel border border-line bg-surface p-6 shadow-subtle transition-all duration-400 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft transition-transform duration-400 ease-out group-hover:scale-105">
                  <Icon className="h-[18px] w-[18px] text-accent" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[1.0625rem] font-bold text-fg">{value.name}</h3>
                <p className="mt-2.5 text-body-sm leading-relaxed text-fg-muted">{value.body}</p>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </Section>
  )
}
