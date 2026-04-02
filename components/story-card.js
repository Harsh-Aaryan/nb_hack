// ═══════════════════════════════════════════════════
// NB HERITAGE — STORY CARD & IMPACT METER COMPONENTS
// ═══════════════════════════════════════════════════

function createStoryCard(story) {
  const impactConfig = IMPACT_TYPES[story.impactType] || IMPACT_TYPES.community;
  
  return `
    <article class="story-card hover-lift reveal" onclick="showToast('Story full view coming soon')">
      <div class="story-card__image">
        <!-- SVG Placeholder until image loaded -->
        <img class="skeleton-image" src="${story.image}" alt="${story.title}" loading="lazy" onload="this.classList.remove('skeleton-image')" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100%\\' height=\\'100%\\' viewBox=\\'0 0 100 100\\'%3E%3Crect width=\\'100\\' height=\\'100\\' fill=\\'%231b365d\\'%3E%3C/rect%3E%3Ctext x=\\'50\\' y=\\'50\\' font-family=\\'sans-serif\\' font-size=\\'10\\' fill=\\'white\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'%3ENB Story%3C/text%3E%3C/svg%3E'">
        <div class="story-card__overlay">
          <span class="story-card__tag" style="color: ${impactConfig.color}">${impactConfig.icon} ${story.tag}</span>
          <h3 class="story-card__title" style="color: white; margin-bottom: 0;">${story.title}</h3>
        </div>
      </div>
      <div class="story-card__content">
        <p class="story-card__excerpt">${story.excerpt}</p>
        <div class="story-card__meta">
          <span>${new Date(story.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
    </article>
  `;
}

function createImpactMeter(score, label = 'Impact Score') {
  // Score is 0-100.
  // Circle circumference is approx 408 (r=65). 
  // We set stroke-dasharray to 408.
  // offset = 408 - (score / 100) * 408
  const circumference = 408;
  const offset = circumference - (score / 100) * circumference;
  
  // Choose color based on score
  let strokeColor = 'var(--color-red)';
  if (score > 80) strokeColor = 'var(--color-green)';
  else if (score > 60) strokeColor = 'var(--color-gold)';
  else if (score < 40) strokeColor = 'var(--color-text-muted)';
  
  return `
    <div class="impact-meter reveal-scale">
      <svg class="impact-meter__svg" viewBox="0 0 160 160">
        <circle class="impact-meter__bg" cx="80" cy="80" r="65"></circle>
        <circle class="impact-meter__fill" cx="80" cy="80" r="65" stroke="${strokeColor}" style="stroke-dashoffset: ${offset}"></circle>
      </svg>
      <div class="impact-meter__center">
        <div class="impact-meter__value">${score}</div>
        <div class="impact-meter__label">${label}</div>
      </div>
    </div>
  `;
}
