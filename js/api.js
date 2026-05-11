/* ============================================
   DummyStore — API Service Layer
   ============================================ */

const API_BASE = 'https://dummyjson.com';

const api = {
  // ── Generic fetch wrapper ──
  async get(endpoint) {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error(`API GET ${endpoint}:`, err);
      throw err;
    }
  },

  async post(endpoint, body) {
    try {
      const headers = { 'Content-Type': 'application/json' };
      const token = localStorage.getItem('accessToken');
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || `HTTP ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.error(`API POST ${endpoint}:`, err);
      throw err;
    }
  },

  // ── Products ──
  getProducts(limit = 20, skip = 0, select = '') {
    let url = `/products?limit=${limit}&skip=${skip}`;
    if (select) url += `&select=${select}`;
    return this.get(url);
  },
  getProduct(id) { return this.get(`/products/${id}`); },
  searchProducts(q, limit = 20, skip = 0) {
    return this.get(`/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`);
  },
  getProductCategories() { return this.get('/products/categories'); },
  getProductsByCategory(cat, limit = 20, skip = 0) {
    return this.get(`/products/category/${encodeURIComponent(cat)}?limit=${limit}&skip=${skip}`);
  },
  sortProducts(sortBy = 'title', order = 'asc', limit = 20, skip = 0) {
    return this.get(`/products?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`);
  },

  // ── Recipes ──
  getRecipes(limit = 20, skip = 0) { return this.get(`/recipes?limit=${limit}&skip=${skip}`); },
  getRecipe(id) { return this.get(`/recipes/${id}`); },
  searchRecipes(q, limit = 20, skip = 0) {
    return this.get(`/recipes/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`);
  },
  getRecipeTags() { return this.get('/recipes/tags'); },
  getRecipesByTag(tag, limit = 20, skip = 0) {
    return this.get(`/recipes/tag/${encodeURIComponent(tag)}?limit=${limit}&skip=${skip}`);
  },
  getRecipesByMeal(type, limit = 20, skip = 0) {
    return this.get(`/recipes/meal-type/${encodeURIComponent(type)}?limit=${limit}&skip=${skip}`);
  },

  // ── Posts ──
  getPosts(limit = 20, skip = 0) { return this.get(`/posts?limit=${limit}&skip=${skip}`); },
  getPost(id) { return this.get(`/posts/${id}`); },
  searchPosts(q, limit = 20, skip = 0) {
    return this.get(`/posts/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`);
  },
  getPostComments(id) { return this.get(`/posts/${id}/comments`); },
  getPostTags() { return this.get('/posts/tags'); },

  // ── Quotes ──
  getRandomQuote() { return this.get('/quotes/random'); },
  getQuotes(limit = 10, skip = 0) { return this.get(`/quotes?limit=${limit}&skip=${skip}`); },

  // ── Users ──
  getUser(id) { return this.get(`/users/${id}`); },

  // ── Auth ──
  login(username, password) {
    return this.post('/auth/login', { username, password, expiresInMins: 60 });
  },
  signup(userData) { return this.post('/users/add', userData); },
  getAuthUser() {
    const token = localStorage.getItem('accessToken');
    return fetch(`${API_BASE}/auth/me`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    }).then(r => r.json());
  },

  // ── Cart (localStorage) ──
  getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  },
  addToCart(product) {
    const cart = this.getCart();
    const existing = cart.find(i => i.id === product.id);
    if (existing) { existing.quantity++; }
    else { cart.push({ ...product, quantity: 1 }); }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    return cart;
  },
  removeFromCart(productId) {
    let cart = this.getCart().filter(i => i.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    return cart;
  },
  getCartCount() {
    return this.getCart().reduce((sum, i) => sum + i.quantity, 0);
  },
};
