import { Section, SectionHead } from '@/components/ui'
import { StaggerGroup, StaggerItem } from '@/components/motion'
import { partners } from '@/data/company'

/**
 * No partner logos are reproduced here. The company holds no logo artwork for
 * these manufacturers beyond what appears on its own printed banners, and a
 * redrawn approximation of another company's mark would be a fabrication.
 * The cards are typographic instead: the name set large, the country and the
 * scope of the agreement stated plainly.
 */
export function Partners() {
  return (
    <Section id="partners" tone="subtle">
      <div className="container">
        <SectionHead
          label="International partners"
          title="Exclusive distribution agreements"
          intro="Fatami Ali Pharmaceuticals is honoured to represent internationally respected pharmaceutical manufacturers through exclusive distribution partnerships within Afghanistan."
        />

        <StaggerGroup as="ul" className="mt-14 grid gap-6 sm:grid-cols-2">
          {partners.map((partner) => (
            <StaggerItem
              as="li"
              key={partner.name}
              className="group relative overflow-hidden rounded-panel border border-line bg-surface p-8 shadow-subtle transition-all duration-400 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift sm:p-10"
            >
              {/* A quiet teal wash that arrives on hover, in place of a logo. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  backgroundImage:
                    'radial-gradient(70% 90% at 100% 0%, rgba(60,180,156,0.12) 0%, transparent 70%)',
                }}
              />

              <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-accent">
                    {partner.scope}
                  </span>
                  <span className="text-[0.8125rem] uppercase tracking-[0.14em] text-fg-subtle">
                    {partner.country}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-display-md leading-tight text-fg">
                  {partner.name}
                </h3>

                <p className="mt-4 max-w-measure text-body-sm leading-relaxed text-fg-muted">
                  {partner.description}
                </p>
              </div>

              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-teal-400 transition-transform duration-600 ease-out group-hover:scale-x-100"
              />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <p className="mt-8 max-w-prose text-[0.8125rem] leading-relaxed text-fg-subtle">
          We continue to explore collaborations with pharmaceutical innovators from Europe, the
          Middle East, South Asia, East Asia and North America to further strengthen the portfolio.
        </p>
      </div>
    </Section>
  )
}
