// ═══════════════════════════════════════════════════
// NEW BALANCE - HOME PAGE
// ═══════════════════════════════════════════════════

function renderHome() {
  // Get tailored recommendations (mock)
  const recommended = [PRODUCTS[0], PRODUCTS[3], PRODUCTS[6]]; 
  
  // Classics / made-in-USA lane highlights
  const classicsSpotlight = PRODUCTS.filter(p => p.category === 'classics').slice(0, 4);
  
  const content = `
    <div class="page page-enter">
      <div class="home-bg-base"></div>
      <div class="home-bg-gradient-blur"></div>
      <div class="home-page-content">
        <section class="home-hero reveal">
          <h2 class="home-hero__eyebrow">New Balance</h2>
        <h1 class="home-hero__title">Shop smarter with AI.</h1>
        <p class="home-hero__subtitle">Browse the catalog, build your wardrobe, and get picks tailored to you, with stylist tools and social trend context built in.</p>
        <button class="btn btn-primary" onclick="window.location.hash='#/discover'">Explore Catalog</button>
        <img src="assets/products/1300.jpg" alt="Hero sneaker" class="home-hero__image">
      </section>
      
      <section class="home-section">
        <div class="section-header reveal">
          <div>
            <h2 class="section-header__title">Recommended For You</h2>
            <p class="section-header__subtitle">Based on your style profile & values</p>
          </div>
        </div>
        <div class="h-scroll">
          ${recommended.map((p, i) => `
            <div style="width: 280px; flex-shrink: 0;" class="reveal stagger-${i+1}">
              ${createProductCard(p, BADGE_CONFIG)}
            </div>
          `).join('')}
        </div>
      </section>

      <section class="home-section">
        <div class="section-header reveal">
          <div>
            <h2 class="section-header__title">Classics spotlight</h2>
            <p class="section-header__subtitle">Made-in-USA & UK favorites: the pairs that define the brand</p>
          </div>
          <a href="#/discover" class="section-header__link">View All</a>
        </div>
        <div class="home-grid">
          ${classicsSpotlight.map((p, i) => `
            <div class="reveal stagger-${i+1}">
              ${createProductCard(p, BADGE_CONFIG)}
            </div>
          `).join('')}
        </div>
      </section>
      </div> <!-- End home-page-content -->
    </div>
  `;
  
  return content;
}
