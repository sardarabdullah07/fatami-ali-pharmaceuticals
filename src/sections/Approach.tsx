import { Section } from '@/components/ui'
import { Reveal } from '@/components/motion'
import { approach } from '@/data/profile'

/**
 * The closing statement of the corporate profile, set as a statement: one
 * short line at display size, the argument beneath it, and the mission
 * sentence the profile ends on set apart at the foot.
 */
export function Approach() {
  return (
    <Section id="approach" tone="subtle">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-1 w-8 rounded-full bg-teal-400" />
              <p className="label">Our approach to healthcare solutions</p>
            </div>
            <h2 className="mt-6 text-display-lg text-balance text-fg">{approach.lead}</h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-7 text-lead text-fg-muted">{approach.body}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 border-l-2 border-teal-400 pl-6 sm:pl-8">
              <p className="text-label uppercase text-fg-subtle">Our mission remains the same</p>
              <p className="mt-4 font-editorial text-[1.375rem] leading-snug text-fg sm:text-[1.5rem]">
                {approach.closing}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
