/**
 * CentralPoint - iOS-Level Fluid GSAP Animations (Snappy & High-Speed Edition)
 * Tuned for 120Hz ProMotion feel: ultra-responsive spring physics, crisp reveals, and zero render blocking
 */

(function () {
  'use strict';

  if (typeof gsap === 'undefined') {
    console.warn('GSAP is not loaded. Skipping animations.');
    return;
  }

  // ==========================================================================
  // 1. Fast, Crisp Page Entrance Orchestration
  // ==========================================================================
  function initPageEntrance() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Top Header: Slides down fast and cleanly
    tl.from('.top-nav', {
      y: -30,
      opacity: 0,
      duration: 0.35,
      ease: 'power3.out'
    });

    // 2. Hero Banner: Subtle scale up
    tl.from('.hero-banner', {
      scale: 0.98,
      opacity: 0,
      duration: 0.35,
      ease: 'power3.out'
    }, '-=0.2');

    // 3. Hero Scripted Text: Snappy float
    tl.from('.hero-script-zone', {
      scale: 0.88,
      y: 10,
      rotation: -8,
      opacity: 0,
      duration: 0.38,
      ease: 'back.out(1.5)'
    }, '-=0.2');

    // 4. Workspace Pills: Snappy spring
    tl.from('.workspace-tab-btn, .workspace-actions-group > *', {
      y: 10,
      opacity: 0,
      scale: 0.95,
      stagger: 0.018,
      duration: 0.28,
      ease: 'power2.out'
    }, '-=0.25');

    // 5. Favorite Apps Parent & Cards
    tl.from('.favorites-section', {
      y: 12,
      opacity: 0,
      duration: 0.3,
      ease: 'power3.out'
    }, '-=0.2');

    tl.from('.fav-card, .fav-add-card', {
      y: 12,
      opacity: 0,
      scale: 0.96,
      stagger: 0.02,
      duration: 0.28,
      ease: 'power2.out',
      clearProps: 'opacity,transform'
    }, '-=0.22');

    // 6. Application Catalog Section & Category Pills
    // NOTE: Animate the parent container cleanly so cards are ALWAYS 100% visible on load
    tl.from('.catalog-section', {
      y: 12,
      opacity: 0,
      duration: 0.32,
      ease: 'power3.out'
    }, '-=0.2');

    if (document.querySelector('.category-pill-btn')) {
      tl.from('.category-pill-btn', {
        y: 8,
        opacity: 0,
        scale: 0.95,
        stagger: 0.015,
        duration: 0.24,
        ease: 'power2.out'
      }, '-=0.22');
    }

    // 7. Right Sidebar Widgets: Snappy slide-in
    tl.from('.dashboard-side-col > *', {
      x: 20,
      opacity: 0,
      scale: 0.98,
      stagger: 0.035,
      duration: 0.35,
      ease: 'power3.out'
    }, '-=0.35');
  }

  // ==========================================================================
  // 2. Snappy 3D Perspective Card Tilt & Specular Parallax
  // ==========================================================================
  function init3DCardTilt() {
    const cardSelectors = [
      '.fav-card',
      '.app-catalog-card',
      '.quicklink-tile-btn',
      '.widget-company-card',
      '.widget-announcements-card',
      '.widget-quicklinks-card'
    ];

    document.addEventListener('mousemove', function (e) {
      const card = e.target.closest(cardSelectors.join(', '));
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5.5;
      const rotateY = ((x - centerX) / centerX) * 5.5;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 800,
        scale: 1.018,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });

    cardSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(card => {
        card.addEventListener('mouseleave', function () {
          gsap.to(this, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.35,
            ease: 'elastic.out(1, 0.65)',
            overwrite: 'auto',
            clearProps: 'transform'
          });
        });
      });
    });
  }

  // ==========================================================================
  // 3. iOS Haptic Button Press Physics (Snappy & Responsive)
  // ==========================================================================
  function initHapticPressPhysics() {
    const pressableSelectors = [
      'button',
      '.fav-card',
      '.app-catalog-card',
      '.quicklink-tile-btn',
      '.workspace-tab-btn',
      '.category-pill-btn',
      '.nav-icon-btn',
      '.user-profile-btn'
    ];

    document.addEventListener('mousedown', function (e) {
      const target = e.target.closest(pressableSelectors.join(', '));
      if (!target) return;

      gsap.to(target, {
        scale: 0.96,
        duration: 0.08,
        ease: 'power2.out'
      });
    });

    const releaseHandler = function (e) {
      const target = e.target.closest(pressableSelectors.join(', '));
      if (!target) return;

      gsap.to(target, {
        scale: 1,
        duration: 0.28,
        ease: 'elastic.out(1.2, 0.55)',
        clearProps: 'transform'
      });
    };

    document.addEventListener('mouseup', releaseHandler);
    document.addEventListener('mouseleave', releaseHandler);
  }

  // ==========================================================================
  // 4. Fluid Catalog Card Stagger Transition (Snappy & Always Cleared)
  // ==========================================================================
  window.animateCatalogCards = function () {
    const cards = document.querySelectorAll('.app-catalog-card');
    if (!cards || cards.length === 0) return;

    // Snappy stagger animation with clearProps to guarantee cards are never stuck invisible
    gsap.fromTo(cards,
      {
        opacity: 0,
        y: 10,
        scale: 0.96
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.018,
        duration: 0.24,
        ease: 'power2.out',
        overwrite: 'auto',
        clearProps: 'opacity,transform'
      }
    );
  };

  // ==========================================================================
  // 5. Fluid Theme Switcher Sliding Thumb & 360° Icon Spin (Snappy Spring Physics)
  // ==========================================================================
  window.animateThemeToggle = function (nextTheme) {
    const thumb = document.getElementById('theme-switch-thumb');
    const iconSlot = document.getElementById('theme-icon-slot');
    const targetX = nextTheme === 'dark' ? 30 : 0;

    if (thumb && typeof gsap !== 'undefined') {
      gsap.killTweensOf(thumb);
      gsap.timeline()
        .to(thumb, {
          x: targetX,
          duration: 0.34,
          ease: 'power2.inOut'
        }, 0)
        .fromTo(thumb,
          { scaleX: 1.22, scaleY: 0.88 },
          { scaleX: 1, scaleY: 1, duration: 0.42, ease: 'elastic.out(1.15, 0.45)' },
          0.06
        );
    }

    if (iconSlot && typeof gsap !== 'undefined') {
      gsap.killTweensOf(iconSlot);
      gsap.fromTo(iconSlot,
        {
          rotate: nextTheme === 'dark' ? -180 : 180,
          scale: 0.35,
          opacity: 0.2
        },
        {
          rotate: 0,
          scale: 1,
          opacity: 1,
          duration: 0.36,
          ease: 'back.out(1.7)',
          clearProps: 'transform,opacity'
        }
      );
    }
  };

  // ==========================================================================
  // 6. Modal Sheets & Dialogs iOS Pop-in Physics (Snappy)
  // ==========================================================================
  function enhanceModalAnimations() {
    const origOpenDetails = window.openAppDetails;
    if (origOpenDetails) {
      window.openAppDetails = function (appId) {
        origOpenDetails(appId);
        const modal = document.getElementById('app-launch-modal');
        const win = modal?.querySelector('.modal-window');
        if (modal && win) {
          gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.18 });
          gsap.fromTo(win,
            { scale: 0.92, y: 22, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.25, ease: 'back.out(1.25)' }
          );
        }
      };
    }
  }

  // ==========================================================================
  // Initialize
  // ==========================================================================
  function init() {
    initPageEntrance();
    init3DCardTilt();
    initHapticPressPhysics();
    enhanceModalAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
