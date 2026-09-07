<?php
/**
 * CentralPoint Welcome Banner (Hero) Component
 */
?>
<section class="hero-banner">
  <!-- 1. Background Facility Photo Layer (Fades smoothly to the left) -->
  <div class="hero-photo-layer" style="background-image: url('<?= htmlspecialchars($companyInfo['heroImage']) ?>');"></div>
  
  <!-- 2. Smooth Transition Gradient Overlay -->
  <div class="hero-gradient-overlay"></div>

  <!-- 3. Soft Transition Zone Scripted Text ("") -->
  <div class="hero-script-zone">
    <div class="hero-script-text">
      <span class="hero-script-line1">May Puso</span>
      <span class="hero-script-line2">May Malasakit</span>
      <span class="hero-script-line3">La Rose Noire</span>
    </div>
    <svg class="hero-script-stroke" viewBox="0 0 120 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 7C35 2 85 3 118 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  </div>

  <!-- 4. Hero Foreground Content (Title and Description) -->
  <div class="hero-content">
    <div class="hero-text-block">
      <?php
        $hour = (int)date('G');
        if ($hour >= 5 && $hour < 12) {
            $greeting = 'GOOD MORNING,';
        } elseif ($hour >= 12 && $hour < 18) {
            $greeting = 'GOOD AFTERNOON,';
        } else {
            $greeting = 'GOOD EVENING,';
        }
      ?>
      <div class="hero-overline" id="hero-greeting-overline"><?= $greeting ?></div>
      <h1 class="hero-title">Welcome to <span class="hero-title-highlight">CentralPoint!</span></h1>
      <p class="hero-description">Your gateway to the tools, people and information that keep La Rose Noire Philippines moving forward.</p>
    </div>
  </div>
</section>
