/* ============================================
   DummyStore — Theme Toggle (Light/Dark)
   ============================================ */

const Theme = {
  STORAGE_KEY: 'dummystore-theme',

  init() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (saved === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
    this.updateIcons();

    // Listen for system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        document.documentElement.classList.toggle('dark', e.matches);
        this.updateIcons();
      }
    });
  },

  toggle() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
    this.updateIcons();
  },

  updateIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    if (sunIcon && moonIcon) {
      sunIcon.style.display = isDark ? 'none' : 'block';
      moonIcon.style.display = isDark ? 'block' : 'none';
    }
  },

  isDark() {
    return document.documentElement.classList.contains('dark');
  }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => Theme.init());
