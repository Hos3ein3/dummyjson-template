/* ============================================
   Dashboard — Forms: Wizard, Validation, Inputs
   ============================================ */

// ── Wizard Form ──
class WizardForm {
  constructor(containerId, steps, options = {}) {
    this.container = document.getElementById(containerId);
    this.steps = steps;
    this.current = 0;
    this.data = {};
    this.variant = options.variant || 'horizontal';
    this.globalVarName = options.globalVarName || 'wizard';
  }

  render() {
    let html = `<div class="wizard-steps ${this.variant === 'vertical' ? 'vertical' : ''}">`;
    this.steps.forEach((s, i) => {
      const cls = i < this.current ? 'done' : i === this.current ? 'active' : '';
      html += `<div class="wizard-step ${cls}"><div class="wizard-step-num">${i < this.current ? '✓' : i + 1}</div><span class="wizard-step-label hidden sm:inline">${s.title}</span></div>`;
      if (i < this.steps.length - 1) html += `<div class="wizard-connector ${i < this.current ? 'done' : ''}"></div>`;
    });
    html += '</div>';
    this.steps.forEach((s, i) => {
      html += `<div class="wizard-panel ${i === this.current ? 'active' : ''}" id="wizard-step-${i}">${s.content}</div>`;
    });
    html += '<div class="flex justify-between mt-6">';
    html += this.current > 0 ? `<button class="btn-secondary" onclick="${this.globalVarName}.prev()">← Previous</button>` : '<div></div>';
    if (this.current < this.steps.length - 1) {
      html += `<button class="btn-primary rounded-xl" onclick="${this.globalVarName}.next()">Next →</button>`;
    } else {
      html += `<button class="btn-primary rounded-xl" onclick="${this.globalVarName}.submit()">Submit ✓</button>`;
    }
    html += '</div>';
    this.container.innerHTML = html;
  }

  next() {
    if (this.validateCurrentStep()) {
      this.collectData();
      if (this.current < this.steps.length - 1) { this.current++; this.render(); }
    }
  }

  prev() {
    if (this.current > 0) { this.current--; this.render(); }
  }

  validateCurrentStep() {
    const panel = document.getElementById(`wizard-step-${this.current}`);
    const inputs = panel?.querySelectorAll('[required]') || [];
    let valid = true;
    inputs.forEach(inp => {
      const group = inp.closest('.input-group') || inp.closest('.check-group');
      if (inp.type === 'checkbox' || inp.type === 'radio') {
        const checked = panel.querySelectorAll(`input[name="${inp.name}"]:checked`).length;
        if (!checked) { group?.classList.add('has-error'); valid = false; }
        else group?.classList.remove('has-error');
      } else {
        if (!inp.value.trim()) {
          group?.classList.add('has-error');
          valid = false;
        } else {
          group?.classList.remove('has-error');
        }
      }
    });
    if (!valid) dashToast('Please fill in all required fields', 'error');
    return valid;
  }

  collectData() {
    const panel = document.getElementById(`wizard-step-${this.current}`);
    panel?.querySelectorAll('input, select, textarea').forEach(inp => {
      if (inp.name) this.data[inp.name] = inp.value;
    });
  }

  submit() {
    if (this.validateCurrentStep()) {
      this.collectData();
      dashToast('Form submitted successfully!', 'success');
      openModal('wizard-success-modal');
    }
  }
}

// ── Form Validation ──
const Validators = {
  required: v => !!v.trim() || 'This field is required',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email',
  phone: v => /^\+?[\d\s\-()]{7,15}$/.test(v) || 'Enter a valid phone number',
  url: v => /^https?:\/\/.+\..+/.test(v) || 'Enter a valid URL',
  minLength: (min) => (v) => v.length >= min || `Minimum ${min} characters`,
  maxLength: (max) => (v) => v.length <= max || `Maximum ${max} characters`,
  match: (fieldId, label) => (v) => v === document.getElementById(fieldId)?.value || `Must match ${label}`,
  pattern: (regex, msg) => (v) => regex.test(v) || msg,
};

function validateField(input) {
  const group = input.closest('.input-group');
  const rules = (input.dataset.validate || '').split('|').filter(Boolean);
  const errorEl = group?.querySelector('.input-error-msg');
  let error = '';

  for (const rule of rules) {
    let result;
    if (rule === 'required') result = Validators.required(input.value);
    else if (rule === 'email') result = Validators.email(input.value);
    else if (rule === 'phone') result = Validators.phone(input.value);
    else if (rule === 'url') result = Validators.url(input.value);
    else if (rule.startsWith('min:')) result = Validators.minLength(+rule.split(':')[1])(input.value);
    else if (rule.startsWith('max:')) result = Validators.maxLength(+rule.split(':')[1])(input.value);
    if (result !== true && typeof result === 'string') { error = result; break; }
  }

  if (error) {
    group?.classList.add('has-error');
    group?.classList.remove('has-success');
    if (errorEl) { errorEl.textContent = error; errorEl.style.display = 'block'; }
  } else if (input.value.trim()) {
    group?.classList.remove('has-error');
    group?.classList.add('has-success');
    if (errorEl) errorEl.style.display = 'none';
  } else {
    group?.classList.remove('has-error', 'has-success');
    if (errorEl) errorEl.style.display = 'none';
  }
  return !error;
}

// Checkbox/Radio validation
function validateCheckGroup(name, minRequired = 1) {
  const checks = document.querySelectorAll(`input[name="${name}"]`);
  const checked = Array.from(checks).filter(c => c.checked);
  const groups = document.querySelectorAll(`input[name="${name}"]`);
  const valid = checked.length >= minRequired;
  groups.forEach(c => {
    const g = c.closest('.check-group');
    if (valid) g?.classList.remove('has-error');
    else g?.classList.add('has-error');
  });
  return valid;
}

function validateForm(formId) {
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll('[data-validate]');
  let allValid = true;
  inputs.forEach(inp => { if (!validateField(inp)) allValid = false; });
  // Also validate checkbox/radio groups
  form.querySelectorAll('[data-validate-group]').forEach(el => {
    const name = el.dataset.validateGroup;
    const min = parseInt(el.dataset.validateMin || '1');
    if (!validateCheckGroup(name, min)) allValid = false;
  });
  return allValid;
}

// ── Password Strength ──
function checkPasswordStrength(password) {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

function updateStrengthBar(inputEl, barId) {
  const strength = checkPasswordStrength(inputEl.value);
  // Red(1) → Orange(2) → Yellow(3) → Green(4)
  const colors = ['transparent', '#ef4444', '#f97316', '#eab308', '#22c55e'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const segments = document.querySelectorAll(`#${barId} .strength-segment`);
  segments.forEach((s, i) => {
    s.style.background = i < strength ? colors[strength] : 'var(--glass-bg)';
  });
  const labelEl = document.getElementById(`${barId}-label`);
  if (labelEl) { labelEl.textContent = labels[strength] || ''; labelEl.style.color = colors[strength]; }
}

// ── Tags Input ──
function initTagsInput(containerId) {
  const wrap = document.getElementById(containerId);
  const input = wrap.querySelector('input');
  const tags = [];

  input.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ',') && input.value.trim()) {
      e.preventDefault();
      const val = input.value.trim().replace(',', '');
      if (val && !tags.includes(val)) {
        tags.push(val);
        renderTags();
      }
      input.value = '';
    }
    if (e.key === 'Backspace' && !input.value && tags.length) {
      tags.pop();
      renderTags();
    }
  });

  function renderTags() {
    wrap.querySelectorAll('.tag-chip').forEach(c => c.remove());
    tags.forEach((t, i) => {
      const chip = document.createElement('span');
      chip.className = 'tag-chip';
      chip.innerHTML = `${t}<span class="tag-remove" onclick="this.parentElement.remove();removeTagByIndex('${containerId}',${i})">×</span>`;
      wrap.insertBefore(chip, input);
    });
  }

  wrap._tags = tags;
}

function removeTagByIndex(containerId, idx) {
  const wrap = document.getElementById(containerId);
  if (wrap._tags) wrap._tags.splice(idx, 1);
}

// ── OTP Input ──
function initOtpInput(containerId) {
  const inputs = document.querySelectorAll(`#${containerId} .otp-input`);
  inputs.forEach((inp, i) => {
    inp.addEventListener('input', () => {
      inp.value = inp.value.replace(/\D/g, '').slice(0, 1);
      if (inp.value && i < inputs.length - 1) inputs[i + 1].focus();
    });
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !inp.value && i > 0) inputs[i - 1].focus();
    });
  });
}

// ── DatePicker (Enhanced) ──
class DatePicker {
  constructor(inputId, options = {}) {
    this.input = document.getElementById(inputId);
    this.wrap = this.input.closest('.datepicker-wrap');
    this.date = new Date();
    this.selected = null;
    this.options = {
      format: options.format || 'yyyy-mm-dd',
      minDate: options.minDate || null,
      maxDate: options.maxDate || null,
      range: options.range || false,
      showToday: options.showToday !== false,
      ...options
    };
    this.rangeStart = null;
    this.rangeEnd = null;
    this.view = 'days'; // 'days' | 'months' | 'years'
    this.yearPageStart = Math.floor(this.date.getFullYear() / 12) * 12;
    this.buildDropdown();
    this.input.addEventListener('click', () => this.toggle());
    document.addEventListener('click', (e) => { if (!this.wrap.contains(e.target)) this.close(); });
  }

  formatDate(d) {
    if (!d) return '';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return this.options.format
      .replace('yyyy', yyyy).replace('dd', dd).replace('mm', mm);
  }

  buildDropdown() {
    let dd = this.wrap.querySelector('.datepicker-dropdown');
    if (!dd) { dd = document.createElement('div'); dd.className = 'datepicker-dropdown'; this.wrap.appendChild(dd); }
    this.dropdown = dd;
    this.renderCalendar();
  }

  renderCalendar() {
    if (this.view === 'months') return this.renderMonths();
    if (this.view === 'years') return this.renderYears();

    const y = this.date.getFullYear(), m = this.date.getMonth();
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const today = new Date();
    const id = this.input.id;

    let html = `<div class="dp-header">
      <button class="dp-nav" onclick="datePickers['${id}'].prevMonth();event.stopPropagation()">‹</button>
      <div style="display:flex;gap:0.25rem;align-items:center">
        <button class="dp-month-year-select" onclick="datePickers['${id}'].showMonths();event.stopPropagation()">${months[m]}</button>
        <button class="dp-month-year-select" onclick="datePickers['${id}'].showYears();event.stopPropagation()">${y}</button>
      </div>
      <button class="dp-nav" onclick="datePickers['${id}'].nextMonth();event.stopPropagation()">›</button>
    </div><div class="dp-grid">`;
    ['Su','Mo','Tu','We','Th','Fr','Sa'].forEach(d => html += `<div class="dp-day-name">${d}</div>`);

    const prevDays = new Date(y, m, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) html += `<div class="dp-day other-month">${prevDays - i}</div>`;

    for (let d = 1; d <= daysInMonth; d++) {
      const thisDate = new Date(y, m, d);
      const isToday = d === today.getDate() && m === today.getMonth() && y === today.getFullYear();
      const isSelected = this.selected && d === this.selected.getDate() && m === this.selected.getMonth() && y === this.selected.getFullYear();
      const disabled = this.isDisabled(thisDate);
      let rangeCls = '';
      if (this.options.range && this.rangeStart && this.rangeEnd) {
        const t = thisDate.getTime();
        if (t === this.rangeStart.getTime()) rangeCls = ' selected range-start';
        else if (t === this.rangeEnd.getTime()) rangeCls = ' selected range-end';
        else if (t > this.rangeStart.getTime() && t < this.rangeEnd.getTime()) rangeCls = ' in-range';
      }
      html += `<div class="dp-day${isToday ? ' today' : ''}${isSelected && !this.options.range ? ' selected' : ''}${rangeCls}${disabled ? ' disabled' : ''}" onclick="datePickers['${id}'].selectDay(${d});event.stopPropagation()">${d}</div>`;
    }

    const remaining = 42 - (firstDay + daysInMonth);
    for (let d = 1; d <= remaining; d++) html += `<div class="dp-day other-month">${d}</div>`;
    html += '</div>';

    if (this.options.showToday) {
      html += `<div class="dp-footer">
        <button class="btn-ghost btn-sm" onclick="datePickers['${id}'].goToday();event.stopPropagation()" style="font-size:0.75rem">Today</button>
        <button class="btn-ghost btn-sm" onclick="datePickers['${id}'].clear();event.stopPropagation()" style="font-size:0.75rem">Clear</button>
      </div>`;
    }
    this.dropdown.innerHTML = html;
  }

  renderMonths() {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const id = this.input.id;
    const currentMonth = this.date.getMonth();
    let html = `<div class="dp-header">
      <button class="dp-nav" onclick="datePickers['${id}'].date.setFullYear(datePickers['${id}'].date.getFullYear()-1);datePickers['${id}'].renderCalendar();event.stopPropagation()">‹</button>
      <button class="dp-month-year-select" onclick="datePickers['${id}'].showYears();event.stopPropagation()">${this.date.getFullYear()}</button>
      <button class="dp-nav" onclick="datePickers['${id}'].date.setFullYear(datePickers['${id}'].date.getFullYear()+1);datePickers['${id}'].renderCalendar();event.stopPropagation()">›</button>
    </div><div class="dp-month-grid">`;
    months.forEach((m, i) => {
      html += `<div class="dp-month-cell${i === currentMonth ? ' selected' : ''}" onclick="datePickers['${id}'].pickMonth(${i});event.stopPropagation()">${m}</div>`;
    });
    html += '</div>';
    this.dropdown.innerHTML = html;
  }

  renderYears() {
    const id = this.input.id;
    const currentYear = this.date.getFullYear();
    let html = `<div class="dp-header">
      <button class="dp-nav" onclick="datePickers['${id}'].yearPageStart-=12;datePickers['${id}'].renderCalendar();event.stopPropagation()">‹</button>
      <span style="font-weight:600;font-size:0.85rem;color:var(--color-text)">${this.yearPageStart} – ${this.yearPageStart + 11}</span>
      <button class="dp-nav" onclick="datePickers['${id}'].yearPageStart+=12;datePickers['${id}'].renderCalendar();event.stopPropagation()">›</button>
    </div><div class="dp-year-grid">`;
    for (let y = this.yearPageStart; y < this.yearPageStart + 12; y++) {
      html += `<div class="dp-year-cell${y === currentYear ? ' selected' : ''}" onclick="datePickers['${id}'].pickYear(${y});event.stopPropagation()">${y}</div>`;
    }
    html += '</div>';
    this.dropdown.innerHTML = html;
  }

  showMonths() { this.view = 'months'; this.renderCalendar(); }
  showYears() { this.view = 'years'; this.yearPageStart = Math.floor(this.date.getFullYear() / 12) * 12; this.renderCalendar(); }
  pickMonth(m) { this.date.setMonth(m); this.view = 'days'; this.renderCalendar(); }
  pickYear(y) { this.date.setFullYear(y); this.view = 'months'; this.renderCalendar(); }

  isDisabled(d) {
    if (this.options.minDate && d < this.options.minDate) return true;
    if (this.options.maxDate && d > this.options.maxDate) return true;
    return false;
  }

  selectDay(d) {
    const picked = new Date(this.date.getFullYear(), this.date.getMonth(), d);
    if (this.isDisabled(picked)) return;

    if (this.options.range) {
      if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
        this.rangeStart = picked;
        this.rangeEnd = null;
      } else {
        if (picked < this.rangeStart) { this.rangeEnd = this.rangeStart; this.rangeStart = picked; }
        else { this.rangeEnd = picked; }
        this.input.value = this.formatDate(this.rangeStart) + ' → ' + this.formatDate(this.rangeEnd);
        this.renderCalendar();
        this.close();
        return;
      }
      this.input.value = this.formatDate(this.rangeStart) + ' → ...';
      this.renderCalendar();
    } else {
      this.selected = picked;
      this.input.value = this.formatDate(this.selected);
      this.renderCalendar();
      this.close();
    }
  }

  goToday() {
    const t = new Date();
    this.date = new Date(t.getFullYear(), t.getMonth(), 1);
    if (!this.options.range) {
      this.selected = t;
      this.input.value = this.formatDate(t);
    }
    this.view = 'days';
    this.renderCalendar();
  }

  clear() {
    this.selected = null;
    this.rangeStart = null;
    this.rangeEnd = null;
    this.input.value = '';
    this.renderCalendar();
  }

  prevMonth() { this.date.setMonth(this.date.getMonth() - 1); this.renderCalendar(); }
  nextMonth() { this.date.setMonth(this.date.getMonth() + 1); this.renderCalendar(); }
  toggle() { this.wrap.classList.toggle('open'); }
  close() { this.wrap.classList.remove('open'); }
}

const datePickers = {};

// ── TimePicker ──
class TimePicker {
  constructor(inputId, options = {}) {
    this.input = document.getElementById(inputId);
    this.wrap = this.input.closest('.timepicker-wrap');
    this.options = { use24: options.use24 || false, step: options.step || 1, ...options };
    this.hour = 12;
    this.minute = 0;
    this.ampm = 'AM';
    this.buildDropdown();
    this.input.addEventListener('click', () => this.toggle());
    document.addEventListener('click', (e) => { if (!this.wrap.contains(e.target)) this.close(); });
  }

  buildDropdown() {
    let dd = this.wrap.querySelector('.timepicker-dropdown');
    if (!dd) { dd = document.createElement('div'); dd.className = 'timepicker-dropdown'; this.wrap.appendChild(dd); }
    this.dropdown = dd;
    this.render();
  }

  render() {
    const id = this.input.id;
    const maxH = this.options.use24 ? 24 : 12;
    const startH = this.options.use24 ? 0 : 1;

    let hoursHtml = '';
    for (let h = startH; h <= (this.options.use24 ? 23 : 12); h++) {
      const label = String(h).padStart(2, '0');
      hoursHtml += `<div class="tp-cell${h === this.hour ? ' selected' : ''}" onclick="timePickers['${id}'].pickHour(${h});event.stopPropagation()">${label}</div>`;
    }

    let minsHtml = '';
    for (let m = 0; m < 60; m += this.options.step) {
      const label = String(m).padStart(2, '0');
      minsHtml += `<div class="tp-cell${m === this.minute ? ' selected' : ''}" onclick="timePickers['${id}'].pickMinute(${m});event.stopPropagation()">${label}</div>`;
    }

    let ampmHtml = '';
    if (!this.options.use24) {
      ampmHtml = `<div class="tp-column" style="max-height:auto">
        <div class="tp-cell${this.ampm === 'AM' ? ' selected' : ''}" onclick="timePickers['${id}'].pickAmPm('AM');event.stopPropagation()">AM</div>
        <div class="tp-cell${this.ampm === 'PM' ? ' selected' : ''}" onclick="timePickers['${id}'].pickAmPm('PM');event.stopPropagation()">PM</div>
      </div>`;
    }

    this.dropdown.innerHTML = `
      <div style="font-size:0.75rem;font-weight:600;color:var(--color-text-muted);margin-bottom:0.5rem;display:flex;gap:0.5rem">
        <span style="flex:1;text-align:center">Hour</span><span style="flex:1;text-align:center">Min</span>${!this.options.use24 ? '<span style="flex:0.6;text-align:center">  </span>' : ''}
      </div>
      <div class="tp-columns">
        <div class="tp-column">${hoursHtml}</div>
        <div class="tp-column">${minsHtml}</div>
        ${ampmHtml}
      </div>
      <div class="dp-footer" style="margin-top:0.5rem;padding-top:0.5rem;border-top:1px solid var(--glass-border)">
        <button class="btn-ghost btn-sm" onclick="timePickers['${id}'].setNow();event.stopPropagation()" style="font-size:0.75rem">Now</button>
        <button class="btn-primary rounded-lg btn-sm" onclick="timePickers['${id}'].confirm();event.stopPropagation()" style="font-size:0.75rem">OK</button>
      </div>
    `;

    // Scroll to selected
    setTimeout(() => {
      this.dropdown.querySelectorAll('.tp-column').forEach(col => {
        const sel = col.querySelector('.tp-cell.selected');
        if (sel) sel.scrollIntoView({ block: 'center', behavior: 'instant' });
      });
    }, 0);
  }

  pickHour(h) { this.hour = h; this.render(); this.updateInput(); }
  pickMinute(m) { this.minute = m; this.render(); this.updateInput(); }
  pickAmPm(v) { this.ampm = v; this.render(); this.updateInput(); }

  setNow() {
    const now = new Date();
    if (this.options.use24) {
      this.hour = now.getHours();
    } else {
      let h = now.getHours();
      this.ampm = h >= 12 ? 'PM' : 'AM';
      this.hour = h % 12 || 12;
    }
    this.minute = now.getMinutes();
    this.render();
    this.updateInput();
  }

  updateInput() {
    const h = String(this.hour).padStart(2, '0');
    const m = String(this.minute).padStart(2, '0');
    this.input.value = this.options.use24 ? `${h}:${m}` : `${h}:${m} ${this.ampm}`;
  }

  confirm() { this.updateInput(); this.close(); }
  toggle() { this.wrap.classList.toggle('open'); }
  close() { this.wrap.classList.remove('open'); }
}

const timePickers = {};

// ── File Drop ──
function initFileDrop(dropId) {
  const drop = document.getElementById(dropId);
  ['dragenter','dragover'].forEach(e => drop.addEventListener(e, (ev) => { ev.preventDefault(); drop.classList.add('dragover'); }));
  ['dragleave','drop'].forEach(e => drop.addEventListener(e, (ev) => { ev.preventDefault(); drop.classList.remove('dragover'); }));
  drop.addEventListener('drop', (ev) => {
    const files = ev.dataTransfer.files;
    if (files.length) handleFiles(dropId, files);
  });
}

function handleFiles(dropId, files) {
  const drop = document.getElementById(dropId);
  const list = drop.querySelector('.file-list') || document.createElement('div');
  list.className = 'file-list mt-3 space-y-1';
  Array.from(files).forEach(f => {
    list.innerHTML += `<div class="flex items-center gap-2 text-sm" style="color:var(--color-text-secondary)"><span>📄</span>${f.name}<span class="text-xs" style="color:var(--color-text-muted)">(${(f.size/1024).toFixed(1)} KB)</span></div>`;
  });
  if (!drop.querySelector('.file-list')) drop.appendChild(list);
  dashToast(`${files.length} file(s) selected`, 'success');
}

// ── Multi Select ──
function toggleMultiSelect(id) { document.getElementById(id)?.classList.toggle('open'); }
function toggleMultiOption(selectId, value, label) {
  const display = document.querySelector(`#${selectId} .multiselect-display`);
  const option = event.currentTarget;
  option.classList.toggle('selected');
  const selected = document.querySelectorAll(`#${selectId} .multiselect-option.selected`);
  let html = '';
  selected.forEach(opt => {
    html += `<span class="tag-chip">${opt.dataset.label}<span class="tag-remove" onclick="event.stopPropagation();deselectOption('${selectId}','${opt.dataset.value}')">×</span></span>`;
  });
  if (!html) html = `<span style="color:var(--color-text-muted);font-size:0.85rem;padding:0.2rem">Select options...</span>`;
  display.innerHTML = html;
}
function deselectOption(selectId, value) {
  document.querySelector(`#${selectId} .multiselect-option[data-value="${value}"]`)?.classList.remove('selected');
  toggleMultiOption(selectId);
}
