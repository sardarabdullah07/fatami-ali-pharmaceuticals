import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/useTheme'

/**
 * The caduceus mark exactly as the company draws it on its signage and
 * letterhead. The teal cut-out carries the light theme; the white cut-out is
 * used on the deep teal ground and anywhere the mark sits on a photograph.
 */
export function Logo({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  const { theme } = useTheme()
  const white = onDark || theme === 'dark'

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <img
        src={white ? '/assets/brand/logo-mark-white.webp' : '/assets/brand/logo-mark.webp'}
        alt=""
        width={44}
        height={30}
        className="h-9 w-auto shrink-0"
        loading="eager"
        decoding="async"
      />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            'font-display text-[1.0625rem] font-bold tracking-[-0.02em]',
            onDark ? 'text-white' : 'text-fg',
          )}
        >
          Fatami Ali
        </span>
        <span
          className={cn(
            'mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.18em]',
            onDark ? 'text-teal-300' : 'text-accent',
          )}
        >
          Pharmaceuticals
        </span>
      </span>
    </span>
  )
}
