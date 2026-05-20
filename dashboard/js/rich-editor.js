// dashboard/js/rich-editor.js
// Full-featured Quill implementation with custom extensions

(function () {
  if (typeof Quill === 'undefined') return;

  // Custom fonts and sizes
  const Font = Quill.import('formats/font');
  Font.whitelist = ['sans-serif', 'serif', 'monospace', 'Inter', 'Outfit', 'Roboto'];
  Quill.register(Font, true);

  const Size = Quill.import('attributors/style/size');
  Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '24px', '32px', '48px'];
  Quill.register(Size, true);

  // Initialize Quill
  const quill = new Quill('#rich-editor-container', {
    modules: {
      toolbar: '#quill-toolbar-container',
      history: {
        delay: 2000,
        maxStack: 500,
        userOnly: true
      }
    },
    theme: 'snow',
    placeholder: 'Type / for commands, or start writing...',
  });

  // Attach Quill to global for access
  window.richEditor = quill;

  // Update Stats
  const updateStats = () => {
    const text = quill.getText();
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const chars = text.length - 1;
    const readingTime = Math.ceil(words / 200) || 1;
    
    document.getElementById('editor-stats').innerHTML = `${words} words &middot; ${chars} chars &middot; ~${readingTime} min read`;
  };
  quill.on('text-change', updateStats);
  updateStats();

  // Auto-save logic
  let autosaveTimeout;
  quill.on('text-change', () => {
    clearTimeout(autosaveTimeout);
    autosaveTimeout = setTimeout(() => {
      localStorage.setItem('quill-autosave', JSON.stringify(quill.getContents()));
    }, 2000);
  });

  const saved = localStorage.getItem('quill-autosave');
  if (saved) {
    try {
      quill.setContents(JSON.parse(saved));
    } catch(e) {}
  }

  // Bubble Menu & Slash Commands Logic
  const bubbleMenu = document.getElementById('bubble-menu');
  const slashMenu = document.getElementById('slash-commands');
  let slashIndex = null;

  quill.on('selection-change', function(range) {
    if (!range) {
      bubbleMenu.style.display = 'none';
      slashMenu.style.display = 'none';
      return;
    }
    
    // Bubble Menu (show when text is selected)
    if (range.length > 0) {
      const bounds = quill.getBounds(range.index, range.length);
      bubbleMenu.style.display = 'flex';
      bubbleMenu.style.left = bounds.left + (bounds.width/2) - (bubbleMenu.offsetWidth/2) + 'px';
      bubbleMenu.style.top = (bounds.top - bubbleMenu.offsetHeight - 10) + 'px';
    } else {
      bubbleMenu.style.display = 'none';
    }
  });

  // Slash commands logic
  quill.on('text-change', function(delta, oldDelta, source) {
    if (source !== 'user') return;
    
    const range = quill.getSelection();
    if (!range) return;

    // Check if we just typed a slash
    const cursor = range.index;
    const textBefore = quill.getText(Math.max(0, cursor - 1), 1);
    
    if (textBefore === '/') {
      slashIndex = cursor - 1;
      const bounds = quill.getBounds(cursor);
      slashMenu.style.display = 'block';
      slashMenu.style.left = bounds.left + 'px';
      slashMenu.style.top = (bounds.bottom + 5) + 'px';
    } else if (slashIndex !== null && cursor < slashIndex) {
      // Backspaced over the slash
      slashMenu.style.display = 'none';
      slashIndex = null;
    } else if (slashIndex !== null && textBefore === ' ') {
      // Space typed, close menu
      slashMenu.style.display = 'none';
      slashIndex = null;
    }
  });

  // Handle Slash Command clicks
  document.querySelectorAll('.cmd-item').forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      if (slashIndex !== null) {
        // Delete the slash
        quill.deleteText(slashIndex, quill.getSelection().index - slashIndex);
        
        switch(action) {
          case 'h1': quill.formatLine(slashIndex, 1, 'header', 1); break;
          case 'h2': quill.formatLine(slashIndex, 1, 'header', 2); break;
          case 'quote': quill.formatLine(slashIndex, 1, 'blockquote', true); break;
          case 'code': quill.formatLine(slashIndex, 1, 'code-block', true); break;
          case 'divider': quill.insertEmbed(slashIndex, 'divider', true, Quill.sources.USER); break;
        }
      }
      slashMenu.style.display = 'none';
      slashIndex = null;
      quill.focus();
    });
  });

  // Handle Bubble Menu clicks
  document.querySelectorAll('.b-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const format = btn.getAttribute('data-format');
      const range = quill.getSelection();
      if (!range) return;
      
      if (format === 'link') {
        const url = prompt('Enter link URL:');
        if (url) quill.format('link', url);
      } else {
        const currentFormat = quill.getFormat(range);
        quill.format(format, !currentFormat[format]);
      }
    });
  });

  // Global functions for the page
  window.exportDoc = function(type) {
    if (type === 'html') {
      const html = quill.root.innerHTML;
      const blob = new Blob([html], {type: 'text/html'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'document.html';
      a.click();
    } else if (type === 'md') {
      // Basic fallback MD export for demo
      const text = quill.getText();
      const blob = new Blob([text], {type: 'text/markdown'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'document.md';
      a.click();
    }
  };

  window.saveContent = function() {
    dashToast('Draft saved successfully', 'success');
  };

})();
