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
  <meta name="description" content="CentralPoint Employee Portal - Corporate application launcher and new-tab workspace for La Rose Noire Philippines employees.">
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
      <!-- Compact Top Row: Workspaces + Company Information -->
      <div class="portal-top-row">
        <div class="portal-workspace-panel">
          <?php include __DIR__ . '/components/workspace_panel.php'; ?>
        </div>
        <aside class="dashboard-side-col">
          <?php include __DIR__ . '/components/company_sidebar.php'; ?>
        </aside>
      </div>

      <!-- Full-Width Flexible Application Catalog -->
      <?php include __DIR__ . '/components/application_catalog.php'; ?>
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
      categoryAccentColors: <?= json_encode($categoryAccentColors) ?>,
      categoryAccentColorsDark: <?= json_encode($categoryAccentColorsDark) ?>,
      applications: <?= json_encode($applications) ?>,
      announcements: <?= json_encode($announcements) ?>,
      quickLinks: <?= json_encode($quickLinks) ?>,
      initialWorkspaces: <?= json_encode($initialWorkspaces) ?>
    };
  </script>

  <!-- Animation Library (Offline Local) -->
  <script src="assets/js/vendor/gsap.min.js"></script>

  <!-- Application Interaction Logic -->
  <script src="assets/js/app.js"></script>

  <!-- iOS-Level Fluid GSAP Animations & Physics -->
  <script src="assets/js/animations.js"></script>

</body>
</html>
