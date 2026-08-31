import { PageHeader } from '@/components/PageHeader'
import { CeoMessage } from '@/sections/CeoMessage'
import { WhoWeAre } from '@/sections/WhoWeAre'
import { Journey } from '@/sections/Journey'
import { VisionMissionValues } from '@/sections/VisionMissionValues'
import { Objectives } from '@/sections/Objectives'
import { WhyPartner } from '@/sections/WhyPartner'
import { Leadership } from '@/sections/Leadership'
import { ProductPortfolio } from '@/sections/ProductPortfolio'
import { Partners } from '@/sections/Partners'
import { Divisions } from '@/sections/Divisions'
import { Approach } from '@/sections/Approach'
import { FinalCTA } from '@/sections/FinalCTA'
import { usePageMeta } from '@/hooks/usePageMeta'

/**
 * The jump index. This page is a full corporate profile, so a reader who came
 * for the therapeutic portfolio should not have to scroll past the CEO's
 * letter to reach it.
 */
const contents = [
  { label: 'Leadership message', to: '#ceo' },
  { label: 'Who we are', to: '#who-we-are' },
  { label: 'Our journey', to: '#journey' },
  { label: 'Vision & values', to: '#vision' },
  { label: 'Strategic objectives', to: '#objectives' },
  { label: 'Why partner with us', to: '#why-partner' },
  { label: 'Leadership philosophy', to: '#leadership' },
  { label: 'Products', to: '#products' },
  { label: 'Partners', to: '#partners' },
  { label: 'Divisions', to: '#divisions' },
  { label: 'Our approach', to: '#approach' },
]

export default function About() {
  usePageMeta({
    title: 'About & Products — Fatami Ali Pharmaceuticals',
    description:
      'The complete company profile of Fatami Ali Pharmaceuticals: our journey since 2015, vision and values, therapeutic portfolio across twelve areas, international partners, and our pharmaceutical, medical equipment, cath lab, angiography, endoscopy and hospital solutions divisions.',
    path: '/about',
  })

  return (
    <>
      <PageHeader
        breadcrumb="About & Products"
        label="Company profile"
        title="More than a decade at the intersection of global healthcare innovation and Afghanistan"
        intro="Fatami Ali Pharmaceuticals is a privately owned Afghan healthcare company. This is the full profile: how we started, what we stand for, what we carry, and who we carry it for."
      >
        <nav aria-label="On this page" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {contents.map((item) => (
              <li key={item.to}>
                <a
                  href={item.to}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-surface/70 px-4 py-2 text-[0.8125rem] font-medium text-fg-muted backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <CeoMessage />
      <WhoWeAre tone="subtle" showStoryLink={false} />
      <Journey />
      <VisionMissionValues />
      <Objectives />
      <WhyPartner tone="subtle" />
      <Leadership />
      <ProductPortfolio id="products" tone="page" />
      <Partners />
      <Divisions />
      <Approach />
      <FinalCTA />
    </>
  )
}
