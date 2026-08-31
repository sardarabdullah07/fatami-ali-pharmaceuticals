import { Section, SectionHead } from '@/components/ui'
import { StaggerGroup, StaggerItem } from '@/components/motion'
import { objectives } from '@/data/company'

/**
 * Seven strategic objectives. These are numbered because the profile presents
 * them as a set the company is working through, and a reader scanning for one
 * of them benefits from a fixed position to come back to.
 */
export function Objectives() {
  return (
    <Section id="objectives" tone="page">
      <div className="container">
        <SectionHead
          label="Strategic objectives"
          title="What we are committed to over the coming years"
          intro="Our long-term strategy is built around sustainable growth, healthcare innovation and value creation."
        />

        <StaggerGroup as="ol" className="mt-14 grid gap-px overflow-hidden rounded-panel border border-line bg-line shadow-card sm:grid-cols-2 lg:grid-cols-3">
          {objectives.map((objective, i) => (
            <StaggerItem
              as="li"
              key={objective.title}
              className="group flex flex-col bg-surface p-7 transition-colors duration-400 ease-out hover:bg-surface-2 sm:p-8"
            >
              <span
                aria-hidden="true"
                className="nums font-display text-[0.8125rem] font-bold tracking-[0.1em] text-accent"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-display-sm leading-snug text-fg">{objective.title}</h3>
              <p className="mt-3 text-body-sm leading-relaxed text-fg-muted">{objective.body}</p>
              <span
                aria-hidden="true"
                className="mt-6 block h-px w-8 origin-left bg-teal-400 transition-all duration-500 ease-out group-hover:w-16"
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  )
}
