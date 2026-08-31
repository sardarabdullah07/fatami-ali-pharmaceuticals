import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Section, SectionHead } from '@/components/ui'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion'
import { products, therapeutics } from '@/data/company'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

/**
 * THE THERAPEUTIC TABLE — the site's signature element.
 *
 * The twelve therapeutic areas are set as an element table: a two-letter
 * symbol over a name, on a tile. It is the one device on the site that is
 * specific to pharmaceuticals rather than to corporate websites in general,
 * and it does real work — the table is also the filter. Selecting a tile
 * opens the area's description and the products photographed in it.
 *
 * The symbols are a presentational device drawn from the area names. They are
 * not product codes and are not presented as such.
 */

/** Normalises an area name so "Anti-Infective Therapy" matches "Anti-Infective". */
function areaKey(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/\b(medicine|therapy|health|care)\b/g, '')
    .replace(/[^a-z]/g, '')
}

export function ProductPortfolio({
  id = 'products',
  tone = 'page',
}: {
  id?: string
  /** `subtle` when the section follows a white one. */
  tone?: 'page' | 'subtle'
}) {
  const [selected, setSelected] = useState<string>(therapeutics[0].symbol)
  const reduced = usePrefersReducedMotion()

  const active = therapeutics.find((t) => t.symbol === selected) ?? therapeutics[0]

  const matching = useMemo(
    () => products.filter((p) => areaKey(p.area) === areaKey(active.name)),
    [active.name],
  )

  return (
    <Section id={id} tone={tone}>
      <div className="container">
        <SectionHead
          label="Our products"
          title="Twelve therapeutic areas"
          intro="The pharmaceutical portfolio spans cardiovascular care through preventive healthcare. Select an area to see what it covers and the products photographed from it."
        />

        {/* ------------------------------------------------ the table */}
        <Reveal delay={0.06}>
          <ul
            className="mt-12 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6"
            role="tablist"
            aria-label="Therapeutic areas"
          >
            {therapeutics.map((area) => {
              const isActive = area.symbol === selected
              return (
                <li key={area.symbol}>
                  <button
                    type="button"
                    role="tab"
                    id={`tab-${area.symbol}`}
                    aria-selected={isActive}
                    aria-controls="therapeutic-panel"
                    onClick={() => setSelected(area.symbol)}
                    className={cn(
                      'group relative flex h-full w-full cursor-pointer flex-col items-start rounded-card border p-4 text-left transition-all duration-300 ease-out',
                      isActive
                        ? 'border-accent bg-accent-soft shadow-subtle'
                        : 'border-line bg-surface hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'font-display text-[1.75rem] font-bold leading-none tracking-tight transition-colors duration-300',
                        isActive ? 'text-accent' : 'text-fg-subtle group-hover:text-accent',
                      )}
                    >
                      {area.symbol}
                    </span>
                    <span
                      className={cn(
                        'mt-3 text-[0.8125rem] font-medium leading-snug transition-colors duration-300',
                        isActive ? 'text-fg' : 'text-fg-muted',
                      )}
                    >
                      {area.name}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </Reveal>

        {/* ------------------------------------------------ the panel */}
        <div
          id="therapeutic-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active.symbol}`}
          className="mt-8 overflow-hidden rounded-panel border border-line bg-surface shadow-card"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.symbol}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 0.61, 0.36, 1] }}
              className="grid gap-8 p-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-10"
            >
              <div>
                <div className="flex items-baseline gap-3">
                  <span
                    aria-hidden="true"
                    className="font-display text-[2.5rem] font-bold leading-none text-accent"
                  >
                    {active.symbol}
                  </span>
                  <h3 className="text-display-md text-fg">{active.name}</h3>
                </div>
                <p className="mt-5 max-w-measure text-body leading-relaxed text-fg-muted">
                  {active.description}
                </p>
              </div>

              <div>
                {matching.length > 0 ? (
                  <>
                    <p className="text-label uppercase text-fg-subtle">
                      Products carried in this area
                    </p>
                    <StaggerGroup
                      as="ul"
                      className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                      step={0.05}
                    >
                      {matching.map((product) => (
                        <StaggerItem
                          as="li"
                          key={product.brand}
                          className="group overflow-hidden rounded-card border border-line bg-surface-2 transition-all duration-400 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
                        >
                          <div className="aspect-[4/3] overflow-hidden bg-bg">
                            <img
                              src={product.image}
                              alt={`${product.brand} — ${product.molecule}`}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-contain p-4 transition-transform duration-600 ease-soft group-hover:scale-105"
                            />
                          </div>
                          <div className="border-t border-line p-4">
                            <p className="font-display text-[0.9375rem] font-bold text-fg">
                              {product.brand}
                            </p>
                            <p className="mt-1 text-[0.8125rem] leading-snug text-fg-muted">
                              {product.molecule}
                            </p>
                            {product.partner ? (
                              <p className="mt-2.5 text-[0.75rem] uppercase tracking-[0.1em] text-accent">
                                {product.partner}
                              </p>
                            ) : null}
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerGroup>
                  </>
                ) : (
                  <div className="flex h-full flex-col justify-center rounded-card border border-dashed border-line-strong bg-surface-2 p-7">
                    <p className="text-label uppercase text-fg-subtle">Availability</p>
                    <p className="mt-4 max-w-measure text-body-sm leading-relaxed text-fg-muted">
                      Products in this area are supplied through our international manufacturing
                      partners. We have not photographed the current range here — write to us and we
                      will send the list that applies to your institution.
                    </p>
                    <Link
                      to="/contact"
                      className="group mt-6 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-accent"
                    >
                      Request the portfolio
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-prose text-[0.8125rem] leading-relaxed text-fg-subtle">
            Product photographs are of items carried by the company. Two-letter symbols are a
            presentational device drawn from the area names, not product codes.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
