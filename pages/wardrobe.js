// ═══════════════════════════════════════════════════
// NEW BALANCE - WARDROBE PAGE
// ═══════════════════════════════════════════════════

function wardrobeGetWears(productId) {
  const d = USER_DATA.wardrobeDetails.find(x => x.productId === productId);
  return d ? d.wears : 0;
}

function wardrobeCollectTags(products) {
  const tags = new Set();
  products.forEach(p => {
    const d = USER_DATA.wardrobeDetails.find(x => x.productId === p.id);
    if (d && d.tags) d.tags.forEach(t => tags.add(t));
  });
  return [...tags];
}

function buildWardrobeAnalysis(products) {
  if (!products.length) {
    return 'Add pairs from Discover so the closet AI can scan your rotation. Outputs stay limited to what you own.';
  }
  const cats = [...new Set(products.map(p => formatProductCategory(p.category)))];
  const sorted = [...products].sort((a, b) => wardrobeGetWears(b.id) - wardrobeGetWears(a.id));
  const lead = sorted[0];
  const tags = wardrobeCollectTags(products);
  const tagStr = tags.length ? tags.slice(0, 4).join(', ') : 'everyday';
  return `Model read: ${cats.join(' · ')}. Lead pair ${lead.name} (${wardrobeGetWears(lead.id)} wears). Signal: ${tagStr}.`;
}

function buildPhotoStyleTips(stylePhotos, products) {
  if (!stylePhotos.length || !products.length) return [];
  const sorted = [...products].sort((a, b) => wardrobeGetWears(b.id) - wardrobeGetWears(a.id));
  const a = sorted[0];
  const b = products.find(p => p.id !== a.id) || sorted[1] || a;
  return [
    `AI maps your uploads to ${a.name} for similar proportions.`,
    b.id !== a.id
      ? `Same formulas: swap in ${b.name} when ${a.name} needs a rest day.`
      : `Color blocking in your refs aligns with how ${a.name} reads on foot.`
  ];
}

function renderWardrobe() {
  const stylePhotos = typeof window.getStyleInspoPhotos === 'function' ? window.getStyleInspoPhotos() : [];
  const wardrobeProducts = USER_DATA.wardrobe.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  USER_DATA.impactScore = 85;

  const analysis = buildWardrobeAnalysis(wardrobeProducts);
  const photoTips = buildPhotoStyleTips(stylePhotos, wardrobeProducts);

  const content = `
    <div class="page page-enter wardrobe-page">
      <div class="wardrobe-header reveal">
        <div>
          <h1 class="wardrobe-header__title">Your Rotation</h1>
          <p class="section-header__subtitle mt-1">${wardrobeProducts.length} pairs • ${USER_DATA.stats.totalWears} total wears</p>
        </div>
      </div>

      <section class="wardrobe-ai reveal stagger-1" aria-labelledby="wardrobe-ai-title">
        <div class="wardrobe-ai__panel">
          <header class="wardrobe-ai__head">
            <span class="wardrobe-ai__badge" aria-hidden="true">
              <svg class="wardrobe-ai__badge-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              AI
            </span>
            <div class="wardrobe-ai__head-copy">
              <h2 id="wardrobe-ai-title" class="wardrobe-ai__title">Closet intelligence</h2>
              <p class="wardrobe-ai__tagline">Trained on your rotation and reference photos only.</p>
              <p class="wardrobe-ai__analysis">${analysis}</p>
            </div>
          </header>

          <div class="wardrobe-ai__strip">
            <div class="wardrobe-ai__strip-head">
              <span class="wardrobe-ai__strip-label">Reference images</span>
              <span class="wardrobe-ai__strip-meta">${stylePhotos.length ? `${stylePhotos.length} for the model` : 'Tap + to feed the model'}</span>
            </div>
            ${
              stylePhotos.length
                ? `
            <div class="wardrobe-ai__refs">
              ${stylePhotos
                .slice()
                .reverse()
                .map(
                  ph => `
                <div class="wardrobe-ai__ref">
                  <img src="${ph.dataUrl}" alt="" class="wardrobe-ai__ref-img" loading="lazy">
                  <button type="button" class="wardrobe-ai__ref-remove" onclick="removeStyleInspoPhoto('${ph.id}')" aria-label="Remove photo">×</button>
                </div>
              `
                )
                .join('')}
            </div>
            `
                : `<p class="wardrobe-ai__empty wardrobe-ai__empty--inline">No photos yet.</p>`
            }
          </div>

          ${
            stylePhotos.length && photoTips.length
              ? `
          <div class="wardrobe-ai__photo-ai">
            <span class="wardrobe-ai__photo-ai-label">From your uploads</span>
            <ul class="wardrobe-ai__tips">
              ${photoTips.map(tip => `<li class="wardrobe-ai__tip">${tip}</li>`).join('')}
            </ul>
          </div>
          `
              : ''
          }

          <p class="wardrobe-ai__foot">Closet + refs only. No catalog inference.</p>
        </div>
      </section>

      <h2 class="wardrobe-grid-title reveal">My pairs</h2>
      <div class="wardrobe-grid">
        ${wardrobeProducts.map((p, i) => {
          const details = USER_DATA.wardrobeDetails.find(d => d.productId === p.id) || {
            wears: Math.floor(Math.random() * 20),
            tags: []
          };

          return `
            <div class="wardrobe-card reveal stagger-${i + 1}" onclick="showProductModal('${p.id}')">
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

      <input type="file" id="wardrobePhotoInput" accept="image/*" multiple class="wardrobe-photo-input" aria-hidden="true" tabindex="-1" onchange="handleWardrobePhotoPick(event)">

      <button type="button" class="wardrobe-photo-fab" onclick="document.getElementById('wardrobePhotoInput').click()" aria-label="Add outfit photos for AI" title="Add outfit photos">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
      </button>
    </div>
  `;

  return content;
}
