/* ============================================
   DummyStore — Cart Page Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();
});

function getCart() {
  return JSON.parse(localStorage.getItem('dummystore-cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('dummystore-cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const badge = document.getElementById('cart-count');
  if (badge) {
    const count = cart.reduce((sum, i) => sum + i.quantity, 0);
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

function renderCartPage() {
  const cart = getCart();
  const container = document.getElementById('cart-items-container');
  const summary = document.getElementById('cart-summary');

  if (!cart.length) {
    container.innerHTML = `
      <div class="glass-card rounded-2xl p-8 text-center">
        <div class="text-5xl mb-4">🛒</div>
        <h2 class="text-xl font-bold mb-2" style="font-family:'Outfit';color:var(--color-text)">Your cart is empty</h2>
        <p class="text-sm mb-6" style="color:var(--color-text-muted)">Looks like you haven't added anything yet.</p>
        <a href="products.html" class="btn-primary rounded-xl inline-flex">Browse Products</a>
      </div>
    `;
    summary.innerHTML = `
      <h3 class="font-semibold mb-4" style="font-family:'Outfit';color:var(--color-text)">Order Summary</h3>
      <p class="text-sm" style="color:var(--color-text-muted)">No items in cart.</p>
    `;
    return;
  }

  // Render items
  container.innerHTML = `
    <div class="space-y-3">
      ${cart.map((item, idx) => `
        <div class="glass-card rounded-2xl p-4 fade-in">
          <div class="flex items-center gap-4">
            <img src="${item.thumbnail}" alt="${item.title}" class="w-20 h-20 rounded-xl object-contain flex-shrink-0" style="background:var(--glass-bg)">
            <div class="flex-1 min-w-0">
              <a href="product-detail.html?id=${item.id}" class="font-semibold text-sm line-clamp-1 hover:underline" style="color:var(--color-text);font-family:'Outfit'">${item.title}</a>
              <p class="text-xs mt-0.5" style="color:var(--color-text-muted)">${item.category || ''}</p>
              <div class="flex items-center gap-1 mt-1">
                ${item.discountPercentage ? `<span class="text-xs line-through" style="color:var(--color-text-muted)">$${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}</span>` : ''}
                <span class="font-bold text-sm" style="color:var(--color-text)">$${item.price.toFixed(2)}</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="changeQty(${idx}, -1)" class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style="background:var(--glass-bg);border:1px solid var(--glass-border);color:var(--color-text);cursor:pointer">−</button>
              <span class="w-8 text-center font-semibold text-sm" style="color:var(--color-text)">${item.quantity}</span>
              <button onclick="changeQty(${idx}, 1)" class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style="background:var(--glass-bg);border:1px solid var(--glass-border);color:var(--color-text);cursor:pointer">+</button>
            </div>
            <div class="text-right ml-2">
              <div class="font-bold text-sm" style="color:var(--color-text)">$${(item.price * item.quantity).toFixed(2)}</div>
              <button onclick="removeItem(${idx})" class="text-xs mt-1" style="color:var(--error);cursor:pointer">Remove</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="mt-4 flex justify-between">
      <button onclick="clearCart()" class="text-sm font-medium" style="color:var(--error);cursor:pointer;background:none;border:none">Clear Cart</button>
      <a href="products.html" class="text-sm font-medium hover:underline" style="color:var(--color-text-muted)">← Continue Shopping</a>
    </div>
  `;

  // Render summary
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  summary.innerHTML = `
    <h3 class="font-semibold mb-4" style="font-family:'Outfit';color:var(--color-text)">Order Summary</h3>
    <div class="space-y-2.5 text-sm">
      <div class="flex justify-between"><span style="color:var(--color-text-muted)">Items (${totalItems})</span><span style="color:var(--color-text)">$${subtotal.toFixed(2)}</span></div>
      <div class="flex justify-between"><span style="color:var(--color-text-muted)">Shipping</span><span style="color:${shipping === 0 ? 'var(--success)' : 'var(--color-text)'}">${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span></div>
      <div class="flex justify-between"><span style="color:var(--color-text-muted)">Tax (8%)</span><span style="color:var(--color-text)">$${tax.toFixed(2)}</span></div>
      <div class="pt-2" style="border-top:1px solid var(--glass-border)">
        <div class="flex justify-between"><span class="font-bold" style="color:var(--color-text)">Total</span><span class="font-bold text-lg" style="color:var(--color-text)">$${total.toFixed(2)}</span></div>
      </div>
    </div>
    ${shipping > 0 ? `<p class="text-xs mt-3" style="color:var(--color-text-muted)">💡 Free shipping on orders over $50</p>` : ''}
    <button class="btn-primary w-full py-3 rounded-xl mt-5 text-sm" onclick="showToast('Checkout is simulated!','success')">Proceed to Checkout</button>
    <div class="mt-3 p-3 rounded-xl text-center" style="background:var(--glass-bg)">
      <p class="text-xs" style="color:var(--color-text-muted)">🔒 Secure checkout · 30-day returns</p>
    </div>
  `;
}

function changeQty(idx, delta) {
  const cart = getCart();
  cart[idx].quantity = Math.max(1, cart[idx].quantity + delta);
  saveCart(cart);
  renderCartPage();
}

function removeItem(idx) {
  const cart = getCart();
  const removed = cart.splice(idx, 1);
  saveCart(cart);
  renderCartPage();
  showToast(`${removed[0].title} removed from cart`, 'error');
}

function clearCart() {
  if (confirm('Remove all items from cart?')) {
    saveCart([]);
    renderCartPage();
    showToast('Cart cleared', 'error');
  }
}
