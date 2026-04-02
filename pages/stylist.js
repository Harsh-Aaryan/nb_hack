// ═══════════════════════════════════════════════════
// NB HERITAGE — AI STYLIST PAGE
// ═══════════════════════════════════════════════════

let aiState = 'form'; // 'form', 'loading', 'results'
let currentStyle = 'casual'; // default mock outcome

function renderStylist() {
  if (aiState === 'loading') {
    return renderStylistLoading();
  } else if (aiState === 'results') {
    return renderStylistResults();
  }

  const content = `
    <div class="page page-enter">
      <div class="stylist-header reveal">
        <div class="stylist-header__icon">✨</div>
        <h1 class="stylist-header__title">AI Stylist Consultation</h1>
        <p class="stylist-header__desc">Tell us what you're looking for, and our heritage AI will recommend the perfect additions to your rotation.</p>
      </div>

      <div class="stylist-form reveal stagger-1">
        <form id="stylistForm" onsubmit="handleStylistSubmit(event)">
          <div class="form-group">
            <label class="form-label" for="primaryUse">Primary Use</label>
            <select class="form-select" id="primaryUse" required>
              <option value="" disabled selected>Select how you'll wear them</option>
              <option value="casual">Everyday Casual</option>
              <option value="performance">Running & Training</option>
              <option value="heritage">Collecting & Heritage</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Style Preferences (Select multiple)</label>
            <div class="checkbox-group mt-2">
              <label class="checkbox-pill">
                <input type="checkbox" onclick="this.parentElement.classList.toggle('checked')">
                Minimalist
              </label>
              <label class="checkbox-pill">
                <input type="checkbox" onclick="this.parentElement.classList.toggle('checked')">
                Chunky/Dad Shoe
              </label>
              <label class="checkbox-pill">
                <input type="checkbox" onclick="this.parentElement.classList.toggle('checked')">
                Retro Runner
              </label>
              <label class="checkbox-pill">
                <input type="checkbox" onclick="this.parentElement.classList.toggle('checked')">
                Earth Tones
              </label>
              <label class="checkbox-pill">
                <input type="checkbox" onclick="this.parentElement.classList.toggle('checked')">
                Bold Colors
              </label>
            </div>
          </div>

          <div class="form-group mt-8">
            <button type="submit" class="btn btn-primary btn-lg" style="width: 100%">Get Recommendations</button>
          </div>
        </form>
      </div>
    </div>
  `;
  
  return content;
}

function renderStylistLoading() {
  return `
    <div class="page" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70vh;">
      <div class="typing-indicator" style="font-size: 2rem; margin-bottom: var(--space-4)">
        <span></span><span></span><span></span>
      </div>
      <h2 style="font-family: var(--font-heading); font-weight: bold; margin-bottom: var(--space-2)">Analyzing your profile...</h2>
      <p style="color: var(--color-text-muted)">Cross-referencing heritage archives and impact data.</p>
    </div>
  `;
}

function renderStylistResults() {
  const recommendations = AI_RECOMMENDATIONS[currentStyle] || AI_RECOMMENDATIONS.casual;
  
  return `
    <div class="page page-enter">
      <div class="stylist-header reveal">
        <h1 class="stylist-header__title">Your Curated Rotation</h1>
        <p class="stylist-header__desc">Based on your preferences for ${currentStyle} use with an emphasis on our heritage models.</p>
        <button class="btn btn-ghost mt-4" onclick="resetStylist()">← Start Over</button>
      </div>

      <div class="stylist-results reveal stagger-1">
        <div class="stylist-results__header">
          <div class="stylist-results__icon">✨</div>
          <h2 class="stylist-results__title">AI Analysis</h2>
        </div>
        
        <div class="stylist-results__list">
          ${recommendations.map((rec, i) => {
            const product = PRODUCTS.find(p => p.id === rec.productId);
            if (!product) return '';
            
            return `
              <div class="rec-card reveal stagger-${i+2}">
                <div class="rec-card__header">
                  <div class="rec-card__image animate-fade-in">
                    <img src="${product.image}" loading="lazy" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100%\\' height=\\'100%\\' viewBox=\\'0 0 100 100\\'%3E%3Crect width=\\'100\\' height=\\'100\\' fill=\\'%23eee\\'%3E%3C/rect%3E%3C/svg%3E'">
                  </div>
                  <div>
                    <h3 class="rec-card__title">${product.name}</h3>
                    <p style="font-family: var(--font-body); font-size: var(--text-sm); font-weight: bold">$${product.price} • ${product.category}</p>
                  </div>
                  <button class="btn btn-outline btn-sm" style="margin-left: auto;" onclick="showProductModal('${product.id}')">View Details</button>
                </div>
                <p class="rec-card__reason">${rec.reason}</p>
                <div class="rec-card__insights mt-3">
                  ${rec.insights.map(insight => `
                    <span class="tag" style="background: var(--color-bg-warm); color: var(--color-navy)">${insight}</span>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
        
        <div class="stylist-ai-note">
          Recommendations generated autonomously by NB Heritage AI Stylist based on real-time trend aggregations and personal wearing habits.
        </div>
      </div>
    </div>
  `;
}

window.handleStylistSubmit = function(event) {
  event.preventDefault();
  
  const select = document.getElementById('primaryUse');
  if (select && select.value) {
    currentStyle = select.value;
  }
  
  aiState = 'loading';
  const main = document.getElementById('main-content');
  main.innerHTML = renderStylist();
  
  // Simulate AI loading delay
  setTimeout(() => {
    aiState = 'results';
    main.innerHTML = renderStylist();
    if (window.initScrollReveal) window.initScrollReveal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 2000);
}

window.resetStylist = function() {
  aiState = 'form';
  const main = document.getElementById('main-content');
  main.innerHTML = renderStylist();
  if (window.initScrollReveal) window.initScrollReveal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
