import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from '@/hooks/useTheme'
import './index.css'

/**
 * Real hosting gets clean paths — /about, /contact — backed by the SPA
 * rewrites in `public/_redirects` and `public/.htaccess`, which answer a deep
 * link with the shell at status 200.
 *
 * The two preview targets have no such rewrite and route on the hash instead:
 *
 *   build:standalone  one HTML file that may be opened from any URL
 *   build:pages       GitHub Pages, which has no rewrite rule at all — it can
 *                     only serve 404.html for an unknown path, and does so
 *                     with a genuine 404 status. That renders, but every deep
 *                     link a client is sent then reports as missing.
 *
 * Section anchors survive it: react-router reads `#/about#products` as
 * pathname `/about`, hash `#products`.
 */
const hashRouting = import.meta.env.VITE_HASH_ROUTER === '1'
const Router = hashRouting ? HashRouter : BrowserRouter

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root was not found in index.html')

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      {/* Under hash routing the mount point lives outside the hash, so the
          route tree is always rooted at "/" no matter where the site is served
          from. Only path routing needs the deployment's base folder. */}
      <Router
        basename={hashRouting ? undefined : import.meta.env.BASE_URL}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </Router>
    </ThemeProvider>
  </StrictMode>,
)
