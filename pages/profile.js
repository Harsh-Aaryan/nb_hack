// ═══════════════════════════════════════════════════
// NEW BALANCE - PROFILE PAGE
// ═══════════════════════════════════════════════════

function renderProfile() {
  const content = `
    <div class="page page-enter">
      <div class="profile-header reveal">
        <div class="profile-avatar hover-grow">${USER_DATA.initials}</div>
        <h1 class="profile-name">${USER_DATA.name}</h1>
        <p class="profile-member">Member since ${USER_DATA.memberSince}</p>
      </div>

      <div class="profile-stats">
        <div class="stat-card reveal stagger-1">
          <div class="stat-card__value">${USER_DATA.stats.totalPairs}</div>
          <div class="stat-card__label">Total Pairs</div>
        </div>
        <div class="stat-card reveal stagger-2">
          <div class="stat-card__value">${USER_DATA.stats.totalWears}</div>
          <div class="stat-card__label">Total Wears</div>
        </div>
        <div class="stat-card reveal stagger-3">
          <div style="font-family: var(--font-heading); font-size: var(--text-xl); font-weight: bold; margin-bottom: var(--space-1); line-height: 1.2">${USER_DATA.stats.favoriteModel}</div>
          <div class="stat-card__label">Favorite</div>
        </div>
      </div>

      <div class="profile-section reveal">
        <h2 class="profile-section__title">AI Automation Level</h2>
        <div class="profile-impact">
          ${createImpactMeter(85, 'Automation')}
          <p class="text-center mt-6 text-muted" style="max-width: 400px; font-size: var(--text-sm)">
            Your AI Style Agent is highly active, currently managing trend forecasting, autonomous restock alerts, and personalized styling suggestions based on your wearing habits.
          </p>
        </div>
      </div>

      <div class="profile-section reveal">
        <h2 class="profile-section__title">Style Profile (AI)</h2>
        <div class="profile-tags">
          ${USER_DATA.styleProfile.map((tag, i) => `
            <span class="tag hover-lift" style="padding: var(--space-2) var(--space-4); font-size: var(--text-sm); border: 1px solid var(--color-border); background: var(--color-surface);">${tag}</span>
          `).join('')}
        </div>
      </div>

      <div class="profile-section reveal">
        <h2 class="profile-section__title">Recent Activity</h2>
        <div class="profile-activity">
          ${USER_DATA.recentActivity.map((activity, i) => `
            <div class="profile-activity__item hover-lift">
              <div class="profile-activity__icon">${activity.icon}</div>
              <div>
                <p class="profile-activity__text">${activity.text}</p>
                <p class="profile-activity__time">${activity.time}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="text-center mt-12 mb-8 reveal">
        <button class="btn btn-ghost text-muted" onclick="logout()">Sign Out</button>
      </div>
    </div>
  `;
  
  return content;
}
