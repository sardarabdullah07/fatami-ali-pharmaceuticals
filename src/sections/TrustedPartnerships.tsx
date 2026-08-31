import { Quote } from 'lucide-react'
import { Section } from '@/components/ui'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion'
import { audiences, company } from '@/data/company'

/**
 * WHAT PEOPLE SAY ABOUT US — deliberately not testimonials.
 *
 * No customer quotations exist in the company profile or in any material
 * supplied, so none appear here. Publishing invented praise attributed to
 * hospitals or manufacturers would be a fabrication, and the one audience
 * this page is written for — international manufacturers — is exactly the
 * audience that checks.
 *
 * What the profile does document is who the company serves and what it
 * promises them. That is what this section carries, in the company's own
 * words, quoted from the profile rather than from imaginary customers.
 */

/** Verbatim from the company profile. Each is the company's own statement. */
const statements = [
  {
    quote:
      'Our success is built upon long-term relationships founded on trust, transparency, professionalism and mutual respect.',
    source: 'Message from the Chief Executive Officer',
  },
  {
    quote:
      'We consider every partnership not merely a business arrangement but a shared commitment to improving lives and strengthening Afghanistan’s healthcare system.',
    source: 'Message from the Chief Executive Officer',
  },
  {
    quote:
      'We view ourselves as custodians of our partners’ reputations. Every product we distribute, every hospital we serve and every physician we engage reflects that.',
    source: 'Why Fatami Ali Pharmaceuticals',
  },
]

export function TrustedPartnerships() {
  return (
    <Section id="trusted-partnerships" tone="page">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-1 w-8 rounded-full bg-teal-400" />
            <p className="label">Built on long-term relationships</p>
          </div>
          <h2 className="mt-5 text-display-lg text-fg">What we say about the way we work</h2>
          <p className="mx-auto mt-5 max-w-measure text-lead text-pretty text-fg-muted">
            We have not published customer testimonials, because we would rather show you the
            commitments we have put in writing. These are quoted from our own company profile.
          </p>
        </div>

        <StaggerGroup as="ul" className="mt-14 grid gap-6 lg:grid-cols-3">
          {statements.map((statement) => (
            <StaggerItem
              as="li"
              key={statement.source + statement.quote.slice(0, 20)}
              className="flex h-full flex-col rounded-panel border border-line bg-surface p-7 shadow-subtle transition-all duration-400 ease-out hover:-translate-y-1 hover:shadow-card sm:p-8"
            >
              <Quote className="h-6 w-6 shrink-0 text-teal-400" strokeWidth={1.5} aria-hidden="true" />
              <blockquote className="mt-5 flex-1">
                <p className="font-editorial text-[1.1875rem] leading-[1.6] text-fg">
                  {statement.quote}
                </p>
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4 text-[0.8125rem] uppercase tracking-[0.12em] text-fg-subtle">
                {company.name} — {statement.source}
              </figcaption>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* ---------------------------------------------------- who we serve */}
        <Reveal delay={0.08}>
          <div className="mt-14 rounded-panel border border-line bg-surface p-8 sm:p-10">
            <p className="label-quiet">Who we serve</p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {audiences.map((audience) => (
                <li
                  key={audience}
                  className="rounded-full border border-line bg-surface-2 px-4 py-2 text-[0.875rem] font-medium text-fg-muted transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                >
                  {audience}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
