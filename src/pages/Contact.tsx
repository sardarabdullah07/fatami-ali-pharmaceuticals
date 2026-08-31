import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { ContactForm } from '@/components/ContactForm'
import { Section, SectionHead } from '@/components/ui'
import { ImageReveal, Reveal, StaggerGroup, StaggerItem } from '@/components/motion'
import { company, contact, inquiryTypes } from '@/data/company'
import { usePageMeta } from '@/hooks/usePageMeta'

const routes = [
  {
    title: 'Pharmaceutical Partnership',
    body: 'Manufacturers seeking an exclusive Afghan distributor, product registration support and market development.',
  },
  {
    title: 'Medical Equipment',
    body: 'Cath lab, angiography, endoscopy, laboratory and hospital equipment enquiries from institutions and suppliers.',
  },
  {
    title: 'Healthcare Solutions',
    body: 'Integrated solutions for hospitals, specialised centres, humanitarian organisations and development partners.',
  },
  {
    title: 'Distribution Partnership',
    body: 'Wholesale, institutional and tender enquiries from across Afghanistan.',
  },
  {
    title: 'General Inquiry',
    body: 'Anything else — we will route your message to the right person.',
  },
]

export default function Contact() {
  usePageMeta({
    title: 'Contact — Fatami Ali Pharmaceuticals, Kabul',
    description:
      'Contact Fatami Ali Pharmaceuticals in Kabul, Afghanistan. Pharmaceutical partnership, medical equipment, healthcare solutions and distribution enquiries from manufacturers, hospitals and healthcare institutions.',
    path: '/contact',
  })

  return (
    <>
      <PageHeader
        breadcrumb="Contact"
        label="Get in touch"
        title="Let’s talk healthcare"
        intro="Whether you manufacture medicines, build medical technology, run a hospital or supply a health system, we would like to hear from you. Every partnership we hold started with a first message."
      />

      {/* ------------------------------------------------- form + details */}
      <Section tone="page">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <Reveal>
              <h2 className="text-display-md text-fg">Send an inquiry</h2>
              <p className="mt-4 max-w-measure text-body text-fg-muted">
                Tell us who you are and what you are looking for. Fields marked{' '}
                <span className="text-accent">*</span> are required.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>

            {/* ------------------------------------------------- details */}
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
              <Reveal delay={0.06}>
                <div className="glass overflow-hidden rounded-panel shadow-card">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src="/assets/gallery/storefront-entrance.webp"
                      srcSet="/assets/gallery/storefront-entrance-800.webp 800w, /assets/gallery/storefront-entrance.webp 1280w"
                      sizes="(min-width: 1024px) 34vw, 92vw"
                      alt="The entrance to the Fatami Ali Pharmaceuticals premises at the Rahman Center, Khair Khana, Kabul"
                      width={1280}
                      height={720}
                      loading="lazy"
                      decoding="async"
                      className="photo-dim h-full w-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950/85 to-transparent"
                    />
                    <p className="glass-dark absolute bottom-4 left-5 inline-flex rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium text-white">
                      Rahman Center, Khair Khana, Kabul
                    </p>
                  </div>

                  <div className="space-y-6 p-7">
                    <div>
                      <p className="label-quiet">Email</p>
                      <ul className="mt-1">
                        {contact.emails.map((email) => (
                          <li key={email}>
                            <a
                              href={`mailto:${email}`}
                              className="group flex min-h-[44px] items-center gap-3 text-body-sm text-fg transition-colors hover:text-accent"
                            >
                              <Mail
                                className="h-4 w-4 shrink-0 text-accent"
                                aria-hidden="true"
                              />
                              <span className="break-all">{email}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-line pt-6">
                      <p className="label-quiet">Phone / WhatsApp</p>
                      <ul className="mt-1">
                        {contact.phones.map((phone) => (
                          <li key={phone.display}>
                            <a
                              href={`tel:${phone.tel}`}
                              className="group flex min-h-[44px] items-center gap-3 text-body-sm text-fg transition-colors hover:text-accent"
                            >
                              <Phone
                                className="h-4 w-4 shrink-0 text-accent"
                                aria-hidden="true"
                              />
                              <span className="nums">{phone.display}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-line pt-6">
                      <p className="label-quiet">Address</p>
                      <div className="mt-3 flex items-start gap-3">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <address className="text-body-sm not-italic leading-relaxed text-fg-muted">
                          Khair Khana, Parwan Hotel, Rahman Center,
                          <br />
                          Third Floor, Office No# F2/08,
                          <br />
                          Kabul, Afghanistan
                        </address>
                      </div>
                    </div>

                    <div className="border-t border-line pt-6">
                      <div className="flex items-start gap-3">
                        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <p className="text-[0.8125rem] leading-relaxed text-fg-subtle">
                          We reply to written enquiries as quickly as we can. For anything urgent,
                          the numbers above reach us directly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="on-dark mt-6 rounded-panel bg-ink-900 p-7">
                  <p className="font-sans text-label uppercase text-teal-300">{company.legalName}</p>
                  <p className="mt-4 font-editorial text-[1.125rem] italic leading-relaxed text-white">
                    “{company.motto}”
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------- what to expect */}
      <Section tone="subtle">
        <div className="container">
          <SectionHead
            label="Inquiry types"
            title="Where your message goes"
            intro="Choosing the right type on the form gets your message to the right desk faster."
          />

          <StaggerGroup as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {routes.map((route, i) => (
              <StaggerItem
                as="li"
                key={route.title}
                className="group rounded-panel border border-line bg-surface p-7 shadow-subtle transition-all duration-400 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
              >
                <span
                  aria-hidden="true"
                  className="nums font-display text-[0.8125rem] font-bold tracking-[0.1em] text-accent"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-display-sm text-fg">{route.title}</h3>
                <p className="mt-3 text-body-sm leading-relaxed text-fg-muted">{route.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.08}>
            <ImageReveal className="mt-14 overflow-hidden rounded-plate shadow-lift">
              <img
                src="/assets/gallery/warehouse-interior.webp"
                srcSet="/assets/gallery/warehouse-interior-800.webp 800w, /assets/gallery/warehouse-interior.webp 1280w"
                sizes="92vw"
                alt="The interior of the Fatami Ali Pharmaceuticals premises in Kabul, with staff at the counter and shelving stocked to the ceiling"
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
                className="photo-dim aspect-[21/9] w-full object-cover"
              />
            </ImageReveal>
          </Reveal>

          <p className="sr-only">
            Inquiry types available on the contact form: {inquiryTypes.join(', ')}.
          </p>
        </div>
      </Section>
    </>
  )
}
