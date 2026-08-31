import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { AnimatedBackdrop } from '@/components/AnimatedBackdrop'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

/** Shared masthead for the interior pages. */
export function PageHeader({
  label,
  title,
  intro,
  breadcrumb,
  children,
}: {
  label: string
  title: ReactNode
  intro: ReactNode
  breadcrumb: string
  children?: ReactNode
}) {
  const reduced = usePrefersReducedMotion()

  const rise = (delay: number) =>
    reduced
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <header className="relative isolate overflow-hidden bg-bg-subtle pb-16 pt-[calc(var(--nav-h)+4rem)] lg:pb-24 lg:pt-[calc(var(--nav-h)+6.5rem)]">
      <AnimatedBackdrop intensity={0.9} />
      <div
        aria-hidden="true"
        className="grid-fine pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(72%_60%_at_50%_0%,#000,transparent)]"
      />

      <div className="container relative">
        <motion.nav {...rise(0)} aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.18em] text-fg-subtle">
            <li>
              <Link to="/" className="transition-colors hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3 w-3" />
            </li>
            <li aria-current="page" className="text-fg-muted">
              {breadcrumb}
            </li>
          </ol>
        </motion.nav>

        <motion.p {...rise(0.08)} className="label mt-10">
          {label}
        </motion.p>
        <motion.span {...rise(0.14)} className="rule-accent mt-5" aria-hidden="true" />
        <motion.h1 {...rise(0.2)} className="mt-7 max-w-4xl text-display-xl text-balance text-fg">
          {title}
        </motion.h1>
        <motion.p {...rise(0.3)} className="mt-7 max-w-2xl text-pretty text-lead text-fg-muted">
          {intro}
        </motion.p>

        {children ? <motion.div {...rise(0.4)}>{children}</motion.div> : null}
      </div>
    </header>
  )
}
