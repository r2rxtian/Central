<?php
/**
 * CentralPoint Company Sidebar Component:
 * Shared Unified Container for La Rose Noire Company Info, Announcements, and Quick Links
 */
?>
<div class="sidebar-unified-card" id="sidebar-unified-card">

  <!-- Section A: Company Profile Info -->
  <div class="unified-sidebar-section unified-company-section">
    <div class="company-card-header">
      <h3 class="company-card-title"><?= htmlspecialchars($companyInfo['name']) ?></h3>
      <span class="company-card-tagline"><?= htmlspecialchars($companyInfo['tagline']) ?></span>
    </div>

    <div class="company-card-body-row">
      <div class="company-card-img-wrap">
        <img src="assets/images/lrn-building-only.jpg" alt="La Rose Noire Philippines Facility" class="company-card-img">
      </div>

      <div class="company-contact-list">
        <div class="contact-item-row" title="<?= htmlspecialchars($companyInfo['address']) ?>">
          <span class="contact-item-icon"><?= renderIcon('map-pin', '', 12) ?></span>
          <span class="contact-text-truncate"><?= htmlspecialchars($companyInfo['address']) ?></span>
        </div>

        <div class="contact-item-row" title="<?= htmlspecialchars($companyInfo['email']) ?>">
          <span class="contact-item-icon"><?= renderIcon('mail', '', 12) ?></span>
          <a href="mailto:<?= htmlspecialchars($companyInfo['email']) ?>" class="contact-item-link contact-text-truncate"><?= htmlspecialchars($companyInfo['email']) ?></a>
        </div>

        <div class="contact-item-row" title="<?= htmlspecialchars($companyInfo['phone']) ?>">
          <span class="contact-item-icon"><?= renderIcon('phone', '', 12) ?></span>
          <a href="tel:<?= htmlspecialchars($companyInfo['phone']) ?>" class="contact-item-link contact-text-truncate"><?= htmlspecialchars($companyInfo['phone']) ?></a>
        </div>

        <div class="contact-item-row" title="<?= htmlspecialchars($companyInfo['website']) ?>">
          <span class="contact-item-icon"><?= renderIcon('globe', '', 12) ?></span>
          <a href="<?= htmlspecialchars($companyInfo['websiteUrl']) ?>" target="_blank" rel="noopener noreferrer" class="contact-item-link contact-text-truncate"><?= htmlspecialchars($companyInfo['website']) ?></a>
        </div>
      </div>
    </div>

    <div class="company-slogan-italic">
      <?= nl2br(htmlspecialchars($companyInfo['slogan'])) ?>
    </div>
  </div>

  <!-- Section B: Announcements Panel with Carousel -->
  <div class="unified-sidebar-section unified-announcements-section">
    <div class="section-header-row">
      <div class="section-title-wrap">
        <span class="section-header-icon" style="color: #c084fc;">
          <?= renderIcon('megaphone', '', 16) ?>
        </span>
        <h3 class="section-heading" style="font-size: 0.88rem;">Announcements</h3>
      </div>
      <button class="section-action-link" id="view-all-announcements-btn" style="font-size: 0.75rem;">
        View all
      </button>
    </div>

    <!-- Active Announcement Card -->
    <div class="announcement-slide-box" id="active-announcement-box" onclick="window.showAnnouncementDetails()">
      <div class="announcement-img-thumb">
        <img id="announcement-image" src="<?= $announcements[0]['image'] ?>" alt="Announcement Cover">
      </div>
      <div class="announcement-body">
        <div class="announcement-tag-row">
          <span class="announcement-tag-badge" id="announcement-tag"><?= $announcements[0]['tag'] ?></span>
        </div>
        <div class="announcement-title" id="announcement-title"><?= htmlspecialchars($announcements[0]['title']) ?></div>
        <div class="announcement-desc" id="announcement-desc"><?= htmlspecialchars($announcements[0]['description']) ?></div>
      </div>
    </div>

    <!-- Carousel Controls -->
    <div class="announcements-nav-bar">
      <button class="carousel-nav-btn" id="announcement-prev-btn" title="Previous Announcement">
        <?= renderIcon('chevron-left', '', 13) ?>
      </button>

      <div class="carousel-dots" id="announcement-dots-group">
        <?php foreach ($announcements as $idx => $ann): ?>
          <span class="carousel-dot <?= $idx === 0 ? 'active' : '' ?>" data-index="<?= $idx ?>"></span>
        <?php endforeach; ?>
      </div>

      <button class="carousel-nav-btn" id="announcement-next-btn" title="Next Announcement">
        <?= renderIcon('chevron-right', '', 13) ?>
      </button>
    </div>
  </div>

  <!-- Section C: Quick Links Panel -->
  <div class="unified-sidebar-section unified-quicklinks-section">
    <div class="section-header-row">
      <div class="section-title-wrap">
        <span class="section-header-icon" style="color: #0284c7;">
          <?= renderIcon('link', '', 16) ?>
        </span>
        <h3 class="section-heading" style="font-size: 0.88rem;">Quick Links</h3>
      </div>
    </div>

    <div class="quicklinks-grid">
      <?php foreach ($quickLinks as $link): ?>
        <a href="<?= htmlspecialchars($link['url']) ?>" target="_blank" rel="noopener noreferrer" class="quicklink-tile-btn">
          <div class="quicklink-left">
            <span class="quicklink-icon"><?= renderIcon($link['icon'], '', 14) ?></span>
            <span><?= htmlspecialchars($link['title']) ?></span>
          </div>
          <span class="quicklink-arrow"><?= renderIcon('arrow-up-right', '', 11) ?></span>
        </a>
      <?php endforeach; ?>
    </div>
  </div>

</div>
