(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];
  let mouse = { x: -9999, y: -9999 };
  let t = 0;

  const TOTAL      = 320;
  const LINK_DIST  = 70;
  const REPEL_DIST = 90;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = canvas.width  = rect.width;
    H = canvas.height = rect.height;
    createParticles();
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < TOTAL; i++) {
      /* posição X uniforme ao longo de toda a largura */
      const xRatio = Math.random();
      /* posição Y: ondas senoidais sobrepostas + ruído pequeno */
      const wave1 = Math.sin(xRatio * Math.PI * 3) * 0.12;
      const wave2 = Math.sin(xRatio * Math.PI * 6 + 1.2) * 0.06;
      const noise = (Math.random() - 0.5) * 0.18;
      const yCenter = 0.52 + wave1 + wave2 + noise;

      particles.push({
        x:       xRatio * W,
        y:       yCenter * H,
        baseX:   xRatio * W,
        baseY:   yCenter * H,
        offsetX: (Math.random() - 0.5) * 1.2,
        offsetY: (Math.random() - 0.5) * 1.2,
        phaseX:  Math.random() * Math.PI * 2,
        phaseY:  Math.random() * Math.PI * 2,
        freqX:   0.0008 + Math.random() * 0.0012,
        freqY:   0.0006 + Math.random() * 0.001,
        ampX:    8  + Math.random() * 14,
        ampY:    12 + Math.random() * 20,
        r:       1.2 + Math.random() * 1.6,
        alpha:   0.15 + Math.random() * 0.5,
      });
    }
  }

  function draw() {
    t++;
    ctx.clearRect(0, 0, W, H);

    /* move cada partícula em ondas senoidais lentas */
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x = p.baseX + Math.sin(t * p.freqX + p.phaseX) * p.ampX;
      p.y = p.baseY + Math.cos(t * p.freqY + p.phaseY) * p.ampY;

      /* repulsão suave do mouse */
      const dx   = p.x - mouse.x;
      const dy   = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPEL_DIST && dist > 0) {
        const f = (REPEL_DIST - dist) / REPEL_DIST;
        p.x += (dx / dist) * f * 18;
        p.y += (dy / dist) * f * 18;
      }
    }

    /* conexões */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK_DIST) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(21,93,252,${(0.06 * (1 - d / LINK_DIST)).toFixed(3)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    /* pontos */
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
    mouse.x = -9999; mouse.y = -9999;
  });

  resize();
  requestAnimationFrame(draw);
})();
