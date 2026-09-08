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

    <!-- Right Controls -->
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
    </div>
  </div>
</header>
