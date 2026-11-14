"use client";

import { useEffect, useRef } from "react";

/**
 * A warp starfield rasterised into monospace characters, sized to fill its
 * container. Pure JS. Each star has a 3D position; as its depth shrinks it
 * rushes toward the camera, projecting outward from the centre and stretching
 * into a streak. Brightness tracks proximity — faint dots fade in to bright
 * heads before they pass and respawn. Reflows on resize.
 */

const NEAR = 0.26;
const FAR = 3.0;
const SPEED = 1.25;
const TRAIL = 1.65;

const RAMP = ".:-=+*#@";

type Star = { x: number; y: number; z: number };

const spawn = (z: number): Star => ({
  x: (Math.random() * 2 - 1) * 1.3,
  y: (Math.random() * 2 - 1) * 1.3,
  z,
});

export function AsciiStarfield() {
  const ref = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let COLS = 0, ROWS = 0, CX = 0, CY = 0, PX = 0, PY = 0, MAX_STREAK = 0;
    let chars: string[] = [];
    let bright = new Float32Array(0);
    let stars: Star[] = [];

    const configure = () => {
      const fs = parseFloat(getComputedStyle(el).fontSize) || 11;
      const cw = fs * 0.6; // Space Mono advance width ≈ 0.6em
      const ch = fs; // line-height: 1
      const w = el.clientWidth || window.innerWidth;
      const h = el.clientHeight || window.innerHeight;

      COLS = Math.max(24, Math.ceil(w / cw));
      ROWS = Math.max(16, Math.ceil(h / ch));
      CX = COLS / 2;
      CY = ROWS / 2;
      PX = CX * 0.46;
      PY = PX * (cw / ch); // keep the radial burst circular in pixels
      MAX_STREAK = Math.max(10, Math.round(COLS * 0.16));

      chars = new Array(COLS * ROWS);
      bright = new Float32Array(COLS * ROWS);

      const target = Math.min(460, Math.max(60, Math.round((COLS * ROWS) / 115)));
      stars = Array.from({ length: target }, () => spawn(NEAR + Math.random() * (FAR - NEAR)));
    };

    const prox = (z: number) => 1 - (z - NEAR) / (FAR - NEAR);

    const plot = (
      ax: number,
      ay: number,
      bx: number,
      by: number,
      bTail: number,
      bHead: number
    ) => {
      const steps = Math.max(1, Math.ceil(Math.max(Math.abs(bx - ax), Math.abs(by - ay))));
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const px = Math.round(ax + (bx - ax) * t);
        const py = Math.round(ay + (by - ay) * t);
        if (px < 0 || px >= COLS || py < 0 || py >= ROWS) continue;
        const b = bTail + (bHead - bTail) * t;
        const idx = py * COLS + px;
        if (b > bright[idx]) {
          bright[idx] = b;
          chars[idx] = RAMP[Math.min(RAMP.length - 1, Math.max(0, Math.floor(b * RAMP.length)))];
        }
      }
    };

    const render = (dt: number, streaks: boolean) => {
      chars.fill(" ");
      bright.fill(0);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= dt * SPEED;
        if (star.z < NEAR) {
          stars[i] = spawn(FAR);
          continue;
        }

        const curX = CX + (star.x / star.z) * PX;
        const curY = CY - (star.y / star.z) * PY;

        if (streaks) {
          const zTail = Math.min(FAR, star.z * TRAIL);
          let tailX = CX + (star.x / zTail) * PX;
          let tailY = CY - (star.y / zTail) * PY;
          const dx = tailX - curX;
          const dy = tailY - curY;
          const len = Math.hypot(dx, dy);
          if (len > MAX_STREAK) {
            tailX = curX + (dx / len) * MAX_STREAK;
            tailY = curY + (dy / len) * MAX_STREAK;
          }
          plot(tailX, tailY, curX, curY, prox(star.z) * 0.25, prox(star.z));
        } else {
          plot(curX, curY, curX, curY, prox(star.z), prox(star.z));
        }
      }

      let out = "";
      for (let r = 0; r < ROWS; r++) out += chars.slice(r * COLS, r * COLS + COLS).join("") + "\n";
      el.textContent = out;
    };

    configure();

    let resizeRaf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(configure);
    });
    ro.observe(el);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      render(0, false);
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      render(dt, true);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      ro.disconnect();
    };
  }, []);

  return <pre className="ascii-hero" aria-hidden="true" ref={ref} />;
}
