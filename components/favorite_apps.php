<?php
/**
 * CentralPoint Favorite Apps Section Component
 */
?>
<section class="favorites-section" id="favorites-section">
  <!-- Section Header -->
  <div class="section-header-row">
    <div class="section-title-wrap">
      <span class="section-header-icon star-icon">
        <?= renderIcon('star', '', 20) ?>
      </span>
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

    $iconColors = [
        'blue' => '#3b82f6',
        'purple' => '#8b5cf6',
        'teal' => '#14b8a6',
        'pink' => '#f472b6',
        'green' => '#10b981',
        'magenta' => '#c084fc',
        'orange' => '#f97316',
        'cyan' => '#0ea5e9'
    ];

    foreach ($defaultFavoriteIds as $favId):
        if (!isset($appMap[$favId])) continue;
        $app = $appMap[$favId];
        $bgColor = $iconColors[$app['iconColor']] ?? '#7c3aed';
    ?>
    <div class="fav-card" data-app-id="<?= htmlspecialchars($app['id']) ?>" onclick="window.launchApp('<?= htmlspecialchars($app['id']) ?>')">
      <span class="card-icon-watermark" style="color: <?= $bgColor ?>;" aria-hidden="true">
        <span class="card-icon-watermark-glyph"><?= renderIcon($app['icon'], '', 82) ?></span>
      </span>
      <div class="fav-card-icon" style="background-color: <?= $bgColor ?>;">
        <?= renderIcon($app['icon'], '', 20) ?>
      </div>
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
