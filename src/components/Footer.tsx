import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { company, contact } from '@/data/company'

const year = new Date().getFullYear()

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/about#products' },
  { label: 'Contact', to: '/contact' },
]

const companyLinks = [
  { label: 'Who We Are', to: '/about#who-we-are' },
  { label: 'Our Journey', to: '/about#journey' },
  { label: 'Our Values', to: '/about#values' },
  { label: 'Our Partners', to: '/about#partners' },
]

const solutionLinks = [
  { label: 'Pharmaceuticals', to: '/about#pharmaceutical-division' },
  { label: 'Medical Equipment', to: '/about#medical-equipment' },
  { label: 'Cath Lab', to: '/about#cath-lab' },
  { label: 'Angiography', to: '/about#angiography' },
  { label: 'Endoscopy', to: '/about#endoscopy' },
  { label: 'Hospital Solutions', to: '/about#hospital-solutions' },
]

function LinkColumn({
  id,
  title,
  items,
}: {
  id: string
  title: string
  items: { label: string; to: string }[]
}) {
  return (
    <nav aria-labelledby={id}>
      <h2 id={id} className="text-label uppercase text-teal-300">
        {title}
      </h2>
      <ul className="mt-3 space-y-1 text-body-sm">
        {items.map((item) => (
          <li key={item.label + item.to}>
            <Link to={item.to} className="link-underline inline-flex min-h-[44px] min-w-[44px] items-center text-ink-200 hover:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * The footer is deep navy-teal in both themes. It closes the page the way the company's
 * own signage does — mark, promise, then the details you would write down.
 */
export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink-950 text-ink-200">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'radial-gradient(55% 50% at 85% 0%, #3CB49C 0%, transparent 68%), radial-gradient(45% 45% at 5% 100%, #006F68 0%, transparent 70%)',
        }}
      />

      <div className="container relative py-16 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <img
              src="/assets/brand/logo-mark-white.webp"
              alt=""
              width={44}
              height={30}
              className="h-11 w-auto"
              loading="lazy"
              decoding="async"
            />
            <p className="mt-5 font-display text-display-sm text-white">{company.name}</p>
            <p className="mt-3 max-w-xs text-body-sm leading-relaxed text-ink-200">
              {company.tagline}
            </p>
            <p className="mt-6 max-w-xs font-editorial text-[1.0625rem] italic leading-relaxed text-teal-200">
              “{company.motto}”
            </p>
          </div>

          <div className="lg:col-span-2">
            <LinkColumn id="footer-navigation" title="Navigation" items={navigation} />
          </div>
          <div className="lg:col-span-2">
            <LinkColumn id="footer-company" title="Company" items={companyLinks} />
          </div>
          <div className="lg:col-span-2">
            <LinkColumn id="footer-solutions" title="Solutions" items={solutionLinks} />
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-label uppercase text-teal-300">Contact</h2>
            <ul className="mt-3 space-y-1 text-body-sm">
              {contact.emails.map((email) => (
                <li key={email} className="flex items-start gap-3">
                  <Mail className="mt-3.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
                  <a
                    href={`mailto:${email}`}
                    className="link-underline inline-flex min-h-[44px] items-center break-all text-ink-200 hover:text-white"
                  >
                    {email}
                  </a>
                </li>
              ))}
              {contact.phones.map((phone) => (
                <li key={phone.display} className="flex items-start gap-3">
                  <Phone className="mt-3.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
                  <a
                    href={`tel:${phone.tel}`}
                    className="link-underline nums inline-flex min-h-[44px] items-center text-ink-200 hover:text-white"
                  >
                    {phone.display}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
                <address className="not-italic leading-relaxed text-ink-200">
                  {contact.address}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink-300">
            © {year} {company.name}. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.16em] text-ink-300">
            {company.legalName} · Kabul, Afghanistan
          </p>
        </div>
      </div>
    </footer>
  )
}
