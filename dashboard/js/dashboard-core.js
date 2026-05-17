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
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`,
  logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  timeline: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/><line x1="12" y1="7" x2="12" y2="10"/><line x1="12" y1="14" x2="12" y2="17"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  quote: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 5v3z"/></svg>`,
  animation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.636 5.636l2.121 2.121m8.486 8.486l2.121 2.121M5.636 18.364l2.121-2.121m8.486-8.486l2.121-2.121"/></svg>`,
  kanban: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="5" height="18" rx="1"/><rect x="10" y="3" width="5" height="12" rx="1"/><rect x="17" y="3" width="5" height="15" rx="1"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
  upload: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
  shoppingCart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
  printer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,
  mic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,
  compass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>`,
  music: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
  video: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`,
  award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
  battery: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line></svg>`,
  bluetooth: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"></polyline></svg>`,
  cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
  database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
  flag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>`,
  headphones: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`,
  alignLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>`,
  alignCenter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>`,
  alignRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg>`,
  alignJustify: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
  wifi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>`,
  volume2: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
};

// ── Navigation Config ──
const sidebarNav = [
  { group: 'Main', items: [
    { id: 'overview', label: 'Overview', icon: 'home', href: 'index.html' },
    { id: 'profile', label: 'Profile', icon: 'user', href: 'profile.html' },
  ]},
  { group: 'Forms', items: [
    { id: 'forms-simple', label: 'Simple Inputs', icon: 'forms', href: 'forms-simple.html' },
    { id: 'forms-advanced', label: 'Advanced Inputs', icon: 'inputAdv', href: 'forms-advanced.html' },
    { id: 'forms-wizard', label: 'Wizard Form', icon: 'wizard', href: 'forms-wizard.html' },
    { id: 'forms-validation', label: 'Validation', icon: 'check', href: 'forms-validation.html' },
  ]},
  { group: 'Apps', items: [
    { id: 'calendar', label: 'Calendar', icon: 'calendar', href: 'calendar.html' },
    { id: 'helpdesk', label: 'Helpdesk', icon: 'chat', href: 'helpdesk.html' },
    { id: 'file-manager', label: 'File Manager', icon: 'folder', href: 'file-manager.html' },
    { id: 'kanban', label: 'Kanban Board', icon: 'kanban', href: 'kanban.html' },
  ]},
  { group: 'Content', items: [
    { id: 'blogs', label: 'Blog Posts', icon: 'forms', href: 'blogs.html' },
    { id: 'reviews', label: 'Reviews', icon: 'star', href: 'reviews.html' },
    { id: 'quotes', label: 'Quotes', icon: 'quote', href: 'quotes.html' },
    { id: 'ecommerce', label: 'E-Commerce', icon: 'shoppingCart', children: [
      { id: 'products-grid', label: 'Product Grid', href: 'products-grid.html' },
      { id: 'categories', label: 'Categories', children: [
        { id: 'cat-electronics', label: 'Electronics', href: '#' },
        { id: 'cat-clothing', label: 'Clothing', href: '#' }
      ]}
    ]}
  ]},
  { group: 'Data', items: [
    { id: 'data-grid', label: 'Data Grid', icon: 'grid', href: 'data-grid.html' },
    { id: 'data-grid-variants', label: 'Grid Variants', icon: 'layers', href: 'data-grids-variants.html' },
  ]},
  { group: 'Visuals', items: [
    { id: 'charts', label: 'Charts & Graphs', icon: 'chart', href: 'charts.html' },
    { id: 'ui-components', label: 'UI Components', icon: 'components', href: 'ui-components.html' },
    { id: 'ui-advanced', label: 'Advanced UI', icon: 'inputAdv', href: 'ui-advanced.html' },
    { id: 'forms-editor', label: 'Rich Text Editor', icon: 'forms', href: 'forms-editor.html' },
    { id: 'timeline', label: 'Timeline', icon: 'timeline', href: 'timeline.html' },
    { id: 'animations', label: 'Animations', icon: 'animation', href: 'animations.html' },
    { id: 'icons', label: 'Icon Library', icon: 'components', href: 'icons.html' },
  ]},
];

function getDashPage() {
  const p = window.location.pathname;
  const pages = ['forms-simple','forms-advanced','forms-wizard','forms-validation','data-grid','charts','ui-components','ui-advanced','profile','calendar','helpdesk','file-manager','kanban','products-grid','blogs','reviews','quotes','timeline','animations','icons'];
  for (const pg of pages) { if (p.includes(pg)) return pg; }
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
          ${renderNavItems(g.items, active)}
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
    document.querySelectorAll('.sidebar-submenu').forEach(el => {
      el.style.display = 'none';
      const arrow = el.previousElementSibling?.querySelector('.chevron-arrow');
      if(arrow) arrow.style.transform = 'rotate(0deg)';
    });
  } else {
    icon.innerHTML = dIcons.collapse;
  }
  localStorage.setItem('dash-collapsed', layout.classList.contains('collapsed'));
}

function renderNavItems(items, active, level = 0) {
  return items.map(it => {
    const hasChildren = it.children && it.children.length > 0;
    const isActive = active === it.id || (hasChildren && it.children.some(c => c.id === active || (c.children && c.children.some(cc => cc.id === active))));
    
    if (hasChildren) {
      return `
        <div class="sidebar-has-children">
          <div class="sidebar-link ${isActive ? 'active' : ''}" onclick="toggleSubmenu(this)" style="padding-left: ${level > 0 ? 1.5 + (level * 1) : 0.75}rem; cursor:pointer">
            ${it.icon ? (dIcons[it.icon] || '') : '<span style="width:18px"></span>'}
            <span class="link-text">${it.label}</span>
            <span class="chevron-arrow link-text ml-auto transition-transform ${isActive ? 'rotate-180' : ''}" style="width:14px; display:inline-flex; align-items:center">${dIcons.chevDown}</span>
          </div>
          <div class="sidebar-submenu" style="display: ${isActive ? 'block' : 'none'}; border-left: 1px solid var(--glass-border); margin-left: 1rem; padding-left: 0.25rem; margin-top: 0.25rem;">
            ${renderNavItems(it.children, active, level + 1)}
          </div>
        </div>
      `;
    } else {
      return `
        <a href="${it.href || '#'}" class="sidebar-link ${active === it.id ? 'active' : ''}" style="padding-left: ${level > 0 ? 1.5 + (level * 1) : 0.75}rem">
          ${it.icon ? (dIcons[it.icon] || '') : '<span style="width:18px"></span>'}
          <span class="link-text">${it.label}</span>
        </a>
      `;
    }
  }).join('');
}

window.toggleSubmenu = function(el) {
  const layout = document.getElementById('app');
  if (layout.classList.contains('collapsed')) {
    toggleSidebar();
  }
  const submenu = el.nextElementSibling;
  const arrow = el.querySelector('.chevron-arrow');
  if (submenu.style.display === 'block') {
    submenu.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
  } else {
    submenu.style.display = 'block';
    arrow.style.transform = 'rotate(180deg)';
  }
};

// ── Render Topbar ──
function renderDashTopbar(breadcrumbItems) {
  const isDark = document.documentElement.classList.contains('dark');
  const user = JSON.parse(localStorage.getItem('loggedUser') || 'null');
  const userName = user ? `${user.firstName}` : 'Admin';
  const html = `
    <div class="flex items-center gap-3">
      <button onclick="document.getElementById('app').classList.toggle('mobile-open')" class="btn-ghost p-1.5 rounded-lg md:hidden" style="width:36px;height:36px">${dIcons.menu}</button>
      <div class="breadcrumb">
        <a href="index.html">Dashboard</a>
        ${breadcrumbItems.map((b, i) => `<span class="sep">/</span>${i === breadcrumbItems.length - 1 ? `<span class="current">${b.label}</span>` : `<a href="${b.href}">${b.label}</a>`}`).join('')}
      </div>
    </div>
    <div class="flex items-center gap-1">
      <!-- Search -->
      <div class="relative hidden sm:block">
        <span class="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-40" style="width:16px;height:16px">${dIcons.search}</span>
        <input type="text" placeholder="Search..." class="glass-input pl-9 py-1.5 text-sm" style="width:180px;border-radius:9999px">
      </div>
      <!-- Mega Menu -->
      <div class="relative hidden md:block" id="mega-menu-wrap">
        <button class="btn-ghost p-2 rounded-lg text-xs font-semibold" onclick="document.getElementById('mega-menu-wrap').classList.toggle('open')" style="font-size:0.8rem">Apps ${dIcons.chevDown}</button>
        <div class="mega-menu-dropdown" onclick="event.stopPropagation()">
          <div class="grid grid-cols-3 gap-1 p-3" style="min-width:280px">
            <a href="calendar.html" class="mega-item">📅<span>Calendar</span></a>
            <a href="helpdesk.html" class="mega-item">💬<span>Helpdesk</span></a>
            <a href="file-manager.html" class="mega-item">📁<span>Files</span></a>
            <a href="kanban.html" class="mega-item">📋<span>Kanban</span></a>
            <a href="products-grid.html" class="mega-item">🛍️<span>Products</span></a>
            <a href="blogs.html" class="mega-item">📝<span>Blog</span></a>
            <a href="timeline.html" class="mega-item">⏱️<span>Timeline</span></a>
            <a href="icons.html" class="mega-item">🎨<span>Icons</span></a>
            <a href="charts.html" class="mega-item">📊<span>Charts</span></a>
          </div>
        </div>
      </div>
      <!-- Language -->
      <div class="relative" id="lang-dropdown">
        <button class="btn-ghost p-2 rounded-full" style="width:36px;height:36px;font-size:1rem" onclick="document.getElementById('lang-dropdown').classList.toggle('open')" data-tooltip="Language">🇬🇧</button>
        <div class="header-dropdown" style="right:0;min-width:140px">
          <div class="btn-dropdown-item" onclick="selectLang(this,'🇬🇧','EN')"><span style="font-size:1.1rem">🇬🇧</span> English</div>
          <div class="btn-dropdown-item" onclick="selectLang(this,'🇮🇹','IT')"><span style="font-size:1.1rem">🇮🇹</span> Italiano</div>
          <div class="btn-dropdown-item" onclick="selectLang(this,'🇮🇷','FA')"><span style="font-size:1.1rem">🇮🇷</span> فارسی</div>
        </div>
      </div>
      <!-- Notifications -->
      <div class="relative" id="notif-dropdown">
        <button class="btn-ghost p-2 rounded-full relative" style="width:36px;height:36px" onclick="document.getElementById('notif-dropdown').classList.toggle('open')" data-tooltip="Notifications">
          ${dIcons.bell}<span class="absolute top-1 right-1 w-2 h-2 rounded-full" style="background:var(--error)"></span>
        </button>
        <div class="header-dropdown" style="right:0;width:300px">
          <div class="px-3 py-2 font-semibold text-sm" style="border-bottom:1px solid var(--glass-border);color:var(--color-text)">Notifications</div>
          <div class="notif-item"><span class="notif-dot" style="background:var(--color-accent)"></span><div><p class="text-sm font-medium" style="color:var(--color-text)">New order received</p><p class="text-xs" style="color:var(--color-text-muted)">2 minutes ago</p></div></div>
          <div class="notif-item"><span class="notif-dot" style="background:var(--success)"></span><div><p class="text-sm font-medium" style="color:var(--color-text)">Payment confirmed</p><p class="text-xs" style="color:var(--color-text-muted)">15 minutes ago</p></div></div>
          <div class="notif-item"><span class="notif-dot" style="background:var(--star)"></span><div><p class="text-sm font-medium" style="color:var(--color-text)">Server update complete</p><p class="text-xs" style="color:var(--color-text-muted)">1 hour ago</p></div></div>
          <div class="px-3 py-2 text-center" style="border-top:1px solid var(--glass-border)"><a href="#" class="text-xs font-medium" style="color:var(--color-accent)">View all notifications</a></div>
        </div>
      </div>
      <!-- Theme -->
      <button onclick="toggleDashTheme()" data-tooltip="Toggle theme" class="btn-ghost p-2 rounded-full" style="width:36px;height:36px" id="dash-theme-btn">
        ${isDark ? dIcons.sun : dIcons.moon}
      </button>
      <!-- Settings Gear -->
      <button onclick="toggleSettingsPanel()" data-tooltip="Settings" class="btn-ghost p-2 rounded-full" style="width:36px;height:36px">${dIcons.gear}</button>
      <!-- User Menu -->
      <div class="relative" id="user-dropdown" style="border-left:1px solid var(--glass-border);padding-left:0.5rem;margin-left:0.25rem">
        <button class="flex items-center gap-2 btn-ghost rounded-lg px-2 py-1" onclick="document.getElementById('user-dropdown').classList.toggle('open')">
          <div class="w-8 h-8 rounded-full flex items-center justify-center" style="background:var(--btn-bg);color:var(--btn-text);font-weight:700;font-size:0.75rem">${userName[0]}</div>
          <span class="text-sm font-medium hidden sm:block" style="color:var(--color-text)">${userName}</span>
          ${dIcons.chevDown}
        </button>
        <div class="header-dropdown" style="right:0;min-width:180px">
          <div class="px-3 py-2" style="border-bottom:1px solid var(--glass-border)">
            <p class="text-sm font-semibold" style="color:var(--color-text)">${userName}</p>
            <p class="text-xs" style="color:var(--color-text-muted)">${user?.email || 'admin@example.com'}</p>
          </div>
          <a href="profile.html" class="btn-dropdown-item">${dIcons.user} Profile</a>
          <div class="btn-dropdown-item" onclick="dashToast('Settings opened','success')">${dIcons.gear} Settings</div>
          <div class="btn-dropdown-divider"></div>
          <div class="btn-dropdown-item" onclick="localStorage.removeItem('loggedUser');window.location.href='../login.html'" style="color:var(--error)">${dIcons.logout} Logout</div>
        </div>
      </div>
    </div>
  `;
  document.getElementById('topbar-container').innerHTML = html;
  // Close header dropdowns on outside click
  document.addEventListener('click', (e) => {
    ['notif-dropdown','lang-dropdown','user-dropdown','mega-menu-wrap'].forEach(id => {
      const el = document.getElementById(id);
      if (el && !el.contains(e.target)) el.classList.remove('open');
    });
  });
}

function selectLang(el, flag, code) {
  const btn = document.querySelector('#lang-dropdown > button');
  btn.innerHTML = flag;
  document.getElementById('lang-dropdown').classList.remove('open');
  dashToast(`Language: ${code}`, 'success');
}

function toggleSettingsPanel() {
  let panel = document.getElementById('settings-offcanvas');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'settings-offcanvas';
    panel.className = 'settings-panel';
    panel.innerHTML = `
      <div class="settings-panel-inner">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold" style="font-family:'Outfit';color:var(--color-text)">Settings</h3>
          <button class="btn-ghost p-1 rounded-lg" onclick="toggleSettingsPanel()">${dIcons.close}</button>
        </div>
        <div class="space-y-4">
          <div><p class="text-xs font-semibold mb-2" style="color:var(--color-text-muted)">THEME MODE</p>
            <div class="flex gap-2"><button class="btn-secondary btn-sm flex-1" onclick="document.documentElement.classList.remove('dark');localStorage.setItem('dummystore-theme','light')">☀️ Light</button><button class="btn-secondary btn-sm flex-1" onclick="document.documentElement.classList.add('dark');localStorage.setItem('dummystore-theme','dark')">🌙 Dark</button></div>
          </div>
          <div><p class="text-xs font-semibold mb-2" style="color:var(--color-text-muted)">SIDEBAR</p>
            <div class="flex gap-2"><button class="btn-secondary btn-sm flex-1" onclick="document.getElementById('app').classList.remove('collapsed')">Expanded</button><button class="btn-secondary btn-sm flex-1" onclick="document.getElementById('app').classList.add('collapsed')">Collapsed</button></div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(panel);
    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'settings-overlay';
    overlay.className = 'settings-overlay';
    overlay.onclick = () => toggleSettingsPanel();
    document.body.appendChild(overlay);
  }
  panel.classList.toggle('open');
  document.getElementById('settings-overlay').classList.toggle('open');
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
