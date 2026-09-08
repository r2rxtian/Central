<?php
/**
 * CentralPoint All Applications Catalog Component
 */
?>
<section class="catalog-section" id="catalog-section">
  <!-- Catalog Section Header -->
  <div class="section-header-row">
    <div class="section-title-wrap">
      <div class="section-title-text">
        <h2 class="section-heading">All Applications</h2>
        <span class="section-subheading" id="catalog-subheading">Browse and launch all 48 company applications.</span>
      </div>
    </div>

    <div class="catalog-toolbar">
      <label class="catalog-search-field" for="catalog-search-input">
        <span class="catalog-search-icon"><?= renderIcon('search', '', 14) ?></span>
        <input type="search" id="catalog-search-input" placeholder="Search applications" autocomplete="off" aria-label="Search applications">
      </label>

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
  </div>

  <!-- 5x4 Application Cards Grid (20 cards per page) -->
  <div class="apps-grid-container" id="apps-grid-container">
    <!-- Populated by JavaScript and pre-rendered below with top 20 -->
    <?php
    $top20 = array_slice($applications, 0, 20);
    foreach ($top20 as $app):
        $categoryKey = strtolower(trim($app['category'] ?? ''));
        $bgColor = $categoryAccentColors[$categoryKey] ?? '#7b8ba5';
        $darkBgColor = $categoryAccentColorsDark[$categoryKey] ?? '#6f7788';
    ?>
    <div class="app-catalog-card" style="--app-accent: <?= $bgColor ?>; --app-accent-dark: <?= $darkBgColor ?>;" data-app-id="<?= htmlspecialchars($app['id']) ?>" onclick="window.launchApp('<?= htmlspecialchars($app['id']) ?>')">
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
      Showing 1–20 of 48 apps
    </div>

    <div class="pagination-controls">
      <!-- Previous Button -->
      <button class="pagination-nav-btn" id="pagination-prev-btn" title="Previous page" disabled>
        <?= renderIcon('chevron-left', '', 14) ?>
      </button>

      <!-- Indicator Dots / Page Numbers (3 Pages total: 20 + 20 + 8) -->
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
