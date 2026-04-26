/* =============================================
   NUVEM DE PARTÍCULAS — canvas#particles
   ============================================= */

(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const TOTAL       = 120;
  const LINK_DIST   = 80;
  const REPEL_DIST  = 100;
  const REPEL_FORCE = 0.04;

  let W, H;
  let particles = [];
  let mouse = { x: -999, y: -999 };

  /* ---------- redimensiona canvas ---------- */
  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = canvas.width  = rect.width;
    H = canvas.height = rect.height;
  }

  /* ---------- cria partículas ---------- */
  function createParticles() {
    particles = [];
    for (let i = 0; i < TOTAL; i++) {
      /* concentração maior na metade inferior e no centro horizontal */
      const cx   = W * 0.5;
      const cy   = H * 0.65;
      const spread = Math.min(W, H) * 0.45;

      /* distribuição gaussiana simples via soma de randoms */
      const gx = (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
      const gy = (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

      particles.push({
        x:       cx + gx * spread,
        y:       cy + gy * spread * 0.7,
        /* velocidade base suave */
        vx:      (Math.random() - 0.5) * 0.35,
        vy:      (Math.random() - 0.5) * 0.35,
        /* fase de oscilação individual */
        phaseX:  Math.random() * Math.PI * 2,
        phaseY:  Math.random() * Math.PI * 2,
        /* amplitude de oscilação */
        ampX:    0.3 + Math.random() * 0.5,
        ampY:    0.3 + Math.random() * 0.5,
        /* velocidade angular de oscilação */
        freqX:   0.004 + Math.random() * 0.006,
        freqY:   0.004 + Math.random() * 0.006,
        r:       1.5 + Math.random() * 1.5,
        alpha:   0.15 + Math.random() * 0.55,
      });
    }
  }

  /* ---------- frame ---------- */
  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    /* atualiza posições */
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      /* oscilação orgânica */
      p.x += p.vx + Math.sin(t * p.freqX + p.phaseX) * p.ampX;
      p.y += p.vy + Math.cos(t * p.freqY + p.phaseY) * p.ampY;

      /* repulsão suave do mouse */
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPEL_DIST && dist > 0) {
        const force = (REPEL_DIST - dist) / REPEL_DIST;
        p.x += (dx / dist) * force * REPEL_FORCE * 10;
        p.y += (dy / dist) * force * REPEL_FORCE * 10;
      }

      /* rebote nas bordas */
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      /* clamp suave para não sair demais */
      p.x = Math.max(0, Math.min(W, p.x));
      p.y = Math.max(0, Math.min(H, p.y));
    }

    /* conexões entre partículas próximas */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a  = particles[i];
        const b  = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d  = Math.sqrt(dx * dx + dy * dy);

        if (d < LINK_DIST) {
          const alpha = 0.08 * (1 - d / LINK_DIST);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(21,93,252,${alpha.toFixed(3)})`;
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }
      }
    }

    /* desenha partículas */
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(21,93,252,${p.alpha.toFixed(3)})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  /* ---------- eventos ---------- */
  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = -999;
    mouse.y = -999;
  });

  /* ---------- inicia ---------- */
  resize();
  createParticles();
  requestAnimationFrame(draw);
})();
