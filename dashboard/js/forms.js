/* ============================================
   Dashboard — Forms: Wizard, Validation, Inputs
   ============================================ */

// ── Wizard Form ──
class WizardForm {
  constructor(containerId, steps) {
    this.container = document.getElementById(containerId);
    this.steps = steps;
    this.current = 0;
    this.data = {};
  }

  render() {
    // Steps indicator
    let html = '<div class="wizard-steps">';
    this.steps.forEach((s, i) => {
      const cls = i < this.current ? 'done' : i === this.current ? 'active' : '';
      html += `<div class="wizard-step ${cls}"><div class="wizard-step-num">${i < this.current ? '✓' : i + 1}</div><span class="wizard-step-label hidden sm:inline">${s.title}</span></div>`;
      if (i < this.steps.length - 1) html += `<div class="wizard-connector ${i < this.current ? 'done' : ''}"></div>`;
    });
    html += '</div>';

    // Panels
    this.steps.forEach((s, i) => {
      html += `<div class="wizard-panel ${i === this.current ? 'active' : ''}" id="wizard-step-${i}">${s.content}</div>`;
    });

    // Navigation
    html += '<div class="flex justify-between mt-6">';
    html += this.current > 0 ? `<button class="btn-secondary" onclick="wizard.prev()">← Previous</button>` : '<div></div>';
    if (this.current < this.steps.length - 1) {
      html += `<button class="btn-primary rounded-xl" onclick="wizard.next()">Next →</button>`;
    } else {
      html += `<button class="btn-primary rounded-xl" onclick="wizard.submit()">Submit ✓</button>`;
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
      const group = inp.closest('.input-group');
      if (!inp.value.trim()) {
        group?.classList.add('has-error');
        valid = false;
      } else {
        group?.classList.remove('has-error');
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

function validateForm(formId) {
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll('[data-validate]');
  let allValid = true;
  inputs.forEach(inp => { if (!validateField(inp)) allValid = false; });
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
  const colors = ['var(--error)', 'var(--warning)', 'var(--warning)', 'var(--success)', 'var(--success)'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const segments = document.querySelectorAll(`#${barId} .strength-segment`);
  segments.forEach((s, i) => { s.style.background = i < strength ? colors[strength] : 'var(--glass-bg)'; });
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

// ── DatePicker ──
class DatePicker {
  constructor(inputId) {
    this.input = document.getElementById(inputId);
    this.wrap = this.input.closest('.datepicker-wrap');
    this.date = new Date();
    this.selected = null;
    this.buildDropdown();
    this.input.addEventListener('click', () => this.toggle());
    document.addEventListener('click', (e) => { if (!this.wrap.contains(e.target)) this.close(); });
  }

  buildDropdown() {
    let dd = this.wrap.querySelector('.datepicker-dropdown');
    if (!dd) { dd = document.createElement('div'); dd.className = 'datepicker-dropdown'; this.wrap.appendChild(dd); }
    this.dropdown = dd;
    this.renderCalendar();
  }

  renderCalendar() {
    const y = this.date.getFullYear(), m = this.date.getMonth();
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const today = new Date();

    let html = `<div class="dp-header">
      <button class="dp-nav" onclick="datePickers['${this.input.id}'].prevMonth()">‹</button>
      <span style="font-weight:600;font-size:0.9rem;color:var(--color-text)">${months[m]} ${y}</span>
      <button class="dp-nav" onclick="datePickers['${this.input.id}'].nextMonth()">›</button>
    </div><div class="dp-grid">`;
    ['Su','Mo','Tu','We','Th','Fr','Sa'].forEach(d => html += `<div class="dp-day-name">${d}</div>`);

    // Previous month days
    const prevDays = new Date(y, m, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) html += `<div class="dp-day other-month">${prevDays - i}</div>`;

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === today.getDate() && m === today.getMonth() && y === today.getFullYear();
      const isSelected = this.selected && d === this.selected.getDate() && m === this.selected.getMonth() && y === this.selected.getFullYear();
      html += `<div class="dp-day${isToday ? ' today' : ''}${isSelected ? ' selected' : ''}" onclick="datePickers['${this.input.id}'].selectDay(${d})">${d}</div>`;
    }

    // Next month
    const remaining = 42 - (firstDay + daysInMonth);
    for (let d = 1; d <= remaining; d++) html += `<div class="dp-day other-month">${d}</div>`;

    html += '</div>';
    this.dropdown.innerHTML = html;
  }

  selectDay(d) {
    this.selected = new Date(this.date.getFullYear(), this.date.getMonth(), d);
    this.input.value = this.selected.toLocaleDateString('en-CA');
    this.renderCalendar();
    this.close();
  }

  prevMonth() { this.date.setMonth(this.date.getMonth() - 1); this.renderCalendar(); }
  nextMonth() { this.date.setMonth(this.date.getMonth() + 1); this.renderCalendar(); }
  toggle() { this.wrap.classList.toggle('open'); }
  close() { this.wrap.classList.remove('open'); }
}

const datePickers = {};

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
  // Rebuild display
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
  toggleMultiOption(selectId); // refresh display
}
