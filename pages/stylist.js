// ═══════════════════════════════════════════════════
// NEW BALANCE - AI STYLIST PAGE
// ═══════════════════════════════════════════════════

let aiState = 'form'; // 'form', 'loading', 'results'
let currentStyle = 'casual';

function getTrendSignals() {
  return typeof SOCIAL_TREND_SIGNALS !== 'undefined'
    ? SOCIAL_TREND_SIGNALS
    : { trends: [], refreshedLabel: '', windowLabel: '' };
}

function renderTrendRail(trends, options) {
  const compact = options && options.compact;
  const slim = options && options.slim;
  if (!trends || !trends.length) {
    return `<p class="stylist-trends__empty">Trend data will load here.</p>`;
  }

  const railClass =
    'stylist-trends__rail' +
    (slim || compact ? ' stylist-trends__rail--slim' : '') +
    (compact ? ' stylist-trends__rail--compact' : '');
  const cardClass =
    slim || compact ? 'trend-card trend-card--slim' : 'trend-card';
  const showHeat = !slim && !compact;

  return `
    <div class="${railClass}" role="list">
      ${trends.map((t, i) => {
        const up = t.momentumPct >= 0;
        const mom = (up ? '+' : '') + t.momentumPct + '%';
        const plat = t.platform === 'tiktok' ? 'TikTok' : 'Instagram';
        const platShort = t.platform === 'tiktok' ? 'TT' : 'IG';
        return `
          <article class="${cardClass} reveal stagger-${Math.min(i + 1, 6)}" role="listitem">
            <div class="trend-card__top">
              <span class="trend-card__platform trend-card__platform--${t.platform}" aria-label="${plat}">${platShort}</span>
              <span class="trend-card__mom${up ? ' trend-card__mom--up' : ' trend-card__mom--down'}">${mom}</span>
            </div>
            <h3 class="trend-card__tag">${t.hashtag}</h3>
            <p class="trend-card__snippet">${t.snippet}</p>
            ${showHeat ? `
            <div class="trend-card__heat" aria-hidden="true">
              <span class="trend-card__heat-label">Buzz</span>
              <div class="trend-card__heat-track">
                <span class="trend-card__heat-fill" style="width: ${t.heatScore}%"></span>
              </div>
            </div>
            ` : `
            <div class="trend-card__heat trend-card__heat--micro" aria-hidden="true">
              <div class="trend-card__heat-track">
                <span class="trend-card__heat-fill" style="width: ${t.heatScore}%"></span>
              </div>
            </div>
            `}
            <p class="trend-card__nb"><span class="trend-card__nb-label">Pick</span> ${t.nbAngle}</p>
          </article>
        `;
      }).join('')}
    </div>
  `;
}

function renderTrendAnalysisBlock(options) {
  const compact = options && options.compact;
  const embedded = options && options.embedded;
  const data = getTrendSignals();
  const trends = data.trends || [];

  if (compact && !embedded) {
    return `
      <section class="stylist-trends stylist-trends--compact reveal stagger-2" aria-labelledby="stylist-trends-compact-title">
        <div class="stylist-trends__head stylist-trends__head--tight">
          <h2 id="stylist-trends-compact-title" class="stylist-trends__title stylist-trends__title--sm">Trending now</h2>
          <span class="stylist-trends__meta">${data.refreshedLabel || ''}</span>
        </div>
        ${renderTrendRail(trends.slice(0, 4), { compact: true, slim: true })}
      </section>
    `;
  }

  if (embedded) {
    return `
      <section class="stylist-trends stylist-trends--embedded reveal stagger-2" aria-labelledby="stylist-trends-embed-title">
        <div class="stylist-trends__head stylist-trends__head--embed stylist-trends__head--tight">
          <div>
            <h2 id="stylist-trends-embed-title" class="stylist-trends__title stylist-trends__title--sm">Trending now</h2>
            <p class="stylist-trends__subtitle stylist-trends__subtitle--inline">${data.windowLabel || ''} · ${data.refreshedLabel || ''}</p>
          </div>
        </div>
        <p class="stylist-trends__embed-hint">We factor these into your recommendations.</p>
        ${renderTrendRail(trends, { slim: true })}
      </section>
    `;
  }

  return `
    <section class="stylist-trends reveal stagger-1" aria-labelledby="stylist-trends-title">
      <div class="stylist-trends__head">
        <div>
          <h2 id="stylist-trends-title" class="stylist-trends__title">Trending now</h2>
          <p class="stylist-trends__subtitle">${data.windowLabel || ''}</p>
        </div>
        <span class="stylist-trends__meta">${data.refreshedLabel || ''}</span>
      </div>
      ${renderTrendRail(trends)}
      <p class="stylist-trends__footnote">
        <span class="stylist-trends__pulse" aria-hidden="true"></span>
        Trend data updates throughout the day.
      </p>
    </section>
  `;
}

function renderStylist() {
  if (aiState === 'loading') {
    return renderStylistLoading();
  } else if (aiState === 'results') {
    return renderStylistResults();
  }

  return `
    <div class="page page-enter stylist-page">
      <form id="stylistForm" class="stylist-panel reveal" onsubmit="handleStylistSubmit(event)">
        <div class="stylist-panel__intro">
          <h1 class="stylist-panel__title">Find your pair</h1>
          <p class="stylist-panel__lead">Two quick taps. We match you to New Balance using your goals and what people are wearing on social.</p>
        </div>

        <fieldset class="stylist-field">
          <legend class="stylist-field__legend">What are you shopping for?</legend>
          <div class="stylist-pick-grid" role="radiogroup" aria-label="Primary use">
            <label class="stylist-pick">
              <input type="radio" name="stylistPrimary" value="casual" class="stylist-pick__input" checked>
              <span class="stylist-pick__card">
                <span class="stylist-pick__icon" aria-hidden="true">👟</span>
                <span class="stylist-pick__title">Everyday</span>
                <span class="stylist-pick__hint">Casual &amp; street</span>
              </span>
            </label>
            <label class="stylist-pick">
              <input type="radio" name="stylistPrimary" value="performance" class="stylist-pick__input">
              <span class="stylist-pick__card">
                <span class="stylist-pick__icon" aria-hidden="true">🏃</span>
                <span class="stylist-pick__title">Training</span>
                <span class="stylist-pick__hint">Running &amp; workouts</span>
              </span>
            </label>
            <label class="stylist-pick">
              <input type="radio" name="stylistPrimary" value="classics" class="stylist-pick__input">
              <span class="stylist-pick__card">
                <span class="stylist-pick__icon" aria-hidden="true">✦</span>
                <span class="stylist-pick__title">Collectors</span>
                <span class="stylist-pick__hint">Made in USA / UK, limited</span>
              </span>
            </label>
          </div>
        </fieldset>

        <fieldset class="stylist-field">
          <legend class="stylist-field__legend">Style notes <span class="stylist-optional">optional</span></legend>
          <p class="stylist-field__hint" id="vibe-hint">Tap anything that sounds like you.</p>
          <div class="stylist-vibe-grid" role="group" aria-describedby="vibe-hint">
            <label class="stylist-vibe">
              <input type="checkbox" class="stylist-vibe__input" onclick="this.closest('.stylist-vibe').classList.toggle('stylist-vibe--on', this.checked)">
              <span class="stylist-vibe__label">Minimal</span>
            </label>
            <label class="stylist-vibe">
              <input type="checkbox" class="stylist-vibe__input" onclick="this.closest('.stylist-vibe').classList.toggle('stylist-vibe--on', this.checked)">
              <span class="stylist-vibe__label">Chunky / dad shoe</span>
            </label>
            <label class="stylist-vibe">
              <input type="checkbox" class="stylist-vibe__input" onclick="this.closest('.stylist-vibe').classList.toggle('stylist-vibe--on', this.checked)">
              <span class="stylist-vibe__label">Retro runner</span>
            </label>
            <label class="stylist-vibe">
              <input type="checkbox" class="stylist-vibe__input" onclick="this.closest('.stylist-vibe').classList.toggle('stylist-vibe--on', this.checked)">
              <span class="stylist-vibe__label">Earth tones</span>
            </label>
            <label class="stylist-vibe">
              <input type="checkbox" class="stylist-vibe__input" onclick="this.closest('.stylist-vibe').classList.toggle('stylist-vibe--on', this.checked)">
              <span class="stylist-vibe__label">Bold colors</span>
            </label>
          </div>
        </fieldset>

        ${renderTrendAnalysisBlock({ embedded: true })}

        <div class="stylist-cta">
          <button type="submit" class="btn btn-primary btn-lg stylist-submit">See my picks</button>
        </div>
      </form>
    </div>
  `;
}

function renderStylistLoading() {
  return `
    <div class="page stylist-page stylist-page--loading">
      <div class="stylist-loading">
        <div class="stylist-loading__ring" aria-hidden="true"></div>
        <h2 class="stylist-loading__title">Finding picks for you</h2>
        <p class="stylist-loading__line">Blending your answers with trending styles…</p>
        <p class="stylist-loading__line stylist-loading__line--muted">Almost there.</p>
      </div>
    </div>
  `;
}

function renderStylistResults() {
  const recommendations = AI_RECOMMENDATIONS[currentStyle] || AI_RECOMMENDATIONS.casual;
  const useLabel =
    currentStyle === 'performance'
      ? 'training &amp; runs'
      : currentStyle === 'classics'
        ? 'collectors &amp; limited runs'
        : 'everyday wear';

  return `
    <div class="page page-enter stylist-page stylist-page--results">
      <header class="stylist-result-head reveal">
        <button type="button" class="stylist-result-head__back" onclick="resetStylist()" aria-label="Start over">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div class="stylist-result-head__text">
          <h1 class="stylist-result-head__title">Your picks</h1>
          <p class="stylist-result-head__sub">For <strong>${useLabel}</strong>, with social trends in the mix.</p>
        </div>
      </header>

      <div class="stylist-results stylist-results--fresh reveal stagger-1">
        <div class="stylist-results__list">
          ${recommendations.map((rec, i) => {
            const product = PRODUCTS.find(p => p.id === rec.productId);
            if (!product) return '';

            return `
              <article class="stylist-rec reveal stagger-${Math.min(i + 2, 8)}">
                <div class="stylist-rec__visual" onclick="showProductModal('${product.id}')">
                  <img src="${product.image}" loading="lazy" alt="${product.name}" class="stylist-rec__img" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100%\\' height=\\'100%\\' viewBox=\\'0 0 100 100\\'%3E%3Crect width=\\'100\\' height=\\'100\\' fill=\\'%23eee\\'%3E%3C/rect%3E%3C/svg%3E'">
                  <span class="stylist-rec__rank">${i + 1}</span>
                </div>
                <div class="stylist-rec__body">
                  <div class="stylist-rec__top">
                    <h2 class="stylist-rec__name">${product.name}</h2>
                    <p class="stylist-rec__meta">$${product.price} · ${formatProductCategory(product.category)}</p>
                  </div>
                  <p class="stylist-rec__why">${rec.reason}</p>
                  <div class="stylist-rec__tags">
                    ${rec.insights.map(insight => `<span class="stylist-rec__tag">${insight}</span>`).join('')}
                  </div>
                  <button type="button" class="btn btn-outline btn-sm stylist-rec__btn" onclick="showProductModal('${product.id}')">Details &amp; add to wardrobe</button>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </div>

      ${renderTrendAnalysisBlock({ compact: true })}

      <p class="stylist-footnote reveal">Want different picks? Tap back and change your answers.</p>
    </div>
  `;
}

window.handleStylistSubmit = function (event) {
  event.preventDefault();

  const picked = document.querySelector('input[name="stylistPrimary"]:checked');
  if (picked && picked.value) {
    currentStyle = picked.value;
  }

  aiState = 'loading';
  const main = document.getElementById('main-content');
  main.innerHTML = renderStylist();

  setTimeout(() => {
    aiState = 'results';
    main.innerHTML = renderStylist();
    if (window.initScrollReveal) window.initScrollReveal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 1600);
};

window.resetStylist = function () {
  aiState = 'form';
  const main = document.getElementById('main-content');
  main.innerHTML = renderStylist();
  if (window.initScrollReveal) window.initScrollReveal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
