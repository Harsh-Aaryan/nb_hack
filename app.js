// ═══════════════════════════════════════════════════
// NEW BALANCE - FULL APP ROUTER & CORE
// ═══════════════════════════════════════════════════

// Global state and router
const routes = {
  '#/home': renderHome,
  '#/discover': renderDiscover,
  '#/stylist': renderStylist,
  '#/wardrobe': renderWardrobe,
  '#/profile': renderProfile
};

function router() {
  const hash = window.location.hash || '#/home';
  const main = document.getElementById('main-content');
  
  // Find route or fallback to home
  const renderFn = routes[hash] || routes['#/home'];
  
  // Render page
  main.innerHTML = renderFn();
  
  // Update nav active state
  if (typeof updateNavActiveState === 'function') {
    updateNavActiveState();
  }
  
  // Initialize scroll reveal animations for new page content
  initScrollReveal();

  if (hash === '#/discover' && typeof window.initDiscoverDeck === 'function') {
    window.initDiscoverDeck();
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Attach renderCurrentPage to window so modals can trigger a re-render
window.renderCurrentPage = function() {
  const hash = window.location.hash || '#/home';
  const main = document.getElementById('main-content');
  const renderFn = routes[hash] || routes['#/home'];
  main.innerHTML = renderFn();
  initScrollReveal();
  if (hash === '#/discover' && typeof window.initDiscoverDeck === 'function') {
    window.initDiscoverDeck();
  }
};

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if (!window.IntersectionObserver) {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('visible'));
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: stop observing once revealed
        // observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });
  
  revealElements.forEach(el => observer.observe(el));
}

// Global Toast functionality
function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  toast.textContent = message;
  toast.classList.add('visible');
  
  // Clear any existing timeout
  if (toast.hideTimeout) clearTimeout(toast.hideTimeout);
  
  toast.hideTimeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 3000);
}

// Add global addToWardrobe function for product cards
window.addToWardrobe = function(productId) {
  if (!USER_DATA.wardrobe.includes(productId)) {
    USER_DATA.wardrobe.push(productId);
    showToast('Added to Wardrobe');
  } else {
    showToast('Already in Wardrobe');
  }
}

// Mouse-following background functionality
function initMouseBackground() {
  let mouseX = 0;
  let mouseY = 0;
  let bgX = 0;
  let bgY = 0;
  let bgXBlur = 0;
  let bgYBlur = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  });
  
  function updateBackground() {
    // Smooth interpolation for base layer (slower movement)
    bgX += (mouseX * 20 - bgX) * 0.02;
    bgY += (mouseY * 20 - bgY) * 0.02;
    
    // Smooth interpolation for blur layer (faster, opposite direction)
    bgXBlur += (mouseX * -15 - bgXBlur) * 0.03;
    bgYBlur += (mouseY * -15 - bgYBlur) * 0.03;
    
    // Update CSS custom properties
    document.documentElement.style.setProperty('--bg-x', bgX + '%');
    document.documentElement.style.setProperty('--bg-y', bgY + '%');
    document.documentElement.style.setProperty('--bg-x-blur', bgXBlur + '%');
    document.documentElement.style.setProperty('--bg-y-blur', bgYBlur + '%');
    
    requestAnimationFrame(updateBackground);
  }
  
  updateBackground();
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  // Setup routing
  window.addEventListener('hashchange', router);
  
  // Initial render
  router();
  
  // Init navigation
  initNav();
  
  // Init modal container
  renderProductModal();
  
  // Init mouse-following background
  initMouseBackground();
  
  // Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('Service Worker registered', reg))
        .catch(err => console.error('Service Worker registration failed', err));
    });
  }
});
