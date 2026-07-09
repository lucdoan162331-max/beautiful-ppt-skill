import { TILE_META, TILE } from './config.js';

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.cellSize = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.animations = [];
    this.selected = null;
    this.highlightCells = new Set();
    this.particles = [];
  }

  resize(containerWidth, containerHeight, gridSize) {
    const padding = 8;
    const availW = Math.max(containerWidth - padding * 2, 280);
    const availH = Math.max(containerHeight - padding * 2, 280);
    const cellSize = Math.floor(Math.min(availW, availH) / gridSize);
    const boardSize = cellSize * gridSize;

    this.canvas.width = boardSize * (window.devicePixelRatio || 1);
    this.canvas.height = boardSize * (window.devicePixelRatio || 1);
    this.canvas.style.width = boardSize + 'px';
    this.canvas.style.height = boardSize + 'px';
    const dpr = window.devicePixelRatio || 1;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.cellSize = cellSize;
    this.gridSize = gridSize;
    this.boardSize = boardSize;
  }

  cellCenter(r, c) {
    return {
      x: c * this.cellSize + this.cellSize / 2,
      y: r * this.cellSize + this.cellSize / 2,
    };
  }

  draw(board, now = Date.now()) {
    const { ctx, cellSize, gridSize, boardSize } = this;
    ctx.clearRect(0, 0, boardSize, boardSize);

    // 背景
    ctx.fillStyle = '#0f0f1a';
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(0, 0, boardSize, boardSize, 12);
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, boardSize, boardSize);
    }

    // 格子
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const x = c * cellSize;
        const y = r * cellSize;
        const isHL = this.highlightCells.has(`${r},${c}`);
        const isSel = this.selected && this.selected.r === r && this.selected.c === c;

        ctx.fillStyle = isHL
          ? 'rgba(233, 69, 96, 0.3)'
          : (r + c) % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)';
        ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

        if (isSel) {
          ctx.strokeStyle = '#e94560';
          ctx.lineWidth = 3;
          ctx.strokeRect(x + 2, y + 2, cellSize - 4, cellSize - 4);
        }
      }
    }

    // 方块
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const tile = board.get(r, c);
        if (tile < 0) continue;

        const anim = this.getAnimOffset(r, c);
        const x = c * cellSize + cellSize / 2 + anim.dx;
        const y = r * cellSize + cellSize / 2 + anim.dy;
        const scale = anim.scale;
        const stunned = board.isStunned(r, c, now);

        this.drawTile(ctx, tile, x, y, cellSize * 0.85 * scale, stunned);
      }
    }

    // 粒子
    this.particles = this.particles.filter(p => {
      p.life -= 0.02;
      if (p.life <= 0) return false;
      ctx.globalAlpha = p.life;
      ctx.font = `${p.size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.emoji, p.x, p.y);
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3;
      ctx.globalAlpha = 1;
      return true;
    });
  }

  getAnimOffset(r, c) {
    for (const a of this.animations) {
      if (a.r === r && a.c === c) {
        return { dx: a.dx || 0, dy: a.dy || 0, scale: a.scale || 1 };
      }
    }
    return { dx: 0, dy: 0, scale: 1 };
  }

  drawTile(ctx, tile, x, y, size, stunned) {
    const meta = TILE_META[tile];
    if (!meta) return;

    const radius = size / 2;

    // 背景圆
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = meta.color;
    ctx.fill();

    if (meta.glow) {
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 12;
    }

    // emoji
    ctx.font = `${size * 0.7}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(meta.emoji, x, y + 2);
    ctx.shadowBlur = 0;

    if (stunned) {
      ctx.font = `${size * 0.35}px serif`;
      ctx.fillText('💫', x + radius * 0.5, y - radius * 0.5);
    }
  }

  addParticle(x, y, emoji) {
    this.particles.push({
      x, y, emoji,
      vx: (Math.random() - 0.5) * 4,
      vy: -Math.random() * 4 - 2,
      life: 1,
      size: 20 + Math.random() * 10,
    });
  }

  screenToCell(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const c = Math.floor(x / this.cellSize);
    const r = Math.floor(y / this.cellSize);
    if (r >= 0 && r < this.gridSize && c >= 0 && c < this.gridSize) {
      return { r, c };
    }
    return null;
  }

  setSelected(r, c) {
    this.selected = r !== null ? { r, c } : null;
  }

  setHighlight(cells) {
    this.highlightCells = new Set(cells.map(({ r, c }) => `${r},${c}`));
  }

  clearHighlight() {
    this.highlightCells.clear();
  }
}
