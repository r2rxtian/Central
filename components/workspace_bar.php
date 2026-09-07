<?php
/**
 * CentralPoint Saved Workspaces Toolbar Component
 * Clean, compact pill switcher that integrates seamlessly
 */
?>
<div class="workspace-bar" id="workspace-bar">
  <!-- Saved Workspaces Tab Buttons -->
  <div class="workspace-tabs-group" id="workspace-tabs-group">
    <!-- Populated dynamically via JavaScript / LocalStorage -->
  </div>

  <!-- Workspace Controls & Actions -->
  <div class="workspace-actions-group">
    <div id="active-workspace-tools" style="display: none; align-items: center; gap: 6px;">
      <button class="workspace-mini-btn" id="set-default-workspace-btn" title="Set as default workspace">
        <?= renderIcon('star', '', 12) ?>
        <span id="set-default-btn-text">Make Default</span>
      </button>
      <button class="workspace-mini-btn" id="edit-workspace-btn" title="Edit workspace applications">
        <?= renderIcon('edit', '', 12) ?>
        <span>Edit</span>
      </button>
      <button class="workspace-mini-btn danger" id="delete-workspace-btn" title="Delete workspace">
        <?= renderIcon('x', '', 12) ?>
        <span>Delete</span>
      </button>
    </div>
    <button class="workspace-action-btn" id="create-workspace-btn" title="Create a custom application group">
      <?= renderIcon('plus', '', 12) ?>
      <span>New Workspace</span>
    </button>
  </div>
</div>
