// ═══════════════════════════════════════════════════
// NEW BALANCE - COMMUNITY STORIES DATA
// Philanthropy & impact narratives
// ═══════════════════════════════════════════════════

const COMMUNITY_STORIES = [
  {
    id: 'story-1',
    title: 'Sole for the Community: 10,000 Pairs Donated to Boston Youth',
    excerpt: 'Through our partnership with local athletics programs, NB has provided sneakers to young runners across underserved Boston neighborhoods, helping them pursue their passion for sport.',
    impactType: 'community',
    tag: 'Community Impact',
    date: '2025-11-15',
    image: 'assets/stories/community-boston.jpg',
    stats: { pairsDonated: 10000, youthServed: 3200, programs: 14 }
  },
  {
    id: 'story-2',
    title: 'Green Stride: Our Journey to Carbon-Neutral Manufacturing',
    excerpt: 'Our Skowhegan and Lawrence factories have reduced emissions by 42% since 2020. Workers-led initiatives in waste reduction have been at the heart of this transformation.',
    impactType: 'sustainability',
    tag: 'Sustainability',
    date: '2025-09-22',
    image: 'assets/stories/green-factory.jpg',
    stats: { emissionsReduced: 42, wasteRecycled: 85, renewableEnergy: 60 }
  },
  {
    id: 'story-3',
    title: 'Made Here: Preserving American Craftsmanship in Maine',
    excerpt: 'While most brands moved overseas, NB doubled down on domestic manufacturing. Meet the artisans who hand-assemble every Made in USA pair with 25+ years of expertise.',
    impactType: 'manufacturing',
    tag: 'Made in USA',
    date: '2025-08-10',
    image: 'assets/stories/made-in-usa.jpg',
    stats: { usaJobs: 7000, factoriesUS: 5, yearsInUSA: 45 }
  },
  {
    id: 'story-4',
    title: 'Second Sole: Giving Old Sneakers New Life Through Recycling',
    excerpt: 'Our recycling program has collected over 50,000 pairs of worn sneakers, transforming them into playground surfaces, running tracks, and community courts across the country.',
    impactType: 'recycling',
    tag: 'Recycling',
    date: '2025-07-05',
    image: 'assets/stories/recycling.jpg',
    stats: { pairsRecycled: 50000, playgrounds: 28, tracks: 12 }
  },
  {
    id: 'story-5',
    title: 'Run Together: Inclusive Running Programs Worldwide',
    excerpt: 'From wheelchair racing sponsorships to adaptive footwear development, NB is committed to making running accessible to every body, in every community.',
    impactType: 'community',
    tag: 'Inclusivity',
    date: '2025-06-18',
    image: 'assets/stories/inclusive-running.jpg',
    stats: { countriesReached: 22, participantsAnnual: 15000, adaptiveProducts: 8 }
  }
];

// Impact types for theming
const IMPACT_TYPES = {
  community:      { color: 'var(--color-gold)', icon: '🤝' },
  sustainability: { color: 'var(--color-green)', icon: '🌿' },
  manufacturing:  { color: 'var(--color-navy)', icon: '🇺🇸' },
  recycling:      { color: 'var(--color-green)', icon: '♻️' }
};

// User mock data for profile and wardrobe
const USER_DATA = {
  name: 'Alex Morgan',
  initials: 'AM',
  memberSince: 'March 2024',
  impactScore: 78,
  styleProfile: ['Retro runner', 'Earth tones', 'Minimalist', 'American made', 'Sustainable'],
  stats: {
    totalPairs: 6,
    totalWears: 142,
    favoriteModel: '990v5',
    donationsMade: 3,
    pairsRecycled: 2
  },
  wardrobe: ['nb-990v5', 'nb-574', 'nb-1300', 'nb-550'],
  wardrobeDetails: [
    { productId: 'nb-990v5', wears: 48, lastWorn: '2025-12-28', tags: ['daily', 'running', 'classics'] },
    { productId: 'nb-574', wears: 35, lastWorn: '2025-12-25', tags: ['casual', 'weekend'] },
    { productId: 'nb-1300', wears: 22, lastWorn: '2025-12-20', tags: ['special occasion', 'classics'] },
    { productId: 'nb-550', wears: 37, lastWorn: '2025-12-27', tags: ['casual', 'streetwear'] }
  ],
  recentActivity: [
    { type: 'wear', icon: '👟', text: 'Wore your 990v5: that\'s 48 wears!', time: '2 hours ago' },
    { type: 'impact', icon: '🌿', text: 'Your wardrobe impact score increased to 78', time: '1 day ago' },
    { type: 'donate', icon: '🤝', text: 'Donated a pair through the Give Back program', time: '3 days ago' },
    { type: 'add', icon: '📦', text: 'Added BB550 to your wardrobe', time: '1 week ago' },
    { type: 'achieve', icon: '🏆', text: 'Earned "Classics Collector" badge', time: '2 weeks ago' }
  ]
};

// AI Stylist mock recommendations
const AI_RECOMMENDATIONS = {
  casual: [
    {
      productId: 'nb-574',
      reason: 'The 574 is the quintessential casual daily shoe. Its versatile colorways pair with anything from jeans to chinos.',
      insights: ['Supports 14 community programs', 'Iconic since 1988']
    },
    {
      productId: 'nb-327',
      reason: 'The 327\'s retro-modern silhouette adds personality to casual fits. The oversized N logo makes a confident statement.',
      insights: ['40% sustainable materials', 'Carbon offset program']
    },
    {
      productId: 'nb-550',
      reason: 'A basketball-inspired court shoe that works perfectly for laid-back weekend wear. Clean lines, timeless appeal.',
      insights: ['Supports community athletics', 'Iconic comeback since 2020']
    }
  ],
  performance: [
    {
      productId: 'nb-fresh-foam',
      reason: 'The Fresh Foam X 1080v13 offers top-tier cushioning for daily training. Hypoknit upper adapts to your foot shape.',
      insights: ['42% sustainable materials', 'Carbon offset manufacturing']
    },
    {
      productId: 'nb-rc-elite',
      reason: 'For race day, the FuelCell RC Elite v2 delivers carbon-plated response. Built to shave seconds off your PR.',
      insights: ['Community running sponsorship', '30% recycled content']
    },
    {
      productId: 'nb-2002r',
      reason: 'N-ERGY cushioning provides premium comfort for longer runs. A perfect bridge between performance and style.',
      insights: ['38% sustainable materials', 'Support for youth athletics']
    }
  ],
  classics: [
    {
      productId: 'nb-990v5',
      reason: 'The 990v5 is the crown jewel, handcrafted in Maine with five generations of design wisdom.',
      insights: ['Made in Skowhegan, Maine', '45% sustainable materials', 'Supports 7,000 US jobs']
    },
    {
      productId: 'nb-1300',
      reason: 'Ralph Lauren\'s "Rolls Royce of sneakers." The 1300 represents peak American footwear craftsmanship.',
      insights: ['Made in Norridgewock, Maine', '55% sustainable materials', 'Supports domestic craft programs']
    },
    {
      productId: 'nb-made-uk-991',
      reason: 'Hand-assembled in the Flimby factory by artisans with decades of expertise. Each pair tells a story of craft.',
      insights: ['Made in Flimby, England', '50% sustainable materials', '70 pairs of hands per shoe']
    }
  ]
};

if (typeof module !== 'undefined') {
  module.exports = { COMMUNITY_STORIES, IMPACT_TYPES, USER_DATA, AI_RECOMMENDATIONS };
}
