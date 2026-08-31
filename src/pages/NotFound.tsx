import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui'
import { AnimatedBackdrop } from '@/components/AnimatedBackdrop'
import { usePageMeta } from '@/hooks/usePageMeta'

const elsewhere = [
  { label: 'About & Products', to: '/about' },
  { label: 'Therapeutic portfolio', to: '/about#products' },
  { label: 'Our divisions', to: '/about#divisions' },
  { label: 'Contact', to: '/contact' },
]

export default function NotFound() {
  usePageMeta({
    title: 'Page not found — Fatami Ali Pharmaceuticals',
    description: 'The page you were looking for is not here. Find our products, divisions and contact details instead.',
    path: '/404',
  })

  return (
    <section className="relative isolate flex min-h-[76vh] items-center overflow-hidden bg-bg-subtle pt-[var(--nav-h)]">
      <AnimatedBackdrop intensity={0.8} />
      <div className="container relative py-20">
        <p className="label">Error 404</p>
        <h1 className="mt-5 max-w-2xl text-display-xl text-fg">This page is not in the catalogue</h1>
        <p className="mt-6 max-w-measure text-lead text-fg-muted">
          The address you followed does not match anything on the site. Everything we publish is one
          of the links below.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <ButtonLink to="/">
            Back to home
            <ArrowRight
              className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </ButtonLink>
        </div>

        <ul className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8">
          {elsewhere.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-surface px-4 py-2 text-[0.875rem] font-medium text-fg-muted transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
