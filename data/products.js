// ═══════════════════════════════════════════════════
// NEW BALANCE - PRODUCT DATA
// Mock catalog with impact metadata
// ═══════════════════════════════════════════════════

const PRODUCTS = [
  {
    id: 'nb-990v5',
    name: '990v5',
    model: 'Made in USA 990v5',
    year: 1982,
    price: 185,
    colorway: 'Grey / Castlerock',
    category: 'classics',
    description: 'The pinnacle of the 990 lineage. Five generations of refinement have produced the most premium everyday running shoe ever crafted on American soil.',
    materials: ['Pigskin suede', 'Mesh upper', 'ENCAP midsole', 'Blown rubber outsole'],
    image: 'assets/products/990v5.jpg',
    badges: ['made_in_usa', 'sustainable'],
    impactScore: 92,
    sustainability: {
      madeIn: 'Skowhegan, Maine',
      recyclable: true,
      sustainableMaterials: 45,
      carbonOffset: true
    }
  },
  {
    id: 'nb-574',
    name: '574',
    model: 'Classic 574',
    year: 1988,
    price: 90,
    colorway: 'Navy / White',
    category: 'lifestyle',
    description: 'The icon that democratized New Balance style. Originally built for trail and road versatility, the 574 became a cultural cornerstone.',
    materials: ['Suede', 'Mesh', 'ENCAP midsole', 'Rubber outsole'],
    image: 'assets/products/574.jpg',
    badges: ['community'],
    impactScore: 68,
    sustainability: {
      madeIn: 'Vietnam',
      recyclable: false,
      sustainableMaterials: 20,
      carbonOffset: false
    }
  },
  {
    id: 'nb-1300',
    name: '1300',
    model: 'Made in USA 1300',
    year: 1985,
    price: 250,
    colorway: 'Steel Blue / Grey',
    category: 'classics',
    description: 'Ralph Lauren called it "the Rolls Royce of sneakers." The 1300 remains the gold standard of American-made footwear craftsmanship.',
    materials: ['Premium suede', 'Mesh', 'ENCAP midsole', 'Vibram outsole'],
    image: 'assets/products/1300.jpg',
    badges: ['made_in_usa', 'sustainable', 'community'],
    impactScore: 95,
    sustainability: {
      madeIn: 'Norridgewock, Maine',
      recyclable: true,
      sustainableMaterials: 55,
      carbonOffset: true
    }
  },
  {
    id: 'nb-993',
    name: '993',
    model: 'Made in USA 993',
    year: 2008,
    price: 175,
    colorway: 'Grey',
    category: 'performance',
    description: 'The workhorse of the 990 series. Embraced by runners, dads, and style icons alike. The 993 is quiet confidence personified.',
    materials: ['Suede', 'Mesh', 'ABZORB cushioning', 'Blown rubber outsole'],
    image: 'assets/products/993.jpg',
    badges: ['made_in_usa'],
    impactScore: 85,
    sustainability: {
      madeIn: 'Boston, Massachusetts',
      recyclable: true,
      sustainableMaterials: 35,
      carbonOffset: false
    }
  },
  {
    id: 'nb-550',
    name: '550',
    model: 'BB550',
    year: 1989,
    price: 110,
    colorway: 'White / Green',
    category: 'lifestyle',
    description: 'A basketball classic reborn. The 550 sat in the archives for decades before a new generation discovered its effortless appeal.',
    materials: ['Leather', 'Synthetic', 'Rubber cupsole'],
    image: 'assets/products/550.jpg',
    badges: ['community'],
    impactScore: 60,
    sustainability: {
      madeIn: 'China',
      recyclable: false,
      sustainableMaterials: 15,
      carbonOffset: false
    }
  },
  {
    id: 'nb-327',
    name: '327',
    model: 'MS327',
    year: 2020,
    price: 100,
    colorway: 'Moonbeam / Gum',
    category: 'lifestyle',
    description: 'Retro running DNA reimagined for modern streets. The oversized N logo and flared heel make an unmistakable statement.',
    materials: ['Suede', 'Nylon', 'EVA midsole', 'Gum rubber outsole'],
    image: 'assets/products/327.jpg',
    badges: ['sustainable'],
    impactScore: 72,
    sustainability: {
      madeIn: 'Vietnam',
      recyclable: true,
      sustainableMaterials: 40,
      carbonOffset: true
    }
  },
  {
    id: 'nb-2002r',
    name: '2002R',
    model: '2002R Protection Pack',
    year: 2010,
    price: 150,
    colorway: 'Rain Cloud',
    category: 'performance',
    description: 'N-ERGY cushioning technology wrapped in a silhouette that bridges performance running and premium streetwear.',
    materials: ['Suede', 'Mesh', 'N-ERGY midsole', 'ABZORB SBS'],
    image: 'assets/products/2002r.jpg',
    badges: ['sustainable', 'community'],
    impactScore: 78,
    sustainability: {
      madeIn: 'UK',
      recyclable: true,
      sustainableMaterials: 38,
      carbonOffset: true
    }
  },
  {
    id: 'nb-1906r',
    name: '1906R',
    model: '1906R',
    year: 2023,
    price: 150,
    colorway: 'Silver Metallic',
    category: 'performance',
    description: 'Futuristic aesthetics meet proven cushioning tech. The 1906R channels early-2000s runner energy with modern refinement.',
    materials: ['Synthetic leather', 'Mesh', 'ACTEVA midsole', 'N-durance outsole'],
    image: 'assets/products/1906r.jpg',
    badges: ['sustainable'],
    impactScore: 70,
    sustainability: {
      madeIn: 'Vietnam',
      recyclable: true,
      sustainableMaterials: 35,
      carbonOffset: false
    }
  },
  {
    id: 'nb-made-uk-991',
    name: '991',
    model: 'Made in UK 991',
    year: 2001,
    price: 230,
    colorway: 'Navy / Grey',
    category: 'classics',
    description: 'Handcrafted in the Flimby factory in Cumbria, England. Each pair passes through 70 pairs of hands during assembly.',
    materials: ['Premium suede', 'Mesh', 'ABZORB midsole', 'EVA'],
    image: 'assets/products/991.jpg',
    badges: ['made_in_usa', 'sustainable', 'community'],
    impactScore: 94,
    sustainability: {
      madeIn: 'Flimby, England',
      recyclable: true,
      sustainableMaterials: 50,
      carbonOffset: true
    }
  },
  {
    id: 'nb-fresh-foam',
    name: 'Fresh Foam X 1080v13',
    model: 'Fresh Foam X 1080v13',
    year: 2023,
    price: 165,
    colorway: 'Black / Thunder',
    category: 'performance',
    description: 'Top-tier daily trainer with Fresh Foam X midsole technology. Designed for runners who demand premium comfort mile after mile.',
    materials: ['Hypoknit upper', 'Fresh Foam X midsole', 'Blown rubber outsole'],
    image: 'assets/products/1080v13.jpg',
    badges: ['sustainable'],
    impactScore: 75,
    sustainability: {
      madeIn: 'Vietnam',
      recyclable: true,
      sustainableMaterials: 42,
      carbonOffset: true
    }
  },
  {
    id: 'nb-rc-elite',
    name: 'FuelCell RC Elite v2',
    model: 'FuelCell RC Elite v2',
    year: 2022,
    price: 225,
    colorway: 'White / Vibrant Spring',
    category: 'performance',
    description: 'Carbon-plated racing flat engineered for speed. The FuelCell RC Elite is built for breaking personal records.',
    materials: ['Synthetic mesh', 'FuelCell midsole', 'Carbon fiber plate', 'Ndurance outsole'],
    image: 'assets/products/rc-elite.jpg',
    badges: ['sustainable', 'community'],
    impactScore: 80,
    sustainability: {
      madeIn: 'USA',
      recyclable: true,
      sustainableMaterials: 30,
      carbonOffset: true
    }
  },
  {
    id: 'nb-608',
    name: '608v5',
    model: 'Classic 608v5',
    year: 2001,
    price: 75,
    colorway: 'White',
    category: 'lifestyle',
    description: 'The cross-training icon. Simple, reliable, and unexpectedly fashionable. The 608 is the unsung hero of the NB catalog.',
    materials: ['Leather', 'ABZORB cushioning', 'Rubber outsole'],
    image: 'assets/products/608.jpg',
    badges: ['community'],
    impactScore: 55,
    sustainability: {
      madeIn: 'China',
      recyclable: false,
      sustainableMaterials: 10,
      carbonOffset: false
    }
  }
];

// Badge display config
const BADGE_CONFIG = {
  made_in_usa: { label: 'Made in USA', icon: '🇺🇸', class: 'impact-badge--usa' },
  ai_curated: { label: 'AI Pick', icon: '✨', class: 'impact-badge--community' }
};

// Categories for filtering
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'classics', label: 'Classics' },
  { id: 'performance', label: 'Performance' },
  { id: 'lifestyle', label: 'Lifestyle' }
];

function formatProductCategory(categoryId) {
  const match = CATEGORIES.find(c => c.id === categoryId);
  return match ? match.label : categoryId;
}
window.formatProductCategory = formatProductCategory;

// Export for module usage
if (typeof module !== 'undefined') {
  module.exports = { PRODUCTS, BADGE_CONFIG, CATEGORIES, formatProductCategory };
}
