/* ============================================
   DummyStore — Shared Components
   Navbar · Footer · Toast · Helpers
   ============================================ */

// ── SVG Icons ──
const icons = {
  sun: `<svg id="sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg id="moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  cart: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  heart: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  thumbsUp: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`,
  thumbsDown: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  chef: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>`,
  arrow: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  quote: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" opacity="0.15"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>`,
};

// ── Determine active page ──
function getActivePage() {
  const path = window.location.pathname;
  if (path.endsWith('index.html') || path === '/' || path.endsWith('/')) return 'home';
  if (path.includes('product-detail')) return 'products';
  if (path.includes('products')) return 'products';
  if (path.includes('recipe-detail')) return 'recipes';
  if (path.includes('recipes')) return 'recipes';
  if (path.includes('post-detail')) return 'posts';
  if (path.includes('posts')) return 'posts';
  if (path.includes('cart')) return 'cart';
  if (path.includes('profile')) return 'profile';
  if (path.includes('login') || path.includes('signup') || path.includes('forgot') || path.includes('reset')) return 'auth';
  return '';
}

// ── Check if user is logged in ──
function isLoggedIn() {
  return !!localStorage.getItem('accessToken');
}
function getLoggedUser() {
  const u = localStorage.getItem('loggedUser');
  return u ? JSON.parse(u) : null;
}
function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('loggedUser');
  window.location.href = 'index.html';
}

// ── Render Navbar ──
function renderNavbar() {
  const active = getActivePage();
  const loggedIn = isLoggedIn();
  const user = getLoggedUser();
  const cartCount = typeof api !== 'undefined' ? api.getCartCount() : 0;

  const navHTML = `
    <nav class="fixed top-0 left-0 right-0 z-50">
      <div class="glass-nav">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <!-- Logo -->
            <a href="index.html" class="flex items-center gap-2.5 group">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center" style="background: var(--btn-bg);">
                <span style="color: var(--btn-text); font-weight:800; font-size:1rem; font-family:'Outfit',sans-serif;">D</span>
              </div>
              <span class="font-bold text-xl" style="font-family:'Outfit',sans-serif; color: var(--color-text);">DummyStore</span>
            </a>

            <!-- Desktop Nav Links -->
            <div class="hidden md:flex items-center gap-7">
              <a href="index.html" class="nav-link ${active === 'home' ? 'active' : ''}">Home</a>
              <a href="products.html" class="nav-link ${active === 'products' ? 'active' : ''}">Products</a>
              <a href="recipes.html" class="nav-link ${active === 'recipes' ? 'active' : ''}">Recipes</a>
              <a href="posts.html" class="nav-link ${active === 'posts' ? 'active' : ''}">Posts</a>
            </div>

            <!-- Right Side -->
            <div class="flex items-center gap-2.5">
              <!-- Cart Dropdown -->
              <div class="relative" id="cart-dropdown-wrap" onmouseenter="openCartDropdown()" onmouseleave="closeCartDropdown()">
                <a href="cart.html" class="btn-glass p-2 rounded-full relative inline-flex" title="Cart">
                  ${icons.cart}
                  <span id="cart-count" class="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold items-center justify-center" style="background:var(--btn-bg);color:var(--btn-text);display:${cartCount > 0 ? 'flex' : 'none'}">${cartCount}</span>
                </a>
                <div id="cart-dropdown" class="absolute right-0 top-full mt-1 w-80 rounded-xl overflow-hidden" style="background:var(--glass-bg-strong);backdrop-filter:blur(20px);border:1px solid var(--glass-border);box-shadow:var(--glass-shadow-hover);z-index:50;display:none">
                  <div class="p-3" style="border-bottom:1px solid var(--glass-border)">
                    <span class="text-sm font-semibold" style="color:var(--color-text)">Shopping Cart</span>
                  </div>
                  <div id="cart-dropdown-items" class="max-h-64 overflow-y-auto"></div>
                  <div class="p-3" style="border-top:1px solid var(--glass-border)">
                    <a href="cart.html" class="btn-primary w-full py-2 rounded-lg text-sm text-center block">View Cart</a>
                  </div>
                </div>
              </div>

              <!-- Theme Toggle -->
              <button onclick="Theme.toggle()" class="btn-glass p-2 rounded-full" id="theme-toggle-btn" title="Toggle theme">
                ${icons.sun}${icons.moon}
              </button>

              ${loggedIn ? `
                <!-- Logged in user -->
                <a href="profile.html" class="hidden sm:flex items-center gap-2 btn-glass px-3 py-1.5 rounded-full">
                  <img src="${user?.image || 'https://dummyjson.com/icon/emilys/40'}" alt="" class="w-7 h-7 rounded-full object-cover">
                  <span class="text-sm font-medium" style="color:var(--color-text)">${user?.firstName || 'User'}</span>
                </a>
                <button onclick="logout()" class="btn-glass px-3 py-1.5 rounded-full text-sm font-medium">Logout</button>
              ` : `
                <a href="login.html" class="hidden sm:inline-flex btn-glass px-4 py-1.5 rounded-full text-sm font-medium">Login</a>
                <a href="signup.html" class="hidden sm:inline-flex btn-primary px-4 py-1.5 rounded-full text-sm">Sign Up</a>
              `}

              <!-- Mobile Menu Button -->
              <button onclick="toggleMobileMenu()" class="md:hidden btn-glass p-2 rounded-lg" id="mobile-menu-btn">
                ${icons.menu}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div id="mobile-menu" class="mobile-menu">
        <button onclick="toggleMobileMenu()" class="absolute top-5 right-5 btn-glass p-2 rounded-full">${icons.close}</button>
        <a href="index.html" class="${active === 'home' ? 'active' : ''}">Home</a>
        <a href="products.html" class="${active === 'products' ? 'active' : ''}">Products</a>
        <a href="recipes.html" class="${active === 'recipes' ? 'active' : ''}">Recipes</a>
        <a href="posts.html" class="${active === 'posts' ? 'active' : ''}">Posts</a>
        ${!loggedIn ? `
          <div class="flex gap-3 mt-6">
            <a href="login.html" class="btn-glass flex-1 text-center py-3 rounded-xl">Login</a>
            <a href="signup.html" class="btn-primary flex-1 text-center py-3 rounded-xl">Sign Up</a>
          </div>
        ` : `
          <button onclick="logout()" class="btn-glass py-3 rounded-xl mt-6 text-center w-full">Logout</button>
        `}
      </div>
    </nav>
    <!-- Spacer for fixed navbar -->
    <div class="h-16"></div>
  `;

  const container = document.getElementById('navbar-container');
  if (container) container.innerHTML = navHTML;

  // Update theme icons after render
  setTimeout(() => Theme.updateIcons(), 10);
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('open');
}

// ── Render Footer ──
function renderFooter() {
  const footerHTML = `
    <footer class="footer-glass mt-20 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <!-- Brand -->
          <div class="md:col-span-1">
            <div class="flex items-center gap-2.5 mb-4">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center" style="background: var(--btn-bg);">
                <span style="color: var(--btn-text); font-weight:800; font-size:1rem; font-family:'Outfit',sans-serif;">D</span>
              </div>
              <span class="font-bold text-xl" style="font-family:'Outfit',sans-serif; color: var(--color-text);">DummyStore</span>
            </div>
            <p class="text-sm leading-relaxed" style="color: var(--color-text-muted);">
              A practice project built on the DummyJSON API. Explore products, recipes, posts and more.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-semibold mb-4" style="color: var(--color-text); font-family:'Outfit',sans-serif;">Explore</h4>
            <ul class="space-y-2.5">
              <li><a href="products.html" class="text-sm hover:underline" style="color: var(--color-text-muted);">Products</a></li>
              <li><a href="recipes.html" class="text-sm hover:underline" style="color: var(--color-text-muted);">Recipes</a></li>
              <li><a href="posts.html" class="text-sm hover:underline" style="color: var(--color-text-muted);">Posts</a></li>
            </ul>
          </div>

          <!-- Account -->
          <div>
            <h4 class="font-semibold mb-4" style="color: var(--color-text); font-family:'Outfit',sans-serif;">Account</h4>
            <ul class="space-y-2.5">
              <li><a href="login.html" class="text-sm hover:underline" style="color: var(--color-text-muted);">Login</a></li>
              <li><a href="signup.html" class="text-sm hover:underline" style="color: var(--color-text-muted);">Sign Up</a></li>
              <li><a href="profile.html" class="text-sm hover:underline" style="color: var(--color-text-muted);">Profile</a></li>
              <li><a href="cart.html" class="text-sm hover:underline" style="color: var(--color-text-muted);">Cart</a></li>
            </ul>
          </div>

          <!-- API -->
          <div>
            <h4 class="font-semibold mb-4" style="color: var(--color-text); font-family:'Outfit',sans-serif;">API</h4>
            <ul class="space-y-2.5">
              <li><a href="https://dummyjson.com/docs" target="_blank" class="text-sm hover:underline" style="color: var(--color-text-muted);">Documentation</a></li>
              <li><a href="https://github.com/Ovi/DummyJSON" target="_blank" class="text-sm hover:underline" style="color: var(--color-text-muted);">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div class="pt-6" style="border-top: 1px solid var(--glass-border);">
          <p class="text-center text-sm" style="color: var(--color-text-muted);">
            &copy; ${new Date().getFullYear()} DummyStore — Powered by
            <a href="https://dummyjson.com" target="_blank" class="underline" style="color: var(--color-text-secondary);">DummyJSON</a>
          </p>
        </div>
      </div>
    </footer>
  `;
  const container = document.getElementById('footer-container');
  if (container) container.innerHTML = footerHTML;
}

// ── Toast Notifications ──
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── Star Rating HTML ──
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let html = '<div class="stars">';
  for (let i = 0; i < full; i++) html += '<span class="star filled">★</span>';
  if (half) html += '<span class="star filled">★</span>';
  for (let i = 0; i < empty; i++) html += '<span class="star">★</span>';
  html += '</div>';
  return html;
}

// ── Scroll Animation Observer ──
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
    observer.observe(el);
  });
}

// ── URL Params helper ──
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// ── Pagination builder ──
function renderPagination(total, limit, currentSkip, onPageClick) {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(currentSkip / limit) + 1;
  if (totalPages <= 1) return '';

  let html = '<div class="pagination mt-10">';

  // Prev
  if (currentPage > 1) {
    html += `<button class="page-btn" onclick="${onPageClick}(${(currentPage - 2) * limit})">‹</button>`;
  }

  // Pages
  const maxVisible = 5;
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

  if (start > 1) {
    html += `<button class="page-btn" onclick="${onPageClick}(0)">1</button>`;
    if (start > 2) html += `<span class="px-1" style="color:var(--color-text-muted)">…</span>`;
  }

  for (let i = start; i <= end; i++) {
    html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="${onPageClick}(${(i - 1) * limit})">${i}</button>`;
  }

  if (end < totalPages) {
    if (end < totalPages - 1) html += `<span class="px-1" style="color:var(--color-text-muted)">…</span>`;
    html += `<button class="page-btn" onclick="${onPageClick}(${(totalPages - 1) * limit})">${totalPages}</button>`;
  }

  // Next
  if (currentPage < totalPages) {
    html += `<button class="page-btn" onclick="${onPageClick}(${currentPage * limit})">›</button>`;
  }

  html += '</div>';
  return html;
}

// ── Cart Dropdown ──
function openCartDropdown() {
  const dd = document.getElementById('cart-dropdown');
  if (dd) { dd.style.display = 'block'; renderCartDropdownItems(); }
}
function closeCartDropdown() {
  const dd = document.getElementById('cart-dropdown');
  if (dd) dd.style.display = 'none';
}
function renderCartDropdownItems() {
  const cart = JSON.parse(localStorage.getItem('dummystore-cart') || '[]');
  const container = document.getElementById('cart-dropdown-items');
  if (!container) return;
  if (!cart.length) {
    container.innerHTML = '<div class="p-4 text-center"><p class="text-sm" style="color:var(--color-text-muted)">Your cart is empty</p></div>';
    return;
  }
  container.innerHTML = cart.slice(0, 5).map(item => `
    <div class="flex items-center gap-3 p-3" style="border-bottom:1px solid var(--glass-border)">
      <img src="${item.thumbnail}" alt="" class="w-10 h-10 rounded-lg object-contain flex-shrink-0" style="background:var(--glass-bg)">
      <div class="flex-1 min-w-0">
        <p class="text-xs font-medium line-clamp-1" style="color:var(--color-text)">${item.title}</p>
        <p class="text-xs" style="color:var(--color-text-muted)">${item.quantity} × $${item.price.toFixed(2)}</p>
      </div>
      <span class="text-xs font-bold flex-shrink-0" style="color:var(--color-text)">$${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  `).join('') + (cart.length > 5 ? '<p class="text-xs text-center py-2" style="color:var(--color-text-muted)">+' + (cart.length - 5) + ' more items</p>' : '');
}
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('dummystore-cart') || '[]');
  const badge = document.getElementById('cart-count');
  if (badge) {
    const count = cart.reduce((sum, i) => sum + i.quantity, 0);
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// ── Init common elements on every page ──
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
  setTimeout(initScrollAnimations, 100);
  setTimeout(updateCartBadge, 200);

  // Update cart badge on changes
  window.addEventListener('cartUpdated', () => { renderNavbar(); updateCartBadge(); });
});
