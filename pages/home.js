// ═══════════════════════════════════════════════════
// NB HERITAGE — HOME PAGE
// ═══════════════════════════════════════════════════

function renderHome() {
  // Get tailored recommendations (mock)
  const recommended = [PRODUCTS[0], PRODUCTS[3], PRODUCTS[6]]; 
  
  // Get archive highlights
  const archive = PRODUCTS.filter(p => p.category === 'heritage').slice(0, 4);
  
  const content = `
    <div class="page page-enter">
      <div class="home-bg-base"></div>
      <div class="home-bg-gradient-blur"></div>
      <div class="home-page-content">
        <section class="home-hero reveal">
          <h2 class="home-hero__eyebrow">The Archive</h2>
        <h1 class="home-hero__title">Heritage crafted for the future.</h1>
        <p class="home-hero__subtitle">Discover the stories, craftsmanship, and impact behind the most iconic silhouettes in footwear history.</p>
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

      <div class="home-marquee">
        <div class="marquee-track">
          <div class="home-marquee__text">
            AI-POWERED STYLIST <span>•</span> PREDICTIVE AUTONOMY <span>•</span> PERSONALIZED CURATION <span>•</span> HERITAGE INTELLIGENCE <span>•</span> 
            AI-POWERED STYLIST <span>•</span> PREDICTIVE AUTONOMY <span>•</span> PERSONALIZED CURATION <span>•</span> HERITAGE INTELLIGENCE <span>•</span> 
            AI-POWERED STYLIST <span>•</span> PREDICTIVE AUTONOMY <span>•</span> PERSONALIZED CURATION <span>•</span> HERITAGE INTELLIGENCE <span>•</span> 
          </div>
        </div>
      </div>

      <section class="home-section">
        <div class="section-header reveal">
          <div>
            <h2 class="section-header__title">From the Archive</h2>
            <p class="section-header__subtitle">Timeless icons of American & UK manufacturing</p>
          </div>
          <a href="#/discover" class="section-header__link">View All</a>
        </div>
        <div class="home-grid">
          ${archive.map((p, i) => `
            <div class="reveal stagger-${i+1}">
              ${createProductCard(p, BADGE_CONFIG)}
            </div>
          `).join('')}
        </div>
      </section>

      <div class="divider divider--section"></div>

      <section class="home-section">
        <div class="section-header reveal">
          <div>
            <h2 class="section-header__title">Meet Your AI Stylist</h2>
            <p class="section-header__subtitle">Autonomous agents working behind the scenes to curate your perfect collection.</p>
          </div>
        </div>
        <div class="home-stories">
          <div class="reveal stagger-1">
            <article class="story-card hover-lift" onclick="window.location.hash='#/stylist'">
              <div class="story-card__image" style="background: var(--color-navy); display: flex; align-items: center; justify-content: center;">
                <div style="font-size: 4rem;">🤖</div>
              </div>
              <div class="story-card__content">
                <h3 class="story-card__title">Autonomous Wardrobe Organization</h3>
                <p class="story-card__excerpt">Let our AI agents tag, categorize, and track your wearing habits to suggest optimal rotation schedules and ensure your sneakers last longer.</p>
              </div>
            </article>
          </div>
          <div class="reveal stagger-2">
            <article class="story-card hover-lift" onclick="window.location.hash='#/stylist'">
              <div class="story-card__image" style="background: var(--color-red); display: flex; align-items: center; justify-content: center;">
                <div style="font-size: 4rem;">✨</div>
              </div>
              <div class="story-card__content">
                <h3 class="story-card__title">Predictive Trend Procurement</h3>
                <p class="story-card__excerpt">Our scout agents continuously monitor global sneaker trends and automatically alert you when a vintage silhouette matching your aesthetic drops.</p>
              </div>
            </article>
          </div>
        </div>
      </section>
      </div> <!-- End home-page-content -->
    </div>
  `;
  
  return content;
}
