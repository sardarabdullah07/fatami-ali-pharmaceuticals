import { Section } from '@/components/ui'
import { ImageReveal, Reveal, StaggerGroup, StaggerItem } from '@/components/motion'
import { impactThemes, market } from '@/data/profile'
import { marketCharacteristics } from '@/data/company'

/**
 * The healthcare impact spread. An editorial image-and-text layout: the
 * argument on the left, the market it applies to on the right, and the
 * company's own premises underneath both so the claim stays grounded in
 * something photographable.
 */
export function HealthcareImpact() {
  return (
    <Section id="impact" tone="subtle">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-1 w-8 rounded-full bg-teal-400" />
                <p className="label">Healthcare impact</p>
              </div>
              <h2 className="mt-5 text-display-lg text-fg">
                Every carton delivered is a step toward a stronger health system
              </h2>
              <p className="mt-6 max-w-measure text-lead text-fg-muted">{market.lead}</p>
            </Reveal>

            <Reveal delay={0.08}>
              <ImageReveal className="mt-10 overflow-hidden rounded-plate shadow-lift">
                <img
                  src="/assets/gallery/order-fulfilment.webp"
                  srcSet="/assets/gallery/order-fulfilment-800.webp 800w, /assets/gallery/order-fulfilment.webp 1280w"
                  sizes="(min-width: 1024px) 50vw, 92vw"
                  alt="Two members of staff assembling a pharmaceutical order from stacked cartons at the counter of the company's Kabul premises"
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="photo-dim aspect-[16/10] w-full object-cover"
                />
              </ImageReveal>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-measure font-editorial text-[1.25rem] italic leading-relaxed text-fg">
                {market.closing}
              </p>
            </Reveal>
          </div>

          {/* ------------------------------------------------ right column */}
          <div>
            <StaggerGroup as="ul" className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {impactThemes.map((theme) => (
                <StaggerItem as="li" key={theme.title} className="border-t border-line pt-5">
                  <h3 className="text-[1.0625rem] font-bold leading-snug text-fg">{theme.title}</h3>
                  <p className="mt-2.5 text-body-sm leading-relaxed text-fg-muted">{theme.body}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {/* --------------------------------- Afghanistan at a glance */}
            <Reveal delay={0.06}>
              <div className="mt-12 rounded-panel border border-line bg-surface-2 p-8 shadow-subtle">
                <p className="label-quiet">Afghanistan healthcare at a glance</p>

                <dl className="mt-6 space-y-5 border-b border-line pb-6">
                  <div>
                    <dt className="text-[0.8125rem] uppercase tracking-[0.12em] text-fg-subtle">
                      Population
                    </dt>
                    <dd className="mt-1.5 font-display text-[1.125rem] font-bold text-fg">
                      {market.population}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.8125rem] uppercase tracking-[0.12em] text-fg-subtle">
                      Healthcare facilities
                    </dt>
                    <dd className="mt-1.5 text-body-sm leading-relaxed text-fg-muted">
                      {market.facilities}
                    </dd>
                  </div>
                </dl>

                <p className="mt-6 text-[0.8125rem] uppercase tracking-[0.12em] text-fg-subtle">
                  Market characteristics
                </p>
                <ul className="mt-4 space-y-2.5">
                  {marketCharacteristics.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-body-sm text-fg-muted">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  )
}
