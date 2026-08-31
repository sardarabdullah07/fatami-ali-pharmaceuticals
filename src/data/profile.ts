/**
 * The rest of the company profile (129.pdf) — the narrative sections, the
 * market context and the photographic record of the company's own premises.
 *
 * Same rule as `company.ts`: every fact here is taken from the profile or
 * from photographs supplied by the company. Nothing is invented. No
 * certification, award, client, hospital, headcount or revenue figure is
 * stated anywhere on this site, because the profile documents none.
 */

/* ------------------------------------------------------------------ *
 * CEO message — condensed from the profile's letter. The wording is the
 * CEO's own; only the sequencing and length are edited.
 * ------------------------------------------------------------------ */

export const ceoMessage = {
  salutation: 'Dear Esteemed Partners,',
  /** The line the whole letter turns on. */
  pullQuote: 'Quality healthcare should never be limited by geography.',
  paragraphs: [
    'It is with great pride and gratitude that I welcome you to Fatami Ali Pharmaceuticals. More than ten years ago, we embarked on a journey with a simple yet ambitious vision: to become a trusted bridge between the world’s leading healthcare innovators and the people of Afghanistan.',
    'What began as a modest pharmaceutical distribution business has evolved into a comprehensive healthcare solutions company, serving hospitals, clinics, pharmacies, healthcare professionals, government institutions, humanitarian organisations and international partners across the country.',
    'Every patient deserves access to safe medicines, advanced medical technologies and dependable healthcare services. Every physician deserves reliable products that support better clinical outcomes. Every international manufacturer deserves a professional partner capable of protecting their reputation while expanding their presence in Afghanistan.',
    'Today we proudly represent internationally respected pharmaceutical manufacturers while supplying healthcare institutions with advanced medical equipment, interventional cardiology solutions, angiography and angioplasty products, endoscopy systems and consumables, hospital equipment, laboratory technologies and specialised clinical products.',
    'We recognise that true success is measured not solely by financial performance but by the positive impact we create. Every medicine delivered, every catheter supplied, every diagnostic instrument installed and every hospital we support represents another step toward a healthier future.',
  ],
  signOff: 'With sincere appreciation,',
  signature: 'Chief Executive Officer',
  signatureOrg: 'Fatami Ali Pharmaceuticals',
} as const

/* ------------------------------------------------------------------ *
 * Who we are / our promise
 * ------------------------------------------------------------------ */

export const whoWeAre = {
  lead:
    'Fatami Ali Pharmaceuticals is a privately owned Afghan healthcare company specialising in the importation, marketing, distribution and commercialisation of pharmaceutical products, advanced medical equipment and specialised healthcare solutions.',
  paragraphs: [
    'For more than ten years we have worked at the forefront of Afghanistan’s healthcare sector, building partnerships with internationally recognised pharmaceutical manufacturers and medical technology companies. Through these partnerships we provide healthcare institutions across the country with reliable medicines, innovative clinical technologies and high-quality medical consumables.',
    'Beyond pharmaceuticals, we have developed extensive expertise in the supply of sophisticated medical technologies — angiography systems, angioplasty devices, interventional cardiology products, endoscopy equipment and consumables, hospital equipment, laboratory technologies, intensive care solutions and surgical instruments.',
    'We believe our role extends beyond product distribution. We act as a strategic partner: helping manufacturers establish sustainable market presence, supporting healthcare providers with dependable products and services, and contributing to the advancement of healthcare throughout Afghanistan.',
  ],
  closing:
    'We do not simply deliver products — we deliver confidence, reliability and lasting partnerships that support better healthcare outcomes.',
} as const

export const promise =
  'Every partnership begins with trust and is sustained by performance. We are committed to providing our partners and customers with genuine products, dependable service, ethical business practices and long-term collaboration. By combining international quality standards with local expertise, we strive to be the partner of choice for companies seeking to make a meaningful contribution to Afghanistan’s healthcare sector.'

/* ------------------------------------------------------------------ *
 * The journey narrative
 * ------------------------------------------------------------------ */

export const journeyIntro = {
  heading: 'A decade of growth, partnership and commitment',
  paragraphs: [
    'More than ten years ago, Fatami Ali Pharmaceuticals was established with a clear purpose — to bridge the gap between internationally recognised healthcare manufacturers and the growing needs of Afghanistan’s healthcare sector.',
    'Our journey began with pharmaceutical importation and distribution. Understanding that modern healthcare requires much more than pharmaceuticals alone, we strategically expanded into advanced medical technologies and hospital solutions.',
    'Our journey has never been measured simply by business growth. It has been measured by the relationships we have built, the trust we have earned, and the contribution we continue to make to Afghanistan’s healthcare sector.',
  ],
} as const

/* ------------------------------------------------------------------ *
 * The market, as described in the profile
 * ------------------------------------------------------------------ */

export const market = {
  lead:
    'Afghanistan is one of the most promising frontier healthcare markets in Asia. With a young and growing population, increasing demand for quality healthcare services and continuous investment in medical infrastructure, the country offers significant opportunities for international pharmaceutical and medical technology companies seeking sustainable long-term growth.',
  population: 'Approximately 42 million people',
  facilities:
    'A nationwide network of public, provincial, district and private hospitals, specialty centres, clinics, diagnostic laboratories and community health facilities.',
  closing:
    'For companies seeking sustainable market entry, Afghanistan is not merely an emerging market — it is a market where trusted partnerships, technical expertise and long-term commitment create lasting competitive advantage.',
} as const

/* ------------------------------------------------------------------ *
 * Healthcare impact themes
 * ------------------------------------------------------------------ */

export const impactThemes = [
  {
    title: 'Access to quality medicines',
    body: 'Ensuring that high-quality, safe and effective medicines reach healthcare professionals and patients throughout Afghanistan.',
  },
  {
    title: 'Advanced medical technologies',
    body: 'Introducing minimally invasive technologies, diagnostic systems and next-generation equipment into the Afghan healthcare market.',
  },
  {
    title: 'Stronger healthcare institutions',
    body: 'Supporting hospitals in creating safer, more efficient and technologically advanced environments for patient care.',
  },
  {
    title: 'Reliable supply',
    body: 'Importation, warehousing, inventory management and nationwide distribution that keep products available where they are needed.',
  },
  {
    title: 'International partnerships',
    body: 'Acting as custodians of our partners’ reputations while expanding their presence across the country.',
  },
  {
    title: 'Patient-focused solutions',
    body: 'Every solution is guided by clinical excellence, operational reliability, patient safety and long-term value.',
  },
] as const

/* ------------------------------------------------------------------ *
 * Our approach to healthcare solutions
 * ------------------------------------------------------------------ */

export const approach = {
  lead:
    'We believe healthcare providers deserve more than products — they deserve dependable partnerships.',
  body:
    'Every solution we recommend is guided by a commitment to clinical excellence, operational reliability, patient safety and long-term value. Our philosophy is based on understanding each institution’s unique needs and delivering solutions that contribute to stronger healthcare systems across Afghanistan.',
  closing: 'To improve healthcare through quality, innovation, integrity and trusted partnerships.',
} as const

/* ------------------------------------------------------------------ *
 * Gallery — photographs of the company's own premises and operations in
 * Khair Khana, Kabul. Nothing in this list is stock imagery.
 * ------------------------------------------------------------------ */

export type GalleryGroup = 'Premises' | 'Distribution' | 'Partners'

export type GalleryItem = {
  id: string
  src: string
  thumb: string
  alt: string
  caption: string
  group: GalleryGroup
  /** Portrait plates take a taller cell in the grid. */
  tall?: boolean
}

export const galleryGroups: readonly GalleryGroup[] = ['Premises', 'Distribution', 'Partners']

export const gallery: readonly GalleryItem[] = [
  {
    id: 'office-signage',
    src: '/assets/gallery/office-signage.webp',
    thumb: '/assets/gallery/office-signage-800.webp',
    alt: 'The Fatima Ali Trading Company caduceus mark and wordmark, in English and Dari, illuminated on the panelled wall of the company office beside product display shelving',
    caption: 'The company mark in the Khair Khana office',
    group: 'Premises',
  },
  {
    id: 'partner-office-yug',
    src: '/assets/gallery/partner-office-yug.webp',
    thumb: '/assets/gallery/partner-office-yug-800.webp',
    alt: 'A reception area carrying the Yug Enterprises Pvt Ltd mark, with display shelving and a desk',
    caption: 'Yug Enterprises — partner offices',
    group: 'Partners',
  },
  {
    id: 'storefront',
    src: '/assets/gallery/storefront.webp',
    thumb: '/assets/gallery/storefront-800.webp',
    alt: 'The exterior of the Fatami Ali Pharmaceuticals premises in Kabul, with Beximco Pharma and Yug Enterprises branding on the glazing',
    caption: 'Premises frontage, Rahman Center',
    group: 'Premises',
  },
  {
    id: 'banner-beximco-yug',
    src: '/assets/gallery/banner-beximco-yug.webp',
    thumb: '/assets/gallery/banner-beximco-yug-800.webp',
    alt: 'A Fatima Ali Trading Company roll-up banner carrying the Beximco Pharma and Yug Enterprises marks alongside the company contact details',
    caption: 'Beximco and Yug partnership banner',
    group: 'Partners',
    tall: true,
  },
  {
    id: 'distribution-floor',
    src: '/assets/gallery/distribution-floor.webp',
    thumb: '/assets/gallery/distribution-floor-800.webp',
    alt: 'The distribution floor with staff at the counter and floor-to-ceiling shelving stocked with pharmaceutical cartons',
    caption: 'The distribution floor',
    group: 'Distribution',
  },
  {
    id: 'order-fulfilment',
    src: '/assets/gallery/order-fulfilment.webp',
    thumb: '/assets/gallery/order-fulfilment-800.webp',
    alt: 'Two members of staff assembling an order from stacked pharmaceutical cartons at the counter',
    caption: 'Assembling an order',
    group: 'Distribution',
  },
  {
    id: 'banner-goodman-novatek',
    src: '/assets/gallery/banner-goodman-novatek.webp',
    thumb: '/assets/gallery/banner-goodman-novatek-800.webp',
    alt: 'A Fatima Ali Trading Company roll-up banner presenting the Goodman and Novatek ranges with photographs of the products carried',
    caption: 'Goodman and Novatek product banner',
    group: 'Partners',
    tall: true,
  },
  {
    id: 'shelving-aisle',
    src: '/assets/gallery/shelving-aisle.webp',
    thumb: '/assets/gallery/shelving-aisle-800.webp',
    alt: 'A deep aisle of shelving stocked with pharmaceutical products across the full height of the wall',
    caption: 'Inventory held on site',
    group: 'Distribution',
  },
  {
    id: 'storefront-entrance',
    src: '/assets/gallery/storefront-entrance.webp',
    thumb: '/assets/gallery/storefront-entrance-800.webp',
    alt: 'The entrance to the Fatami Ali Pharmaceuticals distribution premises, with partner branding and company contact details displayed',
    caption: 'Entrance and partner branding',
    group: 'Premises',
  },
  {
    id: 'inventory-cartons',
    src: '/assets/gallery/inventory-cartons.webp',
    thumb: '/assets/gallery/inventory-cartons-800.webp',
    alt: 'A member of staff checking cartons of metformin sustained-release tablets against stocked shelving',
    caption: 'Stock check against the shelf',
    group: 'Distribution',
  },
  {
    id: 'warehouse-interior',
    src: '/assets/gallery/warehouse-interior.webp',
    thumb: '/assets/gallery/warehouse-interior-800.webp',
    alt: 'A wide view of the distribution interior, with staff at the counter and shelving stocked to the ceiling on every wall',
    caption: 'The counter, looking toward the street',
    group: 'Distribution',
  },
  {
    id: 'order-desk',
    src: '/assets/gallery/order-desk.webp',
    thumb: '/assets/gallery/order-desk-800.webp',
    alt: 'Staff working at the order desk beside the window, recording an order against stocked shelving',
    caption: 'Order desk',
    group: 'Distribution',
  },
  {
    id: 'wholesale-partner',
    src: '/assets/gallery/wholesale-partner.webp',
    thumb: '/assets/gallery/wholesale-partner-800.webp',
    alt: 'The premises of Sohail Homan Medicine Whole Seller in Kabul, stocked floor to ceiling, with a Yug Enterprises banner inside the entrance',
    caption: 'Sohail Homan Medicine Whole Seller, Kabul',
    group: 'Partners',
  },
]

/* ------------------------------------------------------------------ *
 * Medical technology showcase — the capability areas named in the
 * profile, paired with the imagery held in the project.
 * ------------------------------------------------------------------ */

export type TechArea = {
  id: string
  title: string
  body: string
  image: string
  imageAlt: string
}

export const techAreas: readonly TechArea[] = [
  {
    id: 'cath-lab',
    title: 'Cath Lab & Interventional Cardiology',
    body: 'Guidewires, balloon and drug-coated balloon technologies, diagnostic and guiding catheters, introducer sheaths, inflation devices and disposable cath lab consumables.',
    image: '/assets/technology/cathlab-portfolio-cut.webp',
    imageAlt:
      'Cath lab portfolio including angiography kits, guidewires, catheters and introducer sheaths',
  },
  {
    id: 'angiography',
    title: 'Angiography',
    body: 'Diagnostic, coronary and peripheral angiography, neurovascular imaging support, vascular imaging accessories and contrast delivery solutions.',
    image: '/assets/technology/vascular-access-cut.webp',
    imageAlt: 'Vascular access devices, manifolds and contrast management accessories',
  },
  {
    id: 'endoscopy-systems',
    title: 'Endoscopy Systems',
    body: 'Flexible endoscopy systems, towers, video processors, light sources, gastroscopes and colonoscopes, subject to partner portfolio.',
    image: '/assets/technology/endoscopy-system-cut.webp',
    imageAlt: 'Endoscopy system components and disposable accessories',
  },
  {
    id: 'endoscopy-consumables',
    title: 'Endoscopy Consumables',
    body: 'Disposable biopsy forceps, polypectomy snares, injection needles, retrieval baskets, cytology brushes, hemostatic clips and irrigation accessories.',
    image: '/assets/technology/endoscopy-accessories-cut.webp',
    imageAlt: 'Disposable endoscopic accessories including snares, forceps and retrieval baskets',
  },
  {
    id: 'hospital-equipment',
    title: 'Hospital Equipment',
    body: 'ICU and operating theatre equipment, patient monitoring systems, infusion technologies, sterilisation equipment, hospital furniture and emergency care equipment.',
    image: '/assets/editorial/hospital-equipment.webp',
    imageAlt: 'Hospital equipment including patient monitoring and infusion technologies',
  },
  {
    id: 'laboratory',
    title: 'Laboratory Technologies',
    body: 'Laboratory equipment and diagnostic devices supporting the expansion of diagnostic services across Afghan healthcare institutions.',
    image: '/assets/editorial/laboratory.webp',
    imageAlt: 'Laboratory equipment and diagnostic glassware',
  },
  {
    id: 'diagnostics',
    title: 'Diagnostic Devices',
    body: 'Diagnostic devices and biomedical accessories supplied to public hospitals, private providers, specialised centres and humanitarian organisations.',
    image: '/assets/editorial/critical-care.webp',
    imageAlt: 'Critical care and diagnostic devices in a hospital setting',
  },
  {
    id: 'surgical',
    title: 'Surgical Instruments',
    body: 'Surgical instruments and infection prevention solutions supporting operating theatres and specialised surgical practice.',
    image: '/assets/editorial/surgical-instruments.webp',
    imageAlt: 'Surgical instruments laid out on a sterile field',
  },
]
