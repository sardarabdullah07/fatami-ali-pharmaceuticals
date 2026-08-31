/**
 * Motion tokens.
 *
 * Calibrated against the ui-ux-pro-max motion guidance: scroll reveals use an
 * 8–16px offset over 300–450ms so they read as a fade rather than a slide, and
 * parallax stays within a 5–15% delta and never touches body copy.
 *
 * Everything animates transform/opacity only, so it stays on the compositor.
 */

export const ease = {
  /** Default entrance — close to GSAP power2.out. */
  out: [0.22, 0.61, 0.36, 1] as const,
  /** Softer settle for large masses (images, panels). */
  soft: [0.25, 0.46, 0.45, 0.94] as const,
  /** Symmetric, for state changes that go both ways. */
  inOut: [0.65, 0, 0.35, 1] as const,
} as const

export const duration = {
  xs: 0.22,
  sm: 0.34,
  md: 0.44,
  lg: 0.58,
  xl: 0.8,
} as const

/** Reveal offsets. Small on purpose. */
export const distance = {
  sm: 8,
  md: 14,
  lg: 20,
} as const

export const stagger = {
  tight: 0.05,
  normal: 0.07,
  loose: 0.09,
} as const

/** Parallax delta as a percentage — kept inside the 5–15% band. */
export const parallax = {
  subtle: 5,
  normal: 8,
  strong: 12,
} as const

/** Shared viewport trigger — roughly GSAP's `top 88%`. */
export const viewport = { once: true, margin: '0px 0px -10% 0px' } as const

/** Earlier trigger for large elements. */
export const viewportEarly = { once: true, margin: '0px 0px -2% 0px' } as const
