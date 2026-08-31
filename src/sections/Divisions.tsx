import { Section, SectionHead } from '@/components/ui'
import { ImageReveal, Reveal, StaggerGroup, StaggerItem } from '@/components/motion'
import { divisionPortfolios, portfolioFootnote } from '@/data/company'
import { cn } from '@/lib/utils'

/**
 * The six divisions in full: the profile's own description of each, followed
 * by the portfolio exactly as the profile lists it. Nothing is added to these
 * lists — no specifications, no brand names, no clinical claims. Items the
 * profile marks with an asterisk keep the asterisk and the footnote.
 *
 * Rows alternate so the page reads as a spread rather than a stack.
 */

type Division = {
  /** Anchor id — these are the targets used by the header and footer links. */
  id: string
  eyebrow: string
  title: string
  subtitle: string
  body: string[]
  /** Key into `divisionPortfolios`. */
  portfolioKey: string
  portfolioTitle: string
  image: string
  imageAlt: string
  imageFit: 'cover' | 'contain'
}

const divisions: Division[] = [
  {
    id: 'pharmaceutical-division',
    eyebrow: 'Division 01',
    title: 'Pharmaceutical Division',
    subtitle: 'Delivering trusted medicines to improve lives',
    body: [
      'The Pharmaceutical Division is the cornerstone of our business and the foundation on which our reputation has been built. For more than a decade we have worked to ensure that high-quality, safe and effective medicines reach healthcare professionals and patients throughout Afghanistan.',
      'Every pharmaceutical product represents more than a commercial commodity — it represents hope for patients, confidence for physicians and responsibility for healthcare providers. Our role extends well beyond importation, and our objective is simple: that every product entrusted to us reaches the right healthcare provider, at the right time, under the right conditions.',
    ],
    portfolioKey: 'pharmaceuticals',
    portfolioTitle: 'What market access covers',
    image: '/assets/gallery/inventory-cartons.webp',
    imageAlt:
      'A member of staff checking cartons of sustained-release tablets against stocked shelving in the company premises',
    imageFit: 'cover',
  },
  {
    id: 'medical-equipment',
    eyebrow: 'Division 02',
    title: 'Medical Equipment Division',
    subtitle: 'Advancing modern healthcare through innovative medical technologies',
    body: [
      'Recognising that advanced medical technologies have become essential to improving clinical outcomes, Fatami Ali Pharmaceuticals expanded beyond pharmaceutical distribution to become a supplier of sophisticated medical equipment, hospital technologies and specialised clinical consumables.',
      'Rather than simply supplying equipment, we work alongside healthcare providers to identify solutions that meet their clinical objectives, operational requirements and long-term development plans. Our commitment extends from procurement and logistics through to technical coordination and ongoing customer support.',
    ],
    portfolioKey: 'medical-equipment',
    portfolioTitle: 'Capability areas',
    image: '/assets/editorial/hospital-equipment.webp',
    imageAlt: 'Hospital equipment including patient monitoring and infusion technologies',
    imageFit: 'cover',
  },
  {
    id: 'cath-lab',
    eyebrow: 'Division 03',
    title: 'Interventional Cardiology & Cath Lab',
    subtitle: 'Supporting excellence in cardiovascular care',
    body: [
      'Cardiovascular disease remains one of the leading causes of morbidity and mortality worldwide, making timely diagnosis and effective intervention critical. We have developed significant expertise in supplying advanced products for cardiac catheterisation laboratories, interventional cardiology departments and cardiovascular specialists.',
      'Interventional cardiology demands exceptional precision, reliability and product quality. For this reason we collaborate only with manufacturers whose technologies meet internationally recognised standards.',
    ],
    portfolioKey: 'cardiology',
    portfolioTitle: 'Product portfolio',
    image: '/assets/technology/cathlab-portfolio-cut.webp',
    imageAlt:
      'Cath lab portfolio including angiography kits, guidewires, catheters and introducer sheaths',
    imageFit: 'contain',
  },
  {
    id: 'angiography',
    eyebrow: 'Division 04',
    title: 'Angiography Solutions',
    subtitle: 'Supporting hospitals and cardiac centres',
    body: [
      'We support hospitals and cardiac centres by facilitating access to advanced angiography technologies and their associated accessories.',
      'Successful implementation extends beyond equipment procurement. We support our partners with product knowledge, coordination and responsive service, so that healthcare institutions can maximise the value of their investment.',
    ],
    portfolioKey: 'angiography',
    portfolioTitle: 'Areas of expertise',
    image: '/assets/technology/vascular-access-cut.webp',
    imageAlt: 'Vascular access devices, manifolds and contrast management accessories',
    imageFit: 'contain',
  },
  {
    id: 'endoscopy',
    eyebrow: 'Division 05',
    title: 'Endoscopy Division',
    subtitle: 'Enabling better diagnosis through advanced endoscopic technologies',
    body: [
      'Early diagnosis remains one of the most effective strategies for improving clinical outcomes. We support gastroenterologists, surgeons and healthcare providers with modern endoscopy equipment and a comprehensive portfolio of disposable endoscopic accessories.',
      'Our solutions are designed to enhance procedural efficiency, improve patient safety and support minimally invasive clinical practice.',
    ],
    portfolioKey: 'endoscopy',
    portfolioTitle: 'Endoscopy portfolio',
    image: '/assets/technology/endoscopy-accessories-cut.webp',
    imageAlt: 'Disposable endoscopic accessories including snares, forceps and retrieval baskets',
    imageFit: 'contain',
  },
  {
    id: 'hospital-solutions',
    eyebrow: 'Division 06',
    title: 'Hospital Solutions Division',
    subtitle: 'Delivering complete healthcare infrastructure solutions',
    body: [
      'Healthcare institutions require integrated solutions that combine pharmaceuticals, medical technologies, equipment, consumables and dependable support. We offer comprehensive hospital solutions tailored to public hospitals, private healthcare providers, specialised centres, humanitarian organisations and development partners.',
      'Our long-term objective is to support hospitals in creating safer, more efficient and technologically advanced environments capable of delivering high-quality patient care.',
    ],
    portfolioKey: 'hospital-solutions',
    portfolioTitle: 'Hospital solutions portfolio',
    image: '/assets/editorial/surgical-instruments.webp',
    imageAlt: 'Surgical instruments laid out on a sterile field',
    imageFit: 'cover',
  },
]

export function Divisions() {
  return (
    <Section id="divisions" tone="page">
      <div className="container">
        <SectionHead
          label="Our divisions"
          title="Six divisions, described in full"
          intro="What each division does, and exactly what it carries. The portfolios below are reproduced from our company profile without addition."
        />

        <div className="mt-16 space-y-20 lg:space-y-28">
          {divisions.map((division, i) => {
            const portfolio = divisionPortfolios[division.portfolioKey] ?? []
            const hasFootnote = portfolio.some((item) => item.includes('*'))
            const flip = i % 2 === 1

            return (
              <article
                key={division.id}
                id={division.id}
                className="scroll-mt-[calc(var(--nav-h)+2rem)]"
              >
                <div
                  className={cn(
                    'grid items-start gap-10 lg:grid-cols-2 lg:gap-16',
                    flip && 'lg:[&>*:first-child]:order-2',
                  )}
                >
                  {/* --------------------------------------------- plate
                   *
                   * The portfolio lists run to fifteen items, so the 4:3 plate
                   * is around half the height of the column beside it. Left
                   * static it opens a tall void down the page; pinned, it
                   * tracks the text the way a plate does in a printed profile.
                   */}
                  <ImageReveal
                    className="overflow-hidden rounded-plate border border-line shadow-lift lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)]"
                    from={flip ? 'left' : 'bottom'}
                  >
                    <div className="aspect-[4/3] bg-bg-inset">
                      <img
                        src={division.image}
                        alt={division.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className={cn(
                          'h-full w-full',
                          division.imageFit === 'cover'
                            ? 'photo-dim object-cover'
                            : 'object-contain p-8',
                        )}
                      />
                    </div>
                  </ImageReveal>

                  {/* ---------------------------------------------- text */}
                  <div>
                    <Reveal>
                      <p className="label-quiet">{division.eyebrow}</p>
                      <h3 className="mt-4 text-display-md text-fg">{division.title}</h3>
                      <p className="mt-2 text-display-sm font-semibold text-accent">
                        {division.subtitle}
                      </p>
                    </Reveal>

                    <Reveal delay={0.05}>
                      <div className="prose-body mt-6 max-w-prose text-fg-muted">
                        {division.body.map((p) => (
                          <p key={p.slice(0, 32)}>{p}</p>
                        ))}
                      </div>
                    </Reveal>

                    <Reveal delay={0.08}>
                      <div className="mt-8 rounded-panel border border-line bg-surface-2 p-6 sm:p-7">
                        <p className="label-quiet">{division.portfolioTitle}</p>
                        <StaggerGroup
                          as="ul"
                          step={0.03}
                          className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2"
                        >
                          {portfolio.map((item) => (
                            <StaggerItem
                              as="li"
                              key={item}
                              className="flex items-start gap-2.5 text-body-sm text-fg-muted"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400"
                              />
                              {item}
                            </StaggerItem>
                          ))}
                        </StaggerGroup>

                        {hasFootnote ? (
                          <p className="mt-5 border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-fg-subtle">
                            {portfolioFootnote}
                          </p>
                        ) : null}
                      </div>
                    </Reveal>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
