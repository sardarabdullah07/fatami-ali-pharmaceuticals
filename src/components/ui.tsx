import { Link } from 'react-router-dom'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { AnimatedBackdrop } from './AnimatedBackdrop'

/* ---------------------------------------------------------------- Buttons */

type Variant = 'primary' | 'secondary' | 'quiet' | 'onDark'

const base =
  'group relative inline-flex select-none items-center justify-center gap-2.5 rounded-full px-7 text-[0.9375rem] font-semibold leading-none transition-all duration-400 ease-out min-h-[52px] cursor-pointer disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  // Navy in light, teal in dark — see --action in index.css.
  primary: 'bg-action text-on-action hover:bg-action-hover hover:shadow-action active:translate-y-px',
  secondary:
    'border border-line-strong bg-surface text-fg hover:border-accent hover:text-accent hover:shadow-card active:translate-y-px',
  quiet: 'px-0 min-h-0 text-accent hover:text-fg',
  // For use inside the deep teal panels, which stay dark in both themes.
  onDark: 'bg-teal-400 text-ink-950 hover:bg-teal-300 active:translate-y-px',
}

export function ButtonLink({
  to,
  href,
  variant = 'primary',
  className,
  children,
  ...rest
}: {
  to?: string
  href?: string
  variant?: Variant
  className?: string
  children: ReactNode
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const classes = cn(base, variants[variant], className)

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  )
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...rest
}: { variant?: Variant } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  )
}

/* ---------------------------------------------------------------- Section */

type Tone = 'page' | 'subtle' | 'inset' | 'deep' | 'aurora'

const tones: Record<Tone, string> = {
  page: 'bg-bg',
  subtle: 'bg-bg-subtle',
  inset: 'bg-bg-inset',
  /** Stays deep navy-teal in both themes — the fixed dark register. */
  deep: 'on-dark bg-ink-900 text-ink-100',
  aurora: 'bg-bg-subtle',
}

export function Section({
  id,
  tone = 'page',
  className,
  children,
}: {
  id?: string
  tone?: Tone
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-section',
        tones[tone],
        tone === 'aurora' && 'overflow-hidden',
        className,
      )}
    >
      {tone === 'aurora' ? <AnimatedBackdrop intensity={0.85} /> : null}
      <div className={tone === 'aurora' ? 'relative' : undefined}>{children}</div>
    </section>
  )
}

/* ------------------------------------------------------------ SectionHead */

export function SectionHead({
  label,
  title,
  intro,
  onDark = false,
  align = 'left',
  className,
}: {
  label: string
  title: ReactNode
  intro?: ReactNode
  onDark?: boolean
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto flex flex-col items-center text-center',
        className,
      )}
    >
      <div className={cn('flex items-center gap-3', align === 'center' && 'justify-center')}>
        <span aria-hidden="true" className="h-1 w-8 rounded-full bg-teal-400" />
        <p className={onDark ? 'font-sans text-label uppercase text-teal-300' : 'label'}>{label}</p>
      </div>

      <h2 className={cn('mt-5 text-display-lg', onDark ? 'text-white' : 'text-fg')}>{title}</h2>

      {intro ? (
        <p
          className={cn(
            'mt-5 text-lead text-pretty',
            align === 'center' ? 'mx-auto max-w-measure' : 'max-w-measure',
            onDark ? 'text-ink-200' : 'text-fg-muted',
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  )
}

/* ----------------------------------------------------------------- Pieces */

/** A numbered marker. Used only where the content is a genuine sequence. */
export function Index({ value, onDark = false }: { value: string; onDark?: boolean }) {
  return (
    <span
      className={cn(
        'nums font-display text-[0.8125rem] font-bold tracking-wide',
        onDark ? 'text-teal-300' : 'text-accent',
      )}
    >
      {value}
    </span>
  )
}

/** Small pill used for categories and scopes. */
export function Chip({
  children,
  tone = 'default',
}: {
  children: ReactNode
  tone?: 'default' | 'accent' | 'onDark'
}) {
  const styles = {
    default: 'border-line bg-surface text-fg-muted',
    accent: 'border-accent/30 bg-accent-soft text-accent',
    onDark: 'border-white/20 bg-white/10 text-ink-100',
  } as const

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-medium',
        styles[tone],
      )}
    >
      {children}
    </span>
  )
}

/**
 * The site's standard content card. Lifts on hover, adapts to both themes,
 * and never becomes glass — glass is reserved for the few places where
 * something is genuinely behind the panel.
 */
export function Card({
  as: Tag = 'div',
  className,
  children,
  interactive = false,
}: {
  as?: 'div' | 'li' | 'article'
  className?: string
  children: ReactNode
  interactive?: boolean
}) {
  return (
    <Tag
      className={cn(
        'rounded-panel border border-line bg-surface shadow-subtle transition-all duration-400 ease-out',
        interactive && 'hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
