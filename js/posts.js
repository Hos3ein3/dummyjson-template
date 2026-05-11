/* ============================================
   DummyStore — Posts Page Logic
   ============================================ */

const POSTS_LIMIT = 9;
let postSkip = 0;
let postSearch = '';
let postTag = '';

document.addEventListener('DOMContentLoaded', () => {
  loadPostTags();
  loadPosts();
});

// ── Load Tags ──
async function loadPostTags() {
  try {
    const tags = await api.getPostTags();
    const container = document.getElementById('post-tags');
    container.innerHTML = `<span class="chip active text-xs" onclick="filterByPostTag('')">All</span>` +
      tags.map(t => `<span class="chip text-xs" onclick="filterByPostTag('${t.slug}')">${t.name}</span>`).join('');
  } catch (e) { console.error('Post tags error:', e); }
}

// ── Load Posts ──
async function loadPosts() {
  try {
    let data;
    if (postSearch) {
      data = await api.searchPosts(postSearch, POSTS_LIMIT, postSkip);
    } else if (postTag) {
      data = await api.get(`/posts/tag/${postTag}?limit=${POSTS_LIMIT}&skip=${postSkip}`);
    } else {
      data = await api.getPosts(POSTS_LIMIT, postSkip);
    }

    renderPosts(data.posts);
    document.getElementById('results-count').textContent = `${data.total}`;
    document.getElementById('pagination-container').innerHTML =
      renderPagination(data.total, POSTS_LIMIT, postSkip, 'goToPostPage');
  } catch (e) {
    console.error('Posts error:', e);
    document.getElementById('posts-grid').innerHTML =
      '<p class="col-span-full text-center py-10" style="color:var(--color-text-muted)">Failed to load posts.</p>';
  }
}

function renderPosts(posts) {
  const container = document.getElementById('posts-grid');
  if (!posts.length) {
    container.innerHTML = '<p class="col-span-full text-center py-10" style="color:var(--color-text-muted)">No posts found.</p>';
    return;
  }
  container.innerHTML = posts.map(p => `
    <a href="post-detail.html?id=${p.id}" class="glass-card rounded-2xl p-6 group flex flex-col">
      <div class="flex flex-wrap gap-2 mb-3">
        ${p.tags.map(t => `<span class="chip text-xs">${t}</span>`).join('')}
      </div>
      <h3 class="font-semibold text-lg mb-2 line-clamp-2 group-hover:underline flex-grow" style="color: var(--color-text); font-family:'Outfit',sans-serif;">${p.title}</h3>
      <p class="text-sm line-clamp-3 mb-4" style="color: var(--color-text-muted);">${p.body}</p>
      <div class="flex items-center gap-4 text-xs mt-auto pt-3" style="border-top: 1px solid var(--glass-border); color: var(--color-text-muted);">
        <span class="flex items-center gap-1">${icons.thumbsUp} ${p.reactions?.likes || 0}</span>
        <span class="flex items-center gap-1">${icons.thumbsDown} ${p.reactions?.dislikes || 0}</span>
        <span class="flex items-center gap-1 ml-auto">${icons.eye} ${p.views || 0}</span>
      </div>
    </a>
  `).join('');
}

// ── Search ──
let postSearchTimeout;
function handlePostSearch(event) {
  clearTimeout(postSearchTimeout);
  postSearchTimeout = setTimeout(() => {
    postSearch = event.target.value.trim();
    postSkip = 0;
    postTag = '';
    document.querySelectorAll('#post-tags .chip').forEach(c => c.classList.remove('active'));
    document.querySelector('#post-tags .chip')?.classList.add('active');
    loadPosts();
  }, 400);
}

// ── Tag Filter ──
function filterByPostTag(tag) {
  postTag = tag;
  postSearch = '';
  postSkip = 0;
  document.getElementById('search-input').value = '';

  document.querySelectorAll('#post-tags .chip').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');

  loadPosts();
}

// ── Pagination ──
function goToPostPage(skip) {
  postSkip = skip;
  loadPosts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
