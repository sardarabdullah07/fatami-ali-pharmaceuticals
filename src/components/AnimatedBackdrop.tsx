import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { useTheme } from '@/hooks/useTheme'

/**
 * A slow two-hue wash drawn to canvas.
 *
 * Four soft colour fields drift on independent, non-repeating paths, so the
 * motion reads as slowly shifting light rather than a looping animation.
 * Everything is painted at quarter resolution and scaled up — a gradient has
 * no detail to lose, and it keeps the per-frame cost near zero.
 *
 * Every field is a colour sampled from the company logo. The two themes get
 * different fields, not the same fields at different opacity — in light the
 * wash tints white paper, in dark it lifts the deep navy-teal ground.
 */

type Field = {
  color: [number, number, number]
  /** base position, 0–1 of the canvas */
  x: number
  y: number
  /** drift radius, 0–1 */
  ax: number
  ay: number
  /** periods in seconds — deliberately non-harmonic so paths never re-sync */
  px: number
  py: number
  phase: number
  /** size, relative to the canvas diagonal */
  r: number
  alpha: number
}

/** Light: the logo's turquoise and deep teal, breathed over white paper. */
const LIGHT: Field[] = [
  // teal-400 #3CB49C — the mark's lightest tone
  { color: [60, 180, 156], x: 0.82, y: 0.16, ax: 0.15, ay: 0.13, px: 23.7, py: 31.3, phase: 0.0, r: 0.58, alpha: 0.16 },
  // teal-800 #006F68 — the deep teal
  { color: [0, 111, 104], x: 0.16, y: 0.30, ax: 0.14, ay: 0.16, px: 29.1, py: 19.7, phase: 1.7, r: 0.52, alpha: 0.10 },
  // teal-700 #008A8A — the mark's most common tone
  { color: [0, 138, 138], x: 0.66, y: 0.82, ax: 0.18, ay: 0.12, px: 17.3, py: 26.9, phase: 3.1, r: 0.60, alpha: 0.10 },
  // teal-200 #A6E7DD — a pale wash to keep the field from going flat
  { color: [166, 231, 221], x: 0.28, y: 0.84, ax: 0.15, ay: 0.15, px: 34.9, py: 22.1, phase: 4.6, r: 0.56, alpha: 0.22 },
]

/** Dark: the same tones lifting a deep navy-teal ground. */
const DARK: Field[] = [
  // teal-400 #3CB49C
  { color: [60, 180, 156], x: 0.80, y: 0.18, ax: 0.16, ay: 0.13, px: 23.7, py: 31.3, phase: 0.0, r: 0.56, alpha: 0.15 },
  // teal-700 #008A8A
  { color: [0, 138, 138], x: 0.18, y: 0.28, ax: 0.15, ay: 0.16, px: 29.1, py: 19.7, phase: 1.7, r: 0.54, alpha: 0.24 },
  // teal-800 #006F68
  { color: [0, 111, 104], x: 0.64, y: 0.84, ax: 0.18, ay: 0.12, px: 17.3, py: 26.9, phase: 3.1, r: 0.62, alpha: 0.22 },
  // ink-800 #15313B — deepens the far corner
  { color: [21, 49, 59], x: 0.30, y: 0.82, ax: 0.15, ay: 0.15, px: 34.9, py: 22.1, phase: 4.6, r: 0.58, alpha: 0.32 },
]

export function AnimatedBackdrop({
  className,
  intensity = 1,
}: {
  className?: string
  /** Scales every field's opacity. Lower it behind dense text. */
  intensity?: number
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dark = theme === 'dark'
    const palette = dark ? DARK : LIGHT
    // Painted underneath everything, so the wash never fights the page.
    const base = dark ? '#08242C' : '#FFFFFF'

    // Quarter resolution: a gradient has nothing to lose and this keeps the
    // fill cost trivial even on a phone.
    const SCALE = 0.25
    let raf = 0
    let running = true
    let visible = true
    let last = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(2, Math.round(rect.width * SCALE))
      canvas.height = Math.max(2, Math.round(rect.height * SCALE))
    }

    const draw = (t: number) => {
      const w = canvas.width
      const h = canvas.height
      const diag = Math.hypot(w, h)

      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = base
      ctx.fillRect(0, 0, w, h)

      for (const b of palette) {
        const cx = (b.x + Math.sin(t / b.px + b.phase) * b.ax) * w
        const cy = (b.y + Math.cos(t / b.py + b.phase * 1.3) * b.ay) * h
        // breathe the radius slightly so the fields never look rigid
        const r = diag * b.r * (0.92 + 0.08 * Math.sin(t / (b.px * 1.7) + b.phase))

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        const [cr, cg, cb] = b.color
        const a = b.alpha * intensity
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${a})`)
        g.addColorStop(0.5, `rgba(${cr},${cg},${cb},${a * 0.5})`)
        g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`)
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      }
    }

    const frame = (now: number) => {
      if (!running) return
      // ~30fps is plenty for something this slow, and halves the work.
      if (now - last > 33 && visible) {
        last = now
        draw(now / 1000)
      }
      raf = window.requestAnimationFrame(frame)
    }

    resize()

    if (reduced) {
      // a single representative frame, no loop
      draw(12)
    } else {
      raf = window.requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) draw(12)
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(canvas)

    const onVisibility = () => {
      visible = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      window.cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced, intensity, theme])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    />
  )
}
