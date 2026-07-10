/** 治愈系动态背景 — 漂浮云朵、星星、光斑 */
export class HealingBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.clouds = [];
    this.stars = [];
    this.bubbles = [];
    this.t = 0;
    this._raf = null;
    this._init();
  }

  _init() {
    for (let i = 0; i < 6; i++) {
      this.clouds.push({
        x: Math.random(), y: 0.08 + Math.random() * 0.55,
        scale: 0.5 + Math.random() * 0.9,
        speed: 0.00008 + Math.random() * 0.00012,
      });
    }
    for (let i = 0; i < 28; i++) {
      this.stars.push({
        x: Math.random(), y: Math.random(),
        size: 1 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
      });
    }
    for (let i = 0; i < 10; i++) {
      this.bubbles.push({
        x: Math.random(), y: Math.random(),
        r: 8 + Math.random() * 24,
        hue: [320, 200, 160, 45][Math.floor(Math.random() * 4)],
        phase: Math.random() * Math.PI * 2,
        vy: 0.00015 + Math.random() * 0.0002,
      });
    }
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
  }

  start() {
    const tick = () => {
      this.t += 0.016;
      this.draw();
      this._raf = requestAnimationFrame(tick);
    };
    this.resize();
    window.addEventListener('resize', () => this.resize());
    tick();
  }

  stop() {
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  draw() {
    const { ctx, w, h, t } = this;

    // 天空渐变 — 晨曦治愈色
    const sky = ctx.createLinearGradient(0, 0, w * 0.3, h);
    sky.addColorStop(0, '#FFE8F0');
    sky.addColorStop(0.35, '#E8F4FF');
    sky.addColorStop(0.65, '#E0FFF4');
    sky.addColorStop(1, '#FFF5E6');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // 柔光光斑
    this.bubbles.forEach((b) => {
      const bx = b.x * w + Math.sin(t * 0.4 + b.phase) * 20;
      const by = ((b.y + t * b.vy) % 1.2 - 0.1) * h;
      const g = ctx.createRadialGradient(bx, by, 0, bx, by, b.r);
      g.addColorStop(0, `hsla(${b.hue}, 80%, 82%, 0.35)`);
      g.addColorStop(1, `hsla(${b.hue}, 80%, 82%, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(bx, by, b.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // 星星闪烁
    this.stars.forEach((s) => {
      const alpha = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h, s.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // 云朵
    this.clouds.forEach((c) => {
      c.x = (c.x + c.speed) % 1.15 - 0.08;
      this.drawCloud(ctx, c.x * w, c.y * h, 40 * c.scale);
    });

    // 底部草地弧线
    const grass = ctx.createLinearGradient(0, h * 0.75, 0, h);
    grass.addColorStop(0, 'rgba(168, 230, 180, 0)');
    grass.addColorStop(0.4, 'rgba(168, 230, 180, 0.25)');
    grass.addColorStop(1, 'rgba(130, 210, 150, 0.45)');
    ctx.fillStyle = grass;
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, h * 0.82);
    ctx.bezierCurveTo(w * 0.25, h * 0.78, w * 0.5, h * 0.86, w * 0.75, h * 0.8);
    ctx.bezierCurveTo(w * 0.9, h * 0.77, w, h * 0.83, w, h * 0.85);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  }

  drawCloud(ctx, x, y, size) {
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    const puffs = [
      [0, 0, size], [-size * 0.55, size * 0.1, size * 0.7],
      [size * 0.5, size * 0.08, size * 0.75], [-size * 0.2, -size * 0.15, size * 0.55],
      [size * 0.25, -size * 0.12, size * 0.6],
    ];
    puffs.forEach(([ox, oy, r]) => {
      ctx.beginPath();
      ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }
}
