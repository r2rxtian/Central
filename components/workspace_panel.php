<?php
/** CentralPoint Workspace Hub */
?>
<section class="workspace-section" id="workspace-section">
  <div class="section-header-row workspace-section-header">
    <div class="section-title-wrap">
      <div class="section-title-icon workspace-title-icon"><?= renderIcon('layers', '', 18) ?></div>
      <div>
        <h2 class="section-title">Workspaces</h2>
        <span class="section-subheading">Switch between focused application groups or create your own.</span>
      </div>
    </div>
  </div>
  <div class="workspace-panel-body">
    <?php include __DIR__ . '/workspace_bar.php'; ?>
  </div>
</section>
