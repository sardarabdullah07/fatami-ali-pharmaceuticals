/**
 * Single source of truth for site content.
 * Every fact here is taken from the company profile (129.pdf).
 * Nothing in this file may be invented — no statistics, certifications,
 * awards or partnerships beyond what the profile documents.
 */

export const company = {
  name: 'Fatami Ali Pharmaceuticals',
  legalName: 'Fatima Ali Trading Company',
  tagline: 'Advancing Healthcare. Building Trust. Transforming Lives.',
  positioning: 'Connecting Global Healthcare Excellence with Afghanistan',
  motto: 'Together, we deliver better healthcare for every community.',
  founded: 2015,
  roles: [
    'Exclusive Distributor',
    'Pharmaceutical Importer',
    'Medical Equipment Supplier',
    'Healthcare Solutions Provider',
  ],
} as const

export const contact = {
  emails: ['Fatima.ali011@outlook.com', 'Zaland1114@gmail.com'],
  /** Displayed exactly as written in the company profile. */
  phones: [
    { display: '0093711855335', tel: '+93711855335' },
    { display: '0093798323380', tel: '+93798323380' },
  ],
  address:
    'Khair Khana, Parwan Hotel, Rahman Center, Third Floor, Office No# F2/08, Kabul, Afghanistan',
  city: 'Kabul, Afghanistan',
} as const

/* ------------------------------------------------------------------ *
 * Trust / positioning
 * ------------------------------------------------------------------ */

export const trustPoints = [
  {
    label: 'Experience',
    value: '10+',
    unit: 'years',
    detail:
      'More than a decade serving Afghanistan’s healthcare sector, since our foundation in 2015.',
  },
  {
    label: 'Exclusive partners',
    value: '4',
    unit: 'manufacturers',
    detail:
      'Exclusive Afghan distribution for Beximco, Godman, Novatek and Yug Pharmaceuticals.',
  },
  {
    label: 'Therapeutic areas',
    value: '12',
    unit: 'specialties',
    detail:
      'A pharmaceutical portfolio spanning cardiovascular care through preventive healthcare.',
  },
  {
    label: 'Divisions',
    value: '6',
    unit: 'capabilities',
    detail:
      'Pharmaceuticals, medical equipment, cath lab, angiography, endoscopy and hospital solutions.',
  },
] as const

/* ------------------------------------------------------------------ *
 * Solutions — six divisions
 * ------------------------------------------------------------------ */

export type Solution = {
  id: string
  index: string
  title: string
  summary: string
  points: readonly string[]
  image: string
  imageAlt: string
}

export const solutions: readonly Solution[] = [
  {
    id: 'pharmaceuticals',
    index: 'D1',
    title: 'Pharmaceuticals',
    summary:
      'The cornerstone of our business: importing, registering and distributing safe, effective medicines for physicians and patients across Afghanistan.',
    points: [
      'Product registration support',
      'Market development and physician engagement',
      'Distribution and inventory planning',
      'Institutional sales and brand building',
    ],
    image: '/assets/products/zerolip-20-cut.webp',
    imageAlt:
      'Zerolip 20, atorvastatin 20 mg tablets from the Fatami Ali Pharmaceuticals cardiovascular portfolio',
  },
  {
    id: 'medical-equipment',
    index: 'D2',
    title: 'Medical Equipment',
    summary:
      'Sophisticated medical equipment, hospital technologies and specialised clinical consumables across multiple medical specialties.',
    points: [
      'Solutions matched to clinical objectives',
      'Procurement and logistics',
      'Technical coordination',
      'Ongoing customer support',
    ],
    image: '/assets/technology/endoscopy-system-cut.webp',
    imageAlt: 'Endoscopy system components and disposable accessories',
  },
  {
    id: 'cardiology',
    index: 'D3',
    title: 'Interventional Cardiology & Cath Lab',
    summary:
      'Advanced products for cardiac catheterisation laboratories, interventional cardiology departments and cardiovascular specialists.',
    points: [
      'Coronary and peripheral guidewires',
      'Balloon and drug-coated balloon technologies',
      'Diagnostic and guiding catheters',
      'Vascular access and procedure kits',
    ],
    image: '/assets/technology/cathlab-portfolio-cut.webp',
    imageAlt:
      'Cath lab product portfolio including angio kits, guidewires, catheters and introducer sheaths',
  },
  {
    id: 'angiography',
    index: 'D4',
    title: 'Angiography',
    summary:
      'Access to advanced angiography technologies and associated accessories for hospitals and cardiac centres.',
    points: [
      'Diagnostic, coronary and peripheral angiography',
      'Neurovascular imaging support',
      'Contrast delivery solutions',
      'Procedure support consumables',
    ],
    image: '/assets/technology/vascular-access-cut.webp',
    imageAlt: 'Vascular access devices, manifolds and contrast management accessories',
  },
  {
    id: 'endoscopy',
    index: 'D5',
    title: 'Endoscopy',
    summary:
      'Modern endoscopy equipment and a comprehensive portfolio of disposable endoscopic accessories supporting minimally invasive practice.',
    points: [
      'Flexible endoscopy systems and towers',
      'Biopsy forceps, snares and retrieval baskets',
      'Hemostatic clips and injection needles',
      'Irrigation and cleaning accessories',
    ],
    image: '/assets/technology/endoscopy-accessories-cut.webp',
    imageAlt: 'Disposable endoscopic accessories including snares, forceps and retrieval baskets',
  },
  {
    id: 'hospital-solutions',
    index: 'D6',
    title: 'Hospital Solutions',
    summary:
      'Integrated healthcare infrastructure for public hospitals, private providers, specialised centres and humanitarian organisations.',
    points: [
      'ICU and operating theatre equipment',
      'Patient monitoring and infusion technologies',
      'Laboratory and diagnostic devices',
      'Sterilisation and infection prevention',
    ],
    image: '/assets/technology/endoscopy-valves-cut.webp',
    imageAlt: 'Hospital consumables including connectors, valves and biomedical accessories',
  },
]

/** Full product lists per division, as documented in the company profile. */
export const divisionPortfolios: Record<string, readonly string[]> = {
  cardiology: [
    'Coronary Guidewires',
    'Peripheral Guidewires',
    'Balloon Catheters',
    'Drug-Coated Balloon Technologies',
    'Diagnostic Catheters',
    'Guiding Catheters',
    'Introducer Sheaths',
    'Inflation Devices',
    'Hemostasis Accessories',
    'Contrast Management Accessories',
    'Coronary Stents*',
    'Peripheral Intervention Products*',
    'Vascular Access Devices',
    'Procedure Kits',
    'Disposable Cath Lab Consumables',
  ],
  angiography: [
    'Diagnostic Angiography',
    'Coronary Angiography',
    'Peripheral Angiography',
    'Neurovascular Imaging Support',
    'Vascular Imaging Accessories',
    'Contrast Delivery Solutions',
    'Procedure Support Consumables',
  ],
  endoscopy: [
    'Flexible Endoscopy Systems',
    'Endoscopy Towers*',
    'Video Processors*',
    'Light Sources*',
    'Gastroscopes*',
    'Colonoscopes*',
    'Disposable Biopsy Forceps',
    'Polypectomy Snares',
    'Injection Needles',
    'Retrieval Baskets',
    'Cytology Brushes',
    'Hemostatic Clips',
    'Cleaning Brushes',
    'Irrigation Accessories',
    'Disposable Valves',
    'Endoscopic Consumables',
  ],
  'hospital-solutions': [
    'Intensive Care Unit (ICU) Equipment',
    'Operating Theatre Equipment',
    'Surgical Instruments',
    'Patient Monitoring Systems',
    'Infusion Technologies',
    'Laboratory Equipment',
    'Diagnostic Devices',
    'Sterilization Equipment',
    'Infection Prevention Solutions',
    'Hospital Furniture',
    'Medical Gas Accessories',
    'Disposable Medical Products',
    'Emergency Care Equipment',
    'Rehabilitation Equipment',
    'Biomedical Accessories',
  ],
  'medical-equipment': [
    'Hospital technologies',
    'Laboratory technologies',
    'Diagnostic equipment',
    'Intensive care solutions',
    'Surgical instruments',
    'Specialised clinical consumables',
  ],
  pharmaceuticals: [
    'Product registration support',
    'Market development',
    'Physician engagement',
    'Distribution management',
    'Inventory planning',
    'Promotional activities',
    'Institutional sales',
    'Long-term brand building',
  ],
}

/** Footnote applying to items marked with an asterisk. */
export const portfolioFootnote =
  'Items marked * are subject to portfolio availability and regulatory approvals.'

/* ------------------------------------------------------------------ *
 * Therapeutic portfolio — 12 areas
 * Two-letter symbols are a presentational device, not product codes.
 * ------------------------------------------------------------------ */

export type Therapeutic = {
  symbol: string
  name: string
  description: string
}

export const therapeutics: readonly Therapeutic[] = [
  {
    symbol: 'Cv',
    name: 'Cardiovascular Medicine',
    description:
      'Innovative therapies supporting the prevention and treatment of cardiovascular diseases, hypertension, heart failure, dyslipidemia, thrombosis and related conditions.',
  },
  {
    symbol: 'Ai',
    name: 'Anti-Infective Therapy',
    description:
      'Broad-spectrum antibiotics, antivirals, antifungal agents and antimicrobial therapies for hospital and outpatient settings.',
  },
  {
    symbol: 'De',
    name: 'Diabetes & Endocrinology',
    description:
      'Modern treatments for diabetes management, endocrine disorders, metabolic diseases and associated complications.',
  },
  {
    symbol: 'Ga',
    name: 'Gastroenterology',
    description:
      'Products supporting gastrointestinal health, liver disorders, acid-related diseases, inflammatory bowel conditions and digestive care.',
  },
  {
    symbol: 'Re',
    name: 'Respiratory Medicine',
    description:
      'Solutions for asthma, COPD, allergic diseases, respiratory infections and pulmonary care.',
  },
  {
    symbol: 'Ne',
    name: 'Neurology',
    description:
      'Medicines supporting neurological disorders, epilepsy, neuropathic pain and central nervous system conditions.',
  },
  {
    symbol: 'Pe',
    name: 'Pediatrics',
    description:
      'Age-appropriate formulations developed to improve healthcare outcomes for children.',
  },
  {
    symbol: 'Wh',
    name: 'Women’s Health',
    description:
      'Products supporting maternal health, gynecology, reproductive health and hormonal therapies.',
  },
  {
    symbol: 'Pm',
    name: 'Pain Management',
    description:
      'Analgesics, anti-inflammatory therapies, anesthesia support products and palliative care medicines.',
  },
  {
    symbol: 'On',
    name: 'Oncology Supportive Care',
    description:
      'Supportive therapies designed to improve quality of life for oncology patients.',
  },
  {
    symbol: 'Cc',
    name: 'Critical Care & Hospital Medicines',
    description:
      'Injectables, intensive care medicines, emergency care products and specialised hospital pharmaceuticals.',
  },
  {
    symbol: 'Nu',
    name: 'Nutritional & Preventive Healthcare',
    description:
      'Vitamins, nutritional supplements and wellness products that contribute to preventive healthcare.',
  },
]

/* ------------------------------------------------------------------ *
 * Products photographed in the company profile
 * ------------------------------------------------------------------ */

export type Product = {
  brand: string
  molecule: string
  area: string
  image: string
  partner?: string
}

export const products: readonly Product[] = [
  {
    brand: 'Zerolip 20',
    molecule: 'Atorvastatin USP 20 mg',
    area: 'Cardiovascular',
    image: '/assets/products/zerolip-20-cut.webp',
  },
  {
    brand: 'Rosuyug 10',
    molecule: 'Rosuvastatin Tablets IP',
    area: 'Cardiovascular',
    image: '/assets/products/rosuyug-10-cut.webp',
    partner: 'Yug Pharmaceuticals',
  },
  {
    brand: 'Rosuyug 20',
    molecule: 'Rosuvastatin Tablets IP',
    area: 'Cardiovascular',
    image: '/assets/products/rosuyug-20-cut.webp',
    partner: 'Yug Pharmaceuticals',
  },
  {
    brand: 'Ribanyug 20',
    molecule: 'Rivaroxaban 20 mg',
    area: 'Cardiovascular',
    image: '/assets/products/ribanyug-20-cut.webp',
    partner: 'Yug Pharmaceuticals',
  },
  {
    brand: 'Orcipro 500',
    molecule: 'Ciprofloxacin 500 mg',
    area: 'Anti-Infective',
    image: '/assets/products/orcipro-500-cut.webp',
  },
  {
    brand: 'Tycil 500',
    molecule: 'Azithromycin 500 mg',
    area: 'Anti-Infective',
    image: '/assets/products/tycil-500-cut.webp',
  },
  {
    brand: 'Esogel 40',
    molecule: 'Esomeprazole 40 mg',
    area: 'Gastroenterology',
    image: '/assets/products/esogel-40-cut.webp',
    partner: 'Novatek Pharmaceuticals Ltd.',
  },
  {
    brand: 'Recita 10',
    molecule: 'Escitalopram USP 10 mg',
    area: 'Neurology',
    image: '/assets/products/recita-10-cut.webp',
    partner: 'Godman Pharmaceuticals',
  },
  {
    brand: 'Momvit',
    molecule: 'Nutritional supplement',
    area: 'Women’s Health',
    image: '/assets/products/momvit-cut.webp',
  },
]

/* ------------------------------------------------------------------ *
 * International partners
 * ------------------------------------------------------------------ */

export const partners = [
  {
    name: 'Beximco Pharmaceuticals Ltd.',
    country: 'Bangladesh',
    scope: 'Exclusive — Center Zone, Kabul',
    description:
      'One of South Asia’s leading pharmaceutical companies, renowned for its innovation, quality standards and global exports.',
  },
  {
    name: 'Godman Pharmaceuticals',
    country: 'Bangladesh',
    scope: 'Exclusive — Afghanistan',
    description:
      'A respected manufacturer with a diversified portfolio serving multiple therapeutic segments.',
  },
  {
    name: 'Novatek Pharmaceuticals Ltd.',
    country: 'Bangladesh',
    scope: 'Exclusive — Afghanistan',
    description:
      'Recognised for its commitment to quality manufacturing and expanding international presence.',
  },
  {
    name: 'Yug Pharmaceuticals',
    country: 'India',
    scope: 'Exclusive — Afghanistan',
    description:
      'A valued strategic partner supporting the delivery of quality pharmaceutical products to the Afghan market.',
  },
] as const

/* ------------------------------------------------------------------ *
 * Competitive advantages
 * ------------------------------------------------------------------ */

export const advantages = [
  {
    title: 'More than a decade of experience',
    body: 'Over ten years of practical experience in pharmaceuticals, medical equipment and healthcare solutions.',
  },
  {
    title: 'Exclusive distribution expertise',
    body: 'Proven capability in representing international manufacturers through exclusive distribution partnerships.',
  },
  {
    title: 'Strong market understanding',
    body: 'Comprehensive knowledge of Afghanistan’s healthcare sector, regulatory environment, procurement processes and customer needs.',
  },
  {
    title: 'Diverse healthcare portfolio',
    body: 'Expertise covering pharmaceuticals, hospital equipment, interventional cardiology, endoscopy, laboratory technologies and diagnostics.',
  },
  {
    title: 'Trusted relationships',
    body: 'Established partnerships with hospitals, physicians, pharmacies, NGOs, government institutions and private healthcare providers.',
  },
  {
    title: 'Reliable supply chain',
    body: 'Efficient importation, warehousing, inventory management and nationwide distribution capabilities.',
  },
  {
    title: 'Professional business development',
    body: 'Dedicated sales and marketing activities focused on sustainable brand growth and market expansion.',
  },
  {
    title: 'Regulatory support',
    body: 'Assistance with product registration, licensing, documentation, market entry and regulatory coordination.',
  },
  {
    title: 'Technical knowledge',
    body: 'Professional understanding of pharmaceuticals, medical equipment, cath lab technologies, endoscopy and hospital solutions.',
  },
  {
    title: 'Customer-centered service',
    body: 'Long-term relationships built through responsiveness, professionalism and trust.',
  },
  {
    title: 'Commercial excellence',
    body: 'Dedicated sales, marketing, market development, tender participation and product commercialisation.',
  },
] as const

/* ------------------------------------------------------------------ *
 * Milestones
 * ------------------------------------------------------------------ */

export const milestones = [
  {
    year: '2015',
    title: 'Foundation',
    body: 'Fatami Ali Pharmaceuticals is founded with a vision to improve access to quality healthcare products in Afghanistan.',
  },
  {
    year: '2016–2017',
    title: 'Distribution takes root',
    body: 'Pharmaceutical import and distribution activities expand, and relationships develop with hospitals, pharmacies and healthcare providers.',
  },
  {
    year: '2018',
    title: 'Into medical equipment',
    body: 'Entry into advanced medical equipment and specialised hospital solutions.',
  },
  {
    year: '2019',
    title: 'Cath lab capability',
    body: 'Expansion into interventional cardiology and cath lab consumables.',
  },
  {
    year: '2020',
    title: 'Nationwide reach',
    body: 'Growth of nationwide distribution capabilities and strengthened logistics.',
  },
  {
    year: '2021',
    title: 'Endoscopy portfolio',
    body: 'Introduction of endoscopy consumables and specialised clinical products.',
  },
  {
    year: '2022',
    title: 'Deeper partnerships',
    body: 'Strengthened partnerships with international pharmaceutical manufacturers.',
  },
  {
    year: '2023',
    title: 'Institutional solutions',
    body: 'Expansion of product portfolio and institutional healthcare solutions.',
  },
  {
    year: '2024',
    title: 'Exclusive distributor',
    body: 'Recognition as the exclusive Afghan distributor for leading pharmaceutical manufacturers.',
  },
  {
    year: 'Today',
    title: 'The next decade',
    body: 'Continuing our journey toward becoming Afghanistan’s preferred healthcare partner for global pharmaceutical and medical technology companies.',
  },
] as const

/* ------------------------------------------------------------------ *
 * Vision, mission, values, objectives, leadership
 * ------------------------------------------------------------------ */

export const vision =
  'To become Afghanistan’s most trusted healthcare company and the preferred strategic partner for global pharmaceutical manufacturers, medical device companies and healthcare innovators — by delivering world-class products, exceptional service and sustainable healthcare solutions.'

export const mission =
  'To improve healthcare outcomes throughout Afghanistan by providing safe, effective and innovative pharmaceutical products, advanced medical technologies and specialised healthcare solutions, while building long-term partnerships founded on integrity, professionalism and mutual success.'

export const values = [
  {
    name: 'Integrity',
    body: 'We conduct every aspect of our business with honesty, transparency and ethical responsibility.',
  },
  {
    name: 'Excellence',
    body: 'We pursue the highest standards in quality, customer service and operational performance.',
  },
  {
    name: 'Partnership',
    body: 'We believe lasting success is built on trust, collaboration and shared goals.',
  },
  {
    name: 'Innovation',
    body: 'We continuously seek innovative healthcare solutions that improve patient care.',
  },
  {
    name: 'Accountability',
    body: 'We take responsibility for our commitments and deliver on our promises.',
  },
  {
    name: 'Customer Focus',
    body: 'Every decision we make is guided by the needs of our customers and partners.',
  },
  {
    name: 'Respect',
    body: 'We value diversity, teamwork and long-term relationships built on mutual respect.',
  },
  {
    name: 'Continuous Improvement',
    body: 'We embrace learning, innovation and continuous development to strengthen our capabilities.',
  },
] as const

export const objectives = [
  {
    title: 'Expand international partnerships',
    body: 'Continue building exclusive partnerships with leading pharmaceutical, biotechnology, diagnostic and medical technology companies worldwide.',
  },
  {
    title: 'Strengthen healthcare access',
    body: 'Increase the availability of high-quality medicines and advanced healthcare technologies throughout Afghanistan.',
  },
  {
    title: 'Support healthcare professionals',
    body: 'Provide physicians, hospitals and healthcare providers with dependable products, technical knowledge and responsive customer support.',
  },
  {
    title: 'Introduce healthcare innovation',
    body: 'Bring innovative therapies, minimally invasive technologies and next-generation medical equipment into the Afghan healthcare market.',
  },
  {
    title: 'Invest in human capital',
    body: 'Develop highly skilled professionals capable of delivering exceptional service and technical expertise.',
  },
  {
    title: 'Strengthen supply chain excellence',
    body: 'Build efficient logistics and distribution systems that ensure product availability across Afghanistan while maintaining international quality standards.',
  },
  {
    title: 'Promote sustainable growth',
    body: 'Create long-term value for our partners through ethical business practices, operational excellence and continuous investment in organisational development.',
  },
] as const

export const leadershipPrinciples = [
  {
    title: 'Lead with integrity',
    body: 'We uphold the highest ethical standards in every decision and every partnership.',
  },
  {
    title: 'Serve with excellence',
    body: 'We pursue operational excellence through professionalism, accountability and continuous improvement.',
  },
  {
    title: 'Innovate with purpose',
    body: 'We embrace new technologies and healthcare innovations that create meaningful value for patients and providers.',
  },
  {
    title: 'Grow together',
    body: 'We believe the success of our company is inseparable from the success of our employees, customers and international partners.',
  },
] as const

/* ------------------------------------------------------------------ *
 * Commitments to partners
 * ------------------------------------------------------------------ */

export const partnerCommitments = [
  'Represent every partner’s brand with integrity',
  'Protect its market position',
  'Promote sustainable growth',
  'Deliver value through transparent communication',
  'Operational excellence and customer-focused service',
] as const

/* ------------------------------------------------------------------ *
 * Market context
 * ------------------------------------------------------------------ */

export const marketCharacteristics = [
  'Strong dependence on imported medicines',
  'Growing private healthcare investment',
  'Increasing demand for specialised medical technologies',
  'Expanding diagnostic services',
  'Significant opportunities for advanced medical devices',
  'Continuous demand from humanitarian and development organisations',
  'Long-term healthcare infrastructure development',
] as const

export const audiences = [
  'Hospitals',
  'Clinics',
  'Pharmacies',
  'Healthcare professionals',
  'Government institutions',
  'Humanitarian organisations',
  'International partners',
] as const

export const inquiryTypes = [
  'Pharmaceutical Partnership',
  'Medical Equipment',
  'Healthcare Solutions',
  'Distribution Partnership',
  'General Inquiry',
] as const
