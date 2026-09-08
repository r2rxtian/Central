<?php
/**
 * CentralPoint Modals & Interactive Overlays
 */
?>

<!-- 1. Workspace Manager Modal (Create / Edit Group) -->
<div class="modal-overlay" id="workspace-modal">
  <div class="modal-window">
    <div class="modal-header">
      <h3 class="modal-title" id="workspace-modal-title">Create Saved Workspace</h3>
      <button class="modal-close-btn" onclick="window.closeModal('workspace-modal')">&times;</button>
    </div>
    <div class="modal-body">
      <div>
        <label class="modal-field-label" for="workspace-name-input">
          Workspace Name
        </label>
        <input 
          type="text" 
          id="workspace-name-input" 
          placeholder="e.g. QA Websites, My Daily Tools..." 
          class="modal-text-input"
        >
      </div>

      <div class="workspace-default-row">
        <div>
          <div class="workspace-default-title">Set as Default Workspace</div>
          <div class="workspace-default-copy">Automatically loads this group whenever CentralPoint opens.</div>
        </div>
        <input type="checkbox" id="workspace-is-default-checkbox" class="workspace-default-checkbox">
      </div>

      <div>
        <div class="workspace-picker-header">
          <label class="modal-field-label workspace-picker-label" for="workspace-app-search">
            Select Applications for this Group (<span id="workspace-selected-count">0</span> selected)
          </label>
          <input 
            type="text" 
            id="workspace-app-search" 
            placeholder="Filter apps..." 
            class="modal-text-input modal-text-input-compact"
          >
        </div>
        <div id="workspace-apps-checklist" style="max-height: 240px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; padding-right: 4px;">
          <!-- Populated by JavaScript with all 48 apps and checkboxes -->
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="window.closeModal('workspace-modal')">Cancel</button>
      <button class="btn-primary" id="save-workspace-confirm-btn">Save Workspace</button>
    </div>
  </div>
</div>

<!-- 2. Add Favorite Modal -->
<div class="modal-overlay" id="add-favorite-modal">
  <div class="modal-window">
    <div class="modal-header">
      <h3 class="modal-title">Add to Favorite Apps</h3>
      <button class="modal-close-btn" onclick="window.closeModal('add-favorite-modal')">&times;</button>
    </div>
    <div class="modal-body">
      <input 
        type="text" 
        id="fav-search-input" 
        placeholder="Search application to add to favorites..." 
        class="modal-text-input"
      >
      <div id="fav-picker-list" style="max-height: 320px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;">
        <!-- Populated dynamically -->
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="window.closeModal('add-favorite-modal')">Done</button>
    </div>
  </div>
</div>

<!-- 3. Application Launch & Details Modal -->
<div class="modal-overlay" id="app-launch-modal">
  <div class="modal-window" style="max-width: 480px;">
    <div class="modal-header">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div id="modal-app-icon" class="app-card-icon-box" style="width: 36px; height: 36px;"></div>
        <div>
          <h3 class="modal-title" id="modal-app-name">App Name</h3>
          <span id="modal-app-dept" style="font-size: 0.74rem; color: #94a3b8;">Department</span>
        </div>
      </div>
      <button class="modal-close-btn" onclick="window.closeModal('app-launch-modal')">&times;</button>
    </div>
    <div class="modal-body">
      <div style="background: rgba(168,85,247,0.1); border: 1px solid rgba(168,85,247,0.25); border-radius: 8px; padding: 12px; display: flex; align-items: center; gap: 10px;">
        <span style="color: #22c55e; font-size: 1.1rem;">✓</span>
        <div style="font-size: 0.8rem; color: #cbd5e1;">
          <strong>Corporate Portal Access</strong>: Instant access for all La Rose Noire team members
        </div>
      </div>

      <p id="modal-app-description" style="font-size: 0.86rem; color: #cbd5e1; line-height: 1.5;"></p>

      <div style="font-size: 0.78rem; color: #8295b3;">
        <div><strong>URL:</strong> <span id="modal-app-url" style="color: #38bdf8;"></span></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="window.closeModal('app-launch-modal')">Close</button>
      <a id="modal-app-launch-link" href="#" target="_blank" class="btn-primary" style="display: inline-flex; align-items: center; gap: 8px;">
        <span>Launch Application</span>
        <?= renderIcon('arrow-up-right', '', 14) ?>
      </a>
    </div>
  </div>
</div>

<!-- 4. Floating Context Menu for App Card 3-Dots -->
<div class="app-context-menu" id="app-context-menu">
  <button class="context-menu-item" id="ctx-launch-btn">
    <?= renderIcon('arrow-up-right', '', 14) ?>
    <span>Launch App</span>
  </button>
  <button class="context-menu-item" id="ctx-fav-toggle-btn">
    <?= renderIcon('star', '', 14) ?>
    <span id="ctx-fav-label">Add to Favorites</span>
  </button>
  <button class="context-menu-item" id="ctx-details-btn">
    <?= renderIcon('file-text', '', 14) ?>
    <span>View Details</span>
  </button>
</div>

<!-- 5. Toast Notification Popover -->
<div class="toast-notice" id="global-toast">
  <span id="toast-icon">✓</span>
  <span id="toast-message">Notification message</span>
</div>
