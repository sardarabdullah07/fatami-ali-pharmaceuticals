import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Give up looking for a hash target after this long. Deep targets on a cold
 * load keep moving while images below them settle, so this needs headroom.
 */
const BUDGET_MS = 6000
/** How close to the intended offset counts as arrived. */
const TOLERANCE_PX = 12

function navOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
  return (Number.parseInt(raw, 10) || 76) + 16
}

/**
 * Router-aware scrolling.
 *
 * Interior pages are code-split and some section ids (partnerships, for
 * example) appear on more than one page, so a single scroll can land against
 * the outgoing page's layout. This keeps correcting until the target actually
 * sits where it should, then stops.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const id = decodeURIComponent(hash.slice(1))
    const started = performance.now()
    let timer = 0
    let settled = 0
    let firstScrollDone = false
    let cancelled = false

    const tick = () => {
      if (cancelled) return

      const el = document.getElementById(id)
      const elapsed = performance.now() - started

      if (!el) {
        if (elapsed < BUDGET_MS) {
          timer = window.setTimeout(tick, 100)
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' })
        }
        return
      }

      const offset = navOffset()
      const delta = el.getBoundingClientRect().top - offset

      if (Math.abs(delta) <= TOLERANCE_PX) {
        // Two clean readings in a row means the layout has stopped moving.
        settled += 1
        if (settled >= 2 || elapsed >= BUDGET_MS) return
        timer = window.setTimeout(tick, 160)
        return
      }

      settled = 0
      window.scrollTo({
        top: window.scrollY + delta,
        // Animate the first move; correct silently after that.
        behavior: reduced || firstScrollDone ? 'auto' : 'smooth',
      })
      firstScrollDone = true

      if (elapsed < BUDGET_MS) timer = window.setTimeout(tick, 180)
    }

    tick()
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [pathname, hash, reduced])

  return null
}
