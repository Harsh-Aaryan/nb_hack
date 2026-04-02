// ═══════════════════════════════════════════════════
// NB HERITAGE — FULL APP ROUTER & CORE
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
  
  // Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('Service Worker registered', reg))
        .catch(err => console.error('Service Worker registration failed', err));
    });
  }
});
