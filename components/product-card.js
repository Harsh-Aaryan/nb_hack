// ═══════════════════════════════════════════════════
// NEW BALANCE - PRODUCT CARD COMPONENT
// ═══════════════════════════════════════════════════

function createProductCard(product, badgeConfig) {
  const badgesHtml = product.badges ? createImpactBadgeList(product.badges, badgeConfig) : '';
  
  return `
    <article class="product-card hover-lift reveal" data-id="${product.id}" onclick="showProductModal('${product.id}')">
      <div class="product-card__image animate-fade-in">
        <img class="skeleton-image" src="${product.image}" alt="${product.name}" loading="lazy" onload="this.classList.remove('skeleton-image')" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100%\\' height=\\'100%\\' viewBox=\\'0 0 100 100\\'%3E%3Crect width=\\'100\\' height=\\'100\\' fill=\\'%23eee\\'%3E%3C/rect%3E%3C/svg%3E'">
        ${badgesHtml ? `<div class="product-card__badges stagger-1">${badgesHtml}</div>` : ''}
        <div class="product-card__year">${product.year}</div>
        <button class="btn btn-icon btn-primary product-card__quick-add" aria-label="Add to wardrobe" onclick="event.stopPropagation(); addToWardrobe('${product.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>
      <div class="product-card__info">
        <div class="product-card__category">${formatProductCategory(product.category)}</div>
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__model">${product.model}</p>
        <div class="product-card__footer">
          <span class="product-card__price">$${product.price}</span>
        </div>
      </div>
    </article>
  `;
}
