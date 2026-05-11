/* ============================================
   DummyStore — Home Page Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  loadStats();
  loadFeaturedProducts();
  loadFeaturedRecipes();
  loadDailyQuote();
  loadRecentPosts();
});

// ── Stats ──
async function loadStats() {
  try {
    const [products, recipes, posts, quotes] = await Promise.all([
      api.getProducts(1, 0),
      api.getRecipes(1, 0),
      api.getPosts(1, 0),
      api.getQuotes(1, 0),
    ]);
    animateCounter('stat-products', products.total);
    animateCounter('stat-recipes', recipes.total);
    animateCounter('stat-posts', posts.total);
    animateCounter('stat-quotes', quotes.total);
  } catch (e) {
    console.error('Stats error:', e);
  }
}

function animateCounter(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const step = Math.max(1, Math.floor(target / 60));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current.toLocaleString();
  }, 20);
}

// ── Featured Products ──
async function loadFeaturedProducts() {
  try {
    const data = await api.getProducts(8, 0);
    const container = document.getElementById('featured-products');
    container.innerHTML = data.products.map(p => `
      <a href="product-detail.html?id=${p.id}" class="glass-card rounded-2xl overflow-hidden group">
        <div class="product-img-wrap h-48 p-4" style="background: var(--glass-bg);">
          <img src="${p.thumbnail}" alt="${p.title}" class="w-full h-full object-contain">
        </div>
        <div class="p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="badge text-xs">${p.category}</span>
            ${p.discountPercentage > 5 ? `<span class="badge badge-discount text-xs">-${Math.round(p.discountPercentage)}%</span>` : ''}
          </div>
          <h3 class="font-semibold text-sm mb-1 line-clamp-2" style="color: var(--color-text); font-family:'Outfit',sans-serif;">${p.title}</h3>
          <div class="flex items-center justify-between mt-3">
            <div>
              <span class="font-bold text-lg" style="color: var(--color-text);">$${p.price.toFixed(2)}</span>
            </div>
            ${renderStars(p.rating)}
          </div>
        </div>
      </a>
    `).join('');
  } catch (e) {
    console.error('Products error:', e);
  }
}

// ── Featured Recipes ──
async function loadFeaturedRecipes() {
  try {
    const data = await api.getRecipes(4, 0);
    const container = document.getElementById('featured-recipes');
    container.innerHTML = data.recipes.map(r => `
      <a href="recipe-detail.html?id=${r.id}" class="glass-card rounded-2xl overflow-hidden group">
        <div class="h-48 overflow-hidden">
          <img src="${r.image}" alt="${r.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
        </div>
        <div class="p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="badge text-xs">${r.cuisine}</span>
            <span class="badge text-xs">${r.difficulty}</span>
          </div>
          <h3 class="font-semibold text-sm mb-2 line-clamp-2" style="color: var(--color-text); font-family:'Outfit',sans-serif;">${r.name}</h3>
          <div class="flex items-center gap-4 text-xs" style="color: var(--color-text-muted);">
            <span class="flex items-center gap-1">${icons.clock} ${r.prepTimeMinutes + r.cookTimeMinutes} min</span>
            <span class="flex items-center gap-1">${icons.chef} ${r.servings} servings</span>
          </div>
        </div>
      </a>
    `).join('');
  } catch (e) {
    console.error('Recipes error:', e);
  }
}

// ── Daily Quote ──
async function loadDailyQuote() {
  try {
    const q = await api.getRandomQuote();
    const container = document.getElementById('quote-card');
    container.innerHTML = `
      <div class="absolute top-4 left-6 opacity-15">${icons.quote}</div>
      <p class="text-xl md:text-2xl font-medium italic leading-relaxed mb-6" style="color: var(--color-text); font-family:'Outfit',sans-serif;">
        "${q.quote}"
      </p>
      <p class="text-sm font-semibold" style="color: var(--color-text-muted);">— ${q.author}</p>
    `;
  } catch (e) {
    console.error('Quote error:', e);
  }
}

// ── Recent Posts ──
async function loadRecentPosts() {
  try {
    const data = await api.getPosts(3, 0);
    const container = document.getElementById('recent-posts');
    container.innerHTML = data.posts.map(p => `
      <a href="post-detail.html?id=${p.id}" class="glass-card rounded-2xl p-6 group">
        <div class="flex flex-wrap gap-2 mb-3">
          ${p.tags.map(t => `<span class="chip text-xs">${t}</span>`).join('')}
        </div>
        <h3 class="font-semibold text-lg mb-2 line-clamp-2 group-hover:underline" style="color: var(--color-text); font-family:'Outfit',sans-serif;">${p.title}</h3>
        <p class="text-sm line-clamp-3 mb-4" style="color: var(--color-text-muted);">${p.body}</p>
        <div class="flex items-center gap-4 text-xs" style="color: var(--color-text-muted);">
          <span class="flex items-center gap-1">${icons.thumbsUp} ${p.reactions?.likes || 0}</span>
          <span class="flex items-center gap-1">${icons.eye} ${p.views || 0}</span>
        </div>
      </a>
    `).join('');
  } catch (e) {
    console.error('Posts error:', e);
  }
}
