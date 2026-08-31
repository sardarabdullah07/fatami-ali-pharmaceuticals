import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

/**
 * The standalone target collapses the whole site into one HTML file that can
 * be handed to someone without a server behind it. Code splitting is the one
 * thing that cannot survive that, since a lazy route would ask for a chunk
 * file that no longer exists beside it.
 */
const standalone = process.env.STANDALONE === '1'

/**
 * GitHub Pages serves a project repository from `/<repo>/`, not from the
 * domain root. `BASE_PATH` carries that prefix through to the router and to
 * `scripts/rebase-assets.mjs`, which fixes up the photograph URLs. On a real
 * domain — or a custom domain on Pages — leave it unset.
 */
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome100',
    outDir: standalone ? 'dist-standalone' : 'dist',
    // The site is three routes and a lot of imagery; a 700kB warning would
    // only be noise. Real budgets are enforced by the chunking below.
    chunkSizeWarningLimit: standalone ? 4000 : 900,
    rollupOptions: {
      output: standalone
        ? { inlineDynamicImports: true }
        : {
            /**
             * React, the router and the motion library each change on their own
             * release cadence, so they cache independently of the site's own code.
             *
             * This is matched on the resolved path rather than declared as
             * `{ vendor: ['react'] }` — react-router-dom imports React, and with
             * the object form Rollup hoists React into whichever chunk reaches it
             * first, leaving `vendor` empty.
             */
            manualChunks(id) {
              if (!id.includes('node_modules')) return
              if (/[\\/]node_modules[\\/]framer-motion|motion-dom|motion-utils/.test(id))
                return 'motion'
              if (/[\\/]node_modules[\\/](react-router|react-router-dom|@remix-run)[\\/]/.test(id))
                return 'router'
              if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'vendor'
              return 'shared'
            },
          },
    },
  },
  server: {
    port: 5173,
    strictPort: false,
  },
  preview: {
    port: 5199,
    strictPort: false,
  },
})
