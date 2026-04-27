(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];
  let mouse = { x: -9999, y: -9999 };
  let t = 0;

  const TOTAL      = 310;
  const LINK_DIST  = 80;
  const REPEL_DIST = 100;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = canvas.width  = rect.width;
    H = canvas.height = rect.height;
    createParticles();
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < TOTAL; i++) {
      const cx = W * 0.5;
      const cy = H * 0.5;
      const spread = Math.min(W, H) * 0.46;

      /* distribuicao gaussiana via soma de randoms */
      const gx = (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2;
      const gy = (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2;

      /* ruido adicional para quebrar simetria */
      const nx = (Math.random() - 0.5) * spread * 0.5;
      const ny = (Math.random() - 0.5) * spread * 0.5;

      const bx = cx + gx * spread + nx;
      const by = cy + gy * spread * 0.72 + ny;

      particles.push({
        baseX:  Math.max(0, Math.min(W, bx)),
        baseY:  Math.max(0, Math.min(H, by)),
        x:      bx,
        y:      by,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        freqX:  0.0004 + Math.random() * 0.0006,
        freqY:  0.0004 + Math.random() * 0.0006,
        ampX:   4 + Math.random() * 12,
        ampY:   4 + Math.random() * 12,
        r:      1 + Math.random() * 1.8,
        alpha:  0.2 + Math.random() * 0.6,
      });
    }
  }

  function draw() {
    t++;
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x = p.baseX + Math.sin(t * p.freqX + p.phaseX) * p.ampX;
      p.y = p.baseY + Math.cos(t * p.freqY + p.phaseY) * p.ampY;

      const dx   = p.x - mouse.x;
      const dy   = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPEL_DIST && dist > 0) {
        const f = (REPEL_DIST - dist) / REPEL_DIST;
        p.x += (dx / dist) * f * 20;
        p.y += (dy / dist) * f * 20;
      }
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK_DIST) {
          const alpha = 0.15 * (1 - d / LINK_DIST);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(21,93,252,${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(21,93,252,${p.alpha.toFixed(3)})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);

  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  canvas.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  resize();
  requestAnimationFrame(draw);
})();
