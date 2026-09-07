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

    <button class="section-action-link purple" id="view-all-apps-btn">
      <span id="view-all-apps-label">View all 48 apps</span>
      <?= renderIcon('arrow-right-circle', '', 15) ?>
    </button>
  </div>

  <!-- Category Filter Pills Bar -->
  <div class="category-filter-bar" id="category-filter-bar">
    <!-- Active Pill: All Apps -->
    <button class="category-pill-btn active" data-category="all">
      <span class="category-pill-icon"><?= renderIcon('grid-4', '', 14) ?></span>
      <span class="category-pill-label">All Apps (<span id="count-all">48</span>)</span>
    </button>

    <!-- IT Category Pill -->
    <button class="category-pill-btn" data-category="it">
      <span class="category-pill-icon"><?= renderIcon('monitor', '', 14) ?></span>
      <span class="category-pill-label">IT (<span id="count-it">7</span>)</span>
    </button>

    <!-- HR Category Pill -->
    <button class="category-pill-btn" data-category="hr">
      <span class="category-pill-icon"><?= renderIcon('users', '', 14) ?></span>
      <span class="category-pill-label">HR (<span id="count-hr">8</span>)</span>
    </button>

    <!-- QA Category Pill -->
    <button class="category-pill-btn" data-category="qa">
      <span class="category-pill-icon"><?= renderIcon('shield-check', '', 14) ?></span>
      <span class="category-pill-label">QA (<span id="count-qa">6</span>)</span>
    </button>

    <!-- Operations Category Pill -->
    <button class="category-pill-btn" data-category="operations">
      <span class="category-pill-icon"><?= renderIcon('settings', '', 14) ?></span>
      <span class="category-pill-label">Operations (<span id="count-operations">6</span>)</span>
    </button>

    <!-- More Dropdown -->
    <div class="category-more-wrap" id="category-more-wrap">
      <button class="category-pill-btn" id="category-more-btn" aria-haspopup="true" aria-expanded="false">
        <span class="category-pill-icon"><?= renderIcon('dots-horizontal', '', 14) ?></span>
        <span id="more-btn-label">More</span>
        <span style="display: inline-flex; margin-left: 2px;"><?= renderIcon('chevron-down', '', 12) ?></span>
      </button>

      <!-- Dropdown Popup Menu -->
      <div class="category-more-menu" id="category-more-menu">
        <button class="more-item-btn" data-category="finance">
          <span>Finance</span>
          <span class="more-item-count">(5)</span>
        </button>
        <button class="more-item-btn" data-category="facilities">
          <span>Facilities</span>
          <span class="more-item-count">(4)</span>
        </button>
        <button class="more-item-btn" data-category="administration">
          <span>Administration</span>
          <span class="more-item-count">(5)</span>
        </button>
        <button class="more-item-btn" data-category="communication">
          <span>Communication</span>
          <span class="more-item-count">(4)</span>
        </button>
        <button class="more-item-btn" data-category="external">
          <span>External</span>
          <span class="more-item-count">(3)</span>
        </button>
      </div>
    </div>
  </div>

  <!-- 2x4 Application Cards Grid (8 cards per page) -->
  <div class="apps-grid-container" id="apps-grid-container">
    <!-- Populated by JavaScript and pre-rendered below with top 8 -->
    <?php
    $catalogIconColors = [
        'blue' => '#3b82f6',
        'purple' => '#8b5cf6',
        'teal' => '#14b8a6',
        'pink' => '#f472b6',
        'green' => '#10b981',
        'magenta' => '#c084fc',
        'orange' => '#f97316',
        'cyan' => '#0ea5e9'
    ];
    $top8 = array_slice($applications, 0, 8);
    foreach ($top8 as $app):
        $bgColor = $catalogIconColors[$app['iconColor']] ?? '#3b82f6';
    ?>
    <div class="app-catalog-card" data-app-id="<?= htmlspecialchars($app['id']) ?>" onclick="window.launchApp('<?= htmlspecialchars($app['id']) ?>')">
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
      Showing top 8 of 48 apps
    </div>

    <div class="pagination-controls">
      <!-- Previous Button -->
      <button class="pagination-nav-btn" id="pagination-prev-btn" title="Previous page" disabled>
        <?= renderIcon('chevron-left', '', 14) ?>
      </button>

      <!-- Indicator Dots / Page Numbers -->
      <div class="pagination-dots-group" id="pagination-dots-group">
        <div class="page-dot-btn active" data-page="1"></div>
        <div class="page-dot-btn" data-page="2"></div>
        <div class="page-dot-btn" data-page="3"></div>
        <div class="page-dot-btn" data-page="4"></div>
        <div class="page-dot-btn" data-page="5"></div>
        <div class="page-dot-btn" data-page="6"></div>
      </div>

      <!-- Next Button -->
      <button class="pagination-nav-btn" id="pagination-next-btn" title="Next page">
        <?= renderIcon('chevron-right', '', 14) ?>
      </button>
    </div>
  </div>
</section>
