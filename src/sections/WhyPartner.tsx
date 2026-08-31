import { Section } from '@/components/ui'
import { ImageReveal, Reveal, StaggerGroup, StaggerItem } from '@/components/motion'
import { advantages, partnerCommitments } from '@/data/company'

/**
 * An asymmetric editorial spread rather than a grid of ten identical cards.
 *
 * The first three advantages are set large in a left column, because they are
 * the three a manufacturer weighs first. The remainder run as a tight
 * two-column list. A photograph of the company's own inventory sits between
 * them, so the claim about supply chain has something behind it.
 */
export function WhyPartner({ tone = 'page' }: { tone?: 'page' | 'subtle' }) {
  const [lead, ...rest] = advantages

  return (
    <Section id="why-partner" tone={tone}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* ------------------------------------------------- left column */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-1 w-8 rounded-full bg-teal-400" />
                <p className="label">Why partner with us</p>
              </div>
              <h2 className="mt-5 text-display-lg text-fg">
                Selecting a distribution partner is a strategic decision
              </h2>
              <p className="mt-6 max-w-measure text-lead text-fg-muted">
                We offer international manufacturers a combination of market knowledge, technical
                expertise, professional integrity and long-term commitment that enables sustainable
                success in Afghanistan.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10 rounded-panel border border-line bg-surface-2 p-7 shadow-subtle">
                <p className="font-display text-display-md text-accent">{lead.title}</p>
                <p className="mt-4 max-w-measure text-body leading-relaxed text-fg-muted">
                  {lead.body}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <ImageReveal className="mt-8 overflow-hidden rounded-plate shadow-lift">
                <img
                  src="/assets/gallery/shelving-aisle.webp"
                  srcSet="/assets/gallery/shelving-aisle-800.webp 800w, /assets/gallery/shelving-aisle.webp 1280w"
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  alt="A deep aisle of shelving in the company's Kabul premises, stocked with pharmaceutical products across the full height of the wall"
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="photo-dim aspect-[16/10] w-full object-cover"
                />
              </ImageReveal>
            </Reveal>
          </div>

          {/* ------------------------------------------------ right column */}
          <div className="lg:pt-4">
            <StaggerGroup as="ul" className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {rest.map((item) => (
                <StaggerItem as="li" key={item.title} className="border-t border-line pt-5">
                  <h3 className="text-[1.0625rem] font-bold leading-snug text-fg">{item.title}</h3>
                  <p className="mt-2.5 text-body-sm leading-relaxed text-fg-muted">{item.body}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {/* ------------------------------------- commitment to partners */}
            <Reveal delay={0.06}>
              <div className="on-dark mt-12 rounded-panel bg-ink-900 p-8 sm:p-10">
                <p className="font-sans text-label uppercase text-teal-300">
                  Our commitment to partners
                </p>
                <p className="mt-5 max-w-measure font-editorial text-[1.375rem] italic leading-snug text-white">
                  Our international partners entrust us with more than products — they entrust us
                  with their reputation.
                </p>
                <ul className="mt-7 space-y-3 border-t border-white/10 pt-6">
                  {partnerCommitments.map((commitment) => (
                    <li key={commitment} className="flex items-start gap-3 text-body-sm text-ink-200">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300"
                      />
                      {commitment}
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
