// ═══════════════════════════════════════════════════
// NEW BALANCE - DISCOVER PAGE (All grid + AI swipe deck)
// ═══════════════════════════════════════════════════

let discoverTab = 'all';

const DISCOVER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI Recommendations' }
];

const AI_DECK_PRODUCT_IDS = [
  'nb-990v5',
  'nb-2002r',
  'nb-574',
  'nb-550',
  'nb-327',
  'nb-1300',
  'nb-1906r',
  'nb-fresh-foam',
  'nb-rc-elite',
  'nb-made-uk-991',
  'nb-993',
  'nb-608'
];

const STYLE_PHOTOS_KEY = 'nb-style-inspo-photos';
const MAX_STYLE_PHOTOS = 16;
const MAX_PHOTO_BYTES = 900 * 1024;

function getAIRecommendationProducts() {
  const list = AI_DECK_PRODUCT_IDS.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  return list.length ? list : PRODUCTS.slice(0, 8);
}

function getStyleInspoPhotos() {
  try {
    const raw = localStorage.getItem(STYLE_PHOTOS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveStyleInspoPhotos(arr) {
  localStorage.setItem(STYLE_PHOTOS_KEY, JSON.stringify(arr));
}

window.getStyleInspoPhotos = getStyleInspoPhotos;

window.removeStyleInspoPhoto = function (photoId) {
  const next = getStyleInspoPhotos().filter(p => p.id !== photoId);
  saveStyleInspoPhotos(next);
  showToast('Photo removed');
  if ((window.location.hash || '') === '#/wardrobe' && typeof window.renderCurrentPage === 'function') {
    window.renderCurrentPage();
  }
};

function renderDiscoverSwipeDeck(filteredProducts) {
  const n = filteredProducts.length;
  return `
    <div class="discover-deck-wrap reveal">
      <p class="discover-deck__hint">Swipe or tap · Heart saves to wardrobe</p>
      <div class="discover-deck" id="discoverDeck" style="--deck-count: ${n}">
        ${filteredProducts
          .map((p, i) => {
            const z = n - i;
            return `
          <div class="discover-card" style="z-index: ${z}" data-product-id="${p.id}">
            <div class="discover-card__inner">
              <div class="discover-card__ribbon">AI pick</div>
              <div class="discover-card__img-wrap" role="button" tabindex="0" aria-label="View ${p.name.replace(/"/g, '')}">
                <img class="discover-card__img" src="${p.image}" alt="${p.name}" draggable="false" loading="${i < 3 ? 'eager' : 'lazy'}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100%\\' height=\\'100%\\' viewBox=\\'0 0 100 100\\'%3E%3Crect width=\\'100\\' height=\\'100\\' fill=\\'%23eee\\'%3E%3C/rect%3E%3C/svg%3E'">
                <div class="discover-card__badges">
                  ${p.badges && p.badges.length ? createImpactBadgeList(p.badges, BADGE_CONFIG) : ''}
                </div>
              </div>
              <div class="discover-card__info">
                <p class="discover-card__cat">${formatProductCategory(p.category)}</p>
                <h2 class="discover-card__name">${p.name}</h2>
                <p class="discover-card__model">${p.model}</p>
                <p class="discover-card__price">$${p.price}</p>
              </div>
              <div class="discover-card__actions">
                <button type="button" class="discover-card__btn discover-card__btn--pass" aria-label="Skip" data-action="pass">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
                <button type="button" class="discover-card__btn discover-card__btn--save" aria-label="Save to wardrobe" data-action="save">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
              </div>
            </div>
          </div>
        `;
          })
          .join('')}
      </div>
      <div class="discover-deck__empty" id="discoverDeckEmpty" hidden>
        <p class="discover-deck__empty-title">You&apos;re through this stack</p>
        <p class="discover-deck__empty-text">Open the full catalog or come back later for fresh picks.</p>
        <button type="button" class="btn btn-outline" onclick="setDiscoverTab('all')">View all</button>
      </div>
    </div>
  `;
}

function renderDiscover() {
  const isGrid = discoverTab === 'all';
  const gridProducts = PRODUCTS;
  const aiProducts = getAIRecommendationProducts();
  const displayProducts = isGrid ? gridProducts : aiProducts;

  const modeLabel = isGrid ? 'Full catalog' : 'AI-curated stack';

  const content = `
    <div class="page page-enter discover-page">
      <div class="discover-header reveal">
        <h1 class="discover-header__title">Catalog</h1>
        <p class="discover-header__count">${displayProducts.length} silhouettes · ${modeLabel}</p>
      </div>

      <div class="discover-filters reveal">
        <div class="filter-bar discover-tab-bar">
          ${DISCOVER_TABS.map(tab => `
            <button
              type="button"
              class="filter-pill ${discoverTab === tab.id ? 'active' : ''}"
              onclick="setDiscoverTab('${tab.id}')"
            >
              ${tab.label}
            </button>
          `).join('')}
        </div>
      </div>

      ${
        !isGrid && displayProducts.length === 0
          ? `
        <div class="empty-state reveal">
          <div class="empty-state__icon">✨</div>
          <h2 class="empty-state__title">No recommendations yet</h2>
          <p class="empty-state__text">Check back soon for new AI picks.</p>
          <button type="button" class="btn btn-outline" onclick="setDiscoverTab('all')">View all</button>
        </div>
      `
          : isGrid
            ? `
        <div class="discover-grid" id="discoverGrid">
          ${gridProducts.map((p, i) => `
            <div class="reveal stagger-${(i % 10) + 1}">
              ${createProductCard(p, BADGE_CONFIG)}
            </div>
          `).join('')}
        </div>
      `
            : renderDiscoverSwipeDeck(displayProducts)
      }
    </div>
  `;

  return content;
}

window.setDiscoverTab = function (tabId) {
  if (discoverTab === tabId) return;
  if (tabId !== 'all' && tabId !== 'ai') return;
  discoverTab = tabId;
  const main = document.getElementById('main-content');
  main.innerHTML = renderDiscover();
  if (window.initScrollReveal) window.initScrollReveal();
  if (typeof window.initDiscoverDeck === 'function') window.initDiscoverDeck();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.setDiscoverCategory = window.setDiscoverTab;

window.setCategory = function (categoryId) {
  if (categoryId === 'ai') {
    window.setDiscoverTab('ai');
  } else {
    window.setDiscoverTab('all');
  }
};

window.handleWardrobePhotoPick = function (event) {
  const input = event.target;
  const files = input.files;
  if (!files || !files.length) return;

  const existing = getStyleInspoPhotos();
  let added = 0;

  const next = [...existing];
  const readOne = (file) =>
    new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        resolve();
        return;
      }
      if (file.size > MAX_PHOTO_BYTES) {
        showToast('Photo too large (max ~900KB)');
        resolve();
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        if (typeof dataUrl !== 'string') {
          resolve();
          return;
        }
        next.push({
          id: 'snap-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8),
          dataUrl,
          name: file.name,
          createdAt: new Date().toISOString()
        });
        added += 1;
        resolve();
      };
      reader.onerror = () => resolve();
      reader.readAsDataURL(file);
    });

  (async () => {
    for (let i = 0; i < files.length; i++) {
      if (next.length >= MAX_STYLE_PHOTOS) {
        showToast('Photo limit reached (' + MAX_STYLE_PHOTOS + ')');
        break;
      }
      await readOne(files[i]);
    }
    const trimmed = next.slice(-MAX_STYLE_PHOTOS);
    saveStyleInspoPhotos(trimmed);
    if (added) {
      showToast(added === 1 ? 'Saved for AI styling' : added + ' photos saved for AI styling');
    }
    input.value = '';
    if ((window.location.hash || '') === '#/wardrobe' && typeof window.renderCurrentPage === 'function') {
      window.renderCurrentPage();
    }
  })();
};

window.initDiscoverDeck = function () {
  const deck = document.getElementById('discoverDeck');
  if (!deck) return;

  const SWIPE_OFF = 110;
  let activeCard = null;
  let startX = 0;
  let startY = 0;
  let curX = 0;
  let dragging = false;
  let downAt = 0;

  function topCard() {
    return deck.querySelector('.discover-card:not(.discover-card--exit)');
  }

  function setEmptyVisible(show) {
    const empty = document.getElementById('discoverDeckEmpty');
    if (empty) empty.hidden = !show;
  }

  function finishExit(card, dir) {
    const id = card.getAttribute('data-product-id');
    if (dir === 'right' && id) {
      window.addToWardrobe(id);
    }
    card.style.transform = '';
    card.style.transition = '';
    requestAnimationFrame(() => {
      card.classList.add('discover-card--exit', dir === 'right' ? 'discover-card--exit-right' : 'discover-card--exit-left');
    });
    const done = (ev) => {
      if (ev.propertyName && ev.propertyName !== 'transform' && ev.propertyName !== 'opacity') return;
      card.removeEventListener('transitionend', done);
      card.remove();
      if (!topCard()) setEmptyVisible(true);
    };
    card.addEventListener('transitionend', done);
  }

  function onDown(e) {
    const card = e.target.closest('.discover-card');
    if (!card || card.classList.contains('discover-card--exit')) return;
    if (e.target.closest('[data-action]')) return;
    if (card !== topCard()) return;

    activeCard = card;
    startX = e.clientX;
    startY = e.clientY;
    curX = 0;
    downAt = Date.now();
    dragging = true;
    card.style.transition = 'none';
    try {
      card.setPointerCapture(e.pointerId);
    } catch (_) {}
  }

  function onMove(e) {
    if (!dragging || !activeCard) return;
    curX = e.clientX - startX;
    const rot = curX * 0.05;
    activeCard.style.transform = 'translateX(calc(-50% + ' + curX + 'px)) rotate(' + rot + 'deg)';
  }

  function onUp(e) {
    if (!dragging || !activeCard) return;
    const card = activeCard;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const quickTap = Math.abs(dx) < 14 && Math.abs(dy) < 14 && Date.now() - downAt < 320;

    if (quickTap && e.target.closest('.discover-card__img-wrap')) {
      dragging = false;
      activeCard = null;
      try {
        card.releasePointerCapture(e.pointerId);
      } catch (_) {}
      card.style.transition = '';
      card.style.transform = '';
      curX = 0;
      const id = card.getAttribute('data-product-id');
      if (id) showProductModal(id);
      return;
    }

    dragging = false;
    activeCard = null;
    try {
      card.releasePointerCapture(e.pointerId);
    } catch (_) {}

    card.style.transition = '';

    if (curX > SWIPE_OFF) {
      finishExit(card, 'right');
    } else if (curX < -SWIPE_OFF) {
      finishExit(card, 'left');
    } else {
      card.style.transform = '';
    }
    curX = 0;
  }

  deck.addEventListener('pointerdown', onDown);
  deck.addEventListener('pointermove', onMove);
  deck.addEventListener('pointerup', onUp);
  deck.addEventListener('pointercancel', onUp);

  deck.addEventListener(
    'click',
    function (e) {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const card = btn.closest('.discover-card');
      if (!card || card !== topCard()) return;
      e.preventDefault();
      const action = btn.getAttribute('data-action');
      if (action === 'save') finishExit(card, 'right');
      if (action === 'pass') finishExit(card, 'left');
    },
    true
  );

  setEmptyVisible(!topCard());
};

window.handleDiscoverPhotoPick = window.handleWardrobePhotoPick;

