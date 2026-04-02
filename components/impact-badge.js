// ═══════════════════════════════════════════════════
// NB HERITAGE — IMPACT BADGE COMPONENT
// ═══════════════════════════════════════════════════

function createImpactBadge(badgeId, config, size = 'normal') {
  const badgeInfo = config[badgeId];
  if (!badgeInfo) return '';
  
  const sizeClass = size === 'large' ? 'impact-badge--large' : '';
  
  return `
    <span class="impact-badge ${badgeInfo.class} ${sizeClass}" title="${badgeInfo.label}">
      <span class="impact-badge__icon">${badgeInfo.icon}</span>
      <span class="impact-badge__label">${badgeInfo.label}</span>
      <div class="impact-badge__pulse"></div>
    </span>
  `;
}

function createImpactBadgeList(badges, config, size = 'normal') {
  if (!badges || badges.length === 0) return '';
  return badges.map(badgeId => createImpactBadge(badgeId, config, size)).join('');
}

if (typeof module !== 'undefined') {
  module.exports = { createImpactBadge, createImpactBadgeList };
}
