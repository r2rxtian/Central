<?php
/**
 * CentralPoint Company Sidebar Component:
 * Compact La Rose Noire company information panel
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
        <button
          type="button"
          class="contact-item-row company-address-trigger"
          aria-label="Show full company address"
          aria-describedby="company-address-popover"
        >
          <span class="contact-item-icon"><?= renderIcon('map-pin', '', 12) ?></span>
          <span class="contact-text-truncate"><?= htmlspecialchars($companyInfo['address']) ?></span>
        </button>

        <div class="company-address-popover" id="company-address-popover" role="tooltip">
          <span class="company-address-popover-icon" aria-hidden="true"><?= renderIcon('map-pin', '', 14) ?></span>
          <span>
            <strong>Full address</strong>
            <?= htmlspecialchars($companyInfo['address']) ?>
          </span>
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

  </div>

</div>
