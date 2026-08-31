import { Building2, Globe2, PackageCheck, Stethoscope, Truck } from 'lucide-react'
import { StaggerGroup, StaggerItem } from '@/components/motion'

/**
 * The strip directly under the hero. Five statements, each one supported by
 * the company profile — no invented figures, no certifications, no client
 * counts. Where a number appears it is one that can be checked against the
 * profile (ten years since 2015; four exclusive agreements).
 */
const points = [
  {
    icon: Building2,
    value: '10+ years',
    label: 'of experience',
    detail: 'Serving Afghanistan’s healthcare sector since 2015.',
  },
  {
    icon: Globe2,
    value: 'International',
    label: 'pharmaceutical partnerships',
    detail: 'Exclusive Afghan distribution for four manufacturers.',
  },
  {
    icon: Stethoscope,
    value: 'Medical technology',
    label: 'solutions',
    detail: 'Cath lab, angiography, endoscopy and hospital equipment.',
  },
  {
    icon: Truck,
    value: 'Healthcare',
    label: 'distribution',
    detail: 'Importation, warehousing and nationwide distribution.',
  },
  {
    icon: PackageCheck,
    value: 'Afghanistan',
    label: 'market expertise',
    detail: 'Regulatory, procurement and institutional market knowledge.',
  },
] as const

export function TrustStrip() {
  return (
    <section aria-label="What we bring to a partnership" className="relative bg-bg">
      <div className="container">
        <StaggerGroup
          as="ul"
          className="-mt-10 grid gap-px overflow-hidden rounded-panel border border-line bg-line shadow-card sm:grid-cols-2 lg:grid-cols-5"
        >
          {points.map(({ icon: Icon, value, label, detail }) => (
            <StaggerItem
              as="li"
              key={value + label}
              className="group bg-surface p-6 transition-colors duration-400 ease-out hover:bg-surface-2"
            >
              <Icon
                className="h-5 w-5 text-accent transition-transform duration-400 ease-out group-hover:-translate-y-0.5"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <p className="mt-4 font-display text-[1.0625rem] font-bold leading-tight text-fg">
                {value}
              </p>
              <p className="text-[0.9375rem] leading-tight text-fg-muted">{label}</p>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-fg-subtle">{detail}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
