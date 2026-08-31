import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

/**
 * A two-state switch rather than an icon that swaps.
 *
 * The knob slides between the two icons, so the control shows both what is
 * selected and what is available — an icon-swap button only ever shows one of
 * the two, and readers have to guess whether it names the current state or
 * the action.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const reduced = usePrefersReducedMotion()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'group relative inline-flex h-11 w-[72px] shrink-0 cursor-pointer items-center rounded-full border border-line bg-surface-2 p-1 transition-colors duration-400 ease-out hover:border-line-strong',
        className,
      )}
    >
      <motion.span
        aria-hidden="true"
        layout
        initial={false}
        animate={{ x: isDark ? 30 : 0 }}
        transition={
          reduced ? { duration: 0 } : { type: 'spring', stiffness: 480, damping: 34, mass: 0.7 }
        }
        className="absolute h-[34px] w-[34px] rounded-full bg-action shadow-subtle"
      />

      <span className="relative z-10 flex h-[34px] w-[34px] items-center justify-center">
        <Sun
          className={cn(
            'h-[17px] w-[17px] transition-colors duration-300',
            isDark ? 'text-fg-subtle' : 'text-on-action',
          )}
          strokeWidth={2}
          aria-hidden="true"
        />
      </span>
      <span className="relative z-10 ml-[4px] flex h-[34px] w-[34px] items-center justify-center">
        <Moon
          className={cn(
            'h-[16px] w-[16px] transition-colors duration-300',
            isDark ? 'text-on-action' : 'text-fg-subtle',
          )}
          strokeWidth={2}
          aria-hidden="true"
        />
      </span>
    </button>
  )
}
