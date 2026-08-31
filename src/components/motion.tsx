import { motion, useInView, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion'
import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { distance, duration, ease, stagger, viewport, viewportEarly } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

/* ------------------------------------------------------------------ Reveal */

/**
 * Fade with a short rise. The offset is deliberately small so this reads as a
 * fade rather than a slide — the workhorse for almost everything on the site.
 */
export function Reveal({
  children,
  as,
  className,
  delay = 0,
  y = distance.md,
  once = true,
}: {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  y?: number
  once?: boolean
}) {
  const reduced = usePrefersReducedMotion()
  const Tag = (as ?? 'div') as ElementType
  const MotionTag = motion(Tag)

  if (reduced) return <Tag className={className}>{children}</Tag>

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ ...viewport, once }}
      transition={{ duration: duration.md, delay, ease: ease.out }}
    >
      {children}
    </MotionTag>
  )
}

/* ------------------------------------------------------------ TextReveal */

/**
 * Headings fade up as a single block. An earlier version rode each word up
 * from a clipped line box; it drew attention to itself and fought the reading,
 * so it is now the same restrained fade as everything else, just a touch
 * slower and with a slightly longer travel.
 */
export function TextReveal({
  text,
  as,
  className,
  delay = 0,
}: {
  text: string
  as?: ElementType
  className?: string
  delay?: number
}) {
  const reduced = usePrefersReducedMotion()
  const Tag = (as ?? 'span') as ElementType
  const MotionTag = motion(Tag)

  if (reduced) return <Tag className={className}>{text}</Tag>

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: distance.lg }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: duration.lg, delay, ease: ease.out }}
    >
      {text}
    </MotionTag>
  )
}

/* ----------------------------------------------------------- ImageReveal */

/**
 * A figure that wipes open while its contents settle back from a slight
 * over-scale. Both halves are compositor-friendly.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
  from = 'bottom',
}: {
  children: ReactNode
  className?: string
  delay?: number
  from?: 'bottom' | 'left'
}) {
  const reduced = usePrefersReducedMotion()

  if (reduced) return <div className={cn('overflow-hidden', className)}>{children}</div>

  const closed = from === 'bottom' ? 'inset(0% 0% 100% 0%)' : 'inset(0% 100% 0% 0%)'

  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      initial={{ clipPath: closed }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={viewportEarly}
      transition={{ duration: duration.xl, delay, ease: ease.soft }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={viewportEarly}
        transition={{ duration: duration.xl + 0.2, delay, ease: ease.soft }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/* ---------------------------------------------------------- Stagger group */

export function StaggerGroup({
  children,
  className,
  as,
  step = stagger.normal,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  as?: ElementType
  step?: number
  delay?: number
}) {
  const reduced = usePrefersReducedMotion()
  const Tag = (as ?? 'div') as ElementType
  const MotionTag = motion(Tag)

  if (reduced) return <Tag className={className}>{children}</Tag>

  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: step, delayChildren: delay } },
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </MotionTag>
  )
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: distance.md },
  show: { opacity: 1, y: 0, transition: { duration: duration.md, ease: ease.out } },
}

export function StaggerItem({
  children,
  className,
  as,
}: {
  children: ReactNode
  className?: string
  as?: ElementType
}) {
  const reduced = usePrefersReducedMotion()
  const Tag = (as ?? 'div') as ElementType
  const MotionTag = motion(Tag)

  if (reduced) return <Tag className={className}>{children}</Tag>

  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  )
}

/* --------------------------------------------------------------- Counter */

/**
 * Counts a figure up on entry. Only the numeric part animates, so a value
 * like "10+" never reads as a different number on the way past.
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = usePrefersReducedMotion()
  const inView = useInView(ref, { once: true, margin: '0px 0px -18% 0px' })
  const [shown, setShown] = useState(0)

  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : value

  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 90, damping: 22, mass: 0.6 })
  const rounded = useTransform(spring, (v) => Math.round(v))

  useEffect(() => {
    if (!match || reduced) return
    if (inView) mv.set(target)
  }, [inView, mv, target, match, reduced])

  useEffect(() => rounded.on('change', (v) => setShown(v as number)), [rounded])

  if (!match || reduced) return <span className={className}>{value}</span>

  return (
    <span ref={ref} className={className}>
      {inView ? shown : 0}
      {suffix}
    </span>
  )
}
