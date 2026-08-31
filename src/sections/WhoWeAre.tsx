import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui'
import { ImageReveal, Reveal } from '@/components/motion'
import { whoWeAre } from '@/data/profile'

/** The six things the company actually does, as the profile lists them. */
const specialisms = [
  'Pharmaceutical importation',
  'Marketing',
  'Distribution',
  'Commercialisation',
  'Advanced medical equipment',
  'Specialised healthcare solutions',
]

export function WhoWeAre({
  tone = 'page',
  /** The story link is a self-link on the About page, so it is dropped there. */
  showStoryLink = true,
}: {
  tone?: 'page' | 'subtle'
  showStoryLink?: boolean
}) {
  return (
    <Section id="who-we-are" tone={tone} className="pt-section-lg">
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          {/* ------------------------------------------------------- plate */}
          <Reveal className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <ImageReveal className="overflow-hidden rounded-plate shadow-lift">
              <img
                src="/assets/gallery/distribution-floor.webp"
                srcSet="/assets/gallery/distribution-floor-800.webp 800w, /assets/gallery/distribution-floor.webp 1280w"
                sizes="(min-width: 1024px) 44vw, 92vw"
                alt="The Fatami Ali Pharmaceuticals distribution floor in Kabul, with staff at the counter and floor-to-ceiling shelving stocked with pharmaceutical cartons"
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
                className="photo-dim aspect-[4/3] w-full object-cover"
              />
            </ImageReveal>

            <div className="mt-5 flex items-start gap-3 rounded-card border border-line bg-surface-2 p-4">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
              <p className="text-[0.8125rem] leading-relaxed text-fg-subtle">
                The company’s distribution premises at the Rahman Center, Khair Khana, Kabul.
              </p>
            </div>
          </Reveal>

          {/* -------------------------------------------------------- text */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-1 w-8 rounded-full bg-teal-400" />
                <p className="label">Who we are</p>
              </div>
              <h2 className="mt-5 text-display-lg text-fg">
                A strategic healthcare partner, not simply a supplier
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-6 text-lead text-fg">{whoWeAre.lead}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="prose-body mt-6 max-w-prose text-fg-muted">
                {whoWeAre.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <ul className="mt-9 grid gap-x-8 gap-y-3 border-t border-line pt-8 sm:grid-cols-2">
                {specialisms.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-body-sm text-fg">
                    <span
                      aria-hidden="true"
                      className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-9 max-w-measure font-editorial text-[1.25rem] italic leading-relaxed text-fg">
                {whoWeAre.closing}
              </p>

              {showStoryLink ? (
                <Link
                  to="/about"
                  className="group mt-8 inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-action px-7 text-[0.9375rem] font-semibold text-on-action transition-all duration-400 ease-out hover:bg-action-hover hover:shadow-action"
                >
                  Discover Our Story
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              ) : null}
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  )
}
