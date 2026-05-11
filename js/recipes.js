/* ============================================
   DummyStore — Recipes Page Logic
   ============================================ */

const RECIPES_LIMIT = 9;
let recipeSkip = 0;
let recipeMeal = '';
let recipeTag = '';
let recipeSearch = '';

document.addEventListener('DOMContentLoaded', () => {
  loadRecipeTags();
  loadRecipes();
});

// ── Load Tags ──
async function loadRecipeTags() {
  try {
    const tags = await api.getRecipeTags();
    const container = document.getElementById('tag-chips');
    container.innerHTML = tags.map(t =>
      `<span class="chip text-xs" onclick="filterByTag('${t}')">${t}</span>`
    ).join('');
  } catch (e) { console.error('Tags error:', e); }
}

// ── Load Recipes ──
async function loadRecipes() {
  try {
    let data;
    if (recipeSearch) {
      data = await api.searchRecipes(recipeSearch, RECIPES_LIMIT, recipeSkip);
    } else if (recipeMeal) {
      data = await api.getRecipesByMeal(recipeMeal, RECIPES_LIMIT, recipeSkip);
    } else if (recipeTag) {
      data = await api.getRecipesByTag(recipeTag, RECIPES_LIMIT, recipeSkip);
    } else {
      data = await api.getRecipes(RECIPES_LIMIT, recipeSkip);
    }

    renderRecipes(data.recipes);
    document.getElementById('results-count').textContent = `${data.total}`;
    document.getElementById('pagination-container').innerHTML =
      renderPagination(data.total, RECIPES_LIMIT, recipeSkip, 'goToRecipePage');
  } catch (e) {
    console.error('Recipes error:', e);
    document.getElementById('recipes-grid').innerHTML =
      '<p class="col-span-full text-center py-10" style="color:var(--color-text-muted)">Failed to load recipes.</p>';
  }
}

function renderRecipes(recipes) {
  const container = document.getElementById('recipes-grid');
  if (!recipes.length) {
    container.innerHTML = '<p class="col-span-full text-center py-10" style="color:var(--color-text-muted)">No recipes found.</p>';
    return;
  }
  container.innerHTML = recipes.map(r => `
    <a href="recipe-detail.html?id=${r.id}" class="glass-card rounded-2xl overflow-hidden group">
      <div class="h-52 overflow-hidden relative">
        <img src="${r.image}" alt="${r.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
        <div class="absolute top-3 right-3">
          <span class="badge text-xs" style="background:var(--glass-bg-strong);backdrop-filter:blur(8px)">${r.difficulty}</span>
        </div>
      </div>
      <div class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="badge text-xs">${r.cuisine}</span>
          ${r.mealType && r.mealType.length ? `<span class="badge text-xs">${r.mealType[0]}</span>` : ''}
        </div>
        <h3 class="font-semibold mb-2 line-clamp-2" style="color: var(--color-text); font-family:'Outfit',sans-serif;">${r.name}</h3>
        <div class="flex items-center justify-between text-xs" style="color: var(--color-text-muted);">
          <span class="flex items-center gap-1">${icons.clock} ${r.prepTimeMinutes + r.cookTimeMinutes} min</span>
          <span class="flex items-center gap-1">${icons.chef} ${r.servings} servings</span>
          <span class="flex items-center gap-1">⭐ ${r.rating}</span>
        </div>
      </div>
    </a>
  `).join('');
}

// ── Search ──
let recipeSearchTimeout;
function handleRecipeSearch(event) {
  clearTimeout(recipeSearchTimeout);
  recipeSearchTimeout = setTimeout(() => {
    recipeSearch = event.target.value.trim();
    recipeSkip = 0;
    recipeMeal = '';
    recipeTag = '';
    resetChips();
    loadRecipes();
  }, 400);
}

// ── Meal Filter ──
function filterByMeal(meal) {
  recipeMeal = meal;
  recipeSearch = '';
  recipeTag = '';
  recipeSkip = 0;
  document.getElementById('search-input').value = '';

  document.querySelectorAll('#meal-tabs .chip').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('#tag-chips .chip').forEach(c => c.classList.remove('active'));

  loadRecipes();
}

// ── Tag Filter ──
function filterByTag(tag) {
  recipeTag = tag;
  recipeSearch = '';
  recipeMeal = '';
  recipeSkip = 0;
  document.getElementById('search-input').value = '';

  document.querySelectorAll('#meal-tabs .chip').forEach(c => c.classList.remove('active'));
  document.querySelector('#meal-tabs .chip').classList.add('active');
  document.querySelectorAll('#tag-chips .chip').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');

  loadRecipes();
}

function resetChips() {
  document.querySelectorAll('#meal-tabs .chip').forEach(c => c.classList.remove('active'));
  document.querySelector('#meal-tabs .chip')?.classList.add('active');
  document.querySelectorAll('#tag-chips .chip').forEach(c => c.classList.remove('active'));
}

// ── Pagination ──
function goToRecipePage(skip) {
  recipeSkip = skip;
  loadRecipes();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
