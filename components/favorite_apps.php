<?php
/**
 * CentralPoint Favorite Apps Section Component
 */
?>
<section class="favorites-section" id="favorites-section">
  <?php include __DIR__ . '/workspace_bar.php'; ?>

  <!-- Section Header -->
  <div class="section-header-row">
    <div class="section-title-wrap">
      <div class="section-title-text">
        <h2 class="section-heading">Favorite Apps</h2>
        <span class="section-subheading">Your most used tools, always within reach.</span>
      </div>
    </div>
    
    <button class="section-action-link" id="toggle-edit-favorites-btn">
      <?= renderIcon('edit', '', 14) ?>
      <span id="edit-favorites-btn-label">Edit favorites</span>
    </button>
  </div>

  <!-- Horizontal Favorites Track -->
  <div class="favorites-cards-track" id="favorites-cards-track">
    <!-- Initial Cards Rendered from PHP / Hydrated by JS -->
    <?php
    $appMap = [];
    foreach ($applications as $app) {
        $appMap[$app['id']] = $app;
    }

    foreach ($defaultFavoriteIds as $favId):
        if (!isset($appMap[$favId])) continue;
        $app = $appMap[$favId];
        $categoryKey = strtolower(trim($app['category'] ?? ''));
        $bgColor = $categoryAccentColors[$categoryKey] ?? '#7b8ba5';
        $darkBgColor = $categoryAccentColorsDark[$categoryKey] ?? '#6f7788';
    ?>
    <div class="fav-card" style="--app-accent: <?= $bgColor ?>; --app-accent-dark: <?= $darkBgColor ?>;" data-app-id="<?= htmlspecialchars($app['id']) ?>" onclick="window.launchApp('<?= htmlspecialchars($app['id']) ?>')">
      <div class="fav-card-details">
        <div class="fav-card-name" title="<?= htmlspecialchars($app['name']) ?>"><?= htmlspecialchars($app['name']) ?></div>
        <div class="fav-card-dept"><?= htmlspecialchars($app['categoryLabel']) ?></div>
      </div>
      <button class="fav-delete-btn" onclick="event.stopPropagation(); window.removeFavorite('<?= htmlspecialchars($app['id']) ?>')" title="Remove from favorites">
        <?= renderIcon('x', '', 12) ?>
      </button>
    </div>
    <?php endforeach; ?>

    <!-- Add Favorite Card -->
    <div class="fav-add-card" id="add-favorite-trigger-card">
      <span class="fav-add-icon"><?= renderIcon('plus', '', 20) ?></span>
      <span class="fav-add-label">Add Favorite</span>
    </div>
  </div>
</section>
