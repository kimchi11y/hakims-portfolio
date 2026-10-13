"use client";

import { useEffect, useRef } from "react";

type Rgb = readonly [number, number, number];

/* ── Field geometry (matches the reference implementation) ── */
const GAP = 10;
const BASE_R = 1.2;
const PADDING = 8;
const INFLUENCE = 90;
const PUSH = 14;
const GLOW_BOOST = 0.55;
const TAU = Math.PI * 2;

/* ── Grid dot fills are batched: alpha is quantized into buckets so the whole
   grid rasterizes as ALPHA_LEVELS fills instead of one per dot. ── */
const ALPHA_LEVELS = 16;
const ALPHA_SPAN = 0.6;

/* ── Time is delta-scaled, so behaviour is identical at 60/120/144Hz. ── */
const MAX_DT = 0.05;
const MAX_DPR = 2;
const ROT_RATE = [0.48, 0.3, 0.18]; // rad/s for dot types 1..3 (reference: 0.008/0.005/0.003 per frame)

/* ── Star sprites, drawn once at the device pixel ratio. ── */
const STAR_SIZE = 16;
const STAR_OUTER = 7.6;
const GLOW_SIZE = 64;
const TAIL_W = 64;
const TAIL_H = 4;
const HEAD_R = 1.5;

function parseColor(value: string, fallback: Rgb): Rgb {
  const parts = value.match(/\d*\.?\d+/g);
  if (!parts || parts.length < 3) return fallback;
  return [Number(parts[0]), Number(parts[1]), Number(parts[2])];
}

function makeSprite(w: number, h: number, dpr: number, paint: (c: CanvasRenderingContext2D) => void) {
  const sprite = document.createElement("canvas");
  sprite.width = Math.round(w * dpr);
  sprite.height = Math.round(h * dpr);
  const c = sprite.getContext("2d");
  if (!c) return sprite;
  c.scale(dpr, dpr);
  paint(c);
  return sprite;
}

function breatheAlpha(x: number, y: number, t: number) {
  const wave1 = Math.sin(x * 0.012 + y * 0.008 + t * 0.6) * 0.5 + 0.5;
  const wave2 = Math.sin(x * 0.007 - y * 0.011 + t * 0.4) * 0.5 + 0.5;
  return wave1 * 0.3 + wave2 * 0.2;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  len: number;
}

export function Starfield({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    /* ── Palette comes from the CSS tokens, never hardcoded ── */
    const probe = document.createElement("span");
    probe.style.cssText = "position:absolute;visibility:hidden";
    host.appendChild(probe);
    const readToken = (token: string, prop: "color" | "backgroundColor", fallback: Rgb): Rgb => {
      if (!getComputedStyle(host).getPropertyValue(token).trim()) return fallback;
      probe.style[prop] = `var(${token})`;
      const resolved = getComputedStyle(probe)[prop];
      probe.style[prop] = "";
      return parseColor(resolved, fallback);
    };
    const dotRgb = readToken("--foreground", "color", [23, 23, 23]);
    /* Glow and tails only pick up a hue if the palette declares an accent; otherwise the
       field stays monochrome like the reference. */
    const accentRgb = readToken("--accent", "color", dotRgb);
    const bgRgb = readToken("--background", "backgroundColor", [255, 255, 255]);
    probe.remove();

    const bgFill = `rgb(${bgRgb[0]},${bgRgb[1]},${bgRgb[2]})`;
    const dotFill = `rgb(${dotRgb[0]},${dotRgb[1]},${dotRgb[2]})`;
    const dotTriplet = `${dotRgb[0]},${dotRgb[1]},${dotRgb[2]}`;
    const accentTriplet = `${accentRgb[0]},${accentRgb[1]},${accentRgb[2]}`;

    const levelFill: string[] = [];
    for (let level = 0; level < ALPHA_LEVELS; level++) {
      const alpha = ((level + 0.5) / ALPHA_LEVELS) * ALPHA_SPAN;
      levelFill.push(`rgba(${dotTriplet},${alpha.toFixed(3)})`);
    }

    let dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    let star: HTMLCanvasElement | null = null;
    let glow: HTMLCanvasElement | null = null;
    let tail: HTMLCanvasElement | null = null;

    const buildSprites = () => {
      star = makeSprite(STAR_SIZE, STAR_SIZE, dpr, (c) => {
        c.fillStyle = dotFill;
        c.beginPath();
        for (let j = 0; j < 8; j++) {
          const r = j % 2 === 0 ? STAR_OUTER : STAR_OUTER * 0.3;
          const angle = (j * Math.PI) / 4;
          const x = STAR_SIZE / 2 + Math.cos(angle) * r;
          const y = STAR_SIZE / 2 + Math.sin(angle) * r;
          if (j === 0) c.moveTo(x, y);
          else c.lineTo(x, y);
        }
        c.closePath();
        c.fill();
      });

      /* Glow and tails carry the accent hue; the sparkle bodies stay neutral. */
      glow = makeSprite(GLOW_SIZE, GLOW_SIZE, dpr, (c) => {
        const grad = c.createRadialGradient(GLOW_SIZE / 2, GLOW_SIZE / 2, 0, GLOW_SIZE / 2, GLOW_SIZE / 2, GLOW_SIZE / 2);
        grad.addColorStop(0, `rgba(${accentTriplet},1)`);
        grad.addColorStop(1, `rgba(${accentTriplet},0)`);
        c.fillStyle = grad;
        c.fillRect(0, 0, GLOW_SIZE, GLOW_SIZE);
      });

      tail = makeSprite(TAIL_W, TAIL_H, dpr, (c) => {
        const grad = c.createLinearGradient(0, 0, TAIL_W, 0);
        grad.addColorStop(0, `rgba(${accentTriplet},0)`);
        grad.addColorStop(0.7, `rgba(${accentTriplet},0.3)`);
        grad.addColorStop(1, `rgba(${accentTriplet},0.8)`);
        c.fillStyle = grad;
        c.fillRect(0, 0, TAIL_W, TAIL_H);
      });
    };

    /* ── Field state ── */
    let W = 0;
    let H = 0;
    let count = 0;
    let baseX = new Float32Array(0);
    let baseY = new Float32Array(0);
    let posX = new Float32Array(0);
    let posY = new Float32Array(0);
    let velX = new Float32Array(0);
    let velY = new Float32Array(0);
    let dotRadius = new Float32Array(0);
    let dotAlpha = new Float32Array(0);
    let twinklePhase = new Float32Array(0);
    let twinkleSpeed = new Float32Array(0);
    let rotation = new Float32Array(0);
    let liveAlpha = new Float32Array(0);
    let liveRadius = new Float32Array(0);
    let dotType = new Uint8Array(0);
    let levelOf = new Uint8Array(0);
    let starIdx = new Int32Array(0);
    let bucketIdx = new Int32Array(0);
    let counts = new Uint32Array(ALPHA_LEVELS);
    let offsets = new Int32Array(ALPHA_LEVELS + 1);
    let cursor = new Int32Array(ALPHA_LEVELS);

    const shootingStars: ShootingStar[] = [];
    let nextShoot = 2 + Math.random() * 4;

    let mouseX = -9999;
    let mouseY = -9999;
    let mouseInside = false;
    let smoothX = -9999;
    let smoothY = -9999;

    const buildGrid = () => {
      const rect = host.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);

      const cols = Math.max(1, Math.floor((W - PADDING * 2) / GAP) + 1);
      const rows = Math.max(1, Math.floor((H - PADDING * 2) / GAP) + 1);
      count = cols * rows;
      const offsetX = (W - (cols - 1) * GAP) / 2;
      const offsetY = (H - (rows - 1) * GAP) / 2;

      baseX = new Float32Array(count);
      baseY = new Float32Array(count);
      posX = new Float32Array(count);
      posY = new Float32Array(count);
      velX = new Float32Array(count);
      velY = new Float32Array(count);
      dotRadius = new Float32Array(count);
      dotAlpha = new Float32Array(count);
      twinklePhase = new Float32Array(count);
      twinkleSpeed = new Float32Array(count);
      rotation = new Float32Array(count);
      liveAlpha = new Float32Array(count);
      liveRadius = new Float32Array(count);
      dotType = new Uint8Array(count);
      levelOf = new Uint8Array(count);
      starIdx = new Int32Array(count);
      bucketIdx = new Int32Array(count);
      counts = new Uint32Array(ALPHA_LEVELS);
      offsets = new Int32Array(ALPHA_LEVELS + 1);
      cursor = new Int32Array(ALPHA_LEVELS);
      shootingStars.length = 0;
      nextShoot = 2 + Math.random() * 4;

      /* Density thresholds shift on every rebuild, so the field differs each load. */
      const brightThreshold = 0.98 + Math.random() * 0.012;
      const mediumThreshold = 0.945 + Math.random() * 0.025;
      const smallThreshold = 0.86 + Math.random() * 0.05;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col;
          let x = offsetX + col * GAP;
          let y = offsetY + row * GAP;
          const roll = Math.random();

          if (roll > brightThreshold) {
            dotType[i] = 3;
            dotRadius[i] = 3 + Math.random() * 1.5;
            dotAlpha[i] = 0.7 + Math.random() * 0.3;
            twinkleSpeed[i] = 0.4 + Math.random();
          } else if (roll > mediumThreshold) {
            dotType[i] = 2;
            dotRadius[i] = 2 + Math.random() * 0.8;
            dotAlpha[i] = 0.4 + Math.random() * 0.25;
            twinkleSpeed[i] = 0.6 + Math.random() * 1.8;
          } else if (roll > smallThreshold) {
            dotType[i] = 1;
            dotRadius[i] = 1.4 + Math.random() * 0.4;
            dotAlpha[i] = 0.22 + Math.random() * 0.15;
            twinkleSpeed[i] = 0.8 + Math.random() * 2.5;
          } else {
            dotType[i] = 0;
            dotRadius[i] = BASE_R;
            dotAlpha[i] = 0.16 + Math.random() * 0.1;
            twinkleSpeed[i] = 0;
          }

          if (dotType[i] > 0) {
            x += (Math.random() - 0.5) * GAP * 0.8;
            y += (Math.random() - 0.5) * GAP * 0.8;
          }

          baseX[i] = x;
          baseY[i] = y;
          posX[i] = x;
          posY[i] = y;
          twinklePhase[i] = Math.random() * TAU;
          rotation[i] = Math.random() * Math.PI * 0.5;
        }
      }
    };

    const render = (t: number, dt: number, animated: boolean) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = bgFill;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const frames = dt * 60;
      if (animated) {
        const mouseK = 1 - Math.pow(0.88, frames);
        const mouseOutK = 1 - Math.pow(0.95, frames);
        if (mouseInside) {
          smoothX += (mouseX - smoothX) * mouseK;
          smoothY += (mouseY - smoothY) * mouseK;
        } else {
          smoothX += (-9999 - smoothX) * mouseOutK;
          smoothY += (-9999 - smoothY) * mouseOutK;
        }

        nextShoot -= dt;
        if (nextShoot <= 0) {
          const fromTop = Math.random() < 0.5;
          const x = fromTop ? Math.random() * W * 0.6 : W + 5;
          const y = fromTop ? -5 : Math.random() * H * 0.5;
          const angle = fromTop ? Math.PI * 0.15 + Math.random() * Math.PI * 0.2 : Math.PI * 0.6 + Math.random() * Math.PI * 0.3;
          const speed = 3 + Math.random() * 3;
          shootingStars.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            decay: 0.008 + Math.random() * 0.012,
            len: 25 + Math.random() * 40,
          });
          nextShoot = 3 + Math.random() * 6;
        }
      }

      for (let s = shootingStars.length - 1; s >= 0; s--) {
        const ss = shootingStars[s];
        if (animated) {
          ss.x += ss.vx * frames;
          ss.y += ss.vy * frames;
          ss.life -= ss.decay * frames;
        }
        if (ss.life <= 0 || ss.x < -50 || ss.x > W + 50 || ss.y > H + 50) shootingStars.splice(s, 1);
      }

      const springK = 1 - Math.pow(0.85, frames);
      const dampK = Math.pow(0.75, frames);
      const edgeMargin = PUSH + 6;
      let starCount = 0;
      counts.fill(0);

      for (let i = 0; i < count; i++) {
        const bx = baseX[i];
        const by = baseY[i];
        const dx = bx - smoothX;
        const dy = by - smoothY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const type = dotType[i];
        let alpha = dotAlpha[i];
        let radius = dotRadius[i];

        if (type === 0) {
          alpha += breatheAlpha(bx, by, t) * 0.12;
        } else {
          const speed = twinkleSpeed[i];
          const phase = twinklePhase[i];
          const twinkle = Math.sin(t * speed + phase) * 0.35 + Math.sin(t * speed * 0.37 + phase * 2.1) * 0.15 + 0.5;
          if (type === 3) alpha = dotAlpha[i] * (0.55 + twinkle * 0.45);
          else if (type === 2) alpha = dotAlpha[i] * (0.35 + twinkle * 0.65);
          else alpha = dotAlpha[i] * (0.15 + twinkle * 0.85);

          const flare = Math.sin(t * 0.3 + phase * 5);
          if (flare > 0.97) {
            const intensity = (flare - 0.97) / 0.03;
            alpha = Math.min(1, alpha + intensity * 0.5);
            radius = dotRadius[i] * (1 + intensity * 0.4);
          }
          rotation[i] += ROT_RATE[type - 1] * dt;
        }

        let targetX = bx;
        let targetY = by;
        if (dist < INFLUENCE) {
          const falloff = 1 - dist / INFLUENCE;
          const ease = falloff * falloff * falloff;
          if (dist > 0.5) {
            targetX = bx + (dx / dist) * PUSH * ease;
            targetY = by + (dy / dist) * PUSH * ease;
          }
          alpha = Math.min(1, alpha + GLOW_BOOST * ease);
          if (type > 0) radius = dotRadius[i] * (1 + ease * 0.6);
        }

        const edgeDamp = Math.min(1, Math.min(bx, W - bx) / edgeMargin, Math.min(by, H - by) / edgeMargin);
        if (edgeDamp < 1) {
          targetX = bx + (targetX - bx) * edgeDamp;
          targetY = by + (targetY - by) * edgeDamp;
        }

        if (animated) {
          velX[i] += (targetX - posX[i]) * springK;
          velY[i] += (targetY - posY[i]) * springK;
          velX[i] *= dampK;
          velY[i] *= dampK;
          posX[i] += velX[i];
          posY[i] += velY[i];
        }

        if (type === 0) {
          let level = ((alpha / ALPHA_SPAN) * ALPHA_LEVELS) | 0;
          if (level >= ALPHA_LEVELS) level = ALPHA_LEVELS - 1;
          else if (level < 0) level = 0;
          levelOf[i] = level;
          counts[level]++;
        } else {
          starIdx[starCount++] = i;
          liveAlpha[i] = alpha;
          liveRadius[i] = radius;
        }
      }

      /* ── Shooting stars ── */
      for (let s = 0; s < shootingStars.length; s++) {
        const ss = shootingStars[s];
        const angle = Math.atan2(ss.vy, ss.vx);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.translate(ss.x, ss.y);
        ctx.rotate(angle);
        if (tail) {
          ctx.globalAlpha = ss.life;
          ctx.drawImage(tail, -ss.len, -TAIL_H / 2, ss.len, TAIL_H);
        }
        ctx.globalAlpha = ss.life * 0.9;
        ctx.fillStyle = dotFill;
        ctx.beginPath();
        ctx.arc(0, 0, HEAD_R, 0, TAU);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      /* ── Grid dots: one path + one fill per alpha bucket ── */
      offsets[0] = 0;
      for (let level = 0; level < ALPHA_LEVELS; level++) {
        offsets[level + 1] = offsets[level] + counts[level];
        cursor[level] = offsets[level];
      }
      for (let i = 0; i < count; i++) {
        if (dotType[i] === 0) bucketIdx[cursor[levelOf[i]]++] = i;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (let level = 0; level < ALPHA_LEVELS; level++) {
        const start = offsets[level];
        const end = offsets[level + 1];
        if (start === end) continue;
        ctx.fillStyle = levelFill[level];
        ctx.beginPath();
        for (let k = start; k < end; k++) {
          const i = bucketIdx[k];
          const x = posX[i];
          const y = posY[i];
          ctx.moveTo(x + BASE_R, y);
          ctx.arc(x, y, BASE_R, 0, TAU);
        }
        ctx.fill();
      }

      /* ── Sparkles: sprite draws, glow tinted with the accent ── */
      for (let k = 0; k < starCount; k++) {
        const i = starIdx[k];
        const type = dotType[i];
        const alpha = liveAlpha[i];
        const radius = liveRadius[i];
        const px = posX[i];
        const py = posY[i];

        if (type >= 2 && glow) {
          const glowRadius = radius * (type === 3 ? 4.5 : 3);
          ctx.globalAlpha = alpha * (type === 3 ? 0.18 : 0.1);
          ctx.drawImage(glow, px - glowRadius, py - glowRadius, glowRadius * 2, glowRadius * 2);
        }

        const size = (radius * STAR_SIZE) / STAR_OUTER;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.translate(px, py);
        ctx.rotate(rotation[i]);
        ctx.globalAlpha = alpha;
        if (star) ctx.drawImage(star, -size / 2, -size / 2, size, size);

        if (type === 3 && alpha > 0.4) {
          const rayLength = radius * 3.5;
          ctx.globalAlpha = alpha * 0.2;
          ctx.strokeStyle = dotFill;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(-rayLength, 0);
          ctx.lineTo(rayLength, 0);
          ctx.moveTo(0, -rayLength);
          ctx.lineTo(0, rayLength);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /* ── Run loop, paused when reduced-motion is on, off-screen, or hidden ── */
    let raf = 0;
    let running = false;
    let last = 0;
    let inView = true;
    let onScreen = true;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, MAX_DT);
      last = now;
      render(now / 1000, dt, true);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reducedMotion.matches || !inView || !onScreen) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    const sync = () => {
      /* Always restart the chain rather than trusting `running`: a frozen or
         backgrounded page can drop the pending frame while the flag stays true,
         which would leave the field permanently static. */
      stop();
      if (reducedMotion.matches) render(0, 0, false);
      else start();
    };

    const rebuild = () => {
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      buildSprites();
      buildGrid();
      sync();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches) return;
      const rect = host.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
      mouseInside = true;
    };

    const onPointerLeave = () => {
      mouseInside = false;
    };

    const onVisibility = () => {
      onScreen = document.visibilityState === "visible";
      sync();
    };

    let dprQuery: MediaQueryList | null = null;
    const onDprChange = () => {
      rebuild();
      watchDpr();
    };
    const watchDpr = () => {
      dprQuery?.removeEventListener("change", onDprChange);
      dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      dprQuery.addEventListener("change", onDprChange);
    };

    buildSprites();
    buildGrid();
    render(0, 0, false);

    const resizeObserver = new ResizeObserver(rebuild);
    resizeObserver.observe(host);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        inView = entries[entries.length - 1]?.isIntersecting ?? true;
        sync();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(host);

    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", sync);
    /* Page Lifecycle (Chrome tab freeze) and bfcache restores drop the pending
       frame without firing visibilitychange. */
    document.addEventListener("freeze", stop);
    document.addEventListener("resume", sync);
    window.addEventListener("pageshow", sync);
    watchDpr();

    sync();

    return () => {
      stop();
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", sync);
      document.removeEventListener("freeze", stop);
      document.removeEventListener("resume", sync);
      window.removeEventListener("pageshow", sync);
      dprQuery?.removeEventListener("change", onDprChange);
    };
  }, []);

  return (
    <div ref={hostRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
