/* ============================================
   Dashboard — Core: Sidebar, Topbar, Loaders
   ============================================ */

// ── SVG Icons for Dashboard ──
const dIcons = {
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  forms: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  inputAdv: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15h4M13 9h4"/></svg>`,
  wizard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  components: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  collapse: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>`,
  expand: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  chevDown: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
};

// ── Navigation Config ──
const sidebarNav = [
  { group: 'Main', items: [
    { id: 'overview', label: 'Overview', icon: 'dashboard', href: 'index.html' },
    { id: 'profile', label: 'Profile', icon: 'user', href: 'profile.html' },
  ]},
  { group: 'Forms', items: [
    { id: 'forms-simple', label: 'Simple Inputs', icon: 'forms', href: 'forms-simple.html' },
    { id: 'forms-advanced', label: 'Advanced Inputs', icon: 'inputAdv', href: 'forms-advanced.html' },
    { id: 'forms-wizard', label: 'Wizard Form', icon: 'wizard', href: 'forms-wizard.html' },
    { id: 'forms-validation', label: 'Validation', icon: 'check', href: 'forms-validation.html' },
  ]},
  { group: 'Data', items: [
    { id: 'data-grid', label: 'Data Grid', icon: 'grid', href: 'data-grid.html' },
  ]},
  { group: 'Visuals', items: [
    { id: 'charts', label: 'Charts & Graphs', icon: 'chart', href: 'charts.html' },
    { id: 'ui-components', label: 'UI Components', icon: 'components', href: 'ui-components.html' },
  ]},
];

// ── Determine active page ──
function getDashPage() {
  const p = window.location.pathname;
  if (p.includes('forms-simple')) return 'forms-simple';
  if (p.includes('forms-advanced')) return 'forms-advanced';
  if (p.includes('forms-wizard')) return 'forms-wizard';
  if (p.includes('forms-validation')) return 'forms-validation';
  if (p.includes('data-grid')) return 'data-grid';
  if (p.includes('charts')) return 'charts';
  if (p.includes('ui-components')) return 'ui-components';
  if (p.includes('profile')) return 'profile';
  return 'overview';
}

// ── Render Sidebar ──
function renderDashSidebar() {
  const active = getDashPage();
  const user = JSON.parse(localStorage.getItem('loggedUser') || 'null');

  const html = `
    <div class="sidebar-header">
      <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background:var(--btn-bg)">
        <span style="color:var(--btn-text);font-weight:800;font-family:'Outfit',sans-serif;font-size:0.9rem">D</span>
      </div>
      <span class="logo-text">Dashboard</span>
    </div>
    <nav class="sidebar-nav">
      ${sidebarNav.map(g => `
        <div class="sidebar-group">
          <div class="sidebar-group-title">${g.group}</div>
          ${g.items.map(it => `
            <a href="${it.href}" class="sidebar-link ${active === it.id ? 'active' : ''}">
              ${dIcons[it.icon] || ''}
              <span class="link-text">${it.label}</span>
            </a>
          `).join('')}
        </div>
      `).join('')}
      <div class="sidebar-group" style="margin-top:0.5rem">
        <div class="sidebar-group-title">Other</div>
        <a href="../index.html" class="sidebar-link">${dIcons.back}<span class="link-text">Back to Website</span></a>
      </div>
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-link" onclick="toggleSidebar()" style="justify-content:center">
        <span id="collapse-icon">${dIcons.collapse}</span>
        <span class="link-text" style="font-size:0.75rem">Collapse</span>
      </div>
    </div>
  `;
  document.getElementById('sidebar-container').innerHTML = html;
}

// ── Toggle Sidebar ──
function toggleSidebar() {
  const layout = document.getElementById('app');
  layout.classList.toggle('collapsed');
  const icon = document.getElementById('collapse-icon');
  if (layout.classList.contains('collapsed')) {
    icon.innerHTML = dIcons.expand;
  } else {
    icon.innerHTML = dIcons.collapse;
  }
  localStorage.setItem('dash-collapsed', layout.classList.contains('collapsed'));
}

// ── Render Topbar ──
function renderDashTopbar(breadcrumbItems) {
  const isDark = document.documentElement.classList.contains('dark');
  const html = `
    <div class="flex items-center gap-3">
      <button onclick="document.getElementById('app').classList.toggle('mobile-open')" class="btn-ghost p-1.5 rounded-lg md:hidden" style="width:36px;height:36px">${dIcons.menu}</button>
      <div class="breadcrumb">
        <a href="index.html">Dashboard</a>
        ${breadcrumbItems.map((b, i) => `<span class="sep">/</span>${i === breadcrumbItems.length - 1 ? `<span class="current">${b.label}</span>` : `<a href="${b.href}">${b.label}</a>`}`).join('')}
      </div>
    </div>
    <div class="flex items-center gap-2">
      <div class="relative hidden sm:block">
        <span class="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-40" style="width:16px;height:16px">${dIcons.search}</span>
        <input type="text" placeholder="Search..." class="glass-input pl-9 py-1.5 text-sm" style="width:200px;border-radius:9999px">
      </div>
      <button data-tooltip="Notifications" class="btn-ghost p-2 rounded-full relative" style="width:36px;height:36px">
        ${dIcons.bell}
        <span class="absolute top-1 right-1 w-2 h-2 rounded-full" style="background:var(--error)"></span>
      </button>
      <button onclick="toggleDashTheme()" data-tooltip="Toggle theme" class="btn-ghost p-2 rounded-full" style="width:36px;height:36px" id="dash-theme-btn">
        ${isDark ? dIcons.sun : dIcons.moon}
      </button>
      <div class="flex items-center gap-2 pl-2" style="border-left:1px solid var(--glass-border)">
        <div class="w-8 h-8 rounded-full flex items-center justify-center" style="background:var(--btn-bg);color:var(--btn-text);font-weight:700;font-size:0.75rem">A</div>
        <span class="text-sm font-medium hidden sm:block" style="color:var(--color-text)">Admin</span>
      </div>
    </div>
  `;
  document.getElementById('topbar-container').innerHTML = html;
}

function toggleDashTheme() {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('dummystore-theme', isDark ? 'dark' : 'light');
  document.getElementById('dash-theme-btn').innerHTML = isDark ? dIcons.sun : dIcons.moon;
}

// ── Full Page Loader ──
function showFullLoader(text = 'Loading...') {
  let el = document.getElementById('fullpage-loader');
  if (!el) {
    el = document.createElement('div');
    el.id = 'fullpage-loader';
    el.className = 'fullpage-loader';
    document.body.appendChild(el);
  }
  el.innerHTML = `<div class="spinner"></div><span style="color:var(--color-text);font-size:0.9rem;font-weight:500">${text}</span>`;
  el.style.display = 'flex';
}
function hideFullLoader() {
  const el = document.getElementById('fullpage-loader');
  if (el) el.style.display = 'none';
}

// ── Partial Loader ──
function showPartialLoader(containerId) {
  const c = document.getElementById(containerId);
  if (c) c.innerHTML = '<div class="partial-loader"><div class="spinner"></div></div>';
}

// ── Enhanced Toast ──
function dashToast(message, type = 'success', duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.style.position = 'relative';
  toast.innerHTML = `${message}<div class="toast-progress" style="animation-duration:${duration}ms"></div>`;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('removing'); setTimeout(() => toast.remove(), 300); }, duration);
}

// ── Modal ──
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

// ── Tabs ──
function switchTab(groupId, tabId) {
  document.querySelectorAll(`#${groupId} .tab-btn`).forEach(b => b.classList.remove('active'));
  document.querySelectorAll(`#${groupId} .tab-panel`).forEach(p => p.classList.remove('active'));
  document.querySelector(`#${groupId} [data-tab="${tabId}"]`)?.classList.add('active');
  document.getElementById(tabId)?.classList.add('active');
}

// ── Accordion ──
function toggleAccordion(el) {
  const item = el.closest('.accordion-item');
  item.classList.toggle('open');
}

// ── Init Dashboard ──
function initDashboard(breadcrumbs) {
  // Apply saved theme
  const savedTheme = localStorage.getItem('dummystore-theme');
  if (savedTheme === 'dark') document.documentElement.classList.add('dark');
  else if (savedTheme === 'light') document.documentElement.classList.remove('dark');

  // Apply collapsed state
  if (localStorage.getItem('dash-collapsed') === 'true') {
    document.getElementById('app')?.classList.add('collapsed');
  }

  renderDashSidebar();
  renderDashTopbar(breadcrumbs);
}
