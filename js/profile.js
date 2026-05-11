/* ============================================
   DummyStore — Profile Page Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('loggedUser') || 'null');
  if (!user) {
    showToast('Please login to view your profile', 'error');
    setTimeout(() => window.location.href = 'login.html', 1000);
    return;
  }
  loadFullProfile(user.id);
});

async function loadFullProfile(userId) {
  try {
    const u = await api.getUser(userId);
    renderProfileHeader(u);
    renderPersonalInfo(u);
    renderAddressInfo(u);
    renderCompanyInfo(u);
    renderBankInfo(u);
    // Fill settings
    document.getElementById('edit-name').value = `${u.firstName} ${u.lastName}`;
    document.getElementById('edit-email').value = u.email;
    document.getElementById('edit-phone').value = u.phone || '';
    // Load tabs data
    loadUserPosts(userId);
    loadUserTodos(userId);
  } catch (e) {
    console.error('Profile error:', e);
    document.getElementById('profile-header').innerHTML = '<p class="text-center py-8" style="color:var(--color-text-muted)">Failed to load profile.</p>';
  }
}

function renderProfileHeader(u) {
  document.getElementById('profile-header').innerHTML = `
    <div class="flex flex-col md:flex-row items-center gap-6">
      <img src="${u.image}" alt="${u.firstName}" class="w-24 h-24 rounded-full object-cover ring-4" style="ring-color:var(--glass-border)">
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-2xl font-bold" style="font-family:'Outfit';color:var(--color-text)">${u.firstName} ${u.lastName}</h1>
        <p class="text-sm" style="color:var(--color-text-muted)">@${u.username} · ${u.email}</p>
        <div class="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
          <span class="badge text-xs">${u.role || 'User'}</span>
          <span class="badge text-xs">${u.gender}</span>
          <span class="badge text-xs">Age: ${u.age}</span>
        </div>
      </div>
      <div class="flex gap-2">
        <a href="dashboard/index.html" class="btn-primary rounded-xl text-sm">Dashboard</a>
        <button onclick="logout()" class="btn-glass text-sm">Logout</button>
      </div>
    </div>
  `;
}

function infoRow(label, value) {
  return `<div class="flex justify-between py-2" style="border-bottom:1px solid var(--glass-border)"><span class="text-sm" style="color:var(--color-text-muted)">${label}</span><span class="text-sm font-medium" style="color:var(--color-text)">${value || '—'}</span></div>`;
}

function renderPersonalInfo(u) {
  document.getElementById('personal-info').innerHTML = `
    <h3 class="font-semibold mb-3" style="font-family:'Outfit';color:var(--color-text)">👤 Personal</h3>
    ${infoRow('Full Name', `${u.firstName} ${u.maidenName || ''} ${u.lastName}`)}
    ${infoRow('Email', u.email)}
    ${infoRow('Phone', u.phone)}
    ${infoRow('Birthday', u.birthDate)}
    ${infoRow('Blood Group', u.bloodGroup)}
    ${infoRow('Height', `${u.height} cm`)}
    ${infoRow('Weight', `${u.weight} kg`)}
  `;
}

function renderAddressInfo(u) {
  const a = u.address || {};
  document.getElementById('address-info').innerHTML = `
    <h3 class="font-semibold mb-3" style="font-family:'Outfit';color:var(--color-text)">📍 Address</h3>
    ${infoRow('Street', a.address)}
    ${infoRow('City', a.city)}
    ${infoRow('State', a.state)}
    ${infoRow('Postal Code', a.postalCode)}
    ${infoRow('Country', a.country)}
  `;
}

function renderCompanyInfo(u) {
  const c = u.company || {};
  document.getElementById('company-info').innerHTML = `
    <h3 class="font-semibold mb-3" style="font-family:'Outfit';color:var(--color-text)">🏢 Company</h3>
    ${infoRow('Company', c.name)}
    ${infoRow('Title', c.title)}
    ${infoRow('Department', c.department)}
  `;
}

function renderBankInfo(u) {
  const b = u.bank || {};
  document.getElementById('bank-info').innerHTML = `
    <h3 class="font-semibold mb-3" style="font-family:'Outfit';color:var(--color-text)">🏦 Banking</h3>
    ${infoRow('Card Type', b.cardType)}
    ${infoRow('Card Number', b.cardNumber ? `****${b.cardNumber.slice(-4)}` : '—')}
    ${infoRow('Expires', b.cardExpire)}
    ${infoRow('IBAN', b.iban ? `${b.iban.slice(0,6)}****` : '—')}
  `;
}

async function loadUserPosts(userId) {
  try {
    const data = await api.get(`/posts/user/${userId}`);
    const container = document.getElementById('user-posts');
    if (!data.posts.length) { container.innerHTML = '<p class="text-center py-8" style="color:var(--color-text-muted)">No posts yet.</p>'; return; }
    container.innerHTML = data.posts.map(p => `
      <a href="post-detail.html?id=${p.id}" class="glass-card rounded-2xl p-5 group">
        <div class="flex flex-wrap gap-1.5 mb-2">${p.tags.map(t => `<span class="chip text-xs">${t}</span>`).join('')}</div>
        <h4 class="font-semibold mb-1.5 group-hover:underline line-clamp-2" style="color:var(--color-text);font-family:'Outfit'">${p.title}</h4>
        <p class="text-sm line-clamp-2" style="color:var(--color-text-muted)">${p.body}</p>
        <div class="flex items-center gap-3 mt-3 text-xs" style="color:var(--color-text-muted)">
          <span>👍 ${p.reactions?.likes || 0}</span><span>👁 ${p.views || 0}</span>
        </div>
      </a>
    `).join('');
  } catch (e) { document.getElementById('user-posts').innerHTML = '<p class="text-center py-8" style="color:var(--color-text-muted)">Failed to load posts.</p>'; }
}

async function loadUserTodos(userId) {
  try {
    const data = await api.get(`/todos/user/${userId}`);
    const container = document.getElementById('user-todos');
    if (!data.todos.length) { container.innerHTML = '<p class="text-center py-8" style="color:var(--color-text-muted)">No todos yet.</p>'; return; }
    container.innerHTML = data.todos.map(t => `
      <div class="glass-card rounded-xl p-4 flex items-center gap-3">
        <input type="checkbox" ${t.completed ? 'checked' : ''} class="w-4 h-4 flex-shrink-0" style="accent-color:var(--btn-bg)" onclick="this.checked=!this.checked">
        <span class="text-sm flex-1 ${t.completed ? 'line-through opacity-60' : ''}" style="color:var(--color-text-secondary)">${t.todo}</span>
        ${t.completed ? '<span class="badge text-xs" style="color:var(--success)">Done</span>' : '<span class="badge text-xs" style="color:var(--star)">Pending</span>'}
      </div>
    `).join('');
  } catch (e) { document.getElementById('user-todos').innerHTML = '<p class="text-center py-8" style="color:var(--color-text-muted)">Failed to load todos.</p>'; }
}

function switchProfileTab(tab) {
  document.querySelectorAll('.profile-tab').forEach(t => t.style.display = 'none');
  document.getElementById(`tab-${tab}`).style.display = 'block';
  document.querySelectorAll('#profile-tabs .chip').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');
}

function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('loggedUser');
  showToast('Logged out successfully', 'success');
  setTimeout(() => window.location.href = 'index.html', 800);
}
