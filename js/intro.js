/* ============================================
   ЖК Ленская — Intro Animation Controller
   Per TZ §5: Digital Opening Card
   ============================================ */

(function() {
  'use strict';

  // Only show intro on first visit in session
  const INTRO_KEY = 'lenskaya_intro_shown';
  if (sessionStorage.getItem(INTRO_KEY)) return;

  const INTRO_DURATION = 5000; // 5 seconds total
  const PHASE1_DURATION = 1200;
  const PHASE2_DURATION = 1400;
  const PHASE3_DURATION = 1200;

  function createIntro() {
    const overlay = document.createElement('div');
    overlay.className = 'intro-overlay';
    overlay.id = 'intro';
    overlay.innerHTML = `
      <div class="intro-bg">
        <div class="intro-bg-inner"></div>
        <div class="intro-texture"></div>
        <div class="intro-shimmer"></div>
      </div>
      <div class="intro-content">
        <div class="intro-phase1" id="intro-phase1">
          <div class="intro-logo-placeholder">
            <svg viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="4" fill="currentColor" opacity="0.15"/>
              <path d="M8 28V12L18 6L28 12V28" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 28V20H22V28" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 28H28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="intro-location">Пермь · правый берег Камы</div>
        </div>
        <div class="intro-phase2" id="intro-phase2">
          <div class="intro-project-name">Ленская</div>
          <div class="intro-project-subtitle">Архитектурный квартал у воды</div>
        </div>
      </div>
      <div class="intro-reveal" id="intro-reveal">
        <div class="intro-reveal-left"></div>
        <div class="intro-reveal-right"></div>
      </div>
      <button class="intro-skip" id="intro-skip">Пропустить</button>
      <div class="intro-progress">
        <div class="intro-progress-bar" id="intro-progress"></div>
      </div>
    `;
    document.body.prepend(overlay);

    // Start progress bar
    const progressBar = document.getElementById('intro-progress');
    progressBar.style.transitionDuration = INTRO_DURATION + 'ms';
    requestAnimationFrame(() => {
      progressBar.style.width = '100%';
    });

    // Phase 1 → Phase 2
    setTimeout(() => {
      const phase1 = document.getElementById('intro-phase1');
      const phase2 = document.getElementById('intro-phase2');
      phase1.classList.add('fade-out');
      setTimeout(() => {
        phase2.classList.add('active');
      }, 600);
    }, PHASE1_DURATION);

    // Phase 3: Reveal
    setTimeout(() => {
      const phase2 = document.getElementById('intro-phase2');
      const reveal = document.getElementById('intro-reveal');
      phase2.classList.add('fade-out');
      setTimeout(() => {
        reveal.classList.add('open');
      }, 400);
    }, PHASE1_DURATION + PHASE2_DURATION);

    // Hide intro
    setTimeout(() => {
      hideIntro(overlay);
    }, INTRO_DURATION);

    // Skip button
    document.getElementById('intro-skip').addEventListener('click', () => {
      hideIntro(overlay);
    });

    // ESC to skip
    document.addEventListener('keydown', function onEsc(e) {
      if (e.key === 'Escape') {
        hideIntro(overlay);
        document.removeEventListener('keydown', onEsc);
      }
    });
  }

  function hideIntro(overlay) {
    if (!overlay) overlay = document.getElementById('intro');
    if (!overlay || overlay.classList.contains('hidden')) return;
    
    overlay.classList.add('hidden');
    sessionStorage.setItem(INTRO_KEY, '1');
    
    setTimeout(() => {
      overlay.remove();
    }, 800);
  }

  // Check reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sessionStorage.setItem(INTRO_KEY, '1');
    return;
  }

  // Create and start intro
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createIntro);
  } else {
    createIntro();
  }
})();
