<?php
/**
 * CentralPoint Weather & Live Clock Widget Component
 * Positioned in Top Row alongside Welcome Banner
 * Real Live Weather for Clark Freeport Zone / Pampanga, Philippines
 */
$currentDateStr = date('l, M j, Y');
$currentTimeStr = date('g:i A');

// Fetch or retrieve cached live weather for Clark, Pampanga (15.18° N, 120.55° E)
function getClarkWeather() {
    $cacheFile = __DIR__ . '/../data/clark_weather_cache.json';
    $cacheLifetime = 900; // 15 minutes cache
    
    if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheLifetime)) {
        $cached = @json_decode(file_get_contents($cacheFile), true);
        if ($cached && isset($cached['temp'])) {
            return $cached;
        }
    }

    // Default fallback
    $weather = [
        'temp' => 25,
        'code' => 3,
        'is_day' => 0,
        'icon' => '☁️',
        'mode' => 'clouds'
    ];

    try {
        $context = stream_context_create([
            'http' => [
                'timeout' => 2.5,
                'ignore_errors' => true
            ]
        ]);
        $url = 'https://api.open-meteo.com/v1/forecast?latitude=15.18&longitude=120.55&current=temperature_2m,relative_humidity_2m,weather_code,is_day&timezone=Asia%2FManila';
        $raw = @file_get_contents($url, false, $context);
        if ($raw) {
            $data = json_decode($raw, true);
            if (isset($data['current']['temperature_2m'])) {
                $code = (int)$data['current']['weather_code'];
                $isDay = (int)$data['current']['is_day'];
                $temp = round((float)$data['current']['temperature_2m']);
                
                // Map WMO weather code to icon and 3D simulation mode
                $icon = '☀️';
                $mode = 'sun';
                if ($code === 0) {
                    $icon = $isDay ? '☀️' : '🌙';
                    $mode = 'sun';
                } elseif (in_array($code, [1, 2, 3, 45, 48])) {
                    $icon = $isDay ? '⛅' : '☁️';
                    $mode = 'clouds';
                } elseif (in_array($code, [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82])) {
                    $icon = '🌧️';
                    $mode = 'rain';
                } elseif (in_array($code, [95, 96, 99])) {
                    $icon = '⛈️';
                    $mode = 'storm';
                } else {
                    $icon = '⛅';
                    $mode = 'clouds';
                }

                $weather = [
                    'temp' => $temp,
                    'code' => $code,
                    'is_day' => $isDay,
                    'icon' => $icon,
                    'mode' => $mode
                ];
                @file_put_contents($cacheFile, json_encode($weather));
            }
        }
    } catch (Exception $e) {}

    return $weather;
}

$clarkWeather = getClarkWeather();
?>
<!-- Date, Time & 3D Interactive Weather Widget -->
<div class="widget-datetime-card" id="widget-datetime-card" data-weather-mode="<?= htmlspecialchars($clarkWeather['mode']) ?>">
  <!-- 3D WebGL Weather Simulation Canvas -->
  <div class="weather-3d-viewport" id="weather-3d-viewport">
    <canvas id="weather-3d-canvas"></canvas>
    <div class="weather-glass-reflection"></div>
  </div>

  <!-- Foreground Content Layer -->
  <div class="datetime-info-col">
    <span class="datetime-day-date" id="live-date-display"><?= $currentDateStr ?></span>
    <span class="datetime-digital-clock" id="live-clock-display"><?= $currentTimeStr ?></span>
    <script>
      (function() {
        try {
          var c = document.getElementById('live-clock-display');
          var d = document.getElementById('live-date-display');
          if (!c || !d) return;
          var now = new Date();
          var h = now.getHours();
          var m = String(now.getMinutes()).padStart(2, '0');
          var ampm = h >= 12 ? 'PM' : 'AM';
          h = h % 12 || 12;
          c.textContent = h + ':' + m + ' ' + ampm;
          var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          d.textContent = days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();
        } catch(e) {}
      })();
    </script>
    
    <!-- Live Weather Status Badge: ONLY the temperature and condition icon -->
    <div class="weather-status-badge" id="weather-status-badge">
      <span class="weather-condition-icon" id="weather-condition-icon"><?= $clarkWeather['icon'] ?></span>
      <span class="weather-temp" id="weather-temp-display"><?= $clarkWeather['temp'] ?>°C</span>
    </div>

    <!-- Location: Clark, Pampanga -->
    <div class="weather-location-row">
      <span class="weather-loc-icon"><?= renderIcon('map-pin', '', 11) ?></span>
      <span class="weather-loc-name">Clark, Pampanga</span>
    </div>
  </div>
</div>
