import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react'
import { company, partners } from '@/data/company'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

/**
 * The hero is a deep navy-teal panel in both themes — the brand's own dark
 * register, lit from the top right by the logo's turquoise.
 *
 * What it opens on is the thing that is actually distinctive about this
 * company: its own office in Khair Khana, with the caduceus mark on the wall.
 * Stock photography of gloved hands would say nothing.
 *
 * The plate carries one glass card — the four exclusive distribution
 * agreements — because that is the single fact a manufacturer is scanning for.
 */
export function Hero() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const plateY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  const rise = (delay: number) =>
    reduced
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] as const },
        }

  return (
    <section
      ref={ref}
      className="on-dark relative overflow-hidden bg-ink-950 pt-[var(--nav-h)]"
      aria-labelledby="hero-title"
    >
      {/* Turquoise lighting from the top right, the mark's cyan-teal from the
          lower left. Both stops are sampled logo colours. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(56% 60% at 82% 4%, rgba(32,184,168,0.30) 0%, transparent 66%), radial-gradient(50% 55% at 2% 92%, rgba(0,138,138,0.24) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="grid-fine-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(75%_70%_at_18%_12%,#000,transparent)]"
      />

      <div className="container relative grid items-center gap-14 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-24">
        {/* ------------------------------------------------------- statement */}
        <div className="max-w-2xl">
          <motion.div {...rise(0.04)} className="flex items-center gap-3">
            <span aria-hidden="true" className="h-1 w-8 rounded-full bg-teal-400" />
            <p className="font-sans text-label uppercase text-teal-300">{company.positioning}</p>
          </motion.div>

          <motion.h1 {...rise(0.1)} id="hero-title" className="mt-6">
            <span className="block font-display text-display-2xl text-white">
              Fatami Ali
              <br />
              Pharmaceuticals
            </span>
            <span className="mt-6 block text-display-sm font-semibold text-teal-300">
              Advancing Healthcare. Building Trust. Transforming Lives.
            </span>
          </motion.h1>

          <motion.p {...rise(0.2)} className="mt-7 max-w-measure text-lead text-ink-100">
            A privately owned Afghan healthcare company. For over a decade we have supplied the
            country’s hospitals, clinics and pharmacies with world-class medicines and advanced
            medical technologies — as the exclusive Afghan partner for internationally recognised
            manufacturers.
          </motion.p>

          <motion.div {...rise(0.28)} className="mt-9 flex flex-wrap items-center gap-4">
            {/* The turquoise button carries deep ink rather than white text:
                white on turquoise reads at 2.5:1, which fails outright. */}
            <Link
              to="/about#products"
              className="group inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-full bg-teal-400 px-7 text-[0.9375rem] font-semibold text-ink-950 transition-all duration-400 ease-out hover:bg-teal-300 active:translate-y-px"
            >
              Explore Our Solutions
              <ArrowRight
                className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-full border border-white/35 bg-white/5 px-7 text-[0.9375rem] font-semibold text-white backdrop-blur-sm transition-all duration-400 ease-out hover:border-teal-300 hover:bg-white/10 active:translate-y-px"
            >
              Partner With Us
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          {/* The four roles the company actually holds, from the profile. */}
          <motion.ul
            {...rise(0.36)}
            className="mt-12 grid grid-cols-1 gap-x-8 gap-y-4 border-t border-white/15 pt-8 sm:grid-cols-2"
          >
            {company.roles.map((role) => (
              <li key={role} className="flex items-start gap-2.5 text-body-sm text-ink-100">
                <span
                  aria-hidden="true"
                  className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400"
                />
                {role}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ----------------------------------------------------------- plate */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduced ? 0 : 0.9, delay: 0.14, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative"
        >
          {/* Portrait on a phone, landscape on a tablet, portrait again beside
              the copy on a desktop. The phone case has to be portrait: below
              `sm` the partner list falls to a single column, and a 5:4 plate is
              then too short to hold it clear of the figure card above. */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-plate border border-white/10 bg-ink-900 shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
            <motion.img
              src="/assets/gallery/office-signage.webp"
              srcSet="/assets/gallery/office-signage-800.webp 800w, /assets/gallery/office-signage.webp 1280w"
              sizes="(min-width: 1024px) 46vw, 92vw"
              alt="The Fatima Ali Trading Company caduceus mark and wordmark illuminated on the panelled wall of the company office in Khair Khana, Kabul, beside product display shelving"
              width={1280}
              height={960}
              decoding="async"
              style={reduced ? undefined : { y: plateY }}
              className="absolute inset-0 h-[110%] w-full object-cover"
            />
            {/* A deep scrim at the foot so the glass card always has contrast
                under it, whatever the photograph is doing there. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950/90 via-ink-950/45 to-transparent"
            />

            <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
              <div className="glass-dark rounded-panel p-5 sm:p-6">
                <p className="text-label uppercase text-teal-300">Exclusive Afghan distributor</p>
                <ul className="mt-4 grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
                  {partners.map((partner) => (
                    <li
                      key={partner.name}
                      className="flex items-start gap-2 text-[0.8125rem] leading-snug text-white"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-teal-300"
                      />
                      {partner.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* One figure, lifted out of the plate onto the panel. */}
          <div className="glass-dark absolute -left-3 -top-5 rounded-panel p-5 sm:-left-6 sm:p-6">
            <p className="nums font-display text-[2.25rem] font-bold leading-none text-teal-300">
              10+
            </p>
            <p className="mt-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white">
              Years in Afghanistan
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-[0.75rem] text-ink-200">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              Khair Khana, Kabul
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
