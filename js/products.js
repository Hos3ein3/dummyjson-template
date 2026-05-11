/* ============================================
   DummyStore — Products Page Logic
   ============================================ */

const PRODUCTS_LIMIT = 12;
let currentSkip = 0;
let currentCategory = '';
let currentSearch = '';
let currentSort = '';

document.addEventListener('DOMContentLoaded', () => {
  loadCategories();
  loadProducts();
});

// ── Load Categories ──
async function loadCategories() {
  try {
    const categories = await api.getProductCategories();
    const container = document.getElementById('category-chips');
    container.innerHTML = `<span class="chip active" onclick="filterByCategory('')">All</span>` +
      categories.map(c => `<span class="chip" onclick="filterByCategory('${c.slug}')">${c.name}</span>`).join('');
  } catch (e) {
    console.error('Categories error:', e);
  }
}

// ── Load Products ──
async function loadProducts() {
  try {
    let data;
    if (currentSearch) {
      data = await api.searchProducts(currentSearch, PRODUCTS_LIMIT, currentSkip);
    } else if (currentCategory) {
      data = await api.getProductsByCategory(currentCategory, PRODUCTS_LIMIT, currentSkip);
    } else if (currentSort) {
      const [sortBy, order] = currentSort.split('-');
      data = await api.sortProducts(sortBy, order, PRODUCTS_LIMIT, currentSkip);
    } else {
      data = await api.getProducts(PRODUCTS_LIMIT, currentSkip);
    }

    renderProducts(data.products);
    document.getElementById('results-count').textContent = `${data.total}`;

    document.getElementById('pagination-container').innerHTML =
      renderPagination(data.total, PRODUCTS_LIMIT, currentSkip, 'goToPage');
  } catch (e) {
    console.error('Products error:', e);
    document.getElementById('products-grid').innerHTML =
      '<p class="col-span-full text-center py-10" style="color:var(--color-text-muted)">Failed to load products. Please try again.</p>';
  }
}

function renderProducts(products) {
  const container = document.getElementById('products-grid');
  if (!products.length) {
    container.innerHTML = '<p class="col-span-full text-center py-10" style="color:var(--color-text-muted)">No products found.</p>';
    return;
  }
  container.innerHTML = products.map(p => `
    <a href="product-detail.html?id=${p.id}" class="glass-card rounded-2xl overflow-hidden group">
      <div class="product-img-wrap h-52 p-4">
        <img src="${p.thumbnail}" alt="${p.title}" class="w-full h-full object-contain" loading="lazy">
      </div>
      <div class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="badge text-xs">${p.category}</span>
          ${p.discountPercentage > 5 ? `<span class="badge badge-discount text-xs">-${Math.round(p.discountPercentage)}%</span>` : ''}
        </div>
        <h3 class="font-semibold text-sm mb-1 line-clamp-2" style="color: var(--color-text); font-family:'Outfit',sans-serif;">${p.title}</h3>
        <p class="text-xs line-clamp-2 mb-3" style="color: var(--color-text-muted);">${p.description || ''}</p>
        <div class="flex items-center justify-between">
          <div>
            <span class="font-bold text-lg" style="color: var(--color-text);">$${p.price.toFixed(2)}</span>
          </div>
          ${renderStars(p.rating)}
        </div>
        <div class="flex items-center gap-2 mt-3">
          <span class="text-xs px-2 py-0.5 rounded-md" style="background: ${p.stock > 10 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'}; color: ${p.stock > 10 ? 'var(--success)' : 'var(--error)'};">
            ${p.stock > 10 ? 'In Stock' : p.stock > 0 ? `Only ${p.stock} left` : 'Out of Stock'}
          </span>
          <span class="text-xs" style="color:var(--color-text-muted)">${p.brand || ''}</span>
        </div>
      </div>
    </a>
  `).join('');
}

// ── Search ──
let searchTimeout;
function handleSearch(event) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentSearch = event.target.value.trim();
    currentSkip = 0;
    currentCategory = '';
    // Reset category chips
    document.querySelectorAll('#category-chips .chip').forEach(c => c.classList.remove('active'));
    document.querySelector('#category-chips .chip')?.classList.add('active');
    loadProducts();
  }, 400);
}

// ── Category Filter ──
function filterByCategory(slug) {
  currentCategory = slug;
  currentSearch = '';
  currentSkip = 0;
  document.getElementById('search-input').value = '';

  // Update active chip
  document.querySelectorAll('#category-chips .chip').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');

  loadProducts();
}

// ── Sort ──
function handleSort() {
  currentSort = document.getElementById('sort-select').value;
  currentSkip = 0;
  currentSearch = '';
  currentCategory = '';
  loadProducts();
}

// ── Pagination ──
function goToPage(skip) {
  currentSkip = skip;
  loadProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
