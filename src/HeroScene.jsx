import { useEffect, useRef } from 'react';

// Canvas resolution: 186×128 → each pixel renders as ~2×2 CSS pixels
// This gives crisp pixel-art scaling inside the 373×256 CSS hero area.
//
// Layer architecture — each canvas slot maps to a future PNG asset:
//   BackgroundLayer  → daytime_waterfall_background.png
//   WaterfallLayer   → waterfall_spritesheet.png + pool_ripples_spritesheet.png
//   ForegroundLayer  → ninja_white_belt_spritesheet.png + lanterns_foreground.png
//   CalmFlowChip     → HTML overlay (always code)
const W = 186;
const H = 128;
const CX = 93; // horizontal centre

const LAYER = {
  position: 'absolute',
  top: 0, left: 0,
  width: '100%', height: '100%',
  imageRendering: 'pixelated',
};

function fr(ctx, x, y, w, h, c) {
  if (w <= 0 || h <= 0) return;
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
}

function mkCtx(canvas) {
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  canvas.width = W;
  canvas.height = H;
  ctx.clearRect(0, 0, W, H);
  return ctx;
}

// ─── Background layer ─────────────────────────────────────────────────────────
// sky · sun · clouds · distant ridge · cliffs · trees
// Future: swap canvas draws for daytime_waterfall_background.png

function drawBackground(canvas) {
  const ctx = mkCtx(canvas);
  if (!ctx) return;

  // Sky bands
  [
    [0,  7,  '#0c4898'],
    [7,  15, '#165cb4'],
    [15, 25, '#2474cc'],
    [25, 35, '#3c8ed8'],
    [35, 46, '#54a6e0'],
    [46, 56, '#72bce8'],
  ].forEach(([y1, y2, c]) => fr(ctx, 0, y1, W, y2 - y1, c));

  // Sun
  const sx = CX, sy = 11;
  fr(ctx, sx - 9, sy - 9, 18, 18, '#fff8c8');
  fr(ctx, sx - 7, sy - 7, 14, 14, '#ffffa8');
  fr(ctx, sx - 5, sy - 5, 10, 10, '#fffff0');
  fr(ctx, sx - 3, sy - 3, 6,  6,  '#ffffff');

  // Clouds
  cloud(ctx, 4,  17);
  cloud(ctx, 56, 9);
  cloud(ctx, 120, 14);

  // Distant tree ridge (behind cliffs)
  fr(ctx, 26, 20, 26, 38, '#143014');
  fr(ctx, 28, 15, 20, 30, '#1c4020');
  fr(ctx, 30, 10, 14, 22, '#265030');
  fr(ctx, 130, 20, 26, 38, '#143014');
  fr(ctx, 132, 15, 20, 30, '#1c4020');
  fr(ctx, 134, 10, 14, 22, '#265030');

  // Left cliff
  fr(ctx, 0,  22, 8,  H - 22, '#181610');
  fr(ctx, 8,  20, 10, H - 20, '#22200e');
  fr(ctx, 18, 22, 8,  H - 22, '#2e2c1c');
  fr(ctx, 26, 24, 6,  H - 24, '#3a382c');
  // Texture lines
  fr(ctx, 10, 30, 2, 20, '#1c1a0e');
  fr(ctx, 14, 42, 2, 16, '#262412');
  fr(ctx, 20, 36, 2, 18, '#2a2816');
  // Moss
  fr(ctx, 8,  19, 20, 4, '#1e3a16');
  fr(ctx, 12, 16, 16, 4, '#2a4e20');
  fr(ctx, 16, 13, 10, 4, '#365e2c');
  fr(ctx, 20, 10, 6,  4, '#426e38');

  // Right cliff
  fr(ctx, 178, 22, 8,  H - 22, '#181610');
  fr(ctx, 168, 20, 10, H - 20, '#22200e');
  fr(ctx, 160, 22, 8,  H - 22, '#2e2c1c');
  fr(ctx, 154, 24, 6,  H - 24, '#3a382c');
  fr(ctx, 174, 30, 2, 20, '#1c1a0e');
  fr(ctx, 170, 42, 2, 16, '#262412');
  fr(ctx, 164, 36, 2, 18, '#2a2816');
  fr(ctx, 154, 19, 20, 4, '#1e3a16');
  fr(ctx, 154, 16, 16, 4, '#2a4e20');
  fr(ctx, 156, 13, 10, 4, '#365e2c');
  fr(ctx, 158, 10, 6,  4, '#426e38');

  // Left trees
  tree(ctx, -2, 0,  12, 34);
  tree(ctx, 6,  -2, 14, 40);
  tree(ctx, 14, 1,  12, 34);
  tree(ctx, 20, 5,  10, 28);
  // Cliff face greenery
  fr(ctx, 0, 52, 22, 6, '#183218');
  fr(ctx, 0, 58, 18, 6, '#204820');
  fr(ctx, 0, 64, 12, 6, '#285828');

  // Right trees
  tree(ctx, 176, 0,  12, 34);
  tree(ctx, 162, -2, 14, 40);
  tree(ctx, 150, 1,  12, 34);
  tree(ctx, 143, 5,  10, 28);
  fr(ctx, 164, 52, 22, 6, '#183218');
  fr(ctx, 168, 58, 18, 6, '#204820');
  fr(ctx, 172, 64, 12, 6, '#285828');

  // Ground banks
  fr(ctx, 0,   112, 22, 16, '#1a1810');
  fr(ctx, 164, 112, 22, 16, '#1a1810');
  fr(ctx, 0,   122, W,  6,  '#141210');
}

function cloud(ctx, x, y) {
  fr(ctx, x + 4, y + 8, 26, 5, '#a8c8e0');
  fr(ctx, x,     y + 5, 32, 7, '#cce0f0');
  fr(ctx, x + 2, y + 3, 26, 6, '#daeeff');
  fr(ctx, x + 4, y + 1, 20, 5, '#eaf4ff');
  fr(ctx, x + 8, y - 1, 14, 4, '#f2f8ff');
  fr(ctx, x + 12, y - 3, 8, 4, '#f8fcff');
  fr(ctx, x + 6,  y + 2, 6, 3, '#e4f0ff');
  fr(ctx, x + 18, y + 1, 6, 3, '#e4f0ff');
}

function tree(ctx, x, topY, w, h) {
  const trunkW = Math.max(2, Math.round(w * 0.28));
  const trunkX = Math.round(x + (w - trunkW) / 2);
  const trunkTop = Math.round(topY + h * 0.56);
  const trunkH = h - (trunkTop - topY);
  if (trunkH > 0) fr(ctx, trunkX, trunkTop, trunkW, trunkH, '#201408');
  fr(ctx, x - 1, Math.round(topY + h * 0.38), w + 2, Math.round(h * 0.22), '#122a10');
  fr(ctx, x,     Math.round(topY + h * 0.24), w,     Math.round(h * 0.18), '#1c401e');
  fr(ctx, x + 1, Math.round(topY + h * 0.13), w - 2, Math.round(h * 0.14), '#265430');
  fr(ctx, x + 2, Math.round(topY + h * 0.05), w - 4, Math.round(h * 0.10), '#306840');
  fr(ctx, x + 3, Math.round(topY),             w - 6, Math.round(h * 0.07), '#3c7c4c');
  fr(ctx, x + 4, Math.round(topY) + 2, Math.max(1, w - 10), 2, '#4a8c5a');
}

// ─── Waterfall + Pool layer (animated) ────────────────────────────────────────
// Future: waterfall_spritesheet.png, pool_ripples_spritesheet.png, mist_overlay.png

function drawWaterfall(canvas, frame) {
  const ctx = mkCtx(canvas);
  if (!ctx) return;
  const f = frame % 16;

  function stream(x1, x2, topY, botY) {
    const w = x2 - x1;
    const h = botY - topY;
    // Base water column
    fr(ctx, x1, topY, w, h, '#1a5898');
    // Column depth bands
    fr(ctx, x1,     topY, 4, h, '#5898c8');
    fr(ctx, x1 + 4, topY, 5, h, '#3070b0');
    fr(ctx, x1 + 9, topY, w - 18, h, '#1850a0');
    fr(ctx, x2 - 9, topY, 5, h, '#3070b0');
    fr(ctx, x2 - 4, topY, 4, h, '#5898c8');
    // Animated streaks scrolling down
    for (let i = 0; i < 8; i++) {
      const sy = topY + Math.round((f * 3 + i * Math.floor(h / 8)) % h);
      fr(ctx, x1 + 2, sy,     w - 4, 1, '#90c0e0');
      fr(ctx, x1 + 3, sy + 1, w - 6, 2, '#70a8d0');
      fr(ctx, x1 + 5, sy,     w - 10, 1, '#c0daf0');
    }
    // Foam top
    fr(ctx, x1,     topY, w, 3, '#d0eaf8');
    fr(ctx, x1 + 2, topY, w - 4, 2, '#e4f2ff');
    fr(ctx, x1 + 4, topY, w - 8, 1, '#f0f8ff');
  }

  // Two main streams
  stream(48, 84, 15, 94);
  stream(102, 138, 15, 94);

  // Centre mist between streams
  fr(ctx, 84, 60, 18, 34, '#2c5a90');
  for (let i = 0; i < 8; i++) {
    const my = 60 + Math.round((f * 2 + i * 5) % 34);
    fr(ctx, 86 + (i % 3) * 5, my, 3, 1, '#6090b8');
  }

  // Overflow at cliff edge
  fr(ctx, 48, 12, 36, 4, '#c0dcf4');
  fr(ctx, 102, 12, 36, 4, '#c0dcf4');

  // Pool water
  const pt = 94;
  fr(ctx, 20, pt,     146, 28, '#081c3c');
  fr(ctx, 22, pt + 2, 142, 22, '#0c2450');
  fr(ctx, 26, pt + 4, 134, 18, '#122c60');
  fr(ctx, 30, pt + 6, 126, 14, '#18366e');
  fr(ctx, 36, pt + 8, 114, 10, '#1e407c');
  fr(ctx, 44, pt + 10, 98, 6,  '#264888');
  // Pool light strips
  fr(ctx, 44, pt + 9, 28, 4, '#244490');
  fr(ctx, 114, pt + 9, 28, 4, '#244490');

  // Splash at waterfall base
  for (let x = 50; x < 82; x += 2) {
    if ((x + f) % 4 === 0) fr(ctx, x, pt,     2, 3, '#a0c8e4');
    if ((x + f) % 6 === 0) fr(ctx, x, pt - 1, 1, 2, '#cce0f4');
  }
  for (let x = 104; x < 136; x += 2) {
    if ((x + f) % 4 === 0) fr(ctx, x, pt,     2, 3, '#a0c8e4');
    if ((x + f) % 6 === 0) fr(ctx, x, pt - 1, 1, 2, '#cce0f4');
  }

  // Pool ripples
  [36, 58, 80, 106, 128, 150].forEach((rx, i) => {
    if ((f + i * 3) % 12 < 6) {
      fr(ctx, rx, pt + 12 + (i % 3) * 4, 10, 1, '#183e78');
      fr(ctx, rx + 2, pt + 13 + (i % 3) * 4, 6, 1, '#1e4a84');
    }
  });

  // Pool bottom fade
  fr(ctx, 20, pt + 24, 146, 4, '#040e1e');
  // Banks
  fr(ctx, 0,   110, 22, 18, '#181610');
  fr(ctx, 164, 110, 22, 18, '#181610');
}

// ─── Foreground layer ─────────────────────────────────────────────────────────
// rocks · lanterns · ninja · foreground plants
// Future: ninja_white_belt_spritesheet.png, lanterns_foreground.png

function drawForeground(canvas) {
  const ctx = mkCtx(canvas);
  if (!ctx) return;
  drawRocks(ctx);
  drawLantern(ctx, 36);
  drawLantern(ctx, 150);
  drawNinja(ctx);
  drawFgPlants(ctx);
}

function drawRocks(ctx) {
  // Centre meditation rock
  fr(ctx, 78, 92, 30, 7, '#201e14');
  fr(ctx, 80, 90, 26, 4, '#2c2a1c');
  fr(ctx, 82, 88, 22, 3, '#3a3828');
  fr(ctx, 84, 87, 18, 2, '#4a4838');
  fr(ctx, 87, 92, 4,  3, '#282616');
  fr(ctx, 96, 93, 4,  2, '#282616');
  // Left rock
  fr(ctx, 22, 100, 24, 8, '#201e14');
  fr(ctx, 24,  98, 20, 4, '#2c2a1c');
  fr(ctx, 26,  96, 16, 3, '#3a3828');
  // Right rock
  fr(ctx, 140, 100, 24, 8, '#201e14');
  fr(ctx, 142,  98, 20, 4, '#2c2a1c');
  fr(ctx, 144,  96, 16, 3, '#3a3828');
}

function drawLantern(ctx, cx) {
  // Post
  fr(ctx, cx - 1, 89, 2, 17, '#2e2c1e');
  // Base slab
  fr(ctx, cx - 8, 104, 16, 5, '#383620');
  fr(ctx, cx - 9, 108, 18, 3, '#282618');
  // Roof
  fr(ctx, cx - 10, 79, 20, 4, '#1e1c10');
  fr(ctx, cx - 8,  76, 16, 4, '#282618');
  fr(ctx, cx - 6,  73, 12, 4, '#343220');
  fr(ctx, cx - 4,  71, 8,  3, '#403e2c');
  // Body outer frame
  fr(ctx, cx - 9,  83, 18, 22, '#282618');
  fr(ctx, cx - 8,  84, 16, 20, '#343224');
  fr(ctx, cx - 7,  85, 14, 18, '#403e2c');
  // Warm glow fill
  fr(ctx, cx - 6,  86, 12, 16, '#d4a028');
  fr(ctx, cx - 5,  87, 10, 14, '#e4b030');
  fr(ctx, cx - 3,  88, 6,  12, '#f0c038');
  // Orange flame centre
  fr(ctx, cx - 3,  90, 6,  8, '#c85018');
  fr(ctx, cx - 2,  91, 4,  6, '#de6420');
  fr(ctx, cx - 1,  92, 2,  4, '#ee8030');
}

function drawNinja(ctx) {
  const cx = CX;

  // ── Legs (crossed, sitting) ────────────────────────────────────────────────
  fr(ctx, cx - 13, 90, 26, 11, '#0c0c0c');
  fr(ctx, cx - 12, 91, 11, 9,  '#101010'); // left leg shade
  fr(ctx, cx + 1,  91, 11, 9,  '#101010'); // right leg shade
  // Foot bumps
  fr(ctx, cx - 12, 98, 7, 4, '#141414');
  fr(ctx, cx + 5,  98, 7, 4, '#141414');

  // WHITE BELT on legs (bold, clearly visible)
  fr(ctx, cx - 13, 91, 26, 3, '#d0d0d0');
  fr(ctx, cx - 10, 91, 20, 3, '#e8e8e8'); // brighter centre strip
  // Belt knot / drape
  fr(ctx, cx - 2,  91, 4, 9, '#c0c0c0');
  fr(ctx, cx - 1,  94, 2, 6, '#b0b0b0');

  // ── Torso ──────────────────────────────────────────────────────────────────
  fr(ctx, cx - 9, 77, 18, 14, '#0c0c0c');
  fr(ctx, cx - 8, 78, 3,  12, '#0a0a0a'); // left shadow
  fr(ctx, cx + 5, 78, 3,  12, '#0a0a0a'); // right shadow
  // Hands clasped in lap
  fr(ctx, cx - 4, 83, 8, 6, '#161616');
  fr(ctx, cx - 3, 84, 6, 4, '#1e1e1e');
  fr(ctx, cx - 2, 85, 4, 3, '#262626');
  // WHITE BELT on torso
  fr(ctx, cx - 9, 87, 18, 3, '#d0d0d0');
  fr(ctx, cx - 7, 87, 14, 3, '#e8e8e8');

  // ── Shoulders ─────────────────────────────────────────────────────────────
  fr(ctx, cx - 11, 76, 4, 7, '#0c0c0c');
  fr(ctx, cx + 7,  76, 4, 7, '#0c0c0c');

  // ── Head ──────────────────────────────────────────────────────────────────
  fr(ctx, cx - 7, 64, 14, 13, '#0c0c0c');
  // Hood top
  fr(ctx, cx - 5, 62, 10, 3, '#0c0c0c');
  fr(ctx, cx - 3, 60, 6,  3, '#0c0c0c');
  fr(ctx, cx - 1, 58, 2,  3, '#0c0c0c');

  // WHITE HEADBAND (clearly visible across forehead)
  fr(ctx, cx - 8, 68, 16, 3, '#d4d4d4');
  fr(ctx, cx - 6, 68, 12, 3, '#eeeeee'); // bright centre
  // Headband tie trailing right (narrowing)
  fr(ctx, cx + 7, 68, 9, 2, '#cccccc');
  fr(ctx, cx + 8, 70, 8, 2, '#bcbcbc');
  fr(ctx, cx + 9, 72, 5, 1, '#acacac');
  fr(ctx, cx + 10,73, 4, 1, '#9c9c9c');

  // EYES — gold, visible just below headband
  fr(ctx, cx - 4, 73, 3, 2, '#c09820');
  fr(ctx, cx + 1, 73, 3, 2, '#c09820');
  // Eye highlights
  fr(ctx, cx - 3, 73, 1, 1, '#e0b428');
  fr(ctx, cx + 2, 73, 1, 1, '#e0b428');

  // Lower face mask
  fr(ctx, cx - 6, 75, 12, 4, '#121212');
}

function drawFgPlants(ctx) {
  // Bottom-left greenery
  fr(ctx, 0,  116, 22, 8, '#102210');
  fr(ctx, 0,  120, 18, 6, '#183018');
  fr(ctx, 2,  114, 10, 6, '#204020');
  fr(ctx, 4,  112, 6,  5, '#284e28');
  // Bottom-right greenery
  fr(ctx, 164, 116, 22, 8, '#102210');
  fr(ctx, 168, 120, 18, 6, '#183018');
  fr(ctx, 174, 114, 10, 6, '#204020');
  fr(ctx, 176, 112, 6,  5, '#284e28');
}

// ─── React layer components ────────────────────────────────────────────────────

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
      position: 'absolute',
      top: 12,
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(18, 44, 24, 0.88)',
      backdropFilter: 'blur(6px)',
      borderRadius: 10,
      padding: '5px 14px 6px',
      textAlign: 'center',
      border: '1px solid rgba(80, 160, 90, 0.5)',
      zIndex: 10,
      whiteSpace: 'nowrap',
    }}>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
        fontWeight: 600,
        color: '#72c87e',
        letterSpacing: 0.2,
      }}>🌿 Calm Flow</div>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 10,
        color: 'rgba(150, 210, 160, 0.9)',
        marginTop: 1,
      }}>Ready to train</div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function HeroScene({ animFrame }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      background: '#0c4898',
    }}>
      <BackgroundLayer />
      <WaterfallLayer frame={animFrame} />
      <ForegroundLayer />
      <CalmFlowChip />
    </div>
  );
}
