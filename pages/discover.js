// ═══════════════════════════════════════════════════
// NB HERITAGE — DISCOVER PAGE
// ═══════════════════════════════════════════════════

let currentCategory = 'all';

function renderDiscover() {
  let filteredProducts = PRODUCTS;
  if (currentCategory !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === currentCategory);
  }

  const content = `
    <div class="page page-enter">
      <div class="discover-header reveal">
        <h1 class="discover-header__title">Catalog</h1>
        <p class="discover-header__count">${filteredProducts.length} silhouettes</p>
      </div>

      <div class="discover-filters reveal">
        <div class="filter-bar">
          ${CATEGORIES.map(category => `
            <button 
              class="filter-pill ${currentCategory === category.id ? 'active' : ''}" 
              onclick="setCategory('${category.id}')"
            >
              ${category.label}
            </button>
          `).join('')}
          <div style="width: 1px; height: 24px; background: var(--color-border); margin: 0 var(--space-2);"></div>
          <button class="filter-pill" onclick="showToast('Filters modal coming soon')">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            Filters
          </button>
        </div>
      </div>

      ${filteredProducts.length > 0 ? `
        <div class="discover-grid" id="discoverGrid">
          ${filteredProducts.map((p, i) => `
            <div class="reveal stagger-${(i % 10) + 1}">
              ${createProductCard(p, BADGE_CONFIG)}
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="empty-state reveal">
          <div class="empty-state__icon">👟</div>
          <h2 class="empty-state__title">No products found</h2>
          <p class="empty-state__text">Try adjusting your filters or search criteria to find what you're looking for.</p>
          <button class="btn btn-outline" onclick="setCategory('all')">View All Products</button>
        </div>
      `}
    </div>
  `;
  
  return content;
}

// Ensure this is attached to window so it can be called from inline handlers
window.setCategory = function(categoryId) {
  if (currentCategory === categoryId) return;
  currentCategory = categoryId;
  const main = document.getElementById('main-content');
  main.innerHTML = renderDiscover();
  if (window.initScrollReveal) window.initScrollReveal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
