// ═══════════════════════════════════════════════════
// NB HERITAGE — NAV COMPONENT
// ═══════════════════════════════════════════════════

const NAV_ITEMS = [
  { id: 'home', label: 'Archive', hash: '#/home', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>' },
  { id: 'discover', label: 'Discover', hash: '#/discover', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' },
  { id: 'stylist', label: 'AI Stylist', hash: '#/stylist', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>' },
  { id: 'wardrobe', label: 'Wardrobe', hash: '#/wardrobe', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>' },
  { id: 'profile', label: 'Profile', hash: '#/profile', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>' }
];

function renderNav() {
  const currentHash = window.location.hash || '#/home';
  
  return `
    <header class="nav-top">
      <div class="nav-top__container">
        <a href="#/home" class="nav-top__logo">New Balance</a>
        <div class="nav-top__tabs">
          ${NAV_ITEMS.map(item => `
            <a href="${item.hash}" class="nav-top__item ${currentHash === item.hash ? 'active' : ''}" data-id="${item.id}">
              ${item.label}
            </a>
          `).join('')}
        </div>
      </div>
    </header>
    <header class="nav-mobile-header">
      <div class="nav-mobile-header__logo">New Balance</div>
    </header>
    <nav class="nav-bottom">
      ${NAV_ITEMS.map(item => `
        <a href="${item.hash}" class="nav-bottom__item ${currentHash === item.hash ? 'active' : ''}" data-id="${item.id}">
          ${item.icon}
          <span class="nav-bottom__label">${item.label}</span>
        </a>
      `).join('')}
    </nav>
  `;
}

function updateNavActiveState() {
  const currentHash = window.location.hash || '#/home';
  document.querySelectorAll('.nav-bottom__item, .nav-top__item').forEach(item => {
    if (item.getAttribute('href') === currentHash) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

function initNav() {
  window.addEventListener('hashchange', updateNavActiveState);
  document.body.insertAdjacentHTML('beforeend', renderNav());
}
