// ═══════════════════════════════════════════════════
// NB HERITAGE — PRODUCT MODAL COMPONENT
// ═══════════════════════════════════════════════════

function renderProductModal() {
  const modalHtml = `
    <div class="modal-overlay" id="productModal" onclick="closeProductModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal__header">
          <div class="modal__title" style="font-family: var(--font-heading); font-weight: bold; font-size: var(--text-lg)">Product Details</div>
          <button class="modal__close" aria-label="Close modal" onclick="closeProductModal()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="modal__body" id="productModalBody">
          <!-- Content dynamically injected -->
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function showProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  
  const inWardrobe = USER_DATA.wardrobe.includes(productId);
  const badgesHtml = product.badges ? createImpactBadgeList(product.badges, BADGE_CONFIG, 'large') : '';
  
  let sustainabilityHtml = '';
  
  const content = `
    <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: var(--radius-md); margin-bottom: var(--space-4); background: var(--color-bg-warm);" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100%\\' height=\\'100%\\' viewBox=\\'0 0 100 100\\'%3E%3Crect width=\\'100\\' height=\\'100\\' fill=\\'%23eee\\'%3E%3C/rect%3E%3C/svg%3E'">
    <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-3)">
      ${badgesHtml}
    </div>
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-4)">
      <div>
        <div class="product-card__category">${product.category} • ${product.year}</div>
        <h2 style="font-family: var(--font-heading); font-weight: 900; font-size: var(--text-3xl); line-height: 1">${product.name}</h2>
        <p style="color: var(--color-text-secondary); margin-top: var(--space-1)">${product.model}</p>
      </div>
      <div style="font-size: var(--text-xl); font-weight: bold">$${product.price}</div>
    </div>
    <p style="line-height: var(--leading-relaxed); margin-bottom: var(--space-4)">${product.description}</p>
    
    <div>
      <h4 style="font-family: var(--font-heading); font-weight: bold; margin-bottom: var(--space-2)">Materials</h4>
      <ul style="list-style: disc; padding-left: var(--space-5); color: var(--color-text-secondary); line-height: var(--leading-relaxed)">
        ${product.materials.map(m => `<li>${m}</li>`).join('')}
      </ul>
    </div>
    
    ${sustainabilityHtml}
    
    <button class="btn ${inWardrobe ? 'btn-outline' : 'btn-primary'} btn-lg" style="width: 100%; margin-top: var(--space-4)" onclick="toggleWardrobeStatus('${product.id}')" id="modalWardrobeBtn">
      ${inWardrobe ? 'Remove from Wardrobe' : 'Add to Wardrobe • $0 Cost'}
    </button>
  `;
  
  document.getElementById('productModalBody').innerHTML = content;
  
  const modal = document.getElementById('productModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal(event) {
  if (event && event.target !== event.currentTarget) return;
  
  const modal = document.getElementById('productModal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function toggleWardrobeStatus(productId) {
  const index = USER_DATA.wardrobe.indexOf(productId);
  const btn = document.getElementById('modalWardrobeBtn');
  
  if (index > -1) {
    USER_DATA.wardrobe.splice(index, 1);
    btn.className = 'btn btn-primary btn-lg';
    btn.innerHTML = 'Add to Wardrobe • $0 Cost';
    showToast('Removed from Wardrobe');
  } else {
    USER_DATA.wardrobe.push(productId);
    btn.className = 'btn btn-outline btn-lg';
    btn.innerHTML = 'Remove from Wardrobe';
    showToast('Added to Wardrobe');
  }
  
  // Re-render current page if needed
  if (window.renderCurrentPage) {
    window.renderCurrentPage();
  }
}
