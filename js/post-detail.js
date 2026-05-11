/* ============================================
   DummyStore — Post Detail Page Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const id = getParam('id');
  if (!id) { window.location.href = 'posts.html'; return; }
  loadPost(id);
  loadComments(id);
});

async function loadPost(id) {
  try {
    const p = await api.getPost(id);
    document.title = `${p.title} — DummyStore`;
    document.getElementById('breadcrumb-title').textContent = p.title;

    // Fetch author info
    let author = null;
    try { author = await api.getUser(p.userId); } catch (e) {}

    document.getElementById('post-content').innerHTML = `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="glass-card rounded-2xl p-6 md:p-10 fade-in">
          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-4">
            ${p.tags.map(t => `<span class="chip">${t}</span>`).join('')}
          </div>

          <!-- Title -->
          <h1 class="text-2xl md:text-3xl font-bold mb-6" style="font-family:'Outfit',sans-serif; color: var(--color-text);">${p.title}</h1>

          <!-- Author -->
          ${author ? `
          <div class="flex items-center gap-3 mb-6 p-3 rounded-xl" style="background:var(--glass-bg);">
            <img src="${author.image}" alt="${author.firstName}" class="w-10 h-10 rounded-full object-cover">
            <div>
              <div class="font-semibold text-sm" style="color:var(--color-text)">${author.firstName} ${author.lastName}</div>
              <div class="text-xs" style="color:var(--color-text-muted)">@${author.username}</div>
            </div>
          </div>` : ''}

          <!-- Body -->
          <div class="text-base leading-relaxed mb-6" style="color: var(--color-text-secondary);">
            ${p.body.split('\n').map(para => `<p class="mb-3">${para}</p>`).join('')}
          </div>

          <!-- Reactions -->
          <div class="flex items-center gap-6 pt-4" style="border-top: 1px solid var(--glass-border);">
            <button onclick="showToast('Liked!','success')" class="flex items-center gap-2 btn-glass px-4 py-2 rounded-full text-sm">
              ${icons.thumbsUp} <span>${p.reactions?.likes || 0}</span>
            </button>
            <button onclick="showToast('Disliked','error')" class="flex items-center gap-2 btn-glass px-4 py-2 rounded-full text-sm">
              ${icons.thumbsDown} <span>${p.reactions?.dislikes || 0}</span>
            </button>
            <span class="flex items-center gap-1 ml-auto text-sm" style="color:var(--color-text-muted)">
              ${icons.eye} ${p.views || 0} views
            </span>
          </div>
        </div>
      </div>
    `;

    setTimeout(initScrollAnimations, 50);
  } catch (e) {
    console.error('Post detail error:', e);
    document.getElementById('post-content').innerHTML =
      '<div class="max-w-4xl mx-auto px-4 text-center py-20"><p style="color:var(--color-text-muted)">Post not found.</p><a href="posts.html" class="btn-primary mt-4 inline-flex">Back to Posts</a></div>';
  }
}

async function loadComments(postId) {
  try {
    const data = await api.getPostComments(postId);
    const container = document.getElementById('comments-container');

    if (!data.comments || !data.comments.length) {
      container.innerHTML = '<p class="text-center py-6" style="color:var(--color-text-muted)">No comments yet.</p>';
      return;
    }

    container.innerHTML = data.comments.map(c => `
      <div class="glass-card rounded-xl p-5 fade-in">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" style="background: var(--btn-bg); color: var(--btn-text);">
            ${c.user?.fullName?.charAt(0) || 'U'}
          </div>
          <div>
            <div class="font-semibold text-sm" style="color:var(--color-text)">${c.user?.fullName || 'Anonymous'}</div>
            <div class="text-xs" style="color:var(--color-text-muted)">@${c.user?.username || 'unknown'}</div>
          </div>
          <div class="ml-auto flex items-center gap-1 text-xs" style="color:var(--color-text-muted)">
            ${icons.thumbsUp} ${c.likes || 0}
          </div>
        </div>
        <p class="text-sm" style="color:var(--color-text-secondary)">${c.body}</p>
      </div>
    `).join('');

    setTimeout(initScrollAnimations, 50);
  } catch (e) {
    console.error('Comments error:', e);
    document.getElementById('comments-container').innerHTML =
      '<p class="text-center py-6" style="color:var(--color-text-muted)">Failed to load comments.</p>';
  }
}
