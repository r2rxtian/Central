<?php
/**
 * CentralPoint All Applications Catalog Component
 */
?>
<section class="catalog-section" id="catalog-section">
  <!-- Catalog Section Header -->
  <div class="section-header-row">
    <div class="section-title-wrap">
      <span class="section-header-icon grid-icon-purple">
        <?= renderIcon('grid-4', '', 20) ?>
      </span>
      <div class="section-title-text">
        <h2 class="section-heading">All Applications</h2>
        <span class="section-subheading" id="catalog-subheading">Browse and launch all 48 company applications.</span>
      </div>
    </div>

    <div class="catalog-filter-wrap" id="catalog-filter-wrap">
      <button
        type="button"
        class="catalog-filter-btn"
        id="catalog-filter-btn"
        aria-label="Filter applications by category"
        aria-expanded="false"
        aria-controls="catalog-filter-menu"
      >
        <span class="catalog-filter-icon"><?= renderIcon('filter', '', 14) ?></span>
        <span id="catalog-filter-label">All apps</span>
        <span class="catalog-filter-chevron"><?= renderIcon('chevron-down', '', 11) ?></span>
      </button>

      <div class="catalog-filter-menu" id="catalog-filter-menu" role="menu">
        <?php foreach ($categories as $categoryId => $category): ?>
          <button
            type="button"
            class="catalog-filter-option <?= $categoryId === 'all' ? 'active' : '' ?>"
            data-filter-category="<?= htmlspecialchars($categoryId) ?>"
            data-filter-label="<?= htmlspecialchars($category['label']) ?>"
            role="menuitem"
          >
            <span><?= htmlspecialchars($category['label']) ?></span>
            <span class="catalog-filter-check"><?= renderIcon('check', '', 12) ?></span>
          </button>
        <?php endforeach; ?>
      </div>
    </div>
  </div>

  <!-- 4x4 Application Cards Grid (16 cards per page) -->
  <div class="apps-grid-container" id="apps-grid-container">
    <!-- Populated by JavaScript and pre-rendered below with top 16 -->
    <?php
    $catalogIconColors = [
        'blue' => '#3b82f6',
        'purple' => '#8b5cf6',
        'teal' => '#14b8a6',
        'pink' => '#f472b6',
        'green' => '#10b981',
        'Green' => '#10b981',
        'magenta' => '#c084fc',
        'orange' => '#f97316',
        'cyan' => '#0ea5e9'
    ];
    $top16 = array_slice($applications, 0, 16);
    foreach ($top16 as $app):
        $bgColor = $catalogIconColors[strtolower($app['iconColor'])] ?? ($catalogIconColors[$app['iconColor']] ?? '#3b82f6');
    ?>
    <div class="app-catalog-card" data-app-id="<?= htmlspecialchars($app['id']) ?>" onclick="window.launchApp('<?= htmlspecialchars($app['id']) ?>')">
      <span class="card-icon-watermark" style="color: <?= $bgColor ?>;" aria-hidden="true">
        <span class="card-icon-watermark-glyph"><?= renderIcon($app['icon'], '', 82) ?></span>
      </span>
      <div class="app-card-icon-box" style="background-color: <?= $bgColor ?>;">
        <?= renderIcon($app['icon'], '', 22) ?>
      </div>
      <div class="app-card-details">
        <div class="app-card-name" title="<?= htmlspecialchars($app['name']) ?>"><?= htmlspecialchars($app['name']) ?></div>
        <div class="app-card-category"><?= htmlspecialchars($app['categoryLabel']) ?></div>
      </div>
      <button class="app-card-menu-btn" onclick="event.stopPropagation(); window.toggleAppContextMenu(event, '<?= htmlspecialchars($app['id']) ?>')" title="Options">
        <?= renderIcon('dots-vertical', '', 18) ?>
      </button>
    </div>
    <?php endforeach; ?>
  </div>

  <!-- Pagination Controls Row -->
  <div class="catalog-pagination-row">
    <div class="pagination-count-label" id="pagination-count-label">
      Showing 1–16 of 48 apps
    </div>

    <div class="pagination-controls">
      <!-- Previous Button -->
      <button class="pagination-nav-btn" id="pagination-prev-btn" title="Previous page" disabled>
        <?= renderIcon('chevron-left', '', 14) ?>
      </button>

      <!-- Indicator Dots / Page Numbers (3 Pages total: 16 * 3 = 48) -->
      <div class="pagination-dots-group" id="pagination-dots-group">
        <div class="page-dot-btn active" data-page="1"></div>
        <div class="page-dot-btn" data-page="2"></div>
        <div class="page-dot-btn" data-page="3"></div>
      </div>

      <!-- Next Button -->
      <button class="pagination-nav-btn" id="pagination-next-btn" title="Next page">
        <?= renderIcon('chevron-right', '', 14) ?>
      </button>
    </div>
  </div>
</section>
