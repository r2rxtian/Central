<?php
/**
 * CentralPoint Employee Portal - Master Entrypoint
 * La Rose Noire Philippines
 */

require_once __DIR__ . '/data/mock_data.php';
require_once __DIR__ . '/components/icons.php';
?>
<?php
$initialThemeAttr = (isset($_GET['theme']) && $_GET['theme'] === 'dark') ? ' data-theme="dark"' : '';
?>
<!DOCTYPE html>
<html lang="en"<?= $initialThemeAttr ?>>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="CentralPoint Employee Portal - Default browser and new tab hub for La Rose Noire Philippines applications, workspaces, announcements, and shortcuts.">
  <title>CentralPoint - Employee Portal | La Rose Noire Philippines</title>
  <link rel="icon" type="image/svg+xml" href="assets/images/logo.svg">

  <!-- Immediate Theme State (Anti-FOUT) -->
  <script>
    (function() {
      try {
        var t = localStorage.getItem('centralpoint_theme_v1');
        var urlDark = window.location.search.indexOf('theme=dark') !== -1;
        if (t === 'dark' || urlDark) {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
      } catch (e) {}
    })();
  </script>

  <!-- Core Stylesheets -->
  <link rel="stylesheet" href="assets/css/variables.css">
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="stylesheet" href="assets/css/components.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>

  <div class="app-wrapper">
    <!-- Top Navigation Header -->
    <?php include __DIR__ . '/components/header.php'; ?>

    <!-- Main Dashboard Container: Fluid Full-Width -->
    <main class="dashboard-container w-full">
      <!-- 1. Top Row: Welcome Hero Banner (Left) + Weather & Clock Widget (Right) -->
      <div class="dashboard-top-row">
        <?php include __DIR__ . '/components/welcome_banner.php'; ?>
        <?php include __DIR__ . '/components/weather_widget.php'; ?>
      </div>

      <!-- 2. Lower Dashboard: Applications (Left) + Shared Unified Container (Right) -->
      <div class="dashboard-layout">
        <!-- Left Main Content Column -->
        <div class="dashboard-main-col">
          <!-- Favorite Apps Section -->
          <?php include __DIR__ . '/components/favorite_apps.php'; ?>

          <!-- All Applications Catalog Section -->
          <?php include __DIR__ . '/components/application_catalog.php'; ?>
        </div>

        <!-- Right Side Column: Shared Container (Company Profile, Announcements, Quick Links) -->
        <aside class="dashboard-side-col">
          <?php include __DIR__ . '/components/company_sidebar.php'; ?>
        </aside>
      </div>
    </main>

    <!-- Footer -->
    <?php include __DIR__ . '/components/footer.php'; ?>
  </div>

  <!-- Interactive Overlays & Modals -->
  <?php include __DIR__ . '/components/modals.php'; ?>

  <!-- Hydrate Client-Side Mock Data -->
  <script>
    window.CP_DATA = {
      currentUser: <?= json_encode($currentUser) ?>,
      companyInfo: <?= json_encode($companyInfo) ?>,
      categories: <?= json_encode($categories) ?>,
      applications: <?= json_encode($applications) ?>,
      announcements: <?= json_encode($announcements) ?>,
      quickLinks: <?= json_encode($quickLinks) ?>,
      defaultFavoriteIds: <?= json_encode($defaultFavoriteIds) ?>,
      initialWorkspaces: <?= json_encode($initialWorkspaces) ?>
    };
  </script>

  <!-- Animation & 3D WebGL Vendor Libraries (Offline Local) -->
  <script src="assets/js/vendor/gsap.min.js"></script>
  <script src="assets/js/vendor/three.min.js"></script>

  <!-- Application Interaction Logic -->
  <script src="assets/js/app.js"></script>

  <!-- 3D Interactive Weather Simulation (Three.js 3D Rain, Sun, Storm, Clouds) -->
  <script src="assets/js/weather_3d.js"></script>

  <!-- iOS-Level Fluid GSAP Animations & Physics -->
  <script src="assets/js/animations.js"></script>

</body>
</html>
