import { skills, scene } from '../data/content.js';

// Canvas 2D keeps the site buildless. All particle objects and grid buckets are reused.
export class Background {
  constructor(canvas, reduced) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    if (!this.ctx) return;
    this.reduced = reduced;
    this.pointer = { x: -1000, y: -1000 };
    this.active = null;
    this.frame = 0;
    this.time = 0;
    this.started = performance.now();
    this.last = 0;
    this.paused = false;
    this.slowFrames = 0;
    this.glow = this.sprite('255,95,8');
    this.smoke = this.sprite('96,79,87');
    this.resize = this.resize.bind(this);
    this.tick = this.tick.bind(this);
    window.addEventListener('resize', this.resize);
    window.addEventListener('pointermove', e => {
      this.pointer.x = e.clientX; this.pointer.y = e.clientY;
      const index = e.target.closest('.scene-window') ? this.pillars.findIndex(p => Math.abs(e.clientX - p.x) < p.width && e.clientY > p.base - p.height - 70 && e.clientY < p.base) : -1;
      const id = skills[index]?.id || null;
      if (id !== this.hovered) { this.hovered = id; document.dispatchEvent(new CustomEvent('pillar-hover', { detail: id })); }
    }, { passive: true });
    document.addEventListener('pointerleave', () => { this.pointer.x = -1000; });
    document.addEventListener('visibilitychange', () => this.schedule());
    reduced.addEventListener('change', () => this.schedule());
    window.addEventListener('scroll', () => { if (this.reduced.matches || this.paused) this.draw(); }, { passive: true });
    this.resize();
  }
  sprite(rgb) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, `rgba(${rgb},.65)`);
    gradient.addColorStop(.4, `rgba(${rgb},.23)`);
    gradient.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, 128, 128);
    return canvas;
  }
  resize() {
    this.w = innerWidth; this.h = innerHeight;
    const dpr = Math.min(devicePixelRatio || 1, scene.maxPixelRatio);
    this.canvas.width = this.w * dpr; this.canvas.height = this.h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.mobile = this.w < 760;
    const limited = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
    const count = this.mobile ? scene.mobileDots : limited ? scene.lowPowerDots : scene.desktopDots;
    this.dots = Array.from({ length: count }, () => ({ x: Math.random() * this.w, y: Math.random() * this.h, vx: (Math.random() - .5) * .12, vy: (Math.random() - .5) * .12, size: Math.random() * 1.05 + .25 }));
    this.cols = Math.ceil(this.w / scene.connectionDistance) + 1;
    this.rows = Math.ceil(this.h / scene.connectionDistance) + 1;
    this.grid = Array.from({ length: this.cols * this.rows }, () => []);
    this.flames = Array.from({ length: skills.length * scene.flamesPerPillar }, (_, i) => ({ pillar: i % skills.length, life: Math.random(), offset: Math.random() - .5, speed: .003 + Math.random() * .004, size: 3 + Math.random() * 9 }));
    this.pillars = skills.map((skill, i) => ({
      x: (this.mobile ? .05 : .48) * this.w + (i / (skills.length - 1)) * this.w * (this.mobile ? .9 : .48),
      base: this.h * (.72 + .11 * Math.sin(i * 2.1)),
      height: Math.min(this.h * .32, 260) * skill.proficiency,
      width: Math.max(12, Math.min(35, this.w * .024)),
    }));
    this.schedule();
  }
  select(id) { this.active = id; if (this.paused || this.reduced.matches) this.draw(); }
  setPaused(value) { this.paused = value; this.schedule(); }
  schedule() {
    cancelAnimationFrame(this.frame);
    this.last = 0;
    if (document.hidden) return;
    this.draw();
    if (!this.reduced.matches && !this.paused) this.frame = requestAnimationFrame(this.tick);
  }
  tick(now) {
    const elapsed = this.last ? now - this.last : 16.7;
    const dt = Math.min(elapsed / 16.7, 2);
    this.last = now; this.time += dt;
    // Adapt once sustained slow frames indicate a device cannot keep up.
    if (elapsed > 25) this.slowFrames++; else this.slowFrames = Math.max(0, this.slowFrames - 1);
    if (this.slowFrames > 90 && this.dots.length > 450) { this.dots.length = Math.floor(this.dots.length * .7); this.slowFrames = 0; }
    this.draw(dt);
    this.frame = requestAnimationFrame(this.tick);
  }
  draw(dt = 0) {
    const { ctx: c, w, h } = this;
    const calm = this.reduced.matches || this.paused;
    const px = !calm && this.pointer.x >= 0 ? (this.pointer.x / w - .5) * 12 : 0;
    const py = !calm && this.pointer.x >= 0 ? (this.pointer.y / h - .5) * 6 : 0;
    const scroll = Math.min(scrollY / h, 1);
    c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
    c.fillStyle = '#05060a'; c.fillRect(0, 0, w, h);
    // Atmospheric backlight, lit from the same positions as the fire sources.
    c.globalAlpha = .22;
    this.pillars.forEach(p => c.drawImage(this.glow, p.x - 130 + px, p.base - p.height - 140 + py, 260, 320));
    c.globalAlpha = 1;
    // Distant city silhouette gives the foreground monuments scale.
    for (let i = 0; i < 40; i++) {
      const x = i * w / 39, height = 25 + (Math.sin(i * 7.3) + 1) * 38;
      c.fillStyle = '#0b1019'; c.fillRect(x, h * .9 - height, w / 42, height + h * .1);
      c.fillStyle = '#22404a'; c.globalAlpha = .3;
      for (let j = 0; j < 4; j++) c.fillRect(x + 5, h * .9 - height + 10 + j * 14, 2, 3);
      c.globalAlpha = 1;
    }
    const active = skills.find(s => s.id === this.active);
    this.pillars.forEach((p, i) => {
      const x = p.x + px, y = p.base - p.height + py, bw = p.width;
      const selected = this.active === skills[i].id;
      const lit = calm || performance.now() - this.started > 850 + i * 85;
      // Tiered masonry, arches, cornices, and finials reference the monument.
      c.fillStyle = '#0a0d14'; c.fillRect(x - bw / 2, y, bw, p.height);
      c.strokeStyle = selected ? '#00f0ff' : '#643222'; c.lineWidth = selected ? 1.5 : .6;
      c.strokeRect(x - bw / 2, y, bw, p.height);
      for (let tier = 0; tier < 4; tier++) {
        const ty = y + tier * p.height / 4;
        c.fillStyle = lit ? '#572a1c' : '#1b1b24'; c.fillRect(x - bw / 2 - 4, ty, bw + 8, 3);
        for (let col = 0; col < 3; col++) {
          const cx = x - bw * .32 + col * bw * .32;
          c.fillStyle = lit ? '#b25022' : '#253039'; c.globalAlpha = .5;
          c.fillRect(cx, ty + 8, 1.3, p.height / 4 - 16);
          c.globalAlpha = 1;
        }
      }
      c.beginPath(); c.moveTo(x - bw * .8, y); c.lineTo(x, y - 20); c.lineTo(x + bw * .8, y); c.closePath(); c.fillStyle = '#291a19'; c.fill(); c.stroke();
      c.fillStyle = '#79412b'; c.fillRect(x - .7, y - 37, 1.4, 20);
      if (lit) {
        c.globalCompositeOperation = 'lighter';
        c.globalAlpha = (selected ? .8 : .34) * scene.fireIntensity;
        c.drawImage(this.glow, x - bw * 3, y - bw * 3, bw * 6, bw * 6);
        c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1;
      }
    });
    // Pooled flame tongues and embers; sprite gradients are cached offscreen.
    c.globalCompositeOperation = 'lighter';
    this.flames.forEach(f => {
      if (!calm && performance.now() - this.started < 850 + f.pillar * 85) return;
      f.life = (f.life + f.speed * dt) % 1;
      const p = this.pillars[f.pillar], selected = this.active === skills[f.pillar].id;
      const life = f.life, intensity = scene.fireIntensity * (selected ? 1.7 : 1) * (1 + scroll * .2);
      const x = p.x + px + f.offset * p.width * 1.4 + Math.sin(this.time * .025 + f.pillar + life * 5) * life * 15;
      const y = p.base - p.height + py - life * 105 * intensity;
      const size = f.size * (1 - life) * intensity;
      c.globalAlpha = (1 - life) * .65;
      c.drawImage(this.glow, x - size * 2, y - size * 3, size * 4, size * 6);
      c.fillStyle = life < .35 ? '#ffe5a0' : '#ff7908';
      c.beginPath(); c.ellipse(x, y, Math.max(.3, size * .22), Math.max(.5, size * .8), f.offset * .3, 0, Math.PI * 2); c.fill();
      if (life > .55) c.fillRect(x + f.offset * 45, y - life * 85, 1.2, 2);
    });
    c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1;
    // Spatial partitioning: only adjacent cells are queried, with bounded links per dot.
    this.grid.forEach(bucket => { bucket.length = 0; });
    const distance = scene.connectionDistance;
    this.dots.forEach((p, index) => {
      if (dt) {
        const dx = this.pointer.x - p.x, dy = this.pointer.y - p.y, d = Math.hypot(dx, dy);
        if (d < 110 && d > 1) { p.x += dx / d * .22 * dt; p.y += dy / d * .22 * dt; }
        p.x = (p.x + p.vx * dt + w) % w; p.y = (p.y + p.vy * dt + h) % h;
      }
      this.grid[Math.floor(p.y / distance) * this.cols + Math.floor(p.x / distance)].push(index);
    });
    const networkFade = calm ? 1 : Math.min(1, Math.max(0, (performance.now() - this.started - 1400) / 1400));
    c.lineWidth = .5;
    this.dots.forEach((p, index) => {
      const col = Math.floor(p.x / distance), row = Math.floor(p.y / distance);
      let links = 0;
      // Most dots are atmospheric; one in four forms the sparse mesh.
      if (index % 4 === 0) for (let yy = Math.max(0, row - 1); yy <= Math.min(this.rows - 1, row + 1) && links < 3; yy++) {
        for (let xx = Math.max(0, col - 1); xx <= Math.min(this.cols - 1, col + 1) && links < 3; xx++) {
          for (const other of this.grid[yy * this.cols + xx]) {
            if (other <= index || other % 4 !== 0) continue;
            const q = this.dots[other], d = Math.hypot(p.x - q.x, p.y - q.y);
            if (d < distance) {
              c.globalAlpha = (1 - d / distance) * .19 * networkFade;
              c.strokeStyle = index % 8 ? '#ff2bd6' : '#00f0ff';
              c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(q.x, q.y); c.stroke();
              if (++links >= 3) break;
            }
          }
        }
      }
      const heat = p.x > w * .5 && p.y > h * .3 && p.y < h * .7;
      c.globalAlpha = (.16 + p.size * .25) * networkFade;
      c.fillStyle = heat ? '#ffb000' : index % 5 ? '#69dce3' : '#ff2bd6';
      c.fillRect(p.x, p.y, p.size, p.size);
      if (!calm && index % 8 === 0 && Math.hypot(p.x - this.pointer.x, p.y - this.pointer.y) < 85) {
        c.globalAlpha = .15; c.strokeStyle = '#00f0ff'; c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(this.pointer.x, this.pointer.y); c.stroke();
      }
    });
    // Fog passes in front of the mesh, partially obscuring dots and firelight.
    for (let i = 0; i < 9; i++) {
      const x = ((i * w / 6 + Math.sin(this.time * .0015 + i) * 100) % (w + 300)) - 150;
      const y = h * (.22 + .065 * i) + Math.sin(this.time * .002 + i * 2) * 30;
      c.globalAlpha = .22 + scroll * .12; c.drawImage(this.smoke, x + px * 2, y + py, w * .48, h * .4);
      c.globalAlpha = .06; c.drawImage(this.glow, x + px, y, w * .45, h * .35);
    }
    c.globalAlpha = 1;
    if (active) {
      const i = skills.indexOf(active), p = this.pillars[i];
      c.strokeStyle = '#00f0ff'; c.lineWidth = 1;
      active.related.forEach(id => {
        const q = this.pillars[skills.findIndex(s => s.id === id)];
        c.globalAlpha = .55; c.beginPath(); c.moveTo(p.x + px, p.base - p.height + py);
        c.quadraticCurveTo((p.x + q.x) / 2, Math.min(p.base, q.base) - p.height - 100, q.x + px, q.base - q.height + py); c.stroke();
      });
      c.globalAlpha = 1; c.fillStyle = '#00f0ff'; c.font = '12px Consolas, monospace';
      c.fillText(`[ ${active.name} ]`, Math.min(w - 160, Math.max(12, p.x - 30)), p.base - p.height - 60);
    }
    // Directional scrim protects hero copy without flattening the cinematic scene.
    const shade = c.createLinearGradient(0, 0, w, 0);
    shade.addColorStop(0, 'rgba(5,6,10,.96)'); shade.addColorStop(this.mobile ? .3 : .35, 'rgba(5,6,10,.8)'); shade.addColorStop(.75, this.mobile ? 'rgba(5,6,10,.52)' : 'rgba(5,6,10,.02)');
    c.globalAlpha = 1; c.fillStyle = shade; c.fillRect(0, 0, w, h);
  }
}
