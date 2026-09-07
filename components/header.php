<?php
/**
 * CentralPoint Header Component
 */
?>
<header class="top-nav">
  <div class="nav-container">
    <!-- Brand Logo & Portal Title -->
    <a href="./" class="nav-brand" title="CentralPoint Employee Portal">
      <div class="brand-logo-icon">
        <img src="assets/images/logo.svg" alt="CentralPoint Logo" width="32" height="32">
      </div>
      <span class="brand-name">CentralPoint</span>
      <span class="brand-divider"></span>
      <span class="brand-portal-label">Employee Portal</span>
    </a>

    <!-- Live Search Bar with Ctrl+K shortcut -->
    <div class="nav-search-wrap">
      <div class="nav-search-bar" id="search-bar-container">
        <span class="search-icon"><?= renderIcon('search', '', 17) ?></span>
        <input 
          type="text" 
          class="search-input" 
          id="global-search-input" 
          placeholder="Search apps, documents, people, or help..." 
          autocomplete="off"
          spellcheck="false"
        >
        <span class="search-kbd-badge" title="Press Ctrl+K to search">
          <span>Ctrl</span>
          <span>K</span>
        </span>
      </div>
      <!-- Instant Search Results Flyout -->
      <div class="search-results-dropdown" id="search-results-dropdown"></div>
    </div>

    <!-- Right Controls: Theme Toggle, Notification, Apps Drawer, User Profile -->
    <div class="nav-actions">
      <!-- High-End Animated Theme Mode Toggle Switch -->
      <button 
        class="theme-toggle-switch" 
        id="theme-toggle-btn" 
        role="switch" 
        aria-checked="false" 
        aria-label="Toggle Dark Mode" 
        title="Switch to Dark Mode"
      >
        <span class="theme-switch-track">
          <!-- Ambient track icons -->
          <span class="track-icon track-sun" aria-hidden="true">
            <?= renderIcon('sun', '', 12) ?>
          </span>
          <span class="track-icon track-moon" aria-hidden="true">
            <?= renderIcon('moon', '', 12) ?>
          </span>
          
          <!-- Animated Sliding Thumb -->
          <span class="theme-switch-thumb" id="theme-switch-thumb">
            <span class="thumb-icon-wrap" id="theme-icon-slot">
              <?= renderIcon('sun', 'thumb-icon', 13) ?>
            </span>
          </span>
        </span>
      </button>

      <!-- 9-dot App Drawer Launcher Wrap -->
      <div class="app-launcher-wrap" id="app-launcher-wrap">
        <button class="nav-icon-btn" id="app-launcher-btn" title="Quick App Launcher" aria-label="App Launcher" aria-expanded="false" aria-haspopup="dialog">
          <?= renderIcon('grid-9', '', 19) ?>
        </button>

        <!-- Floating Quick App Drawer Popover -->
        <div class="app-drawer-popover" id="app-drawer-popover" role="dialog" aria-label="Quick App Launcher" aria-hidden="true">
          <!-- Drawer Header -->
          <div class="app-drawer-header">
            <div class="app-drawer-title-row">
              <div class="app-drawer-title-wrap">
                <span class="app-drawer-title-icon"><?= renderIcon('grid-9', '', 16) ?></span>
                <span class="app-drawer-title">Quick Apps</span>
                <span class="app-drawer-count-badge" id="app-drawer-count">48</span>
              </div>
              <button class="app-drawer-close-btn" id="app-drawer-close-btn" title="Close launcher" aria-label="Close">
                <?= renderIcon('x', '', 14) ?>
              </button>
            </div>

            <!-- Fast Search Filter -->
            <div class="app-drawer-search-wrap">
              <span class="app-drawer-search-icon"><?= renderIcon('search', '', 14) ?></span>
              <input 
                type="text" 
                id="app-drawer-search-input" 
                class="app-drawer-search-input" 
                placeholder="Find an app or tool..." 
                autocomplete="off"
                spellcheck="false"
              >
              <button class="app-drawer-search-clear" id="app-drawer-search-clear" title="Clear search" style="display: none;">&times;</button>
            </div>

            <!-- Fast Category Pills -->
            <div class="app-drawer-pills" id="app-drawer-pills">
              <button class="app-drawer-pill active" data-drawer-cat="3x3">★ Pinned</button>
              <button class="app-drawer-pill" data-drawer-cat="all">All</button>
              <button class="app-drawer-pill" data-drawer-cat="it">IT</button>
              <button class="app-drawer-pill" data-drawer-cat="hr">HR</button>
              <button class="app-drawer-pill" data-drawer-cat="qa">QA</button>
              <button class="app-drawer-pill" data-drawer-cat="operations">Ops</button>
            </div>
          </div>

          <!-- Drawer Scrollable Tile Grid -->
          <div class="app-drawer-body" id="app-drawer-body">
            <div class="app-drawer-grid" id="app-drawer-grid"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</header>
