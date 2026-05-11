/* ============================================
   Dashboard — Data Grid
   ============================================ */

class DataGrid {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.columns = options.columns || [];
    this.data = [];
    this.filtered = [];
    this.sortCol = options.defaultSort || '';
    this.sortDir = 'asc';
    this.page = 1;
    this.perPage = options.perPage || 10;
    this.searchQuery = '';
    this.selectedIds = new Set();
  }

  setData(data) {
    this.data = data;
    this.filtered = [...data];
    this.page = 1;
    this.render();
  }

  sort(col) {
    if (this.sortCol === col) this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    else { this.sortCol = col; this.sortDir = 'asc'; }
    this.filtered.sort((a, b) => {
      let va = a[col], vb = b[col];
      if (typeof va === 'string') { va = va.toLowerCase(); vb = vb.toLowerCase(); }
      if (va < vb) return this.sortDir === 'asc' ? -1 : 1;
      if (va > vb) return this.sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    this.page = 1;
    this.render();
  }

  search(query) {
    this.searchQuery = query.toLowerCase();
    this.filtered = this.data.filter(row =>
      this.columns.some(c => String(row[c.key] || '').toLowerCase().includes(this.searchQuery))
    );
    this.page = 1;
    this.render();
  }

  toggleSelect(id) {
    if (this.selectedIds.has(id)) this.selectedIds.delete(id);
    else this.selectedIds.add(id);
    this.render();
  }

  toggleSelectAll() {
    const pageData = this.getPageData();
    const allSelected = pageData.every(r => this.selectedIds.has(r.id));
    pageData.forEach(r => { allSelected ? this.selectedIds.delete(r.id) : this.selectedIds.add(r.id); });
    this.render();
  }

  getPageData() {
    const start = (this.page - 1) * this.perPage;
    return this.filtered.slice(start, start + this.perPage);
  }

  goToPage(p) { this.page = p; this.render(); }

  render() {
    const pageData = this.getPageData();
    const totalPages = Math.ceil(this.filtered.length / this.perPage);
    const allSelected = pageData.length > 0 && pageData.every(r => this.selectedIds.has(r.id));

    let html = `
      <div class="grid-toolbar">
        <div class="relative flex-1" style="max-width:300px">
          <input type="text" placeholder="Search..." class="glass-input py-1.5 text-sm pl-9" value="${this.searchQuery}" oninput="grid.search(this.value)">
          <span class="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-40" style="width:16px;height:16px">${dIcons.search}</span>
        </div>
        ${this.selectedIds.size > 0 ? `
          <span class="text-sm font-medium" style="color:var(--color-text)">${this.selectedIds.size} selected</span>
          <button class="btn-danger btn-sm" onclick="dashToast('Deleted selected items','error')">Delete</button>
          <button class="btn-secondary btn-sm" onclick="dashToast('Exported!','success')">Export</button>
        ` : ''}
        <span class="ml-auto text-xs" style="color:var(--color-text-muted)">${this.filtered.length} results</span>
      </div>

      <div class="dash-card" style="padding:0;overflow-x:auto">
        <table class="data-grid">
          <thead><tr>
            <th style="width:40px"><input type="checkbox" ${allSelected ? 'checked' : ''} onchange="grid.toggleSelectAll()"></th>
            ${this.columns.map(c => `
              <th class="${this.sortCol === c.key ? 'sorted' : ''}" onclick="grid.sort('${c.key}')">
                ${c.label}
                <span class="sort-icon">${this.sortCol === c.key ? (this.sortDir === 'asc' ? '↑' : '↓') : '↕'}</span>
              </th>
            `).join('')}
          </tr></thead>
          <tbody>
            ${pageData.length ? pageData.map(row => `
              <tr class="${this.selectedIds.has(row.id) ? 'selected' : ''}">
                <td><input type="checkbox" ${this.selectedIds.has(row.id) ? 'checked' : ''} onchange="grid.toggleSelect(${row.id})"></td>
                ${this.columns.map(c => `<td>${c.render ? c.render(row[c.key], row) : (row[c.key] ?? '')}</td>`).join('')}
              </tr>
            `).join('') : `<tr><td colspan="${this.columns.length + 1}" class="text-center py-8" style="color:var(--color-text-muted)">No data found</td></tr>`}
          </tbody>
        </table>
      </div>
    `;

    // Pagination
    if (totalPages > 1) {
      html += '<div class="pagination mt-4">';
      if (this.page > 1) html += `<button class="page-btn" onclick="grid.goToPage(${this.page - 1})">‹</button>`;
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || Math.abs(i - this.page) <= 2) {
          html += `<button class="page-btn ${i === this.page ? 'active' : ''}" onclick="grid.goToPage(${i})">${i}</button>`;
        } else if (Math.abs(i - this.page) === 3) {
          html += `<span class="px-1" style="color:var(--color-text-muted)">…</span>`;
        }
      }
      if (this.page < totalPages) html += `<button class="page-btn" onclick="grid.goToPage(${this.page + 1})">›</button>`;
      html += '</div>';
    }

    this.container.innerHTML = html;
  }
}
