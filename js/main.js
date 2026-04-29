/* =============================================
   MAIN.JS — comportamentos gerais do site
   ============================================= */

/* ---------- NAV: border ao rolar ---------- */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); /* checa posição inicial */
})();


/* ---------- SCROLL REVEAL ---------- */
(function () {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
})();


/* ---------- CONTADORES ANIMADOS ---------- */
(function () {
  const DURATION = 1800; /* ms */

  /* easing quad out */
  function easeOut(t) {
    return 1 - (1 - t) * (1 - t);
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const start  = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const value    = easeOut(progress) * target;

      /* formata com uma casa decimal se o alvo for decimal */
      const display = Number.isInteger(target)
        ? Math.round(value)
        : value.toFixed(1);

      el.textContent = prefix + display + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  /* dispara contadores quando o bloco de stats entra na viewport */
  const stats = document.querySelectorAll('.hero__stat-number[data-target]');
  if (!stats.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((el) => observer.observe(el));
})();


/* ---------- SHOWCASE TABS ---------- */
(function () {
  const tabs = document.querySelectorAll('.showcase__tab');
  const panels = document.querySelectorAll('.showcase__panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
      });

      tab.classList.add('active');
      const activePanel = document.querySelector(`.showcase__panel[data-panel="${target}"]`);
      activePanel.style.display = 'grid';
      requestAnimationFrame(() => {
        activePanel.classList.add('active');
      });
    });
  });
})();
