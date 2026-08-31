import { Section } from '@/components/ui'
import { ImageReveal, Reveal } from '@/components/motion'
import { ceoMessage } from '@/data/profile'
import { company } from '@/data/company'

/**
 * The CEO's letter, set as a letter: serif body, a generous measure, a pull
 * quote lifted out of the text, and a signature block at the foot. No portrait
 * exists in the material supplied, so the plate carries the company's own
 * signage instead of a stand-in photograph of a stranger.
 */
export function CeoMessage() {
  return (
    <Section id="ceo" tone="page">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)] lg:self-start">
            <Reveal>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-1 w-8 rounded-full bg-teal-400" />
                <p className="label">Leadership message</p>
              </div>
              <h2 className="mt-5 text-display-lg text-fg">
                A message from the Chief Executive Officer
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <ImageReveal className="mt-8 overflow-hidden rounded-plate shadow-lift">
                <img
                  src="/assets/gallery/storefront.webp"
                  srcSet="/assets/gallery/storefront-800.webp 800w, /assets/gallery/storefront.webp 1280w"
                  sizes="(min-width: 1024px) 36vw, 92vw"
                  alt="The exterior of the Fatami Ali Pharmaceuticals premises in Kabul, carrying Beximco Pharma and Yug Enterprises branding on the glazing"
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="photo-dim aspect-[4/3] w-full object-cover"
                />
              </ImageReveal>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="font-editorial text-[1.25rem] text-fg">{ceoMessage.salutation}</p>
            </Reveal>

            <Reveal delay={0.04}>
              <div className="prose-body mt-6 max-w-prose font-editorial text-[1.0625rem] leading-[1.8] text-fg-muted">
                {ceoMessage.paragraphs.slice(0, 3).map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <blockquote className="my-10 border-l-2 border-teal-400 pl-6 sm:pl-8">
                <p className="max-w-measure font-display text-display-md leading-tight text-fg">
                  “{ceoMessage.pullQuote}”
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="prose-body max-w-prose font-editorial text-[1.0625rem] leading-[1.8] text-fg-muted">
                {ceoMessage.paragraphs.slice(3).map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 border-t border-line pt-8">
                <p className="font-editorial text-[1.0625rem] italic text-fg-muted">
                  {ceoMessage.signOff}
                </p>
                <p className="mt-4 font-display text-[1.0625rem] font-bold text-fg">
                  {ceoMessage.signature}
                </p>
                <p className="mt-1 text-body-sm text-fg-subtle">{ceoMessage.signatureOrg}</p>

                <p className="mt-8 max-w-measure rounded-card border border-line bg-surface-2 p-5 font-editorial text-[1.0625rem] italic leading-relaxed text-fg">
                  “{company.motto}”
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  )
}
