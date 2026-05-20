/* ============================================
   Dashboard — Data Grid (Enhanced)
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
    this.perPageOptions = options.perPageOptions || [5, 10, 15, 25, 50, 100];
    this.searchQuery = '';
    this.selectedIds = new Set();
    this.globalVar = options.globalVar || 'grid';
    this.tableClass = options.tableClass || '';
    this.showFilters = false;

    // Filters config: array of { key, label, type: 'select'|'text'|'range', options?: [] }
    this.filters = options.filters || [];
    this.filterValues = {};
    this.filters.forEach(f => { this.filterValues[f.key] = f.type === 'range' ? { min: '', max: '' } : ''; });

    // Action buttons: array of { label, icon, class, onClick }
    this.actions = options.actions || [];

    // Show skeleton immediately
    this.showSkeleton();
  }

  showSkeleton() {
    const colCount = this.columns.length + 1; // +1 for checkbox col
    const rowCount = this.perPage;
    // Randomized widths for visual variety
    const widths = ['45%','60%','30%','55%','40%','50%','35%','65%','48%','52%'];

    let html = `<div class="grid-skeleton">
      <div class="grid-skeleton-toolbar">
        <div class="skeleton" style="width:200px;height:36px;border-radius:0.5rem"></div>
        <div class="skeleton" style="width:90px;height:36px;border-radius:0.5rem"></div>
        <div style="flex:1"></div>
        <div class="skeleton" style="width:120px;height:36px;border-radius:0.5rem"></div>
      </div>
      <div class="dash-card" style="padding:0;overflow:hidden;position:relative">
        <div class="grid-skeleton-spinner-overlay">
          <div class="spinner"></div>
        </div>
        <table class="data-grid">
          <thead><tr>`;

    // Header skeletons
    for (let c = 0; c < colCount; c++) {
      const w = c === 0 ? '18px' : `${40 + Math.random() * 40}px`;
      html += `<th><div class="skeleton" style="width:${w};height:12px;border-radius:3px"></div></th>`;
    }
    html += `</tr></thead><tbody>`;

    // Body row skeletons
    for (let r = 0; r < rowCount; r++) {
      html += `<tr>`;
      for (let c = 0; c < colCount; c++) {
        if (c === 0) {
          html += `<td><div class="skeleton" style="width:18px;height:18px;border-radius:5px"></div></td>`;
        } else {
          const w = widths[(r * colCount + c) % widths.length];
          html += `<td><div class="skeleton" style="width:${w};height:13px;border-radius:3px"></div></td>`;
        }
      }
      html += `</tr>`;
    }

    html += `</tbody></table>
      </div>
      <div class="grid-skeleton-footer">
        <div class="skeleton" style="width:160px;height:14px;border-radius:3px"></div>
        <div style="display:flex;gap:0.35rem">
          <div class="skeleton" style="width:32px;height:32px;border-radius:0.5rem"></div>
          <div class="skeleton" style="width:32px;height:32px;border-radius:0.5rem"></div>
          <div class="skeleton" style="width:32px;height:32px;border-radius:0.5rem"></div>
        </div>
      </div>
    </div>`;

    this.container.innerHTML = html;
  }

  setData(data) {
    this.data = data;
    // Auto-populate select filter options from data
    this.filters.forEach(f => {
      if (f.type === 'select' && (!f.options || f.options.length === 0)) {
        const vals = [...new Set(data.map(r => r[f.key]).filter(v => v != null))].sort();
        f.options = vals;
      }
    });
    this.applyFilters();
  }

  sort(col) {
    if (this.sortCol === col) this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    else { this.sortCol = col; this.sortDir = 'asc'; }
    this.filtered.sort((a, b) => {
      let va = a[col], vb = b[col];
      if (typeof va === 'string') { va = va.toLowerCase(); vb = (vb || '').toLowerCase(); }
      if (va < vb) return this.sortDir === 'asc' ? -1 : 1;
      if (va > vb) return this.sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    this.page = 1;
    this.render();
  }

  search(query) {
    this.searchQuery = query.toLowerCase();
    this.applyFilters();
  }

  setFilter(key, value) {
    this.filterValues[key] = value;
    this.applyFilters();
  }

  setRangeFilter(key, bound, value) {
    if (!this.filterValues[key] || typeof this.filterValues[key] !== 'object') {
      this.filterValues[key] = { min: '', max: '' };
    }
    this.filterValues[key][bound] = value;
    this.applyFilters();
  }

  clearFilters() {
    this.searchQuery = '';
    this.filters.forEach(f => { this.filterValues[f.key] = f.type === 'range' ? { min: '', max: '' } : ''; });
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.data];

    // Text search across all columns
    if (this.searchQuery) {
      result = result.filter(row =>
        this.columns.some(c => String(row[c.key] || '').toLowerCase().includes(this.searchQuery))
      );
    }

    // Apply each filter
    this.filters.forEach(f => {
      const val = this.filterValues[f.key];
      if (f.type === 'select' && val) {
        result = result.filter(row => String(row[f.key]) === String(val));
      } else if (f.type === 'text' && val) {
        result = result.filter(row => String(row[f.key] || '').toLowerCase().includes(val.toLowerCase()));
      } else if (f.type === 'range') {
        if (val.min !== '' && val.min !== undefined) {
          result = result.filter(row => Number(row[f.key]) >= Number(val.min));
        }
        if (val.max !== '' && val.max !== undefined) {
          result = result.filter(row => Number(row[f.key]) <= Number(val.max));
        }
      }
    });

    this.filtered = result;

    // Re-apply current sort
    if (this.sortCol) {
      this.filtered.sort((a, b) => {
        let va = a[this.sortCol], vb = b[this.sortCol];
        if (typeof va === 'string') { va = va.toLowerCase(); vb = (vb || '').toLowerCase(); }
        if (va < vb) return this.sortDir === 'asc' ? -1 : 1;
        if (va > vb) return this.sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.page = 1;
    this.render();
  }

  setPerPage(n) {
    this.perPage = Number(n);
    this.page = 1;
    this.render();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
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
    const g = this.globalVar;
    const pageData = this.getPageData();
    const totalPages = Math.ceil(this.filtered.length / this.perPage);
    const allSelected = pageData.length > 0 && pageData.every(r => this.selectedIds.has(r.id));
    const startIdx = (this.page - 1) * this.perPage + 1;
    const endIdx = Math.min(this.page * this.perPage, this.filtered.length);

    const hasActiveFilters = this.searchQuery || this.filters.some(f => {
      const v = this.filterValues[f.key];
      if (f.type === 'range') return v.min !== '' || v.max !== '';
      return v !== '';
    });

    // ── Action Bar ──
    let html = `<div class="grid-action-bar">
      <div class="grid-action-left">
        ${this.actions.map(a => `
          <button class="${a.class || 'btn-secondary btn-sm'}" onclick="${a.onClick || `dashToast('${a.label}','success')`}">
            ${a.icon ? `<span class="grid-action-icon">${a.icon}</span>` : ''}${a.label}
          </button>
        `).join('')}
      </div>
      <div class="grid-action-right">
        ${this.selectedIds.size > 0 ? `
          <div class="grid-selection-info">
            <span class="grid-selection-count">${this.selectedIds.size} selected</span>
            <button class="btn-danger btn-sm" onclick="dashToast('Deleted ${this.selectedIds.size} items','error');${g}.selectedIds.clear();${g}.render()">Delete</button>
          </div>
        ` : ''}
      </div>
    </div>`;

    // ── Toolbar: Search + Filter Toggle + Page Size ──
    html += `<div class="grid-toolbar">
      <div class="grid-toolbar-left">
        <div class="grid-search-box">
          <span class="grid-search-icon">${dIcons.search}</span>
          <input type="text" placeholder="Search all columns..." class="glass-input grid-search-input" value="${this.searchQuery}" oninput="${g}.search(this.value)">
          ${this.searchQuery ? `<button class="grid-search-clear" onclick="${g}.search('');this.closest('.grid-search-box').querySelector('input').value=''">✕</button>` : ''}
        </div>
        ${this.filters.length > 0 ? `
          <button class="btn-ghost btn-sm grid-filter-toggle ${this.showFilters ? 'active' : ''} ${hasActiveFilters ? 'has-active' : ''}" onclick="${g}.toggleFilters()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
            Filters
            ${hasActiveFilters ? '<span class="filter-dot"></span>' : ''}
          </button>
        ` : ''}
      </div>
      <div class="grid-toolbar-right">
        <div class="grid-page-size">
          <label class="grid-page-size-label">Show</label>
          <select class="glass-input grid-page-size-select" onchange="${g}.setPerPage(this.value)">
            ${this.perPageOptions.map(n => `<option value="${n}" ${n === this.perPage ? 'selected' : ''}>${n}</option>`).join('')}
          </select>
          <span class="grid-page-size-label">entries</span>
        </div>
        <span class="grid-results-count">${this.filtered.length} results</span>
      </div>
    </div>`;

    // ── Filter Panel ──
    if (this.showFilters && this.filters.length > 0) {
      html += `<div class="grid-filter-panel">
        <div class="grid-filter-row">
          ${this.filters.map(f => {
            if (f.type === 'select') {
              const currentVal = this.filterValues[f.key] || '';
              return `<div class="grid-filter-item">
                <label class="grid-filter-label">${f.label}</label>
                <select class="glass-input grid-filter-select" onchange="${g}.setFilter('${f.key}', this.value)">
                  <option value="">All</option>
                  ${(f.options || []).map(o => `<option value="${o}" ${currentVal === String(o) ? 'selected' : ''}>${o}</option>`).join('')}
                </select>
              </div>`;
            } else if (f.type === 'text') {
              return `<div class="grid-filter-item">
                <label class="grid-filter-label">${f.label}</label>
                <input type="text" class="glass-input grid-filter-input" placeholder="Filter ${f.label.toLowerCase()}..." value="${this.filterValues[f.key] || ''}" oninput="${g}.setFilter('${f.key}', this.value)">
              </div>`;
            } else if (f.type === 'range') {
              const rv = this.filterValues[f.key] || { min: '', max: '' };
              return `<div class="grid-filter-item grid-filter-range">
                <label class="grid-filter-label">${f.label}</label>
                <div class="grid-filter-range-inputs">
                  <input type="number" class="glass-input grid-filter-input" placeholder="Min" value="${rv.min}" oninput="${g}.setRangeFilter('${f.key}','min',this.value)">
                  <span class="grid-filter-range-sep">–</span>
                  <input type="number" class="glass-input grid-filter-input" placeholder="Max" value="${rv.max}" oninput="${g}.setRangeFilter('${f.key}','max',this.value)">
                </div>
              </div>`;
            }
            return '';
          }).join('')}
          ${hasActiveFilters ? `<div class="grid-filter-item" style="align-self:flex-end">
            <button class="btn-ghost btn-sm" onclick="${g}.clearFilters()">Clear All</button>
          </div>` : ''}
        </div>
      </div>`;
    }

    // ── Table ──
    html += `<div class="dash-card" style="padding:0;overflow-x:auto">
        <table class="data-grid ${this.tableClass}">
          <thead><tr>
            <th style="width:48px">
              <label class="grid-check">
                <input type="checkbox" ${allSelected ? 'checked' : ''} onchange="${g}.toggleSelectAll()">
                <span class="grid-check-box"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="2.5 6 5 8.5 9.5 3.5"/></svg></span>
              </label>
            </th>
            ${this.columns.map(c => `
              <th class="${this.sortCol === c.key ? 'sorted' : ''}" onclick="${g}.sort('${c.key}')">
                ${c.label}
                <span class="sort-icon">${this.sortCol === c.key ? (this.sortDir === 'asc' ? '↑' : '↓') : '↕'}</span>
              </th>
            `).join('')}
          </tr></thead>
          <tbody>
            ${pageData.length ? pageData.map(row => `
              <tr class="${this.selectedIds.has(row.id) ? 'selected' : ''}">
                <td>
                  <label class="grid-check">
                    <input type="checkbox" ${this.selectedIds.has(row.id) ? 'checked' : ''} onchange="${g}.toggleSelect(${row.id})">
                    <span class="grid-check-box"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="2.5 6 5 8.5 9.5 3.5"/></svg></span>
                  </label>
                </td>
                ${this.columns.map(c => `<td>${c.render ? c.render(row[c.key], row) : (row[c.key] ?? '')}</td>`).join('')}
              </tr>
            `).join('') : `<tr><td colspan="${this.columns.length + 1}" class="text-center py-8" style="color:var(--color-text-muted)">No data found</td></tr>`}
          </tbody>
        </table>
      </div>`;

    // ── Pagination Bar ──
    html += `<div class="grid-pagination-bar">
      <div class="grid-pagination-info">
        ${this.filtered.length > 0
          ? `Showing <strong>${startIdx}</strong>–<strong>${endIdx}</strong> of <strong>${this.filtered.length}</strong>`
          : 'No entries'}
      </div>
      <div class="pagination">`;

    if (totalPages > 1) {
      html += `<button class="page-btn" ${this.page <= 1 ? 'disabled' : ''} onclick="${g}.goToPage(1)">«</button>`;
      html += `<button class="page-btn" ${this.page <= 1 ? 'disabled' : ''} onclick="${g}.goToPage(${this.page - 1})">‹</button>`;
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || Math.abs(i - this.page) <= 1) {
          html += `<button class="page-btn ${i === this.page ? 'active' : ''}" onclick="${g}.goToPage(${i})">${i}</button>`;
        } else if (Math.abs(i - this.page) === 2) {
          html += `<span class="page-dots">…</span>`;
        }
      }
      html += `<button class="page-btn" ${this.page >= totalPages ? 'disabled' : ''} onclick="${g}.goToPage(${this.page + 1})">›</button>`;
      html += `<button class="page-btn" ${this.page >= totalPages ? 'disabled' : ''} onclick="${g}.goToPage(${totalPages})">»</button>`;
    }

    html += `</div></div>`;

    this.container.innerHTML = html;
  }
}
