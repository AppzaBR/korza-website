/*
 * particles.js — Animação de partículas no canvas do Hero
 *
 * Renderiza uma galáxia espiral com TOTAL partículas distribuídas em NUM_ARMS braços.
 * Cada partícula orbita o centro com velocidade angular própria e oscila com ruído
 * senoidal independente (phaseX/Y, freqX/Y) para criar movimento orgânico.
 * Partículas próximas são conectadas por linhas semitransparentes; o cursor
 * repele as partículas que entram no raio REPEL_DIST.
 */
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  /* posição do mouse inicializada fora do canvas para evitar repulsão fantasma */
  let mouse = { x: -9999, y: -9999 };

  /* ── Parâmetros principais ──────────────────────────────────────────────
   * TOTAL      — número total de partículas (mais partículas = visual mais denso)
   * NUM_ARMS   — quantidade de braços da espiral
   * LINK_DIST  — distância máxima (px) entre dois pontos para desenhar conexão
   * REPEL_DIST — raio de repulsão do cursor (px); partículas dentro desse raio fogem
   * ─────────────────────────────────────────────────────────────────────── */
  const TOTAL      = 280;
  const NUM_ARMS   = 7;
  const LINK_DIST  = 70;
  const REPEL_DIST = 100;

  /* ── resize ─────────────────────────────────────────────────────────────
   * Sincroniza as dimensões do canvas com o tamanho real do elemento no DOM
   * (necessário para evitar imagem borrada em telas de alta densidade) e
   * reconstrói as partículas para a nova área disponível.
   * ─────────────────────────────────────────────────────────────────────── */
  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = canvas.width  = rect.width;
    H = canvas.height = rect.height;
    createParticles();
  }

  /* ── createParticles ────────────────────────────────────────────────────
   * Distribui as partículas em braços espirais usando coordenadas polares.
   * Cada partícula recebe ângulo inicial, raio orbital, velocidade angular e
   * parâmetros individuais de ruído senoidal para variação orgânica.
   * ─────────────────────────────────────────────────────────────────────── */
  function createParticles() {
    particles = [];
    const perArm    = Math.floor(TOTAL / NUM_ARMS);
    const maxRadius = Math.min(W, H) * 0.44;
    const minRadius = 40;
    const baseSpeed = 0.0006; /* velocidade angular base (rad/frame) */

    for (let arm = 0; arm < NUM_ARMS; arm++) {
      /* deslocamento angular de cada braço, distribuído igualmente em 360° */
      const armAngleOffset = (arm * 2 * Math.PI) / NUM_ARMS;

      for (let i = 0; i < perArm; i++) {
        /* t = progresso normalizado ao longo do braço (0 = centro, 1 = ponta) */
        const t = i / perArm;

        /* raio cresce linearmente do centro à borda ao longo do braço */
        const radius = minRadius + t * (maxRadius - minRadius);

        /* ângulo polar com 1.2 voltas completas por braço, criando a espiral */
        const baseAngle = armAngleOffset + t * 2 * Math.PI * 1.2;

        /* braços externos giram mais devagar, simulando rotação diferencial de galáxia */
        const speedFactor  = Math.pow(0.85, arm);
        const angularSpeed = baseSpeed * speedFactor;

        /* alpha maior perto do centro: núcleo mais brilhante, bordas mais suaves */
        const alpha = 0.75 - t * 0.55 + Math.random() * 0.1;

        particles.push({
          currentAngle: baseAngle,
          radius:       radius,
          angularSpeed: angularSpeed,
          /* fases e frequências únicas por partícula criam oscilação não sincronizada */
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          freqX:  0.003 + Math.random() * 0.004,
          freqY:  0.003 + Math.random() * 0.004,
          amp:    8, /* amplitude máxima do ruído em pixels */
          r:      1 + (1 - t) * 1.5, /* partículas do centro são maiores */
          alpha:  Math.max(0.15, Math.min(0.75, alpha)),
          x:      0,
          y:      0,
        });
      }
    }

    /* partículas extras para atingir exatamente TOTAL quando NUM_ARMS não divide */
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

  /* contador de frames: avança o argumento do seno/cosseno a cada frame */
  let frame = 0;

  /* ── draw ───────────────────────────────────────────────────────────────
   * Loop de animação principal, chamado via requestAnimationFrame.
   * Executa três passes por frame: posições → conexões → pontos.
   * ─────────────────────────────────────────────────────────────────────── */
  function draw() {
    frame++;
    ctx.clearRect(0, 0, W, H);

    /* centro geométrico do canvas, usado como origem das órbitas */
    const cx = W * 0.5;
    const cy = H * 0.5;

    /* ── Passo 1: atualização de posição ─────────────────────────────────
     * Avança o ângulo orbital e aplica ruído senoidal independente em X e Y,
     * criando um leve tremor orgânico. Depois verifica repulsão do cursor.
     * ───────────────────────────────────────────────────────────────────── */
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      /* avança a órbita pelo ângulo angular deste frame */
      p.currentAngle += p.angularSpeed;

      /* ruído senoidal: sin e cos com frequência e fase individuais */
      const noiseX = Math.sin(frame * p.freqX + p.phaseX) * p.amp;
      const noiseY = Math.cos(frame * p.freqY + p.phaseY) * p.amp;

      /* converte polar → cartesiano adicionando o ruído ao raio */
      p.x = cx + (p.radius + noiseX) * Math.cos(p.currentAngle);
      p.y = cy + (p.radius + noiseY) * Math.sin(p.currentAngle);

      /* ── Repulsão do mouse ─────────────────────────────────────────────
       * Calcula vetor (dx, dy) da partícula em relação ao cursor.
       * Se dentro de REPEL_DIST, aplica deslocamento radial para fora
       * proporcional à proximidade: força máxima 18px no centro do raio.
       * ──────────────────────────────────────────────────────────────────*/
      const dx   = p.x - mouse.x;
      const dy   = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPEL_DIST && dist > 0) {
        const f = (REPEL_DIST - dist) / REPEL_DIST; /* fator 0–1, máximo no centro */
        p.x += (dx / dist) * f * 18;
        p.y += (dy / dist) * f * 18;
      }
    }

    /* ── Passo 2: conexões entre partículas próximas ─────────────────────
     * Para cada par (i, j) único calcula a distância euclidiana.
     * Se menor que LINK_DIST, desenha uma linha cuja opacidade decresce
     * linearmente de 0.12 (adjacentes) a 0 (no limite da distância).
     * ───────────────────────────────────────────────────────────────────── */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
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

    /* ── Passo 3: renderização dos pontos ────────────────────────────────
     * Desenha cada partícula como círculo preenchido com seu alpha individual.
     * ───────────────────────────────────────────────────────────────────── */
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(21,93,252,${p.alpha.toFixed(3)})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  /* reconstrói canvas e partículas ao redimensionar a janela */
  window.addEventListener('resize', resize);

  /* rastreia posição do cursor relativa ao canvas */
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  /* quando o cursor sai, move mouse para fora do raio de repulsão */
  canvas.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  /* inicialização: ajusta dimensões e dispara o loop de animação */
  resize();
  requestAnimationFrame(draw);
})();
