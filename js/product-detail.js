/* ============================================
   DummyStore — Product Detail Page Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const id = getParam('id');
  if (!id) { window.location.href = 'products.html'; return; }
  loadProduct(id);
});

async function loadProduct(id) {
  try {
    const p = await api.getProduct(id);
    document.title = `${p.title} — DummyStore`;
    document.getElementById('breadcrumb-title').textContent = p.title;

    const allImages = p.images && p.images.length ? p.images : [p.thumbnail];

    document.getElementById('product-content').innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Image Gallery -->
        <div class="glass-card rounded-2xl p-6 fade-in">
          <div class="rounded-xl overflow-hidden mb-4 h-80 flex items-center justify-center" style="background: var(--glass-bg);">
            <img id="main-image" src="${allImages[0]}" alt="${p.title}" class="max-h-full max-w-full object-contain transition-all duration-500">
          </div>
          ${allImages.length > 1 ? `
          <div class="flex gap-3 overflow-x-auto pb-2">
            ${allImages.map((img, i) => `
              <button onclick="document.getElementById('main-image').src='${img}';document.querySelectorAll('.thumb-btn').forEach(b=>b.style.borderColor='var(--glass-border)');this.style.borderColor='var(--color-accent)'"
                class="thumb-btn flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all" style="border-color: ${i === 0 ? 'var(--color-accent)' : 'var(--glass-border)'}; background: var(--glass-bg);">
                <img src="${img}" alt="" class="w-full h-full object-contain">
              </button>
            `).join('')}
          </div>` : ''}
        </div>

        <!-- Product Info -->
        <div class="glass-card rounded-2xl p-6 md:p-8 fade-in">
          <div class="flex items-center gap-2 mb-3">
            <span class="badge">${p.category}</span>
            <span class="badge">${p.brand || 'Generic'}</span>
            ${p.discountPercentage > 5 ? `<span class="badge badge-discount">-${Math.round(p.discountPercentage)}%</span>` : ''}
          </div>

          <h1 class="text-2xl md:text-3xl font-bold mb-3" style="font-family:'Outfit',sans-serif; color: var(--color-text);">${p.title}</h1>

          <div class="flex items-center gap-3 mb-4">
            ${renderStars(p.rating)}
            <span class="text-sm" style="color: var(--color-text-muted);">${p.rating.toFixed(1)} / 5</span>
          </div>

          <p class="text-sm leading-relaxed mb-6" style="color: var(--color-text-secondary);">${p.description}</p>

          <!-- Price -->
          <div class="flex items-end gap-3 mb-6">
            <span class="text-3xl font-extrabold" style="color: var(--color-text); font-family:'Outfit',sans-serif;">$${p.price.toFixed(2)}</span>
            ${p.discountPercentage > 5 ? `
              <span class="text-lg line-through" style="color: var(--color-text-muted);">$${(p.price / (1 - p.discountPercentage / 100)).toFixed(2)}</span>
            ` : ''}
          </div>

          <!-- Meta Info -->
          <div class="grid grid-cols-2 gap-3 mb-6">
            <div class="glass rounded-xl p-3 text-center">
              <div class="text-xs mb-1" style="color:var(--color-text-muted)">Stock</div>
              <div class="font-semibold text-sm" style="color: ${p.stock > 10 ? 'var(--success)' : 'var(--error)'};">${p.stock} units</div>
            </div>
            <div class="glass rounded-xl p-3 text-center">
              <div class="text-xs mb-1" style="color:var(--color-text-muted)">Status</div>
              <div class="font-semibold text-sm" style="color:var(--color-text)">${p.availabilityStatus || 'Available'}</div>
            </div>
            <div class="glass rounded-xl p-3 text-center">
              <div class="text-xs mb-1" style="color:var(--color-text-muted)">Warranty</div>
              <div class="font-semibold text-sm" style="color:var(--color-text)">${p.warrantyInformation || 'N/A'}</div>
            </div>
            <div class="glass rounded-xl p-3 text-center">
              <div class="text-xs mb-1" style="color:var(--color-text-muted)">Shipping</div>
              <div class="font-semibold text-sm" style="color:var(--color-text)">${p.shippingInformation || 'Standard'}</div>
            </div>
          </div>

          <!-- Tags -->
          ${p.tags && p.tags.length ? `
          <div class="flex flex-wrap gap-2 mb-6">
            ${p.tags.map(t => `<span class="chip">${t}</span>`).join('')}
          </div>` : ''}

          <!-- Actions -->
          <div class="flex gap-3">
            <button onclick="addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')})" class="btn-primary flex-1 py-3 rounded-xl text-base">
              ${icons.cart} Add to Cart
            </button>
            <button onclick="showToast('Added to wishlist!','success')" class="btn-glass p-3 rounded-xl">
              ${icons.heart}
            </button>
          </div>
        </div>
      </div>
    `;

    // Reviews
    renderReviews(p.reviews || []);
    setTimeout(initScrollAnimations, 50);
  } catch (e) {
    console.error('Product detail error:', e);
    document.getElementById('product-content').innerHTML =
      '<div class="text-center py-20"><p style="color:var(--color-text-muted)">Product not found.</p><a href="products.html" class="btn-primary mt-4 inline-flex">Back to Products</a></div>';
  }
}

function renderReviews(reviews) {
  const container = document.getElementById('reviews-container');
  if (!reviews.length) {
    container.innerHTML = '<p class="col-span-full text-center py-6" style="color:var(--color-text-muted)">No reviews yet.</p>';
    return;
  }
  container.innerHTML = reviews.map(r => `
    <div class="glass-card rounded-xl p-5 fade-in">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style="background: var(--btn-bg); color: var(--btn-text);">
            ${r.reviewerName?.charAt(0) || 'U'}
          </div>
          <div>
            <div class="font-semibold text-sm" style="color:var(--color-text)">${r.reviewerName || 'Anonymous'}</div>
            <div class="text-xs" style="color:var(--color-text-muted)">${r.date ? new Date(r.date).toLocaleDateString() : ''}</div>
          </div>
        </div>
        ${renderStars(r.rating)}
      </div>
      <p class="text-sm" style="color:var(--color-text-secondary)">${r.comment}</p>
    </div>
  `).join('');
}

function addToCart(product) {
  const simplified = { id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail };
  api.addToCart(simplified);
  showToast(`${product.title} added to cart!`, 'success');
}
