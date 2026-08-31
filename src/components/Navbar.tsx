import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Four destinations, exactly as the site is structured. Products is a section
 * of the About & Products page rather than a page of its own, so it is linked
 * by hash — the same target from the header, the footer and the hero.
 */
const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/about#products' },
  { label: 'Contact', to: '/contact' },
] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const reduced = usePrefersReducedMotion()
  const toggleRef = useRef<HTMLButtonElement>(null)

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 12)
    if (open) return
    if (y > 520 && y > previous + 4) setHidden(true)
    else if (y < previous - 4) setHidden(false)
  })

  useEffect(() => setOpen(false), [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const isActive = (to: string) => {
    const [path, hash] = to.split('#')
    if (hash) return location.pathname === path && location.hash === `#${hash}`
    // /about is only "current" when no section hash is in play, so About and
    // Products never light up together.
    return location.pathname === path && (path !== '/about' || !location.hash)
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only left-4 top-4 z-[70] rounded-full bg-action px-5 py-3 text-sm font-semibold text-on-action focus:not-sr-only focus:fixed"
      >
        Skip to content
      </a>

      <motion.header
        animate={{ y: hidden && !reduced ? '-100%' : '0%' }}
        transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 0.61, 0.36, 1] }}
        className={cn(
          'glass fixed inset-x-0 top-0 z-50 border-x-0 border-t-0 transition-shadow duration-400',
          scrolled ? '!border-b-line shadow-subtle' : '!border-b-transparent',
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            'container flex items-center justify-between gap-4 transition-[height] duration-400 ease-out',
            scrolled ? 'h-[66px]' : 'h-[var(--nav-h)]',
          )}
        >
          <Link to="/" className="shrink-0 rounded-md" aria-label="Fatami Ali Pharmaceuticals — home">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={cn(
                    'relative rounded-full px-4 py-2.5 text-[0.9375rem] font-medium transition-colors duration-300',
                    isActive(link.to) ? 'text-accent' : 'text-fg hover:text-accent',
                  )}
                >
                  {link.label}
                  {isActive(link.to) ? (
                    <motion.span
                      layoutId="nav-active"
                      transition={
                        reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }
                      }
                      className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-teal-400"
                    />
                  ) : null}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <Link
              to="/contact"
              className="group hidden shrink-0 items-center gap-2 rounded-full bg-action px-6 py-3 text-[0.875rem] font-semibold text-on-action transition-all duration-400 ease-out hover:bg-action-hover hover:shadow-action lg:inline-flex"
            >
              Partner With Us
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative -mr-1.5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-fg transition-colors hover:bg-surface-3 lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden="true" className="relative block h-4 w-6">
                <span
                  className={cn(
                    'absolute left-0 block h-[2px] w-6 rounded bg-current transition-all duration-300 ease-out',
                    open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-1/2 block h-[2px] w-6 -translate-y-1/2 rounded bg-current transition-all duration-200',
                    open ? 'opacity-0' : 'opacity-100',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 block h-[2px] w-6 rounded bg-current transition-all duration-300 ease-out',
                    open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0',
                  )}
                />
              </span>
            </button>
          </div>
        </nav>

        <motion.div
          aria-hidden="true"
          style={reduced ? { scaleX: 0 } : { scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-teal-400"
        />
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-bg lg:hidden"
          >
            <div className="container flex h-full flex-col overflow-y-auto pb-10 pt-[calc(var(--nav-h)+1.5rem)]">
              <ul className="flex flex-col">
                {links.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduced ? 0 : 0.04 + i * 0.04,
                      duration: 0.35,
                      ease: [0.22, 0.61, 0.36, 1],
                    }}
                    className="border-b border-line"
                  >
                    <NavLink
                      to={link.to}
                      className="flex min-h-[64px] items-center justify-between py-4 font-display text-2xl font-bold text-fg"
                    >
                      {link.label}
                      <ArrowRight className="h-5 w-5 text-teal-400" aria-hidden="true" />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <Link
                  to="/contact"
                  className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full bg-action px-6 text-[0.9375rem] font-semibold text-on-action"
                >
                  Partner With Us
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <p className="mt-6 text-center text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
                  Kabul, Afghanistan
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
