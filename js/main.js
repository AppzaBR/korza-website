/* =============================================
   MAIN.JS — comportamentos interativos do site
   Controla: nav com scroll, scroll reveal,
   contadores animados, tabs do showcase e
   reveal das seções story/marquee.
   ============================================= */


/* ── NAV: borda e sombra ao rolar ──────────────────────────────────────────
 * Adiciona a classe .scrolled à nav quando o usuário rola mais de 10px,
 * ativando a borda inferior e a sombra definidas no CSS.
 * Usa { passive: true } no listener para não bloquear a thread de scroll.
 * ─────────────────────────────────────────────────────────────────────────*/
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
  onScroll(); /* verifica posição inicial caso a página já esteja rolada */
})();


/* ── SCROLL REVEAL — elementos com classe .reveal ──────────────────────────
 * Observa todos os elementos que já possuem a classe .reveal no carregamento.
 * Quando o elemento entra na viewport (threshold: 15% visível), adiciona
 * .visible, disparando a transição de opacidade e transform definida no CSS.
 * Após revelar, para de observar o elemento para economizar recursos.
 * ─────────────────────────────────────────────────────────────────────────*/
(function () {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); /* evita disparos repetidos */
        }
      });
    },
    { threshold: 0.15 } /* elemento precisa ter 15% visível para animar */
  );

  elements.forEach((el) => observer.observe(el));
})();


/* ── CONTADORES ANIMADOS ────────────────────────────────────────────────────
 * Anima numericamente os elementos .hero__stat-number[data-target]
 * do valor 0 até o valor definido em data-target, com easing quad-out
 * ao longo de 1800ms. Prefixo (data-prefix) e sufixo (data-suffix)
 * são concatenados ao número exibido.
 * O contador só dispara quando o elemento entra na viewport (threshold 50%).
 * ─────────────────────────────────────────────────────────────────────────*/
(function () {
  const DURATION = 1800; /* duração total da animação em milissegundos */

  /* easing quad-out: começa rápido e desacelera no final */
  function easeOut(t) {
    return 1 - (1 - t) * (1 - t);
  }

  /* anima um único elemento do contador */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const start  = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / DURATION, 1); /* 0 → 1 */
      const value    = easeOut(progress) * target;

      /* exibe inteiro ou decimal conforme o alvo */
      const display = Number.isInteger(target)
        ? Math.round(value)
        : value.toFixed(1);

      el.textContent = prefix + display + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        /* garante valor exato no frame final (evita arredondamento de ponto flutuante) */
        el.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  /* dispara cada contador na primeira vez que ele entra na viewport */
  const stats = document.querySelectorAll('.hero__stat-number[data-target]');
  if (!stats.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target); /* cada contador anima apenas uma vez */
        }
      });
    },
    { threshold: 0.5 } /* espera metade do elemento visível para iniciar */
  );

  stats.forEach((el) => observer.observe(el));
})();


/* ── SHOWCASE TABS ──────────────────────────────────────────────────────────
 * Controla a navegação por abas da seção Showcase.
 * Ao clicar em uma tab:
 *   1. Remove .active de todas as tabs e oculta todos os painéis.
 *   2. Marca a tab clicada como .active.
 *   3. Exibe o painel correspondente via display:grid e, no próximo frame,
 *      adiciona .active para disparar a transição CSS de entrada (fade + slide).
 *      O requestAnimationFrame garante que o navegador pinte o display:grid
 *      antes de aplicar a classe, tornando a transição visível.
 * ─────────────────────────────────────────────────────────────────────────*/
(function () {
  const tabs   = document.querySelectorAll('.showcase__tab');
  const panels = document.querySelectorAll('.showcase__panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab; /* valor do atributo data-tab do botão clicado */

      /* desativa todas as tabs e oculta todos os painéis */
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
      });

      /* ativa a tab clicada */
      tab.classList.add('active');

      /* exibe o painel correspondente e anima sua entrada */
      const activePanel = document.querySelector(`.showcase__panel[data-panel="${target}"]`);
      activePanel.style.display = 'grid';

      /* aguarda um frame para o layout calcular o display:grid antes de animar */
      requestAnimationFrame(() => {
        activePanel.classList.add('active');
      });
    });
  });
})();


/* ── SCROLL REVEAL — seções story e marquee ────────────────────────────────
 * Adiciona dinamicamente a classe .reveal aos elementos das seções story
 * e marquee (que não a possuem no HTML) e os observa com um IntersectionObserver
 * com threshold menor (12%) para disparar a animação um pouco antes.
 * Observer separado do anterior pois esses elementos recebem .reveal em runtime.
 * ─────────────────────────────────────────────────────────────────────────*/
(function () {
  /* seleciona os elementos das seções que devem animar ao entrar na viewport */
  const revealEls = document.querySelectorAll(
    '.story__card, .story__pivot, .story__intro, .marquee-section'
  );

  /* adiciona .reveal para aplicar o estado inicial invisível do CSS */
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); /* dispara a transição de entrada */
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 }); /* 12% visível já é suficiente para iniciar */

  revealEls.forEach(el => revealObserver.observe(el));
})();
