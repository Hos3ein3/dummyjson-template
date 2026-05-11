/* ============================================
   DummyStore — Recipe Detail Page Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const id = getParam('id');
  if (!id) { window.location.href = 'recipes.html'; return; }
  loadRecipe(id);
});

async function loadRecipe(id) {
  try {
    const r = await api.getRecipe(id);
    document.title = `${r.name} — DummyStore`;
    document.getElementById('breadcrumb-title').textContent = r.name;

    const container = document.getElementById('recipe-content');
    container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Hero -->
        <div class="glass-card rounded-3xl overflow-hidden mb-8 fade-in">
          <div class="relative h-64 md:h-96">
            <img src="${r.image}" alt="${r.name}" class="w-full h-full object-cover">
            <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%);"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div class="flex flex-wrap gap-2 mb-3">
                <span class="badge text-xs" style="background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);color:#fff;border-color:rgba(255,255,255,0.2)">${r.cuisine}</span>
                <span class="badge text-xs" style="background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);color:#fff;border-color:rgba(255,255,255,0.2)">${r.difficulty}</span>
                ${r.mealType ? r.mealType.map(m => `<span class="badge text-xs" style="background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);color:#fff;border-color:rgba(255,255,255,0.2)">${m}</span>`).join('') : ''}
              </div>
              <h1 class="text-2xl md:text-4xl font-bold text-white" style="font-family:'Outfit',sans-serif;">${r.name}</h1>
            </div>
          </div>
        </div>

        <!-- Info Bar -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 fade-in">
          <div class="glass-card rounded-xl p-4 text-center">
            <div class="text-xs mb-1" style="color:var(--color-text-muted)">Prep Time</div>
            <div class="font-bold text-lg" style="color:var(--color-text)">${r.prepTimeMinutes} min</div>
          </div>
          <div class="glass-card rounded-xl p-4 text-center">
            <div class="text-xs mb-1" style="color:var(--color-text-muted)">Cook Time</div>
            <div class="font-bold text-lg" style="color:var(--color-text)">${r.cookTimeMinutes} min</div>
          </div>
          <div class="glass-card rounded-xl p-4 text-center">
            <div class="text-xs mb-1" style="color:var(--color-text-muted)">Servings</div>
            <div class="font-bold text-lg" style="color:var(--color-text)">${r.servings}</div>
          </div>
          <div class="glass-card rounded-xl p-4 text-center">
            <div class="text-xs mb-1" style="color:var(--color-text-muted)">Calories</div>
            <div class="font-bold text-lg" style="color:var(--color-text)">${r.caloriesPerServing} kcal</div>
          </div>
          <div class="glass-card rounded-xl p-4 text-center col-span-2 md:col-span-1">
            <div class="text-xs mb-1" style="color:var(--color-text-muted)">Rating</div>
            <div class="font-bold text-lg" style="color:var(--color-text)">⭐ ${r.rating}</div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Ingredients -->
          <div class="lg:col-span-1 fade-in-left">
            <div class="glass-card rounded-2xl p-6 sticky top-20">
              <h2 class="text-xl font-bold mb-4" style="font-family:'Outfit',sans-serif; color: var(--color-text);">Ingredients</h2>
              <ul class="space-y-3">
                ${r.ingredients.map(ing => `
                  <li class="flex items-start gap-3 text-sm" style="color: var(--color-text-secondary);">
                    <span class="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center mt-0.5" style="background:var(--glass-bg);border:1px solid var(--glass-border);">
                      <span class="w-2 h-2 rounded-full" style="background:var(--color-accent);"></span>
                    </span>
                    ${ing}
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>

          <!-- Instructions -->
          <div class="lg:col-span-2 fade-in-right">
            <div class="glass-card rounded-2xl p-6">
              <h2 class="text-xl font-bold mb-6" style="font-family:'Outfit',sans-serif; color: var(--color-text);">Instructions</h2>
              <div class="space-y-4">
                ${r.instructions.map((step, i) => `
                  <div class="flex gap-4 items-start">
                    <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style="background: var(--btn-bg); color: var(--btn-text);">
                      ${i + 1}
                    </div>
                    <p class="text-sm leading-relaxed pt-1.5" style="color: var(--color-text-secondary);">${step}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Tags -->
            ${r.tags && r.tags.length ? `
            <div class="mt-6">
              <h3 class="text-sm font-semibold mb-3" style="color:var(--color-text-muted)">Tags</h3>
              <div class="flex flex-wrap gap-2">
                ${r.tags.map(t => `<span class="chip">${t}</span>`).join('')}
              </div>
            </div>` : ''}
          </div>
        </div>
      </div>
    `;

    setTimeout(initScrollAnimations, 50);
  } catch (e) {
    console.error('Recipe detail error:', e);
    document.getElementById('recipe-content').innerHTML =
      '<div class="text-center py-20"><p style="color:var(--color-text-muted)">Recipe not found.</p><a href="recipes.html" class="btn-primary mt-4 inline-flex">Back to Recipes</a></div>';
  }
}
