(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const TOTAL       = 280;
  const LINK_DIST   = 90;
  const REPEL_DIST  = 100;

  let W, H;
  let particles = [];
  let mouse = { x: -999, y: -999 };

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = canvas.width  = rect.width;
    H = canvas.height = rect.height;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < TOTAL; i++) {
      /* distribuição em onda horizontal — espalhadas em X, concentradas no centro em Y */
      particles.push({
        x:      Math.random() * W,
        y:      H * 0.3 + Math.random() * H * 0.55,
        vx:     (Math.random() - 0.5) * 0.08,
        vy:     (Math.random() - 0.5) * 0.08,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        /* ondulação lenta — amplitude maior em Y para simular mar */
        ampX:   0.2 + Math.random() * 0.3,
        ampY:   0.4 + Math.random() * 0.8,
        freqX:  0.001 + Math.random() * 0.002,
        freqY:  0.001 + Math.random() * 0.002,
        r:      1.2 + Math.random() * 1.8,
        alpha:  0.12 + Math.random() * 0.5,
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx + Math.sin(t * p.freqX + p.phaseX) * p.ampX;
      p.y += p.vy + Math.cos(t * p.freqY + p.phaseY) * p.ampY;

      /* repulsão do mouse */
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPEL_DIST && dist > 0) {
        const force = (REPEL_DIST - dist) / REPEL_DIST;
        p.x += (dx / dist) * force * 0.4;
        p.y += (dy / dist) * force * 0.4;
      }

      /* rebote nas bordas */
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      p.x = Math.max(0, Math.min(W, p.x));
      p.y = Math.max(0, Math.min(H, p.y));
    }

    /* conexões */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK_DIST) {
          const alpha = 0.07 * (1 - d / LINK_DIST);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(21,93,252,${alpha.toFixed(3)})`;
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

  window.addEventListener('resize', () => { resize(); createParticles(); });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = -999;
    mouse.y = -999;
  });

  resize();
  createParticles();
  requestAnimationFrame(draw);
})();
