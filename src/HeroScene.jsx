import { useEffect, useRef } from 'react';

// Canvas: 186×128 → displayed at 373×256 CSS px (2× pixel art scaling)
const W = 186;
const H = 128;
const CX = 93;

const LAYER = {
  position: 'absolute', top: 0, left: 0,
  width: '100%', height: '100%',
  imageRendering: 'pixelated',
};

function fr(ctx, x, y, w, h, c) {
  if (w <= 0 || h <= 0) return;
  ctx.fillStyle = c;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function mkCtx(canvas) {
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  canvas.width = W; canvas.height = H;
  ctx.clearRect(0, 0, W, H);
  return ctx;
}

// Draw an ellipse-like blob via horizontal scanlines
function blob(ctx, cx, cy, rx, ry, color) {
  ctx.fillStyle = color;
  for (let dy = -ry; dy <= ry; dy++) {
    const t = 1 - (dy * dy) / (ry * ry);
    if (t <= 0) continue;
    const w = Math.max(1, Math.round(rx * 2 * Math.sqrt(t)));
    ctx.fillRect(Math.round(cx - w / 2), cy + dy, w, 1);
  }
}

// ─── Background (static) ─────────────────────────────────────────────────────

function drawBackground(canvas) {
  const ctx = mkCtx(canvas);
  if (!ctx) return;

  // Sky gradient — 9 horizontal bands
  [
    [0,   6,  '#0a2460'],
    [6,   13, '#12308a'],
    [13,  21, '#1c3ea8'],
    [21,  31, '#2a54c0'],
    [31,  42, '#3c6ed0'],
    [42,  52, '#5088dc'],
    [52,  60, '#68a0e8'],
    [60,  67, '#7eb8f0'],
    [67,  74, '#94caf6'],
  ].forEach(([y1, y2, c]) => fr(ctx, 0, y1, W, y2 - y1, c));

  // Sun — upper right, warm glow
  const sx = 156, sy = 18;
  blob(ctx, sx, sy, 11, 11, '#fff4c0');
  blob(ctx, sx, sy, 9,  9,  '#fff8d0');
  blob(ctx, sx, sy, 7,  7,  '#fffce8');
  blob(ctx, sx, sy, 4,  4,  '#ffffff');
  // Ray suggestions
  fr(ctx, sx - 14, sy - 1, 4, 2, '#ffe8a0');
  fr(ctx, sx + 10, sy - 1, 4, 2, '#ffe8a0');
  fr(ctx, sx - 1, sy - 14, 2, 4, '#ffe8a0');
  fr(ctx, sx - 1, sy + 10, 2, 4, '#ffe8a0');
  fr(ctx, sx - 12, sy - 12, 3, 3, '#ffe8a0');
  fr(ctx, sx + 9,  sy - 12, 3, 3, '#ffe8a0');
  fr(ctx, sx - 12, sy + 9,  3, 3, '#ffe8a0');
  fr(ctx, sx + 9,  sy + 9,  3, 3, '#ffe8a0');

  // Fluffy clouds
  cloud(ctx, 4,   20);
  cloud(ctx, 54,  11);
  cloud(ctx, 100, 22);

  // Distant ridge (solid pre-blended colour — purple-grey haze)
  blob(ctx, 50,  44, 8, 8,  '#4a5ea8');
  blob(ctx, 60,  40, 6, 10, '#4460a4');
  blob(ctx, 70,  38, 5, 8,  '#505ea0');
  blob(ctx, 80,  42, 5, 7,  '#4858a0');
  blob(ctx, 100, 38, 6, 9,  '#4a5ea8');
  blob(ctx, 110, 42, 7, 8,  '#505ea0');
  blob(ctx, 120, 40, 5, 10, '#4460a4');
  blob(ctx, 130, 44, 8, 8,  '#4a5ea8');

  // ── Left cliff ──────────────────────────────────────────────────────────
  fr(ctx, 0,   30, 5,  H - 30, '#1c1a10');
  fr(ctx, 5,   26, 7,  H - 26, '#242210');
  fr(ctx, 12,  28, 8,  H - 28, '#302e1a');
  fr(ctx, 20,  30, 8,  H - 30, '#3c3a24');
  fr(ctx, 28,  32, 6,  H - 32, '#48462e');
  // Edge shadow
  fr(ctx, 5,   26, 2,  H - 26, '#141208');
  // Vertical crack texture
  fr(ctx, 9,  38, 1, 18, '#181608');
  fr(ctx, 10, 48, 1, 12, '#181608');
  fr(ctx, 17, 44, 1, 16, '#20200c');
  fr(ctx, 18, 54, 1, 10, '#20200c');
  fr(ctx, 25, 40, 1, 14, '#2c2a14');
  fr(ctx, 8,  64, 2,  9, '#141208');
  fr(ctx, 22, 72, 2, 11, '#1c1a0c');
  // Moss on top
  fr(ctx, 6,  24, 3,  3, '#1c3a12');
  fr(ctx, 8,  20, 8,  4, '#224818');
  fr(ctx, 12, 16, 12, 4, '#2c5820');
  fr(ctx, 16, 12, 10, 4, '#366428');
  fr(ctx, 20, 9,  8,  4, '#407030');
  fr(ctx, 24, 7,  5,  3, '#4c7c38');

  // ── Left trees (organic blob canopies) ─────────────────────────────────
  // Tree A — back left
  fr(ctx, 1, 58, 3, H - 58, '#18100a'); // trunk
  blob(ctx, 3,  50, 6, 14, '#10200e');
  blob(ctx, 3,  42, 8, 12, '#182c14');
  blob(ctx, 4,  33, 9, 11, '#20381c');
  blob(ctx, 5,  25, 8, 10, '#2a4824');
  blob(ctx, 6,  18, 6,  8, '#34582c');
  blob(ctx, 7,  12, 4,  6, '#3e6834');
  // Tree B — centre-left (taller)
  fr(ctx, 12, 52, 3, H - 52, '#18100a');
  blob(ctx, 14, 44, 7, 14, '#12221a');
  blob(ctx, 13, 36, 9, 12, '#1a3018');
  blob(ctx, 13, 27, 9, 10, '#243c20');
  blob(ctx, 14, 19, 8,  9, '#2e4e28');
  blob(ctx, 15, 12, 6,  8, '#385e30');
  blob(ctx, 15, 6,  4,  6, '#426838');
  // Tree C — front left (shorter)
  fr(ctx, 22, 60, 3, H - 60, '#180e06');
  blob(ctx, 24, 52, 6, 11, '#11200e');
  blob(ctx, 24, 44, 7,  9, '#1a2e18');
  blob(ctx, 25, 36, 7,  8, '#243c20');
  blob(ctx, 25, 29, 5,  7, '#2e4e28');
  // Hanging cliff foliage
  fr(ctx, 0, 72, 14, 4, '#12220e');
  fr(ctx, 0, 77, 10, 5, '#182c14');
  fr(ctx, 0, 82, 6,  5, '#1e3618');
  fr(ctx, 0, 87, 4,  6, '#243c1e');

  // ── Right cliff ─────────────────────────────────────────────────────────
  fr(ctx, 181, 30, 5,  H - 30, '#1c1a10');
  fr(ctx, 174, 26, 7,  H - 26, '#242210');
  fr(ctx, 166, 28, 8,  H - 28, '#302e1a');
  fr(ctx, 158, 30, 8,  H - 30, '#3c3a24');
  fr(ctx, 152, 32, 6,  H - 32, '#48462e');
  fr(ctx, 179, 26, 2,  H - 26, '#141208');
  fr(ctx, 176, 38, 1, 18, '#181608');
  fr(ctx, 175, 48, 1, 12, '#181608');
  fr(ctx, 168, 44, 1, 16, '#20200c');
  fr(ctx, 167, 54, 1, 10, '#20200c');
  fr(ctx, 160, 40, 1, 14, '#2c2a14');
  fr(ctx, 175, 64, 2,  9, '#141208');
  fr(ctx, 162, 72, 2, 11, '#1c1a0c');
  fr(ctx, 177, 24, 3,  3, '#1c3a12');
  fr(ctx, 170, 20, 8,  4, '#224818');
  fr(ctx, 162, 16, 12, 4, '#2c5820');
  fr(ctx, 156, 12, 10, 4, '#366428');
  fr(ctx, 154, 9,  8,  4, '#407030');
  fr(ctx, 157, 7,  5,  3, '#4c7c38');

  // ── Right trees ─────────────────────────────────────────────────────────
  fr(ctx, 182, 58, 3, H - 58, '#18100a');
  blob(ctx, 183, 50, 6, 14, '#10200e');
  blob(ctx, 183, 42, 8, 12, '#182c14');
  blob(ctx, 182, 33, 9, 11, '#20381c');
  blob(ctx, 181, 25, 8, 10, '#2a4824');
  blob(ctx, 180, 18, 6,  8, '#34582c');
  blob(ctx, 179, 12, 4,  6, '#3e6834');
  fr(ctx, 174, 52, 3, H - 52, '#18100a');
  blob(ctx, 172, 44, 7, 14, '#12221a');
  blob(ctx, 173, 36, 9, 12, '#1a3018');
  blob(ctx, 173, 27, 9, 10, '#243c20');
  blob(ctx, 172, 19, 8,  9, '#2e4e28');
  blob(ctx, 171, 12, 6,  8, '#385e30');
  blob(ctx, 171, 6,  4,  6, '#426838');
  fr(ctx, 161, 60, 3, H - 60, '#180e06');
  blob(ctx, 162, 52, 6, 11, '#11200e');
  blob(ctx, 162, 44, 7,  9, '#1a2e18');
  blob(ctx, 161, 36, 7,  8, '#243c20');
  blob(ctx, 161, 29, 5,  7, '#2e4e28');
  fr(ctx, 172, 72, 14, 4, '#12220e');
  fr(ctx, 176, 77, 10, 5, '#182c14');
  fr(ctx, 180, 82, 6,  5, '#1e3618');
  fr(ctx, 182, 87, 4,  6, '#243c1e');

  // Dark bottom banks
  fr(ctx, 0,   116, 20, 12, '#14120c');
  fr(ctx, 166, 116, 20, 12, '#14120c');
  fr(ctx, 0,   124, W,  4,  '#0e0c08');
}

function cloud(ctx, x, y) {
  blob(ctx, x + 14, y + 8,  14, 5, '#a8c8dc');
  blob(ctx, x + 12, y + 5,  12, 5, '#ccddf0');
  blob(ctx, x + 18, y + 4,  10, 5, '#cce0f0');
  blob(ctx, x + 8,  y + 2,   8, 4, '#d8eeff');
  blob(ctx, x + 22, y + 2,   9, 4, '#d8eeff');
  blob(ctx, x + 15, y,       7, 4, '#e8f4ff');
  blob(ctx, x + 22, y + 1,   6, 3, '#eaf6ff');
  blob(ctx, x + 8,  y + 1,   5, 3, '#eaf6ff');
}

// ─── Waterfall + Pool (animated) ─────────────────────────────────────────────

const POOL_TOP   = 94;
const STREAM_TOP = 14;

function drawWaterfall(canvas, frame) {
  const ctx = mkCtx(canvas);
  if (!ctx) return;
  const f = frame % 24;

  // Background mist between the two streams
  fr(ctx, 46, STREAM_TOP, 94, POOL_TOP - STREAM_TOP, '#1858a8');
  fr(ctx, 60, STREAM_TOP, 66, POOL_TOP - STREAM_TOP, '#2060b4');
  fr(ctx, 72, STREAM_TOP, 42, POOL_TOP - STREAM_TOP, '#2870bc');
  fr(ctx, 82, STREAM_TOP + 24, 22, 36, '#3480c4');

  // Animated mist particles in centre
  for (let i = 0; i < 10; i++) {
    const my = STREAM_TOP + 28 + ((f * 2 + i * 6) % 38);
    fr(ctx, 80 + (i % 5) * 5, my, 3, 2, '#6098c0');
  }

  // ── One waterfall stream ─────────────────────────────────────────────────
  function drawStream(x1, x2) {
    const w = x2 - x1;
    const h = POOL_TOP - STREAM_TOP;

    // Base fill
    fr(ctx, x1, STREAM_TOP, w, h, '#0e48a0');
    // Inner darker core
    fr(ctx, x1 + 7, STREAM_TOP, w - 14, h, '#0a3890');

    // Bright edge borders (give illusion of curved surface)
    fr(ctx, x1,     STREAM_TOP, 3, h, '#88c4ec');
    fr(ctx, x1 + 3, STREAM_TOP, 2, h, '#58a0d8');
    fr(ctx, x1 + 5, STREAM_TOP, 2, h, '#3c88c4');
    fr(ctx, x2 - 3, STREAM_TOP, 3, h, '#88c4ec');
    fr(ctx, x2 - 5, STREAM_TOP, 2, h, '#58a0d8');
    fr(ctx, x2 - 7, STREAM_TOP, 2, h, '#3c88c4');

    // Many thin organic falling streams (no horizontal banding)
    // Each: [xOff, width, segLen, gapLen, speed, color]
    const streams = [
      [2,  1,  8, 10, 3, '#80c0ec'],
      [4,  2, 11,  7, 5, '#a8d8f8'],
      [8,  1,  6, 14, 2, '#70b0e4'],
      [11, 2, 13,  5, 4, '#c0e4fc'],
      [15, 1,  7, 11, 3, '#88c8f0'],
      [18, 2,  9,  9, 5, '#b0dcf8'],
      [22, 1,  5, 13, 2, '#78b8e8'],
      [25, 2, 12,  6, 4, '#c0e4fc'],
      [29, 1,  8, 10, 3, '#80c0ec'],
      [32, 2,  6, 12, 5, '#a0d0f4'],
    ];

    for (const [xi, sw, segH, gapH, speed, color] of streams) {
      if (x1 + xi + sw >= x2 - 1) continue;
      const period = segH + gapH;
      const off = (f * speed) % period;
      for (let rep = -1; rep < Math.ceil(h / period) + 2; rep++) {
        const sy = STREAM_TOP + rep * period + off;
        const clipY1 = Math.max(sy, STREAM_TOP);
        const clipY2 = Math.min(sy + segH, POOL_TOP);
        if (clipY2 > clipY1) fr(ctx, x1 + xi, clipY1, sw, clipY2 - clipY1, color);
      }
    }

    // Top foam
    fr(ctx, x1,     STREAM_TOP,     w, 3, '#c8e8f8');
    fr(ctx, x1 + 1, STREAM_TOP,     w - 2, 2, '#e0f4ff');
    fr(ctx, x1 + 2, STREAM_TOP,     w - 4, 1, '#f4fbff');
    fr(ctx, x1 + 3, STREAM_TOP - 1, w - 6, 1, '#ffffff');

    // Animated splash at base — organic pixel scatter
    for (let xi = 1; xi < w - 1; xi++) {
      const phase = (xi * 7 + f * 4) % 18;
      if (phase < 3) fr(ctx, x1 + xi, POOL_TOP,     1, 3, '#a8d4f0');
      if (phase < 1) fr(ctx, x1 + xi, POOL_TOP - 1, 1, 2, '#d4eef8');
      if ((xi * 3 + f * 3) % 14 < 2) fr(ctx, x1 + xi, POOL_TOP + 2, 1, 2, '#88c0e4');
    }
  }

  drawStream(46, 82);
  drawStream(104, 140);

  // Overflow at cliff top
  fr(ctx, 46,  STREAM_TOP - 4, 36, 5, '#c0e0f8');
  fr(ctx, 46,  STREAM_TOP - 2, 36, 3, '#daf0ff');
  fr(ctx, 104, STREAM_TOP - 4, 36, 5, '#c0e0f8');
  fr(ctx, 104, STREAM_TOP - 2, 36, 3, '#daf0ff');

  // ── Pool ────────────────────────────────────────────────────────────────
  const pt = POOL_TOP;
  fr(ctx, 20, pt,      146, 28, '#050e1c');
  fr(ctx, 22, pt + 1,  142, 26, '#07121e');
  fr(ctx, 24, pt + 2,  138, 24, '#091622');
  fr(ctx, 26, pt + 4,  134, 20, '#0c1c2e');
  fr(ctx, 30, pt + 6,  126, 16, '#102438');
  fr(ctx, 38, pt + 8,  110, 12, '#142c44');
  fr(ctx, 48, pt + 10,  90,  8, '#183450');
  fr(ctx, 58, pt + 12,  70,  4, '#1c3c5c');

  // Waterfall reflection bands in pool
  fr(ctx, 50, pt + 2, 16, 18, '#1a4e80');
  fr(ctx, 54, pt + 4,  9, 14, '#2a6090');
  fr(ctx, 108, pt + 2, 16, 18, '#1a4e80');
  fr(ctx, 110, pt + 4,  9, 14, '#2a6090');

  // Pool ripples (animated)
  [38, 56, 70, 100, 118, 142].forEach((rx, i) => {
    const phase = (f + i * 4) % 20;
    if (phase < 10) {
      const ry = pt + 7 + (i % 3) * 5 + Math.floor(phase / 2);
      fr(ctx, rx,     ry, 12 + phase, 1, '#162e5a');
      fr(ctx, rx + 1, ry + 1, 10 + phase, 1, '#1c3870');
    }
  });

  // Pool edge shores
  fr(ctx, 20, pt - 2, 28, 4, '#1c1a10');
  fr(ctx, 138, pt - 2, 28, 4, '#1c1a10');
  fr(ctx, 20, pt + 26, 146, 2, '#030810');
}

// ─── Foreground (static) ──────────────────────────────────────────────────────

function drawForeground(canvas) {
  const ctx = mkCtx(canvas);
  if (!ctx) return;
  drawSideRocks(ctx);
  drawMeditationRock(ctx);
  drawLantern(ctx, 40,  108);
  drawLantern(ctx, 146, 106);
  drawNinja(ctx);
  drawFgPlants(ctx);
}

function drawSideRocks(ctx) {
  // Left shore rock
  fr(ctx, 20, 102, 26, 7, '#1c1a10');
  fr(ctx, 22, 100, 22, 4, '#28261a');
  fr(ctx, 24,  98, 18, 3, '#363420');
  fr(ctx, 22, 107, 24, 2, '#141208');
  // Right shore rock
  fr(ctx, 140, 102, 26, 7, '#1c1a10');
  fr(ctx, 142, 100, 22, 4, '#28261a');
  fr(ctx, 144,  98, 18, 3, '#363420');
  fr(ctx, 140, 107, 24, 2, '#141208');
}

function drawMeditationRock(ctx) {
  // Shadow under rock
  blob(ctx, CX,     101, 22, 4, '#050c1a');
  // Rock body — layered blobs for oval stone shape
  blob(ctx, CX,      97, 21, 6, '#1a1810');
  blob(ctx, CX,      94, 19, 5, '#242218');
  blob(ctx, CX,      91, 17, 4, '#302e1e');
  blob(ctx, CX,      89, 15, 3, '#3c3a28');
  // Top highlight
  blob(ctx, CX - 2,  88, 11, 2, '#484530');
  blob(ctx, CX - 3,  87,  8, 1, '#545040');
  // Moss patches
  fr(ctx, CX - 13, 94, 5, 3, '#1e3a14');
  fr(ctx, CX - 11, 92, 4, 2, '#284c1c');
  fr(ctx, CX + 7,  95, 5, 3, '#1e3a14');
  fr(ctx, CX + 8,  92, 4, 2, '#284c1c');
  // Water around rock base
  fr(ctx, CX - 18, 99, 36, 2, '#0c1e3c');
}

function drawLantern(ctx, cx, baseY) {
  // Stone post
  fr(ctx, cx - 1, baseY - 30, 2, 30, '#2c2a1c');

  // Base slab (wide foot)
  fr(ctx, cx - 10, baseY - 4,  20, 5, '#38361e');
  fr(ctx, cx - 11, baseY,      22, 3, '#2c2a14');
  fr(ctx, cx - 9,  baseY - 4,  18, 2, '#46442a'); // highlight top

  // Lantern box body
  const lTop = baseY - 26;
  fr(ctx, cx - 7, lTop,     14, 20, '#282616');
  fr(ctx, cx - 6, lTop + 1, 12, 18, '#343220');
  fr(ctx, cx - 5, lTop + 2, 10, 16, '#40402a');

  // Warm glow interior
  fr(ctx, cx - 4, lTop + 3,  8, 14, '#b88018');
  fr(ctx, cx - 3, lTop + 4,  6, 12, '#cca020');
  fr(ctx, cx - 2, lTop + 5,  4, 10, '#ddb028');
  // Flame core
  fr(ctx, cx - 1, lTop + 6,  2,  7, '#e05010');
  fr(ctx, cx,     lTop + 7,  1,  5, '#f07020');

  // Soft glow halo (slightly transparent — use tinted color)
  fr(ctx, cx - 8, lTop - 3, 16, 25, '#9060100a'); // too small effect; use ctx alpha
  ctx.globalAlpha = 0.18;
  fr(ctx, cx - 9, lTop - 2, 18, 26, '#c07800');
  ctx.globalAlpha = 1;

  // Lantern roof — tiered caps
  fr(ctx, cx - 8, lTop - 3, 16, 3, '#1e1c10');
  fr(ctx, cx - 6, lTop - 6, 12, 4, '#282614');
  fr(ctx, cx - 4, lTop - 9,  8, 4, '#343220');
  fr(ctx, cx - 2, lTop - 12, 4, 4, '#3e3c2a');
  fr(ctx, cx - 1, lTop - 14, 2, 3, '#484632');
}

function drawNinja(ctx) {
  const cx = CX;
  const baseY = 88; // bottom of seated legs (sits on rock top ~y=87)

  // ── Legs — wide seated cross-legged ────────────────────────────────────
  fr(ctx, cx - 17, baseY - 11, 34, 13, '#0e0e0e');
  // Left leg volume shading
  fr(ctx, cx - 16, baseY - 10, 12, 11, '#121212');
  fr(ctx, cx - 14, baseY - 8,   8,  8, '#161616');
  // Right leg volume shading
  fr(ctx, cx + 4,  baseY - 10, 12, 11, '#121212');
  fr(ctx, cx + 6,  baseY - 8,   8,  8, '#161616');
  // Foot shapes
  fr(ctx, cx - 17, baseY - 3, 9, 5, '#141414');
  fr(ctx, cx + 8,  baseY - 3, 9, 5, '#141414');
  // Inner crease (legs crossing)
  fr(ctx, cx - 2, baseY - 9, 4, 11, '#0a0a0a');

  // ── WHITE BELT — prominent band across lap ──────────────────────────────
  const beltY = baseY - 10;
  fr(ctx, cx - 16, beltY, 32, 5, '#c4c4c4');    // full band
  fr(ctx, cx - 13, beltY, 26, 5, '#d8d8d8');    // brighter centre
  fr(ctx, cx -  8, beltY, 16, 5, '#eaeaea');    // highlight strip
  fr(ctx, cx -  4, beltY,  8, 5, '#f2f2f2');    // hotspot
  // Belt knot — vertical drape from centre
  fr(ctx, cx - 3, beltY,     6, 14, '#c0c0c0');
  fr(ctx, cx - 2, beltY + 2, 4, 10, '#cccccc');
  fr(ctx, cx - 1, beltY + 5, 2,  7, '#b4b4b4');

  // ── Torso ───────────────────────────────────────────────────────────────
  const torsoTop = baseY - 26;
  fr(ctx, cx - 10, torsoTop, 20, 16, '#0e0e0e');
  // Left/right shadows for depth
  fr(ctx, cx - 10, torsoTop, 3, 16, '#0a0a0a');
  fr(ctx, cx + 7,  torsoTop, 3, 16, '#0a0a0a');
  // Front face — slightly lighter plane
  fr(ctx, cx - 6, torsoTop + 2, 12, 10, '#131313');

  // Hands clasped together on lap / below belt
  fr(ctx, cx - 6, torsoTop + 10, 12, 7, '#181818');
  fr(ctx, cx - 5, torsoTop + 11, 10, 5, '#202020');
  fr(ctx, cx - 4, torsoTop + 12, 8,  3, '#282828');
  // Knuckle pixels
  fr(ctx, cx - 4, torsoTop + 11, 2, 2, '#161616');
  fr(ctx, cx - 1, torsoTop + 11, 2, 2, '#161616');
  fr(ctx, cx + 2, torsoTop + 11, 2, 2, '#161616');

  // Torso belt line
  fr(ctx, cx - 10, torsoTop + 12, 20, 3, '#bcbcbc');
  fr(ctx, cx - 8,  torsoTop + 12, 16, 3, '#d4d4d4');
  fr(ctx, cx - 5,  torsoTop + 12, 10, 3, '#e0e0e0');

  // ── Shoulders ───────────────────────────────────────────────────────────
  fr(ctx, cx - 14, torsoTop - 1, 5, 8, '#0e0e0e');
  fr(ctx, cx + 9,  torsoTop - 1, 5, 8, '#0e0e0e');
  fr(ctx, cx - 14, torsoTop - 1, 5, 3, '#141414'); // top highlight

  // ── Head ────────────────────────────────────────────────────────────────
  const headTop = torsoTop - 18;
  fr(ctx, cx - 8, headTop,     16, 17, '#0e0e0e');
  // Side shadows
  fr(ctx, cx - 8, headTop,     2,  17, '#090909');
  fr(ctx, cx + 6, headTop,     2,  17, '#090909');
  // Hood — stacked pyramid above head
  fr(ctx, cx - 6, headTop - 3, 12, 4, '#0e0e0e');
  fr(ctx, cx - 4, headTop - 6,  8, 4, '#0e0e0e');
  fr(ctx, cx - 2, headTop - 8,  4, 3, '#0e0e0e');
  fr(ctx, cx - 1, headTop - 10, 2, 3, '#0e0e0e');

  // ── WHITE HEADBAND ───────────────────────────────────────────────────────
  const hbY = headTop + 6;
  fr(ctx, cx - 9, hbY, 18, 4, '#c8c8c8');    // full band (wider than head)
  fr(ctx, cx - 7, hbY, 14, 4, '#e0e0e0');    // bright centre
  fr(ctx, cx - 4, hbY, 8,  4, '#f0f0f0');    // highlight
  // Knot on right
  fr(ctx, cx + 6, hbY, 4, 5, '#d4d4d4');
  fr(ctx, cx + 7, hbY + 1, 3, 4, '#e0e0e0');
  // Trailing tie (narrowing right)
  fr(ctx, cx + 9,  hbY,     10, 3, '#c4c4c4');
  fr(ctx, cx + 10, hbY + 1,  9, 2, '#b8b8b8');
  fr(ctx, cx + 11, hbY + 2,  7, 2, '#acacac');
  fr(ctx, cx + 13, hbY + 3,  5, 1, '#9c9c9c');
  fr(ctx, cx + 15, hbY + 4,  3, 1, '#8c8c8c');

  // ── GOLD EYES (below headband) ───────────────────────────────────────────
  const eyeY = hbY + 5;
  fr(ctx, cx - 5, eyeY, 4, 2, '#b09018'); // left eye slit
  fr(ctx, cx + 1, eyeY, 4, 2, '#b09018'); // right eye slit
  fr(ctx, cx - 4, eyeY, 2, 1, '#d4ac20'); // left iris highlight
  fr(ctx, cx + 2, eyeY, 2, 1, '#d4ac20'); // right iris highlight
  fr(ctx, cx - 4, eyeY, 1, 1, '#f4d040'); // bright pixel
  fr(ctx, cx + 2, eyeY, 1, 1, '#f4d040');

  // ── Lower face mask ───────────────────────────────────────────────────────
  fr(ctx, cx - 7, eyeY + 2, 14, 6, '#111111');
  fr(ctx, cx - 5, eyeY + 3, 10, 4, '#161616');
}

function drawFgPlants(ctx) {
  // Bottom-left
  blob(ctx, 5,   120, 9, 7, '#0e1e0c');
  blob(ctx, 3,   124, 11, 4, '#162c12');
  blob(ctx, 11,  115, 7,  6, '#1a3416');
  blob(ctx, 15,  118, 6,  5, '#223e1e');
  fr(ctx, 0, 122, 7, 6, '#0a1808');
  // Bottom-right
  blob(ctx, 181, 120, 9, 7, '#0e1e0c');
  blob(ctx, 183, 124, 11, 4, '#162c12');
  blob(ctx, 175, 115, 7,  6, '#1a3416');
  blob(ctx, 171, 118, 6,  5, '#223e1e');
  fr(ctx, 179, 122, 7, 6, '#0a1808');
}

// ─── React components ────────────────────────────────────────────────────────

function BackgroundLayer() {
  const ref = useRef(null);
  useEffect(() => { drawBackground(ref.current); }, []);
  return <canvas ref={ref} style={LAYER} />;
}

function WaterfallLayer({ frame }) {
  const ref = useRef(null);
  useEffect(() => { drawWaterfall(ref.current, frame); }, [frame]);
  return <canvas ref={ref} style={LAYER} />;
}

function ForegroundLayer() {
  const ref = useRef(null);
  useEffect(() => { drawForeground(ref.current); }, []);
  return <canvas ref={ref} style={LAYER} />;
}

function CalmFlowChip() {
  return (
    <div style={{
      position: 'absolute', top: 12, left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(16, 40, 20, 0.90)',
      backdropFilter: 'blur(6px)',
      borderRadius: 10, padding: '5px 14px 6px',
      border: '1px solid rgba(80, 160, 90, 0.55)',
      zIndex: 10, whiteSpace: 'nowrap', textAlign: 'center',
    }}>
      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: '#70cc80', letterSpacing: 0.2 }}>
        🌿 Calm Flow
      </div>
      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: 'rgba(148,210,158,0.9)', marginTop: 1 }}>
        Ready to train
      </div>
    </div>
  );
}

export default function HeroScene({ animFrame }) {
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      overflow: 'hidden', background: '#0a2460',
    }}>
      <BackgroundLayer />
      <WaterfallLayer frame={animFrame} />
      <ForegroundLayer />
      <CalmFlowChip />
    </div>
  );
}
