// ═══════════════════════════════════════════════════
// NB HERITAGE — WARDROBE PAGE
// ═══════════════════════════════════════════════════

function renderWardrobe() {
  const wardrobeProducts = USER_DATA.wardrobe.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  
  // Calculate average automation score (mock)
  let totalImpact = 0;
  wardrobeProducts.forEach(p => totalImpact += (p.impactScore || 0));
  const avgImpact = wardrobeProducts.length ? Math.round(totalImpact / wardrobeProducts.length) : 0;
  
  // Update user data mock
  USER_DATA.impactScore = 85;

  const content = `
    <div class="page page-enter">
      <div class="wardrobe-header reveal">
        <div>
          <h1 class="wardrobe-header__title">Your Rotation</h1>
          <p class="section-header__subtitle mt-1">${wardrobeProducts.length} pairs • ${USER_DATA.stats.totalWears} total wears</p>
        </div>
      </div>

      <div class="wardrobe-grid">
        ${wardrobeProducts.map((p, i) => {
          // Find mock wear details
          const details = USER_DATA.wardrobeDetails.find(d => d.productId === p.id) || { wears: Math.floor(Math.random() * 20), tags: [] };
          
          return `
            <div class="wardrobe-card reveal stagger-${i+1}" onclick="showProductModal('${p.id}')">
              <div class="wardrobe-card__image">
                <img src="${p.image}" loading="lazy" alt="${p.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100%\\' height=\\'100%\\' viewBox=\\'0 0 100 100\\'%3E%3Crect width=\\'100\\' height=\\'100\\' fill=\\'%23eee\\'%3E%3C/rect%3E%3C/svg%3E'">
                <div class="wardrobe-card__wear-count">${details.wears} wears</div>
              </div>
              <div class="wardrobe-card__info">
                <h3 class="wardrobe-card__name">${p.name}</h3>
                <div class="wardrobe-card__tags">
                  ${details.tags.slice(0, 2).map(tag => `<span class="tag" style="padding: 1px 6px; font-size: 9px;">${tag}</span>`).join('')}
                </div>
              </div>
            </div>
          `;
        }).join('')}
        
        <div class="wardrobe-add reveal stagger-${wardrobeProducts.length + 1}" onclick="window.location.hash='#/discover'">
          <div class="wardrobe-add__icon">+</div>
          <div class="wardrobe-add__text">Add Pair</div>
        </div>
      </div>

      <section class="wardrobe-section">
        <h2 class="section-header__title reveal">AI Wardrobe Analysis</h2>
        <div class="wardrobe-giveback reveal" style="background: linear-gradient(135deg, var(--color-navy) 0%, #2A4F80 100%); margin-top: var(--space-4);">
          <h2 class="wardrobe-giveback__title" style="display: flex; align-items: center; gap: 8px;">✨ AI Agent Insights</h2>
          <p class="wardrobe-giveback__text">Our AI agent has analyzed your rotation. You have strong coverage in Heritage and Lifestyle models, but lack a dedicated Performance silhouette for training. Should the AI automatically scout for the best deals on Performance runners matching your aesthetic?</p>
          <button class="btn btn-outline" style="background: white; color: var(--color-navy);" onclick="showToast('AI Agent dispatched to scan inventory')">Activate Scout Agent</button>
        </div>
      </section>
    </div>
  `;
  
  return content;
}
