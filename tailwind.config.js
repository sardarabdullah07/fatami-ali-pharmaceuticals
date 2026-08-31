/**
 * Design tokens for Fatami Ali Pharmaceuticals.
 *
 * The palette is sampled from the company's own caduceus mark: a deep teal,
 * the turquoise that lights it, and the navy-teal it sits on. Nothing here is
 * outside that family — there is no blue, no violet, no magenta anywhere in
 * the system.
 *
 * The `teal` and `ink` ramps are the raw pigment. Everything else is a
 * semantic token backed by a CSS variable in `src/index.css`, so a single
 * class such as `text-fg` resolves correctly in both themes.
 *
 * @type {import('tailwindcss').Config}
 */

/** Semantic token -> `rgb(var(--token) / <alpha>)`, so `/40` opacity works. */
const token = (name) => ({ opacityValue }) =>
  opacityValue === undefined
    ? `rgb(var(--${name}))`
    : `rgb(var(--${name}) / ${opacityValue})`

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' },
    },

    extend: {
      colors: {
        /* ---------------------------------------------------- pigment */

        /** The logo's teal, from the palest wash to the deepest ground. */
        teal: {
          50: '#F0FAF8',
          100: '#D5F3EF',
          200: '#A6E7DD',
          300: '#6ED6C5',
          400: '#3CB49C',
          500: '#17A394',
          600: '#00958C',
          700: '#008A8A',
          800: '#006F68',
          900: '#0A544F',
          950: '#063B38',
        },

        /** The navy-teal neutral. Never a pure grey — every step is tinted. */
        ink: {
          50: '#F1F6F7',
          100: '#E4EDEF',
          200: '#C5D3D8',
          300: '#9FB6BC',
          400: '#6C8A94',
          500: '#4A6E79',
          600: '#345560',
          700: '#24424D',
          800: '#15313B',
          900: '#092B35',
          950: '#061E25',
        },

        /* -------------------------------------------------- semantic */

        bg: {
          DEFAULT: token('bg'),
          subtle: token('bg-subtle'),
          inset: token('bg-inset'),
        },
        surface: {
          DEFAULT: token('surface'),
          2: token('surface-2'),
          3: token('surface-3'),
        },
        fg: {
          DEFAULT: token('fg'),
          muted: token('fg-muted'),
          subtle: token('fg-subtle'),
        },
        line: {
          DEFAULT: token('line'),
          strong: token('line-strong'),
        },
        action: {
          DEFAULT: token('action'),
          hover: token('action-hover'),
        },
        'on-action': token('on-action'),
        accent: {
          DEFAULT: token('accent'),
          soft: token('accent-soft'),
        },
        danger: {
          DEFAULT: token('danger'),
          soft: token('danger-soft'),
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        /** Reserved for pull quotes and the CEO's letter. Nothing else. */
        editorial: ['"Source Serif 4"', 'Georgia', 'Cambria', 'serif'],
      },

      /**
       * Every display size is fluid. The clamps are tuned so a heading never
       * wraps awkwardly at 360px and never runs past the measure at 1440px.
       */
      fontSize: {
        'display-2xl': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.04', letterSpacing: '-0.035em', fontWeight: '800' }],
        'display-xl': ['clamp(2.125rem, 4.6vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-lg': ['clamp(1.875rem, 3.4vw, 2.75rem)', { lineHeight: '1.14', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-md': ['clamp(1.5rem, 2.4vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['clamp(1.25rem, 1.8vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '700' }],
        lead: ['clamp(1.0625rem, 1.25vw, 1.25rem)', { lineHeight: '1.65' }],
        body: ['1.0625rem', { lineHeight: '1.7' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.65' }],
        label: ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '600' }],
      },

      maxWidth: {
        /** ~58 characters — the comfortable reading measure for body copy. */
        measure: '58ch',
      },

      spacing: {
        section: 'clamp(4.5rem, 8vw, 8rem)',
        'section-lg': 'clamp(6rem, 10vw, 10rem)',
      },

      borderRadius: {
        card: '14px',
        panel: '20px',
        /** Large photographic plates. */
        plate: '28px',
      },

      /**
       * Shadows are cast in the ink colour, not black, so they read as depth
       * rather than dirt. `--shadow` collapses to black in dark mode, where a
       * tinted shadow would only muddy the ground.
       */
      boxShadow: {
        subtle: '0 1px 2px rgb(var(--shadow) / 0.04), 0 2px 8px rgb(var(--shadow) / 0.04)',
        card: '0 2px 4px rgb(var(--shadow) / 0.03), 0 12px 28px -12px rgb(var(--shadow) / 0.12)',
        lift: '0 4px 8px rgb(var(--shadow) / 0.04), 0 28px 56px -20px rgb(var(--shadow) / 0.20)',
        /** The glow under a primary button on hover. */
        action: '0 10px 26px -10px rgb(var(--action) / 0.55)',
      },

      transitionDuration: {
        400: '400ms',
        600: '600ms',
      },

      transitionTimingFunction: {
        soft: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      keyframes: {
        /** The route-loading indicator: a slow pulse, not a spinner. */
        'pulse-node': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(2.4)' },
        },
      },

      animation: {
        'pulse-node': 'pulse-node 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
