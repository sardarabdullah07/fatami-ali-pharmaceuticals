import { Hero } from '@/sections/Hero'
import { TrustStrip } from '@/sections/TrustStrip'
import { WhoWeAre } from '@/sections/WhoWeAre'
import { SolutionsGrid } from '@/sections/SolutionsGrid'
import { ProductPortfolio } from '@/sections/ProductPortfolio'
import { MedicalTechnology } from '@/sections/MedicalTechnology'
import { WhyPartner } from '@/sections/WhyPartner'
import { Partners } from '@/sections/Partners'
import { Journey } from '@/sections/Journey'
import { VisionMissionValues } from '@/sections/VisionMissionValues'
import { TrustedPartnerships } from '@/sections/TrustedPartnerships'
import { HealthcareImpact } from '@/sections/HealthcareImpact'
import { Gallery } from '@/sections/Gallery'
import { FinalCTA } from '@/sections/FinalCTA'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function Home() {
  usePageMeta({
    title: 'Fatami Ali Pharmaceuticals — Pharmaceuticals & Medical Technology, Afghanistan',
    description:
      'Fatami Ali Pharmaceuticals imports, markets and distributes pharmaceuticals, advanced medical equipment and specialised healthcare solutions across Afghanistan. Exclusive Afghan distributor for Beximco, Godman, Novatek and Yug Pharmaceuticals.',
    path: '/',
  })

  return (
    <>
      <Hero />
      <TrustStrip />
      <WhoWeAre />
      <SolutionsGrid />
      <ProductPortfolio id="products" tone="page" />
      <MedicalTechnology />
      <WhyPartner />
      <Partners />
      <Journey />
      <VisionMissionValues />
      <TrustedPartnerships />
      <HealthcareImpact />
      <Gallery />
      <FinalCTA />
    </>
  )
}
