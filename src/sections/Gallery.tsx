import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { Section, SectionHead } from '@/components/ui'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion'
import { gallery, galleryGroups, type GalleryGroup } from '@/data/profile'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type Filter = 'All' | GalleryGroup

const filters: Filter[] = ['All', ...galleryGroups]

/**
 * Every photograph here is of the company's own premises, staff, inventory or
 * printed material in Kabul. No stock imagery appears in the gallery.
 */
export function Gallery() {
  const [filter, setFilter] = useState<Filter>('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const reduced = usePrefersReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const items = useMemo(
    () => (filter === 'All' ? gallery : gallery.filter((g) => g.group === filter)),
    [filter],
  )

  const close = useCallback(() => {
    setOpenIndex(null)
    returnFocusRef.current?.focus()
  }, [])

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current
        return (current + delta + items.length) % items.length
      })
    },
    [items.length],
  )

  // Lightbox keyboard handling: Escape closes, arrows page, Tab is trapped
  // between the three controls so focus cannot escape behind the overlay.
  useEffect(() => {
    if (openIndex === null) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        step(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        step(-1)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    // Move focus into the dialog once it has mounted.
    const raf = window.requestAnimationFrame(() => closeRef.current?.focus())

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.cancelAnimationFrame(raf)
    }
  }, [openIndex, close, step])

  const open = (index: number, trigger: HTMLElement) => {
    returnFocusRef.current = trigger
    setOpenIndex(index)
  }

  const active = openIndex === null ? null : items[openIndex]

  return (
    <Section id="gallery" tone="page">
      <div className="container">
        <SectionHead
          label="Gallery"
          title="The company, photographed"
          intro="Our premises at the Rahman Center in Khair Khana, the distribution floor, and the printed material we take to market. These are our own photographs."
        />

        {/* --------------------------------------------------- the filter */}
        <Reveal delay={0.05}>
          <div
            role="group"
            aria-label="Filter photographs"
            className="mt-10 flex flex-wrap gap-2"
          >
            {filters.map((option) => {
              const isActive = option === filter
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  aria-pressed={isActive}
                  className={cn(
                    'inline-flex min-h-[44px] cursor-pointer items-center rounded-full border px-5 text-[0.875rem] font-semibold transition-all duration-300 ease-out',
                    isActive
                      ? 'border-transparent bg-action text-on-action shadow-subtle'
                      : 'border-line bg-surface text-fg-muted hover:border-accent/40 hover:text-accent',
                  )}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* ---------------------------------------------------- the grid */}
        <StaggerGroup
          as="ul"
          key={filter}
          step={0.045}
          className="mt-8 grid auto-rows-[minmax(0,1fr)] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {items.map((item, index) => (
            <StaggerItem
              as="li"
              key={item.id}
              className={cn(item.tall && 'row-span-2')}
            >
              <button
                type="button"
                onClick={(e) => open(index, e.currentTarget)}
                aria-label={`Open photograph: ${item.caption}`}
                className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-panel border border-line bg-bg-inset shadow-subtle transition-all duration-400 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift"
              >
                <img
                  src={item.thumb}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    'photo-dim w-full object-cover transition-transform duration-600 ease-soft group-hover:scale-[1.06]',
                    item.tall ? 'aspect-[3/4] sm:h-full' : 'aspect-[4/3]',
                  )}
                />

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 p-4 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                >
                  <span className="text-left text-[0.8125rem] font-medium leading-snug text-white">
                    {item.caption}
                  </span>
                  <Expand className="h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
                </span>
              </button>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      {/* --------------------------------------------------- the lightbox */}
      <AnimatePresence>
        {active ? (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={close}
            className="on-dark fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-sm sm:p-8"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close photograph"
              className="absolute right-4 top-4 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors duration-300 hover:bg-white/20 sm:right-8 sm:top-8"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    step(-1)
                  }}
                  aria-label="Previous photograph"
                  className="absolute left-3 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors duration-300 hover:bg-white/20 sm:left-8"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    step(1)
                  }}
                  aria-label="Next photograph"
                  className="absolute right-3 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors duration-300 hover:bg-white/20 sm:right-8"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            ) : null}

            <motion.figure
              key={active.id}
              initial={reduced ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduced ? 0 : 0.34, ease: [0.22, 0.61, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full w-full max-w-4xl overflow-hidden"
            >
              <img
                src={active.src}
                alt={active.alt}
                className="mx-auto max-h-[72vh] w-auto max-w-full rounded-panel object-contain shadow-lift"
              />
              <figcaption className="mx-auto mt-5 max-w-2xl text-center">
                <p className="text-[0.9375rem] font-semibold text-white">{active.caption}</p>
                <p className="mt-1.5 text-[0.8125rem] text-ink-300">
                  {active.group} · {(openIndex ?? 0) + 1} of {items.length}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Section>
  )
}
