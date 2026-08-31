import { Link } from 'react-router-dom'
import { Activity, ArrowUpRight, Boxes, HeartPulse, Microscope, Pill, Scan } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section, SectionHead } from '@/components/ui'
import { StaggerGroup, StaggerItem } from '@/components/motion'
import { solutions } from '@/data/company'

/** Each division's icon, keyed to the division ids in the data. */
const icons: Record<string, LucideIcon> = {
  pharmaceuticals: Pill,
  'medical-equipment': Boxes,
  cardiology: HeartPulse,
  angiography: Scan,
  endoscopy: Microscope,
  'hospital-solutions': Activity,
}

/** Where each card's Explore link goes on the About & Products page. */
const targets: Record<string, string> = {
  pharmaceuticals: '/about#pharmaceutical-division',
  'medical-equipment': '/about#medical-equipment',
  cardiology: '/about#cath-lab',
  angiography: '/about#angiography',
  endoscopy: '/about#endoscopy',
  'hospital-solutions': '/about#hospital-solutions',
}

export function SolutionsGrid() {
  return (
    <Section id="what-we-do" tone="subtle">
      <div className="container">
        <SectionHead
          label="What we do"
          title="Six divisions, one healthcare partner"
          intro="Pharmaceuticals remain the cornerstone of the business. Around them sit five technical divisions that let a hospital source its medicines, its cath lab consumables and its theatre equipment from the same partner."
        />

        <StaggerGroup as="ul" className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => {
            const Icon = icons[solution.id] ?? Boxes
            return (
              <StaggerItem as="li" key={solution.id}>
                <Link
                  to={targets[solution.id] ?? '/about'}
                  className="group flex h-full flex-col overflow-hidden rounded-panel border border-line bg-surface shadow-subtle transition-all duration-400 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-bg-inset">
                    <img
                      src={solution.image}
                      alt={solution.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="photo-dim h-full w-full object-contain p-6 transition-transform duration-600 ease-soft group-hover:scale-[1.05]"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent/[0.07] to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft">
                        <Icon className="h-[18px] w-[18px] text-accent" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <h3 className="text-display-sm text-fg">{solution.title}</h3>
                    </div>

                    <p className="mt-4 flex-1 text-body-sm leading-relaxed text-fg-muted">
                      {solution.summary}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-accent">
                      Explore
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-400 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </Section>
  )
}
