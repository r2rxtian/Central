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

      <!-- Notifications -->
      <button class="nav-icon-btn" id="notifications-btn" title="3 unread notifications" aria-label="Notifications">
        <?= renderIcon('bell', '', 19) ?>
        <span class="notification-badge-dot"></span>
      </button>

      <!-- 9-dot App Drawer Launcher -->
      <button class="nav-icon-btn" id="app-launcher-btn" title="Quick App Launcher" aria-label="App Launcher">
        <?= renderIcon('grid-9', '', 19) ?>
      </button>

    </div>
  </div>
</header>
