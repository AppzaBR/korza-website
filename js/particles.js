(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];
  let mouse = { x: -9999, y: -9999 };

  const TOTAL      = 280;
  const NUM_ARMS   = 7;
  const LINK_DIST  = 70;
  const REPEL_DIST = 100;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = canvas.width  = rect.width;
    H = canvas.height = rect.height;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const perArm   = Math.floor(TOTAL / NUM_ARMS);
    const maxRadius = Math.min(W, H) * 0.44;
    const minRadius = 40;
    const baseSpeed = 0.0006;

    for (let arm = 0; arm < NUM_ARMS; arm++) {
      const armAngleOffset = (arm * 2 * Math.PI) / NUM_ARMS;

      for (let i = 0; i < perArm; i++) {
        const t = i / perArm;

        /* raio cresce ao longo do braco */
        const radius = minRadius + t * (maxRadius - minRadius);

        /* angulo polar do ponto no braco */
        const baseAngle = armAngleOffset + t * 2 * Math.PI * 1.2;

        /* bracos externos giram mais devagar */
        const speedFactor = Math.pow(0.85, arm);
        const angularSpeed = baseSpeed * speedFactor;

        /* alpha maior perto do centro */
        const alpha = 0.75 - t * 0.55 + Math.random() * 0.1;

        particles.push({
          currentAngle: baseAngle,
          radius:       radius,
          angularSpeed: angularSpeed,
          phaseX:       Math.random() * Math.PI * 2,
          phaseY:       Math.random() * Math.PI * 2,
          freqX:        0.003 + Math.random() * 0.004,
          freqY:        0.003 + Math.random() * 0.004,
          amp:          8,
          r:            1 + (1 - t) * 1.5,
          alpha:        Math.max(0.15, Math.min(0.75, alpha)),
          x:            0,
          y:            0,
        });
      }
    }

    /* particulas extras para preencher ate TOTAL */
    while (particles.length < TOTAL) {
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      const arm    = Math.floor(Math.random() * NUM_ARMS);
      const t      = (radius - minRadius) / (maxRadius - minRadius);
      particles.push({
        currentAngle: (arm * 2 * Math.PI) / NUM_ARMS + Math.random() * Math.PI * 2,
        radius:       radius,
        angularSpeed: baseSpeed * Math.pow(0.85, arm),
        phaseX:       Math.random() * Math.PI * 2,
        phaseY:       Math.random() * Math.PI * 2,
        freqX:        0.003 + Math.random() * 0.004,
        freqY:        0.003 + Math.random() * 0.004,
        amp:          8,
        r:            1 + (1 - t) * 1.5,
        alpha:        Math.max(0.15, Math.min(0.75, 0.75 - t * 0.55)),
        x:            0,
        y:            0,
      });
    }
  }

  let frame = 0;

  function draw() {
    frame++;
    ctx.clearRect(0, 0, W, H);

    const cx = W * 0.5;
    const cy = H * 0.5;

    /* atualiza posicoes */
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.currentAngle += p.angularSpeed;

      const noiseX = Math.sin(frame * p.freqX + p.phaseX) * p.amp;
      const noiseY = Math.cos(frame * p.freqY + p.phaseY) * p.amp;

      p.x = cx + (p.radius + noiseX) * Math.cos(p.currentAngle);
      p.y = cy + (p.radius + noiseY) * Math.sin(p.currentAngle);

      /* repulsao do mouse */
      const dx   = p.x - mouse.x;
      const dy   = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPEL_DIST && dist > 0) {
        const f = (REPEL_DIST - dist) / REPEL_DIST;
        p.x += (dx / dist) * f * 18;
        p.y += (dy / dist) * f * 18;
      }
    }

    /* conexoes */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK_DIST) {
          const alpha = 0.12 * (1 - d / LINK_DIST);
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

  window.addEventListener('resize', resize);

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  resize();
  requestAnimationFrame(draw);
})();
