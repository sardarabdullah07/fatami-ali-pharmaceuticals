import { ArrowRight, Mail, Phone } from 'lucide-react'
import { ButtonLink } from '@/components/ui'
import { Reveal } from '@/components/motion'
import { contact } from '@/data/company'

const invited = [
  'Pharmaceutical manufacturers',
  'Medical device companies',
  'Healthcare organisations',
  'Hospitals',
  'Healthcare professionals',
  'International partners',
]

/**
 * The closing panel. Navy in both themes, so the page ends on the brand's
 * corporate register rather than fading out on white.
 */
export function FinalCTA() {
  return (
    <section
      id="start"
      className="on-dark relative overflow-hidden bg-ink-900 py-section"
      aria-labelledby="final-cta-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(50% 55% at 78% 6%, #3CB49C 0%, transparent 62%), radial-gradient(45% 50% at 8% 96%, #006F68 0%, transparent 66%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(70% 60% at 50% 40%, #000, transparent)',
          WebkitMaskImage: 'radial-gradient(70% 60% at 50% 40%, #000, transparent)',
        }}
      />

      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <Reveal>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-1 w-8 rounded-full bg-teal-400" />
              <p className="font-sans text-label uppercase text-teal-300">Start a conversation</p>
            </div>

            <h2 id="final-cta-title" className="mt-6 max-w-3xl text-display-xl text-white">
              Building the future of healthcare together
            </h2>

            <p className="mt-6 max-w-measure text-lead text-ink-200">
              We warmly invite pharmaceutical manufacturers, biotechnology companies, medical device
              innovators and healthcare organisations from around the world to join us in shaping
              the future of healthcare in Afghanistan.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink to="/contact" variant="onDark">
                Start a Partnership
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </ButtonLink>

              <a
                href={`mailto:${contact.emails[0]}`}
                className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full border border-white/25 px-7 text-[0.9375rem] font-semibold text-white transition-colors duration-400 hover:border-teal-300 hover:text-teal-200"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {contact.emails[0]}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass-dark rounded-panel p-8">
              <p className="font-sans text-label uppercase text-teal-300">We work with</p>
              <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {invited.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-body-sm text-white">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 border-t border-white/15 pt-4">
                {contact.phones.map((phone) => (
                  <a
                    key={phone.display}
                    href={`tel:${phone.tel}`}
                    className="flex min-h-[44px] items-center gap-3 text-body-sm text-ink-200 transition-colors hover:text-white"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
                    <span className="nums">{phone.display}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
