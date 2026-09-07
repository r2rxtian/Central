/**
 * CentralPoint - High-Performance 3D Weather Simulation
 * Powered by Three.js & GSAP
 * Implements real 3D Rain, Sun, Storm, and Volumetric Clouds with interactive depth parallax
 */

(function () {
  'use strict';

  // Check for Three.js availability
  if (typeof THREE === 'undefined') {
    console.warn('Three.js is not loaded. 3D weather simulation cannot start.');
    return;
  }

  const container = document.getElementById('weather-3d-viewport');
  const canvas = document.getElementById('weather-3d-canvas');
  const card = document.getElementById('widget-datetime-card');
  if (!container || !canvas || !card) return;

  // Scene globals
  let scene, camera, renderer;
  let ambientLight, dirLight, lightningLight;
  let currentWeather = 'rain'; // Default to 3D Rain as requested!

  // Weather sub-groups
  const weatherGroups = {
    rain: null,
    sun: null,
    storm: null,
    clouds: null
  };

  // Rain specific state
  let rainDrops = null;
  let rainCount = 1400;
  let rainPositions, rainVelocities;
  let splashRings = [];
  let rainClouds = null;

  // Storm specific state
  let stormDrops = null;
  let stormCount = 2200;
  let stormPositions, stormVelocities;
  let stormClouds = null;

  // Sun specific state
  let sunGroup = null;
  let sunCore = null;
  let sunRays = null;
  let sunParticles = null;

  // Clouds specific state
  let cloudClusters = [];

  // Parallax / Camera targets
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  // Weather presets data
  const WEATHER_PRESETS = {
    rain: {
      icon: '🌧️',
      temp: '27°C',
      label: '3D Rain Simulation',
      loc: 'Carmona, Cavite',
      fogColorLight: 0xdbeafe,
      fogColorDark: 0x0f172a,
      dirLightColor: 0x93c5fd,
      dirIntensity: 0.9
    },
    sun: {
      icon: '☀️',
      temp: '31°C',
      label: '3D Sun Simulation',
      loc: 'Carmona, Cavite',
      fogColorLight: 0xfef3c7,
      fogColorDark: 0x1f162b,
      dirLightColor: 0xfbbf24,
      dirIntensity: 1.8
    },
    storm: {
      icon: '⛈️',
      temp: '25°C',
      label: '3D Storm & Lightning',
      loc: 'Carmona, Cavite',
      fogColorLight: 0x94a3b8,
      fogColorDark: 0x090d18,
      dirLightColor: 0x818cf8,
      dirIntensity: 0.6
    },
    clouds: {
      icon: '⛅',
      temp: '29°C',
      label: '3D Volumetric Clouds',
      loc: 'Carmona, Cavite',
      fogColorLight: 0xe0e7ff,
      fogColorDark: 0x131c34,
      dirLightColor: 0xc7d2fe,
      dirIntensity: 1.2
    }
  };

  function initThree() {
    const width = container.clientWidth || 240;
    const height = container.clientHeight || 190;

    // 1. Scene
    scene = new THREE.Scene();

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const initFog = isDark ? WEATHER_PRESETS.rain.fogColorDark : WEATHER_PRESETS.rain.fogColorLight;
    scene.fog = new THREE.FogExp2(initFog, 0.012);

    // 2. Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 0, 80);
    camera.lookAt(0, 0, 0);

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lights
    ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    dirLight = new THREE.DirectionalLight(0x93c5fd, 1.2);
    dirLight.position.set(20, 40, 30);
    scene.add(dirLight);

    lightningLight = new THREE.PointLight(0xe0e7ff, 0, 350);
    lightningLight.position.set(0, 30, 20);
    scene.add(lightningLight);

    // 5. Build Weather Environments
    buildRainEnvironment();
    buildSunEnvironment();
    buildStormEnvironment();
    buildCloudsEnvironment();

    // 6. Set initial active state
    setWeatherMode('rain', false);

    // 7. Setup Event Listeners
    setupInteractions();

    // 8. Start Loop
    animate();
  }

  // ==========================================================================
  // 1. 3D RAIN ENVIRONMENT (User's primary request)
  // ==========================================================================
  function buildRainEnvironment() {
    const rainGroup = new THREE.Group();
    weatherGroups.rain = rainGroup;

    // A. Raindrops using 3D LineSegments (true dimensional streaks)
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(rainCount * 6); // 2 vertices per line (x,y,z * 2)
    rainPositions = new Float32Array(rainCount * 3);
    rainVelocities = new Float32Array(rainCount * 2); // speedY, windX

    for (let i = 0; i < rainCount; i++) {
      const x = (Math.random() - 0.5) * 110;
      const y = (Math.random() - 0.5) * 90;
      const z = (Math.random() - 0.5) * 60;

      rainPositions[i * 3] = x;
      rainPositions[i * 3 + 1] = y;
      rainPositions[i * 3 + 2] = z;

      rainVelocities[i * 2] = -1.4 - Math.random() * 1.2; // vertical velocity
      rainVelocities[i * 2 + 1] = -0.22 - Math.random() * 0.15; // wind drift

      const streakLength = 3.5 + Math.random() * 2.5;

      // Start vertex
      linePositions[i * 6] = x;
      linePositions[i * 6 + 1] = y;
      linePositions[i * 6 + 2] = z;

      // End vertex (stretched along trajectory)
      linePositions[i * 6 + 3] = x + rainVelocities[i * 2 + 1] * 1.5;
      linePositions[i * 6 + 4] = y - streakLength;
      linePositions[i * 6 + 5] = z;
    }

    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    rainDrops = new THREE.LineSegments(lineGeo, lineMat);
    rainGroup.add(rainDrops);

    // B. 3D Splash Rings on ground impact
    const ringGeo = new THREE.RingGeometry(0.2, 0.7, 16);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xbfdbfe,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });

    for (let i = 0; i < 22; i++) {
      const ring = new THREE.Mesh(ringGeo, ringMat.clone());
      ring.rotation.x = -Math.PI / 2;
      ring.visible = false;
      rainGroup.add(ring);
      splashRings.push(ring);
    }

    // C. 3D Soft Volumetric Cloud Puffs (Floating at the top)
    rainClouds = new THREE.Group();
    const cloudGeo = new THREE.SphereGeometry(12, 16, 16);
    const cloudMat = new THREE.MeshPhongMaterial({
      color: 0x475569,
      transparent: true,
      opacity: 0.45,
      flatShading: true
    });

    for (let i = 0; i < 6; i++) {
      const puff = new THREE.Mesh(cloudGeo, cloudMat);
      puff.position.set(
        -30 + i * 14 + (Math.random() - 0.5) * 6,
        28 + (Math.random() - 0.5) * 6,
        -10 + (Math.random() - 0.5) * 15
      );
      puff.scale.set(1.4, 0.7, 1.1);
      rainClouds.add(puff);
    }
    rainGroup.add(rainClouds);

    scene.add(rainGroup);
  }

  function updateRain() {
    if (!weatherGroups.rain || !weatherGroups.rain.visible) return;

    const positions = rainDrops.geometry.attributes.position.array;

    for (let i = 0; i < rainCount; i++) {
      const idx3 = i * 3;
      const idx6 = i * 6;

      const vy = rainVelocities[i * 2];
      const vx = rainVelocities[i * 2 + 1];

      rainPositions[idx3] += vx;
      rainPositions[idx3 + 1] += vy;

      // Bottom boundary hit -> Recycle and trigger splash
      if (rainPositions[idx3 + 1] < -34) {
        // Trigger splash at impact point
        triggerSplash(rainPositions[idx3], -34, rainPositions[idx3 + 2]);

        rainPositions[idx3 + 1] = 40 + Math.random() * 8;
        rainPositions[idx3] = (Math.random() - 0.5) * 110;
        rainPositions[idx3 + 2] = (Math.random() - 0.5) * 60;
      }

      const streakLength = 3.5;
      const x = rainPositions[idx3];
      const y = rainPositions[idx3 + 1];
      const z = rainPositions[idx3 + 2];

      positions[idx6] = x;
      positions[idx6 + 1] = y;
      positions[idx6 + 2] = z;

      positions[idx6 + 3] = x + vx * 1.5;
      positions[idx6 + 4] = y - streakLength;
      positions[idx6 + 5] = z;
    }

    rainDrops.geometry.attributes.position.needsUpdate = true;

    // Subtle cloud breathing
    if (rainClouds) {
      rainClouds.position.x = Math.sin(Date.now() * 0.0008) * 4;
    }
  }

  function triggerSplash(x, y, z) {
    const ring = splashRings.find(r => !r.visible);
    if (!ring) return;

    ring.position.set(x, y, z);
    ring.scale.set(0.4, 0.4, 0.4);
    ring.material.opacity = 0.8;
    ring.visible = true;

    if (window.gsap) {
      gsap.to(ring.scale, {
        x: 2.8,
        y: 2.8,
        z: 2.8,
        duration: 0.45,
        ease: 'power1.out'
      });
      gsap.to(ring.material, {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out',
        onComplete: () => {
          ring.visible = false;
        }
      });
    } else {
      setTimeout(() => { ring.visible = false; }, 400);
    }
  }

  // ==========================================================================
  // 2. 3D SUN ENVIRONMENT
  // ==========================================================================
  function buildSunEnvironment() {
    sunGroup = new THREE.Group();
    weatherGroups.sun = sunGroup;

    // A. Glowing 3D Sun Sphere
    const sunGeo = new THREE.SphereGeometry(9, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24
    });
    sunCore = new THREE.Mesh(sunGeo, sunMat);
    sunCore.position.set(18, 10, -5);
    sunGroup.add(sunCore);

    // B. Corona Glow Rings
    const coronaGeo = new THREE.RingGeometry(9.4, 15, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xfde68a,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide
    });
    const corona = new THREE.Mesh(coronaGeo, coronaMat);
    sunCore.add(corona);

    // C. 3D Solar Ray Spokes
    sunRays = new THREE.Group();
    const rayGeo = new THREE.ConeGeometry(0.7, 9, 8);
    const rayMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.65
    });

    const rayCount = 12;
    for (let i = 0; i < rayCount; i++) {
      const ray = new THREE.Mesh(rayGeo, rayMat);
      const angle = (i / rayCount) * Math.PI * 2;
      ray.position.set(Math.cos(angle) * 14.5, Math.sin(angle) * 14.5, 0);
      ray.rotation.z = angle - Math.PI / 2;
      sunRays.add(ray);
    }
    sunCore.add(sunRays);

    // D. Golden Floating Dust Particles
    const particleGeo = new THREE.BufferGeometry();
    const pCount = 120;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 80;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 70;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0xfef08a,
      size: 1.6,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    sunParticles = new THREE.Points(particleGeo, pMat);
    sunGroup.add(sunParticles);

    sunGroup.visible = false;
    scene.add(sunGroup);
  }

  function updateSun() {
    if (!weatherGroups.sun || !weatherGroups.sun.visible) return;

    if (sunRays) {
      sunRays.rotation.z += 0.005;
    }

    if (sunCore) {
      sunCore.position.y = 10 + Math.sin(Date.now() * 0.0015) * 1.5;
    }

    if (sunParticles) {
      const positions = sunParticles.geometry.attributes.position.array;
      for (let i = 0; i < 120; i++) {
        positions[i * 3 + 1] += 0.12;
        if (positions[i * 3 + 1] > 35) {
          positions[i * 3 + 1] = -35;
        }
      }
      sunParticles.geometry.attributes.position.needsUpdate = true;
    }
  }

  // ==========================================================================
  // 3. 3D STORM & LIGHTNING ENVIRONMENT
  // ==========================================================================
  function buildStormEnvironment() {
    const stormGroup = new THREE.Group();
    weatherGroups.storm = stormGroup;

    // A. Driving heavy rain
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(stormCount * 6);
    stormPositions = new Float32Array(stormCount * 3);
    stormVelocities = new Float32Array(stormCount * 2);

    for (let i = 0; i < stormCount; i++) {
      const x = (Math.random() - 0.5) * 130;
      const y = (Math.random() - 0.5) * 90;
      const z = (Math.random() - 0.5) * 60;

      stormPositions[i * 3] = x;
      stormPositions[i * 3 + 1] = y;
      stormPositions[i * 3 + 2] = z;

      stormVelocities[i * 2] = -2.2 - Math.random() * 1.6; // heavier fall
      stormVelocities[i * 2 + 1] = -0.7 - Math.random() * 0.4; // heavy wind angle

      const streakLength = 5.5;

      linePositions[i * 6] = x;
      linePositions[i * 6 + 1] = y;
      linePositions[i * 6 + 2] = z;

      linePositions[i * 6 + 3] = x + stormVelocities[i * 2 + 1] * 2.0;
      linePositions[i * 6 + 4] = y - streakLength;
      linePositions[i * 6 + 5] = z;
    }

    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xbfdbfe,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    stormDrops = new THREE.LineSegments(lineGeo, lineMat);
    stormGroup.add(stormDrops);

    // B. Dark Turbulent Clouds
    stormClouds = new THREE.Group();
    const cloudGeo = new THREE.SphereGeometry(15, 16, 16);
    const cloudMat = new THREE.MeshPhongMaterial({
      color: 0x1e293b,
      transparent: true,
      opacity: 0.75,
      flatShading: true
    });

    for (let i = 0; i < 7; i++) {
      const puff = new THREE.Mesh(cloudGeo, cloudMat);
      puff.position.set(
        -35 + i * 14 + (Math.random() - 0.5) * 5,
        28 + (Math.random() - 0.5) * 5,
        -10 + (Math.random() - 0.5) * 12
      );
      puff.scale.set(1.5, 0.8, 1.2);
      stormClouds.add(puff);
    }
    stormGroup.add(stormClouds);

    stormGroup.visible = false;
    scene.add(stormGroup);

    // Periodic Lightning Strike
    setInterval(() => {
      if (currentWeather === 'storm' && Math.random() > 0.4) {
        triggerLightning();
      } else if (currentWeather === 'rain' && Math.random() > 0.75) {
        triggerLightning(1.8);
      }
    }, 4500);
  }

  function triggerLightning(intensity = 4.5) {
    if (!lightningLight) return;

    lightningLight.intensity = intensity;
    if (window.gsap) {
      gsap.to(lightningLight, {
        intensity: 0,
        duration: 0.35,
        ease: 'power3.out'
      });
    } else {
      setTimeout(() => { lightningLight.intensity = 0; }, 150);
    }
  }

  function updateStorm() {
    if (!weatherGroups.storm || !weatherGroups.storm.visible) return;

    const positions = stormDrops.geometry.attributes.position.array;

    for (let i = 0; i < stormCount; i++) {
      const idx3 = i * 3;
      const idx6 = i * 6;

      const vy = stormVelocities[i * 2];
      const vx = stormVelocities[i * 2 + 1];

      stormPositions[idx3] += vx;
      stormPositions[idx3 + 1] += vy;

      if (stormPositions[idx3 + 1] < -35) {
        stormPositions[idx3 + 1] = 40 + Math.random() * 8;
        stormPositions[idx3] = (Math.random() - 0.5) * 130;
      }

      const streakLength = 5.5;
      const x = stormPositions[idx3];
      const y = stormPositions[idx3 + 1];
      const z = stormPositions[idx3 + 2];

      positions[idx6] = x;
      positions[idx6 + 1] = y;
      positions[idx6 + 2] = z;

      positions[idx6 + 3] = x + vx * 2.0;
      positions[idx6 + 4] = y - streakLength;
      positions[idx6 + 5] = z;
    }

    stormDrops.geometry.attributes.position.needsUpdate = true;

    if (stormClouds) {
      stormClouds.position.x = Math.sin(Date.now() * 0.0012) * 5;
    }
  }

  // ==========================================================================
  // 4. 3D VOLUMETRIC CLOUDS ENVIRONMENT
  // ==========================================================================
  function buildCloudsEnvironment() {
    const cloudGroup = new THREE.Group();
    weatherGroups.clouds = cloudGroup;

    const cloudGeo = new THREE.SphereGeometry(10, 20, 20);
    const cloudMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.55,
      flatShading: true
    });

    for (let cluster = 0; cluster < 4; cluster++) {
      const cl = new THREE.Group();
      const zOffset = -20 + cluster * 12;

      for (let p = 0; p < 5; p++) {
        const puff = new THREE.Mesh(cloudGeo, cloudMat);
        puff.position.set(
          (p - 2) * 8 + (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 6
        );
        puff.scale.set(1.4, 0.9, 1.2);
        cl.add(puff);
      }

      cl.position.set((cluster - 1.5) * 26, 8 + (cluster % 2) * 10, zOffset);
      cloudGroup.add(cl);
      cloudClusters.push(cl);
    }

    cloudGroup.visible = false;
    scene.add(cloudGroup);
  }

  function updateClouds() {
    if (!weatherGroups.clouds || !weatherGroups.clouds.visible) return;

    cloudClusters.forEach((cl, idx) => {
      cl.position.x += 0.035 * (idx % 2 === 0 ? 1 : 0.8);
      if (cl.position.x > 50) {
        cl.position.x = -50;
      }
      cl.position.y += Math.sin(Date.now() * 0.001 + idx) * 0.015;
    });
  }

  // ==========================================================================
  // Switch Weather Mode (Smooth GSAP Transition)
  // ==========================================================================
  function setWeatherMode(weatherKey, animateTransition = true) {
    if (!WEATHER_PRESETS[weatherKey]) return;
    currentWeather = weatherKey;
    const preset = WEATHER_PRESETS[weatherKey];

    // 1. Update UI Elements
    const iconEl = document.getElementById('weather-condition-icon');
    const tempEl = document.getElementById('weather-temp-display');
    const labelEl = document.getElementById('weather-condition-label');
    const pills = document.querySelectorAll('.weather-mode-pill');

    if (iconEl) iconEl.textContent = preset.icon;
    if (tempEl) tempEl.textContent = preset.temp;
    if (labelEl) labelEl.textContent = preset.label;

    pills.forEach(pill => {
      if (pill.dataset.weather === weatherKey) {
        pill.classList.add('active');
        if (window.gsap && animateTransition) {
          gsap.fromTo(pill, { scale: 0.93 }, { scale: 1, duration: 0.22, ease: 'back.out(1.6)', clearProps: 'transform' });
        }
      } else {
        pill.classList.remove('active');
      }
    });

    // 2. Adjust Lighting & Atmospheric Fog
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const fogColor = isDark ? preset.fogColorDark : preset.fogColorLight;

    if (window.gsap && animateTransition) {
      gsap.to(dirLight, { intensity: preset.dirIntensity, duration: 0.3 });
      gsap.to(dirLight.color, {
        r: ((preset.dirLightColor >> 16) & 255) / 255,
        g: ((preset.dirLightColor >> 8) & 255) / 255,
        b: (preset.dirLightColor & 255) / 255,
        duration: 0.3
      });
      gsap.to(scene.fog.color, {
        r: ((fogColor >> 16) & 255) / 255,
        g: ((fogColor >> 8) & 255) / 255,
        b: (fogColor & 255) / 255,
        duration: 0.3
      });
    } else {
      dirLight.intensity = preset.dirIntensity;
      dirLight.color.setHex(preset.dirLightColor);
      scene.fog.color.setHex(fogColor);
    }

    // 3. Toggle Weather 3D Groups
    Object.keys(weatherGroups).forEach(key => {
      const grp = weatherGroups[key];
      if (!grp) return;

      if (key === weatherKey) {
        grp.visible = true;
        if (window.gsap && animateTransition) {
          grp.position.y = -10;
          gsap.to(grp.position, { y: 0, duration: 0.32, ease: 'power2.out' });
        } else {
          grp.position.y = 0;
        }
      } else {
        if (window.gsap && animateTransition && grp.visible) {
          gsap.to(grp.position, {
            y: 15,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => { grp.visible = false; }
          });
        } else {
          grp.visible = false;
        }
      }
    });

    if (window.showToast && animateTransition) {
      window.showToast(`3D Weather switched to ${preset.label}`);
    }
  }

  // ==========================================================================
  // Interactions & iOS Camera Parallax
  // ==========================================================================
  function setupInteractions() {
    // Mode switcher buttons
    document.querySelectorAll('.weather-mode-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const mode = btn.dataset.weather;
        setWeatherMode(mode, true);
      });
    });

    // 3D Parallax Tracking across card
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      mouse.targetX = nx * 14;
      mouse.targetY = -ny * 10;
    });

    card.addEventListener('mouseleave', () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    });

    // Resize handling with ResizeObserver
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0 && renderer && camera) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    ro.observe(container);

    // Watch theme changes to adjust fog & ambient light
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const preset = WEATHER_PRESETS[currentWeather];
      const fogColor = isDark ? preset.fogColorDark : preset.fogColorLight;
      scene.fog.color.setHex(fogColor);
      ambientLight.intensity = isDark ? 0.65 : 0.95;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  // ==========================================================================
  // Main Animation Loop
  // ==========================================================================
  function animate() {
    requestAnimationFrame(animate);

    // Pause rendering if not visible to save battery/CPU
    if (document.visibilityState === 'hidden') return;

    // Smooth iOS camera parallax damping
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    camera.position.x = mouse.x;
    camera.position.y = mouse.y;
    camera.lookAt(0, 0, 0);

    // Update active weather simulation
    switch (currentWeather) {
      case 'rain':
        updateRain();
        break;
      case 'sun':
        updateSun();
        break;
      case 'storm':
        updateStorm();
        break;
      case 'clouds':
        updateClouds();
        break;
    }

    renderer.render(scene, camera);
  }

  // Export helper globally
  window.CentralWeather3D = {
    setMode: setWeatherMode
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThree);
  } else {
    initThree();
  }

})();
