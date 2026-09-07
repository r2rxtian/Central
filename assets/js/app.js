/**
 * CentralPoint Employee Portal - Core Application Logic
 * Comprehensive Frontend State Management, Filtering, Pagination, Workspaces & Persistence
 */

(function () {
  'use strict';

  // Master State Container
  window.CentralState = {
    applications: window.CP_DATA?.applications || [],
    categories: window.CP_DATA?.categories || {},
    announcements: window.CP_DATA?.announcements || [],
    quickLinks: window.CP_DATA?.quickLinks || [],
    currentUser: window.CP_DATA?.currentUser || {},
    
    // Persistent User Preferences
    favorites: [],
    workspaces: [],
    defaultWorkspaceId: null,
    
    // Active UI State
    activeWorkspaceId: 'all',
    activeCategory: 'all',
    searchQuery: '',
    currentPage: 1,
    itemsPerPage: 16,
    isEditFavorites: false,
    activeAnnouncementIdx: 0,
    contextMenuAppId: null,
    theme: 'light'
  };

  const state = window.CentralState;

  // LocalStorage Keys
  const STORAGE_FAVORITES_KEY = 'centralpoint_favorites_v1';
  const STORAGE_WORKSPACES_KEY = 'centralpoint_workspaces_v1';
  const STORAGE_DEFAULT_WS_KEY = 'centralpoint_default_ws_v1';
  const STORAGE_THEME_KEY = 'centralpoint_theme_v1';

  // Initialize Local Storage & Defaults
  function initStorage() {
    // 1. Favorites
    try {
      const storedFavs = localStorage.getItem(STORAGE_FAVORITES_KEY);
      if (storedFavs) {
        state.favorites = JSON.parse(storedFavs);
      } else {
        state.favorites = [
          'people-navee',
          'employee-email',
          'itickethub',
          'docusign',
          'meeting-rooms'
        ];
        saveFavorites();
      }
    } catch (e) {
      state.favorites = ['people-navee', 'employee-email', 'itickethub', 'docusign', 'meeting-rooms'];
    }

    // 2. Workspaces
    try {
      const storedWorkspaces = localStorage.getItem(STORAGE_WORKSPACES_KEY);
      if (storedWorkspaces) {
        state.workspaces = JSON.parse(storedWorkspaces);
      } else {
        state.workspaces = [
          {
            id: 'qa-websites',
            name: 'QA Websites',
            isDefault: true,
            appIds: [
              'qa-portal',
              'staging-website',
              'bug-tracker',
              'test-reports',
              'jira-qa',
              'test-environment'
            ]
          },
          {
            id: 'it-tools',
            name: 'IT Support Suite',
            isDefault: false,
            appIds: [
              'itickethub',
              'app-ticket',
              'it-asset-manager',
              'vpn-gateway',
              'software-center'
            ]
          }
        ];
        saveWorkspaces();
      }
    } catch (e) {
      state.workspaces = [];
    }

    // 3. Default Workspace
    try {
      const defaultWs = localStorage.getItem(STORAGE_DEFAULT_WS_KEY);
      if (defaultWs && defaultWs !== 'all') {
        state.defaultWorkspaceId = defaultWs;
      } else {
        state.defaultWorkspaceId = null;
      }
    } catch (e) {
      state.defaultWorkspaceId = null;
    }

    // Default to 'all' so the 48-application catalog matches the reference view on load
    state.activeWorkspaceId = 'all';
  }

  function saveFavorites() {
    try {
      localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(state.favorites));
    } catch (e) {
      console.warn('Could not save favorites to localStorage', e);
    }
  }

  function saveWorkspaces() {
    try {
      localStorage.setItem(STORAGE_WORKSPACES_KEY, JSON.stringify(state.workspaces));
    } catch (e) {
      console.warn('Could not save workspaces to localStorage', e);
    }
  }

  function saveDefaultWorkspace(wsId) {
    state.defaultWorkspaceId = wsId;
    try {
      if (wsId) {
        localStorage.setItem(STORAGE_DEFAULT_WS_KEY, wsId);
      } else {
        localStorage.removeItem(STORAGE_DEFAULT_WS_KEY);
      }
    } catch (e) {
      console.warn('Could not save default workspace', e);
    }
  }

  // Toast Notification Helper
  window.showToast = function (message, icon = '✓') {
    const toast = document.getElementById('global-toast');
    const msgEl = document.getElementById('toast-message');
    const iconEl = document.getElementById('toast-icon');
    if (!toast || !msgEl) return;
    
    msgEl.textContent = message;
    if (iconEl) iconEl.textContent = icon;
    toast.classList.add('show');
    
    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // Helper to find App by ID
  function getAppById(id) {
    return state.applications.find(a => a.id === id);
  }

  // Color Mapping for App Icon Badges
  const ICON_COLORS = {
    blue: '#3b82f6',
    purple: '#8b5cf6',
    teal: '#14b8a6',
    pink: '#f472b6',
    green: '#10b981',
    Green: '#10b981',
    magenta: '#c084fc',
    orange: '#f97316',
    cyan: '#0ea5e9'
  };

  // Render SVG Icon (Client-Side generator matching PHP helper)
  function getIconSvg(iconName, size = 18) {
    const icons = {
      'globe': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
      'users': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      'user-circle': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"/></svg>`,
      'mail': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
      'monitor': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
      'calendar': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
      'settings': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
      'shield-check': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
      'file-text': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
      'arrow-right-circle': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 16 16 12 12 8"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
      'dots-vertical': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>`,
      'x': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
      'plus': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
      'sun': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
      'moon': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
      'qr': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><rect x="18" y="18" width="3" height="3"/></svg>`,
      'QR': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><rect x="18" y="18" width="3" height="3"/></svg>`
    };
    return icons[iconName] || icons['globe'];
  }

  // ==========================================================================
  // Application Launch & Navigation
  // ==========================================================================
  window.launchApp = function (appId) {
    const app = getAppById(appId);
    if (!app || !app.url) return;

    // Direct, instant navigation to the application URL in a new tab
    window.open(app.url, '_blank', 'noopener,noreferrer');
  };

  window.openAppDetails = function (appId) {
    const app = getAppById(appId);
    if (!app) return;

    const modal = document.getElementById('app-launch-modal');
    const nameEl = document.getElementById('modal-app-name');
    const deptEl = document.getElementById('modal-app-dept');
    const descEl = document.getElementById('modal-app-description');
    const urlEl = document.getElementById('modal-app-url');
    const linkEl = document.getElementById('modal-app-launch-link');
    const iconEl = document.getElementById('modal-app-icon');

    if (nameEl) nameEl.textContent = app.name;
    if (deptEl) deptEl.textContent = `${app.department} • ${app.categoryLabel}`;
    if (descEl) descEl.textContent = app.description;
    if (urlEl) urlEl.textContent = app.url;
    if (linkEl) linkEl.href = app.url;
    if (iconEl) {
      iconEl.style.backgroundColor = ICON_COLORS[app.iconColor] || '#2563eb';
      iconEl.innerHTML = getIconSvg(app.icon, 18);
    }

    if (modal) modal.classList.add('open');
  };

  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
  };

  // Close modals on backdrop click or ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
      closeContextMenu();
      closeMoreDropdown();
      closeSearchDropdown();
    }
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });

  // ==========================================================================
  // Context Menu for App Cards (3-dots)
  // ==========================================================================
  window.toggleAppContextMenu = function (e, appId) {
    e.stopPropagation();
    state.contextMenuAppId = appId;
    const menu = document.getElementById('app-context-menu');
    if (!menu) return;

    const isFav = state.favorites.includes(appId);
    const favLabel = document.getElementById('ctx-fav-label');
    if (favLabel) {
      favLabel.textContent = isFav ? 'Remove from Favorites' : 'Add to Favorites';
    }

    // Position context menu near clicked button
    const rect = e.currentTarget.getBoundingClientRect();
    menu.style.position = 'fixed';
    menu.style.top = `${rect.bottom + 6}px`;
    menu.style.left = `${Math.min(rect.left - 110, window.innerWidth - 180)}px`;
    menu.classList.add('open');
  };

  function closeContextMenu() {
    const menu = document.getElementById('app-context-menu');
    if (menu) menu.classList.remove('open');
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest('#app-context-menu') && !e.target.closest('.app-card-menu-btn')) {
      closeContextMenu();
    }
  });

  // Bind context menu buttons
  document.getElementById('ctx-launch-btn')?.addEventListener('click', function () {
    if (state.contextMenuAppId) {
      window.launchApp(state.contextMenuAppId);
      closeContextMenu();
    }
  });

  document.getElementById('ctx-fav-toggle-btn')?.addEventListener('click', function () {
    if (state.contextMenuAppId) {
      window.toggleFavorite(state.contextMenuAppId);
      closeContextMenu();
    }
  });

  document.getElementById('ctx-details-btn')?.addEventListener('click', function () {
    if (state.contextMenuAppId) {
      window.openAppDetails(state.contextMenuAppId);
      closeContextMenu();
    }
  });

  // ==========================================================================
  // Favorite Apps Logic & Rendering
  // ==========================================================================
  window.toggleFavorite = function (appId) {
    const app = getAppById(appId);
    if (!app) return;

    const idx = state.favorites.indexOf(appId);
    if (idx > -1) {
      state.favorites.splice(idx, 1);
      saveFavorites();
      renderFavorites();
      window.showToast(`Removed "${app.name}" from favorites.`);
    } else {
      state.favorites.push(appId);
      saveFavorites();
      renderFavorites();
      window.showToast(`Added "${app.name}" to favorites!`);
    }
  };

  window.removeFavorite = function (appId) {
    const app = getAppById(appId);
    state.favorites = state.favorites.filter(id => id !== appId);
    saveFavorites();
    renderFavorites();
    if (app) window.showToast(`Removed "${app.name}" from favorites.`);
  };

  function renderFavorites() {
    const track = document.getElementById('favorites-cards-track');
    if (!track) return;

    track.innerHTML = '';
    state.favorites.forEach(favId => {
      const app = getAppById(favId);
      if (!app) return;

      const card = document.createElement('div');
      card.className = 'fav-card';
      card.dataset.appId = app.id;
      const bgColor = ICON_COLORS[app.iconColor] || '#7c3aed';

      card.innerHTML = `
        <div class="fav-card-icon" style="background-color: ${bgColor};">
          ${getIconSvg(app.icon, 20)}
        </div>
        <div class="fav-card-details">
          <div class="fav-card-name" title="${app.name}">${app.name}</div>
          <div class="fav-card-dept">${app.categoryLabel}</div>
        </div>
        <button class="fav-delete-btn" title="Remove from favorites">
          ${getIconSvg('x', 12)}
        </button>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('.fav-delete-btn')) {
          e.stopPropagation();
          window.removeFavorite(app.id);
        } else {
          window.launchApp(app.id);
        }
      });

      track.appendChild(card);
    });

    // Append the "+ Add Favorite" card at the end
    const addCard = document.createElement('div');
    addCard.className = 'fav-add-card';
    addCard.id = 'add-favorite-trigger-card';
    addCard.innerHTML = `
      <span class="fav-add-icon">${getIconSvg('plus', 20)}</span>
      <span class="fav-add-label">Add Favorite</span>
    `;
    addCard.addEventListener('click', openAddFavoriteModal);
    track.appendChild(addCard);

    // Apply edit-mode if active
    if (state.isEditFavorites) {
      track.classList.add('edit-mode');
    } else {
      track.classList.remove('edit-mode');
    }
  }

  // Toggle Edit Favorites Mode
  const editFavBtn = document.getElementById('toggle-edit-favorites-btn');
  const editFavLabel = document.getElementById('edit-favorites-btn-label');
  editFavBtn?.addEventListener('click', function () {
    state.isEditFavorites = !state.isEditFavorites;
    if (editFavLabel) {
      editFavLabel.textContent = state.isEditFavorites ? 'Done editing' : 'Edit favorites';
    }
    const track = document.getElementById('favorites-cards-track');
    if (track) {
      if (state.isEditFavorites) track.classList.add('edit-mode');
      else track.classList.remove('edit-mode');
    }
  });

  // Add Favorite Picker Modal
  function openAddFavoriteModal() {
    const modal = document.getElementById('add-favorite-modal');
    const list = document.getElementById('fav-picker-list');
    const searchInput = document.getElementById('fav-search-input');
    if (!modal || !list) return;

    if (searchInput) searchInput.value = '';
    renderFavoritePickerItems('');

    searchInput?.addEventListener('input', function () {
      renderFavoritePickerItems(this.value.trim().toLowerCase());
    });

    modal.classList.add('open');
  }

  function renderFavoritePickerItems(query) {
    const list = document.getElementById('fav-picker-list');
    if (!list) return;

    const filtered = state.applications.filter(app => {
      if (!query) return true;
      return app.name.toLowerCase().includes(query) ||
             app.department.toLowerCase().includes(query) ||
             app.categoryLabel.toLowerCase().includes(query);
    });

    list.innerHTML = '';
    if (filtered.length === 0) {
      list.innerHTML = '<div style="padding: 16px; text-align: center; color: #64748b;">No applications match search.</div>';
      return;
    }

    filtered.forEach(app => {
      const isFav = state.favorites.includes(app.id);
      const row = document.createElement('div');
      row.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: var(--bg-card); border-radius: 8px; border: 1px solid var(--border-card); cursor: pointer;';
      const bgColor = ICON_COLORS[app.iconColor] || '#2563eb';

      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 30px; height: 30px; border-radius: 8px; background: ${bgColor}; display: flex; align-items: center; justify-content: center; color: white;">
            ${getIconSvg(app.icon, 14)}
          </div>
          <div>
            <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-main);">${app.name}</div>
            <div style="font-size: 0.72rem; color: var(--text-secondary);">${app.categoryLabel}</div>
          </div>
        </div>
        <button class="btn-secondary" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 6px; ${isFav ? 'background: rgba(236,72,153,0.15); color: #ec4899; border-color: rgba(236,72,153,0.3);' : ''}">
          ${isFav ? '✓ Favorited' : '+ Add'}
        </button>
      `;

      row.addEventListener('click', () => {
        window.toggleFavorite(app.id);
        renderFavoritePickerItems(query);
      });

      list.appendChild(row);
    });
  }

  // ==========================================================================
  // Saved Groups / Workspaces
  // ==========================================================================
  function renderWorkspaces() {
    const tabsGroup = document.getElementById('workspace-tabs-group');
    const toolsGroup = document.getElementById('active-workspace-tools');
    const setDefaultBtnText = document.getElementById('set-default-btn-text');
    if (!tabsGroup) return;

    tabsGroup.innerHTML = '';

    // "All Applications" tab
    const allTab = document.createElement('button');
    allTab.className = `workspace-tab-btn ${state.activeWorkspaceId === 'all' ? 'active' : ''}`;
    allTab.dataset.workspaceId = 'all';
    allTab.innerHTML = `
      <span style="display: flex; align-items: center;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
      </span>
      <span>All Applications</span>
    `;
    allTab.addEventListener('click', () => selectWorkspace('all'));
    tabsGroup.appendChild(allTab);

    // Custom Workspace tabs
    state.workspaces.forEach(ws => {
      const isDefault = (ws.id === state.defaultWorkspaceId) || ws.isDefault;
      const isActive = state.activeWorkspaceId === ws.id;

      const btn = document.createElement('button');
      btn.className = `workspace-tab-btn ${isActive ? 'active' : ''}`;
      btn.dataset.workspaceId = ws.id;

      btn.innerHTML = `
        <span style="display: flex; align-items: center;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
        </span>
        <span>${ws.name}</span>
        ${isDefault ? '<span class="workspace-default-tag">Default</span>' : ''}
      `;

      btn.addEventListener('click', () => selectWorkspace(ws.id));
      tabsGroup.appendChild(btn);
    });

    // Show/hide tools for active workspace
    if (state.activeWorkspaceId !== 'all') {
      if (toolsGroup) toolsGroup.style.display = 'flex';
      const activeWs = state.workspaces.find(w => w.id === state.activeWorkspaceId);
      const isDefault = activeWs && (activeWs.id === state.defaultWorkspaceId);
      if (setDefaultBtnText) {
        setDefaultBtnText.textContent = isDefault ? 'Default Workspace' : 'Set as Default';
      }
    } else {
      if (toolsGroup) toolsGroup.style.display = 'none';
    }
  }

  function selectWorkspace(wsId) {
    state.activeWorkspaceId = wsId;
    state.currentPage = 1;
    state.activeCategory = 'all';
    
    // Update active state in category filter pills
    document.querySelectorAll('.category-pill-btn').forEach(btn => {
      if (btn.dataset.category === 'all') btn.classList.add('active');
      else btn.classList.remove('active');
    });

    renderWorkspaces();
    renderCatalog(true);

    if (wsId !== 'all') {
      const ws = state.workspaces.find(w => w.id === wsId);
      if (ws) {
        window.showToast(`Loaded workspace: "${ws.name}"`);
      }
    }
  }

  // Workspace Creation & Editing Modal
  let editingWorkspaceId = null;

  document.getElementById('create-workspace-btn')?.addEventListener('click', () => {
    openWorkspaceModal(null);
  });

  document.getElementById('edit-workspace-btn')?.addEventListener('click', () => {
    if (state.activeWorkspaceId !== 'all') {
      openWorkspaceModal(state.activeWorkspaceId);
    }
  });

  document.getElementById('delete-workspace-btn')?.addEventListener('click', () => {
    if (state.activeWorkspaceId === 'all') return;
    const ws = state.workspaces.find(w => w.id === state.activeWorkspaceId);
    if (!ws) return;

    if (confirm(`Are you sure you want to delete the workspace "${ws.name}"?`)) {
      state.workspaces = state.workspaces.filter(w => w.id !== ws.id);
      if (state.defaultWorkspaceId === ws.id) {
        saveDefaultWorkspace(null);
      }
      saveWorkspaces();
      state.activeWorkspaceId = 'all';
      renderWorkspaces();
      renderCatalog(true);
      window.showToast(`Workspace "${ws.name}" deleted.`);
    }
  });

  document.getElementById('set-default-workspace-btn')?.addEventListener('click', () => {
    if (state.activeWorkspaceId === 'all') return;
    const ws = state.workspaces.find(w => w.id === state.activeWorkspaceId);
    if (!ws) return;

    state.workspaces.forEach(w => w.isDefault = (w.id === ws.id));
    saveDefaultWorkspace(ws.id);
    saveWorkspaces();
    renderWorkspaces();
    window.showToast(`"${ws.name}" saved as Default Workspace!`, '⭐');
  });

  function openWorkspaceModal(wsId = null) {
    editingWorkspaceId = wsId;
    const modal = document.getElementById('workspace-modal');
    const titleEl = document.getElementById('workspace-modal-title');
    const nameInput = document.getElementById('workspace-name-input');
    const defaultCheck = document.getElementById('workspace-is-default-checkbox');
    const searchInput = document.getElementById('workspace-app-search');

    if (!modal) return;

    let selectedIds = [];
    if (wsId) {
      const ws = state.workspaces.find(w => w.id === wsId);
      if (ws) {
        if (titleEl) titleEl.textContent = `Edit Workspace: ${ws.name}`;
        if (nameInput) nameInput.value = ws.name;
        if (defaultCheck) defaultCheck.checked = (ws.id === state.defaultWorkspaceId || ws.isDefault);
        selectedIds = [...(ws.appIds || [])];
      }
    } else {
      if (titleEl) titleEl.textContent = 'Create New Workspace';
      if (nameInput) nameInput.value = '';
      if (defaultCheck) defaultCheck.checked = false;
      selectedIds = [];
    }

    if (searchInput) searchInput.value = '';
    renderWorkspaceChecklist(selectedIds, '');

    searchInput?.addEventListener('input', function () {
      renderWorkspaceChecklist(selectedIds, this.value.trim().toLowerCase());
    });

    modal.classList.add('open');
  }

  function renderWorkspaceChecklist(selectedIds, filterQuery) {
    const list = document.getElementById('workspace-apps-checklist');
    const countEl = document.getElementById('workspace-selected-count');
    if (!list) return;

    if (countEl) countEl.textContent = selectedIds.length;

    const filtered = state.applications.filter(app => {
      if (!filterQuery) return true;
      return app.name.toLowerCase().includes(filterQuery) ||
             app.department.toLowerCase().includes(filterQuery) ||
             app.categoryLabel.toLowerCase().includes(filterQuery);
    });

    list.innerHTML = '';
    filtered.forEach(app => {
      const isChecked = selectedIds.includes(app.id);
      const item = document.createElement('label');
      item.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 6px 10px; background: var(--bg-input); border-radius: 6px; cursor: pointer; user-select: none; border: 1px solid var(--border-subtle);';

      item.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <input type="checkbox" ${isChecked ? 'checked' : ''} style="accent-color: var(--color-primary); cursor: pointer;">
          <div>
            <span style="font-size: 0.82rem; font-weight: 600; color: var(--text-main);">${app.name}</span>
            <span style="font-size: 0.72rem; color: var(--text-secondary); margin-left: 6px;">(${app.categoryLabel})</span>
          </div>
        </div>
      `;

      const checkbox = item.querySelector('input[type="checkbox"]');
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          if (!selectedIds.includes(app.id)) selectedIds.push(app.id);
        } else {
          const idx = selectedIds.indexOf(app.id);
          if (idx > -1) selectedIds.splice(idx, 1);
        }
        if (countEl) countEl.textContent = selectedIds.length;
      });

      list.appendChild(item);
    });

    // Bind save confirm button
    const confirmBtn = document.getElementById('save-workspace-confirm-btn');
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        const nameInput = document.getElementById('workspace-name-input');
        const defaultCheck = document.getElementById('workspace-is-default-checkbox');
        const name = nameInput?.value.trim() || 'Custom Workspace';

        if (editingWorkspaceId) {
          const ws = state.workspaces.find(w => w.id === editingWorkspaceId);
          if (ws) {
            ws.name = name;
            ws.appIds = selectedIds;
            if (defaultCheck?.checked) {
              state.workspaces.forEach(w => w.isDefault = false);
              ws.isDefault = true;
              saveDefaultWorkspace(ws.id);
            } else if (ws.id === state.defaultWorkspaceId) {
              ws.isDefault = false;
              saveDefaultWorkspace(null);
            }
          }
        } else {
          const newId = `ws-${Date.now()}`;
          const isDefault = Boolean(defaultCheck?.checked);
          if (isDefault) {
            state.workspaces.forEach(w => w.isDefault = false);
          }
          const newWs = {
            id: newId,
            name: name,
            isDefault: isDefault,
            appIds: selectedIds
          };
          state.workspaces.push(newWs);
          if (isDefault) saveDefaultWorkspace(newId);
          state.activeWorkspaceId = newId;
        }

        saveWorkspaces();
        window.closeModal('workspace-modal');
        renderWorkspaces();
        renderCatalog(true);
        window.showToast(`Saved workspace "${name}"!`);
      };
    }
  }

  // ==========================================================================
  // Catalog Filtering & Dynamic Pagination
  // ==========================================================================
  function getFilteredApplications() {
    let list = [...state.applications];

    // 1. Filter by Active Workspace
    if (state.activeWorkspaceId !== 'all') {
      const ws = state.workspaces.find(w => w.id === state.activeWorkspaceId);
      if (ws && Array.isArray(ws.appIds)) {
        list = list.filter(app => ws.appIds.includes(app.id));
      }
    }

    // 2. Filter by Category
    if (state.activeCategory !== 'all') {
      list = list.filter(app => app.category === state.activeCategory);
    }

    // 3. Filter by Search Query
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      list = list.filter(app => {
        return app.name.toLowerCase().includes(q) ||
               app.department.toLowerCase().includes(q) ||
               app.categoryLabel.toLowerCase().includes(q) ||
               (app.keywords && app.keywords.toLowerCase().includes(q));
      });
    }

    return list;
  }

  let isInitialCatalogLoad = true;

  function renderCatalog(animateTransition = false) {
    const grid = document.getElementById('apps-grid-container');
    const countLabel = document.getElementById('pagination-count-label');
    const prevBtn = document.getElementById('pagination-prev-btn');
    const nextBtn = document.getElementById('pagination-next-btn');
    const dotsGroup = document.getElementById('pagination-dots-group');
    const subheading = document.getElementById('catalog-subheading');
    if (!grid) return;

    const filtered = getFilteredApplications();
    const totalCount = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / state.itemsPerPage));

    // Ensure current page is within valid range
    if (state.currentPage > totalPages) state.currentPage = totalPages;
    if (state.currentPage < 1) state.currentPage = 1;

    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = Math.min(startIndex + state.itemsPerPage, totalCount);
    const pagedApps = filtered.slice(startIndex, endIndex);

    // Update subheading based on active view
    if (subheading) {
      if (state.activeWorkspaceId !== 'all') {
        const ws = state.workspaces.find(w => w.id === state.activeWorkspaceId);
        subheading.textContent = `Displaying ${totalCount} applications in "${ws?.name || 'Workspace'}".`;
      } else if (state.searchQuery) {
        subheading.textContent = `Search results for "${state.searchQuery}" (${totalCount} found).`;
      } else if (state.activeCategory !== 'all') {
        subheading.textContent = `Showing all ${totalCount} applications in category.`;
      } else {
        subheading.textContent = 'Browse and launch all 48 company applications.';
      }
    }

    // Render Cards in 2x4 Grid
    grid.innerHTML = '';
    if (pagedApps.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px 20px; text-align: center; color: #8295b3; background: var(--bg-card); border-radius: 12px; border: 1px dashed var(--border-card);">
          <div style="font-size: 1.1rem; font-weight: 600; color: var(--text-main); margin-bottom: 4px;">No applications found</div>
          <div style="font-size: 0.82rem; color: var(--text-secondary);">Try adjusting your search keywords or switching category filters.</div>
          <button class="btn-secondary" onclick="window.resetCatalogFilters()" style="margin-top: 14px; font-size: 0.8rem;">Reset Filters</button>
        </div>
      `;
    } else {
      pagedApps.forEach(app => {
        const card = document.createElement('div');
        card.className = 'app-catalog-card';
        card.dataset.appId = app.id;
        const bgColor = ICON_COLORS[app.iconColor] || '#2563eb';

        card.innerHTML = `
          <div class="app-card-icon-box" style="background-color: ${bgColor};">
            ${getIconSvg(app.icon, 22)}
          </div>
          <div class="app-card-details">
            <div class="app-card-name" title="${app.name}">${app.name}</div>
            <div class="app-card-category">${app.categoryLabel}</div>
          </div>
          <button class="app-card-menu-btn" title="Options">
            ${getIconSvg('dots-vertical', 18)}
          </button>
        `;

        card.addEventListener('click', (e) => {
          if (e.target.closest('.app-card-menu-btn')) {
            window.toggleAppContextMenu(e, app.id);
          } else {
            window.launchApp(app.id);
          }
        });

        grid.appendChild(card);
      });
    }

    // Update Pagination Label
    if (countLabel) {
      if (totalCount === 0) {
        countLabel.textContent = 'Showing 0 apps';
      } else {
        countLabel.textContent = `Showing ${startIndex + 1}–${endIndex} of ${totalCount} apps`;
      }
    }

    // Update Prev / Next Buttons
    if (prevBtn) {
      prevBtn.disabled = (state.currentPage <= 1);
    }
    if (nextBtn) {
      nextBtn.disabled = (state.currentPage >= totalPages);
    }

    // Update Pagination Dots / Indicators
    if (dotsGroup) {
      dotsGroup.innerHTML = '';
      for (let p = 1; p <= totalPages; p++) {
        const dot = document.createElement('div');
        dot.className = `page-dot-btn ${p === state.currentPage ? 'active' : ''}`;
        dot.title = `Page ${p}`;
        dot.addEventListener('click', () => {
          state.currentPage = p;
          renderCatalog(true);
        });
        dotsGroup.appendChild(dot);
      }
    }

    // Only animate catalog cards during user interactions to prevent initial-load visibility conflict
    if (!isInitialCatalogLoad && animateTransition) {
      if (typeof window.animateCatalogCards === 'function') {
        window.animateCatalogCards();
      }
    }
    isInitialCatalogLoad = false;
  }

  // Reset Filters Helper
  window.resetCatalogFilters = function () {
    state.activeCategory = 'all';
    state.searchQuery = '';
    state.currentPage = 1;
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) searchInput.value = '';

    document.querySelectorAll('.category-pill-btn').forEach(btn => {
      if (btn.dataset.category === 'all') btn.classList.add('active');
      else btn.classList.remove('active');
    });

    renderCatalog(true);
  };

  // Pagination Next & Prev Button Handlers
  document.getElementById('pagination-prev-btn')?.addEventListener('click', () => {
    if (state.currentPage > 1) {
      state.currentPage--;
      renderCatalog(true);
    }
  });

  document.getElementById('pagination-next-btn')?.addEventListener('click', () => {
    const filtered = getFilteredApplications();
    const totalPages = Math.ceil(filtered.length / state.itemsPerPage);
    if (state.currentPage < totalPages) {
      state.currentPage++;
      renderCatalog(true);
    }
  });

  // "View all 48 apps" Link
  document.getElementById('view-all-apps-btn')?.addEventListener('click', () => {
    window.resetCatalogFilters();
    selectWorkspace('all');
    window.showToast('Showing all 48 company applications.');
  });

  // Category Filter Pill Clicks
  document.querySelectorAll('.category-pill-btn[data-category]').forEach(btn => {
    btn.addEventListener('click', function () {
      const cat = this.dataset.category;
      state.activeCategory = cat;
      state.currentPage = 1; // Reset to page 1 as required!

      document.querySelectorAll('.category-pill-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Reset more dropdown selection
      document.querySelectorAll('.more-item-btn').forEach(m => m.classList.remove('active'));
      const moreLabel = document.getElementById('more-btn-label');
      if (moreLabel) moreLabel.textContent = 'More';

      closeMoreDropdown();
      renderCatalog(true);
    });
  });

  // "More" Category Dropdown Handling
  const moreBtn = document.getElementById('category-more-btn');
  const moreMenu = document.getElementById('category-more-menu');

  moreBtn?.addEventListener('click', function (e) {
    e.stopPropagation();
    moreMenu?.classList.toggle('open');
  });

  function closeMoreDropdown() {
    moreMenu?.classList.remove('open');
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest('#category-more-wrap')) {
      closeMoreDropdown();
    }
  });

  document.querySelectorAll('.more-item-btn').forEach(item => {
    item.addEventListener('click', function () {
      const cat = this.dataset.category;
      state.activeCategory = cat;
      state.currentPage = 1; // Reset to page 1

      document.querySelectorAll('.category-pill-btn').forEach(b => b.classList.remove('active'));
      document.getElementById('category-more-btn')?.classList.add('active');

      const moreLabel = document.getElementById('more-btn-label');
      if (moreLabel) {
        const catName = this.querySelector('span:first-child')?.textContent || 'More';
        moreLabel.textContent = catName;
      }

      document.querySelectorAll('.more-item-btn').forEach(m => m.classList.remove('active'));
      this.classList.add('active');

      closeMoreDropdown();
      renderCatalog(true);
    });
  });

  // ==========================================================================
  // Header Live Search & Shortcut (Ctrl + K)
  // ==========================================================================
  const searchInput = document.getElementById('global-search-input');
  const searchDropdown = document.getElementById('search-results-dropdown');

  searchInput?.addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    state.searchQuery = q;
    state.currentPage = 1;

    renderCatalog(true);
    renderSearchDropdown(q);
  });

  function renderSearchDropdown(query) {
    if (!searchDropdown) return;
    if (!query || query.length < 2) {
      searchDropdown.classList.remove('active');
      searchDropdown.innerHTML = '';
      return;
    }

    const matched = state.applications.filter(app => {
      return app.name.toLowerCase().includes(query) ||
             app.department.toLowerCase().includes(query) ||
             app.categoryLabel.toLowerCase().includes(query) ||
             (app.keywords && app.keywords.toLowerCase().includes(query));
    }).slice(0, 6);

    if (matched.length === 0) {
      searchDropdown.innerHTML = '<div style="padding: 12px 16px; font-size: 0.82rem; color: #8295b3;">No matching applications found.</div>';
      searchDropdown.classList.add('active');
      return;
    }

    searchDropdown.innerHTML = '';
    matched.forEach(app => {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      const bgColor = ICON_COLORS[app.iconColor] || '#2563eb';

      item.innerHTML = `
        <div style="width: 28px; height: 28px; border-radius: 7px; background: ${bgColor}; display: flex; align-items: center; justify-content: center; color: white;">
          ${getIconSvg(app.icon, 14)}
        </div>
        <div class="search-result-info">
          <div class="search-result-title">${app.name}</div>
          <div class="search-result-category">${app.department} • ${app.categoryLabel}</div>
        </div>
        <div style="font-size: 0.72rem; color: var(--color-primary); font-weight: 600;">Launch ↗</div>
      `;

      item.addEventListener('click', () => {
        closeSearchDropdown();
        window.launchApp(app.id);
      });

      searchDropdown.appendChild(item);
    });

    searchDropdown.classList.add('active');
  }

  function closeSearchDropdown() {
    searchDropdown?.classList.remove('active');
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-search-wrap')) {
      closeSearchDropdown();
    }
  });

  // Ctrl + K Keyboard Shortcut
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      searchInput?.focus();
      searchInput?.select();
    }
  });

  // ==========================================================================
  // Real-Time Clock Widget
  // ==========================================================================
  function updateClock() {
    const clockEl = document.getElementById('live-clock-display');
    const dateEl = document.getElementById('live-date-display');
    if (!clockEl && !dateEl) return;

    const now = new Date();
    
    // Format: 11:17 AM
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // '0' becomes '12'
    const timeStr = `${hours}:${minutes} ${ampm}`;

    // Format: Monday, Sep 7, 2026
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const dateNum = now.getDate();
    const year = now.getFullYear();
    const dateStr = `${dayName}, ${monthName} ${dateNum}, ${year}`;

    if (clockEl) clockEl.textContent = timeStr;
    if (dateEl) dateEl.textContent = dateStr;

    const greetingEl = document.getElementById('hero-greeting-overline');
    if (greetingEl) {
      const rawHours = now.getHours();
      let greeting = 'GOOD EVENING,';
      if (rawHours >= 5 && rawHours < 12) {
        greeting = 'GOOD MORNING,';
      } else if (rawHours >= 12 && rawHours < 18) {
        greeting = 'GOOD AFTERNOON,';
      }
      if (greetingEl.textContent !== greeting) {
        greetingEl.textContent = greeting;
      }
    }
  }

  // ==========================================================================
  // Announcements Carousel
  // ==========================================================================
  function updateAnnouncementSlide() {
    const list = state.announcements;
    if (!list || list.length === 0) return;

    const cur = list[state.activeAnnouncementIdx];
    const imgEl = document.getElementById('announcement-image');
    const tagEl = document.getElementById('announcement-tag');
    const titleEl = document.getElementById('announcement-title');
    const descEl = document.getElementById('announcement-desc');

    if (imgEl) imgEl.src = cur.image;
    if (tagEl) tagEl.textContent = cur.tag;
    if (titleEl) titleEl.textContent = cur.title;
    if (descEl) descEl.textContent = cur.description;

    // Update Dots
    document.querySelectorAll('.carousel-dot').forEach((dot, idx) => {
      if (idx === state.activeAnnouncementIdx) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  document.getElementById('announcement-prev-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    state.activeAnnouncementIdx = (state.activeAnnouncementIdx - 1 + state.announcements.length) % state.announcements.length;
    updateAnnouncementSlide();
  });

  document.getElementById('announcement-next-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    state.activeAnnouncementIdx = (state.activeAnnouncementIdx + 1) % state.announcements.length;
    updateAnnouncementSlide();
  });

  document.querySelectorAll('.carousel-dot').forEach(dot => {
    dot.addEventListener('click', function (e) {
      e.stopPropagation();
      const idx = parseInt(this.dataset.index, 10);
      if (!isNaN(idx)) {
        state.activeAnnouncementIdx = idx;
        updateAnnouncementSlide();
      }
    });
  });

  window.showAnnouncementDetails = function () {
    const cur = state.announcements[state.activeAnnouncementIdx];
    if (cur) {
      window.showToast(`Viewing: "${cur.title}"`);
    }
  };

  document.getElementById('view-all-announcements-btn')?.addEventListener('click', () => {
    window.showToast('Showing all announcements notice.');
  });

  // Auto rotate announcements every 8 seconds
  setInterval(() => {
    state.activeAnnouncementIdx = (state.activeAnnouncementIdx + 1) % state.announcements.length;
    updateAnnouncementSlide();
  }, 8000);

  // App Launcher & Notifications buttons
  document.getElementById('notifications-btn')?.addEventListener('click', () => {
    window.showToast('You have 3 unread notifications from HR & IT.');
  });

  // ==========================================================================
  // Quick App Drawer (9-Dot Launcher Popover)
  // ==========================================================================
  const appLauncherBtn = document.getElementById('app-launcher-btn');
  const appDrawerPopover = document.getElementById('app-drawer-popover');
  const appDrawerCloseBtn = document.getElementById('app-drawer-close-btn');
  const appDrawerSearchInput = document.getElementById('app-drawer-search-input');
  const appDrawerSearchClear = document.getElementById('app-drawer-search-clear');
  const appDrawerGrid = document.getElementById('app-drawer-grid');
  const appDrawerCount = document.getElementById('app-drawer-count');
  const appDrawerViewAll = document.getElementById('app-drawer-view-all');

  let drawerCategory = '3x3';
  let drawerSearch = '';

  window.refreshAppDrawer = function () {
    if (appDrawerPopover?.classList.contains('open')) {
      renderAppDrawer();
    }
  };

  function openAppDrawer() {
    if (!appDrawerPopover) return;
    appDrawerPopover.classList.add('open');
    appLauncherBtn?.classList.add('active');
    appLauncherBtn?.setAttribute('aria-expanded', 'true');
    appDrawerPopover.setAttribute('aria-hidden', 'false');
    renderAppDrawer();
    setTimeout(() => appDrawerSearchInput?.focus(), 50);
  }

  function closeAppDrawer() {
    if (!appDrawerPopover) return;
    appDrawerPopover.classList.remove('open');
    appLauncherBtn?.classList.remove('active');
    appLauncherBtn?.setAttribute('aria-expanded', 'false');
    appDrawerPopover.setAttribute('aria-hidden', 'true');
  }

  function toggleAppDrawer() {
    if (appDrawerPopover?.classList.contains('open')) {
      closeAppDrawer();
    } else {
      openAppDrawer();
    }
  }

  function renderAppDrawer() {
    if (!appDrawerGrid) return;

    let filtered = [];

    if (drawerSearch) {
      const q = drawerSearch.toLowerCase();
      filtered = state.applications.filter(app => {
        const matchesName = app.name.toLowerCase().includes(q);
        const matchesDept = (app.department || '').toLowerCase().includes(q);
        const matchesCat = (app.categoryLabel || '').toLowerCase().includes(q);
        const matchesKeywords = (app.keywords || '').toLowerCase().includes(q);
        return matchesName || matchesDept || matchesCat || matchesKeywords;
      });
    } else if (drawerCategory === '3x3' || drawerCategory === 'fav') {
      // Pinned section + completed 3rd row below for a 3x3 grid (9 apps)
      const favApps = state.favorites.map(id => getAppById(id)).filter(Boolean);
      const remainingApps = state.applications.filter(app => !state.favorites.includes(app.id));
      filtered = [...favApps, ...remainingApps].slice(0, 9);
    } else if (drawerCategory !== 'all') {
      filtered = state.applications.filter(app => app.category.toLowerCase() === drawerCategory.toLowerCase());
    } else {
      filtered = state.applications;
    }

    if (appDrawerCount) {
      appDrawerCount.textContent = filtered.length;
    }

    appDrawerGrid.innerHTML = '';

    if (filtered.length === 0) {
      appDrawerGrid.innerHTML = `
        <div class="app-drawer-empty">
          <div style="font-size: 1.5rem; margin-bottom: 6px;">🔍</div>
          <div>No applications found</div>
          <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">Try another search keyword or category.</div>
        </div>
      `;
      return;
    }

    filtered.forEach(app => {
      const tile = document.createElement('div');
      tile.className = 'app-drawer-tile';
      tile.dataset.appId = app.id;
      tile.title = `${app.name} (${app.categoryLabel})`;

      const isFav = state.favorites.includes(app.id);
      const bgColor = ICON_COLORS[app.iconColor] || '#2563eb';

      tile.innerHTML = `
        <button class="app-drawer-fav-star ${isFav ? 'active' : ''}" title="${isFav ? 'Remove from favorites' : 'Pin to favorites'}" aria-label="Toggle favorite">
          ★
        </button>
        <div class="app-drawer-tile-icon" style="background-color: ${bgColor};">
          ${getIconSvg(app.icon, 20)}
        </div>
        <div class="app-drawer-tile-name">${app.name}</div>
        <div class="app-drawer-tile-dept">${app.categoryLabel}</div>
      `;

      // Tile click -> Instant launch
      tile.addEventListener('click', (e) => {
        if (e.target.closest('.app-drawer-fav-star')) return;
        window.launchApp(app.id);
        closeAppDrawer();
      });

      // Star click -> toggle favorite
      tile.querySelector('.app-drawer-fav-star')?.addEventListener('click', (e) => {
        e.stopPropagation();
        window.toggleFavorite(app.id);
        renderAppDrawer();
      });

      appDrawerGrid.appendChild(tile);
    });
  }

  // App Launcher event listeners
  appLauncherBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleAppDrawer();
  });

  appDrawerCloseBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAppDrawer();
  });

  // Search input in drawer
  appDrawerSearchInput?.addEventListener('input', (e) => {
    drawerSearch = e.target.value.trim().toLowerCase();
    if (appDrawerSearchClear) {
      appDrawerSearchClear.style.display = drawerSearch ? 'block' : 'none';
    }
    renderAppDrawer();
  });

  appDrawerSearchClear?.addEventListener('click', () => {
    if (appDrawerSearchInput) {
      appDrawerSearchInput.value = '';
      drawerSearch = '';
      appDrawerSearchClear.style.display = 'none';
      renderAppDrawer();
      appDrawerSearchInput.focus();
    }
  });

  // Drawer Category Pills
  document.querySelectorAll('.app-drawer-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.app-drawer-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      drawerCategory = pill.dataset.drawerCat || 'all';
      renderAppDrawer();
    });
  });

  // Footer "View All 48 Applications" link
  appDrawerViewAll?.addEventListener('click', () => {
    closeAppDrawer();
    const catalog = document.getElementById('catalog-section');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#app-launcher-wrap') && appDrawerPopover?.classList.contains('open')) {
      closeAppDrawer();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && appDrawerPopover?.classList.contains('open')) {
      closeAppDrawer();
    }
  });


  // ==========================================================================
  // Light / Dark Mode Theme Controller
  // ==========================================================================
  function updateThemeUI(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const iconSlot = document.getElementById('theme-icon-slot');
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const thumb = document.getElementById('theme-switch-thumb');

    if (iconSlot) {
      iconSlot.innerHTML = theme === 'light' ? getIconSvg('sun', 13) : getIconSvg('moon', 13);
    }
    if (toggleBtn) {
      toggleBtn.title = theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
      toggleBtn.setAttribute('aria-label', toggleBtn.title);
      toggleBtn.setAttribute('aria-checked', theme === 'dark' ? 'true' : 'false');
    }
    if (thumb && typeof gsap !== 'undefined') {
      gsap.set(thumb, { x: theme === 'dark' ? 30 : 0 });
    }
  }

  function applyTheme(theme, showNotice = false) {
    state.theme = theme;
    try {
      localStorage.setItem(STORAGE_THEME_KEY, theme);
    } catch (e) {}
    updateThemeUI(theme);
    if (typeof window.animateThemeToggle === 'function' && showNotice) {
      window.animateThemeToggle(theme);
    }
    if (showNotice) {
      window.showToast(theme === 'light' ? 'Light mode activated' : 'Dark mode activated');
    }
  }

  function toggleTheme() {
    const nextTheme = state.theme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme, true);
  }

  function initTheme() {
    let savedTheme = 'light';
    try {
      savedTheme = localStorage.getItem(STORAGE_THEME_KEY) || 'light';
    } catch (e) {
      savedTheme = 'light';
    }
    applyTheme(savedTheme, false);

    document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleTheme);
  }

  // ==========================================================================
  // Initialization Routine
  // ==========================================================================
  function init() {
    initTheme();
    initStorage();
    renderWorkspaces();
    renderFavorites();
    renderCatalog();
    updateClock();
    setInterval(updateClock, 1000);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
