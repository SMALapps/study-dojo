import { useState, useEffect } from 'react';

const CLOSE_MS = 620;
const OPEN_MS  = 620;
const FADE_MS  = 250;

// ── Panel dimensions ──────────────────────────────────────────────────────────
const W  = 187;
const H  = 832;
const FX = 8;           // outer wood frame thickness
const IW = W - FX * 2; // inner width = 171

// ── Section layout (Y absolute) ───────────────────────────────────────────────
// 8 + 572 + 12 + 228 + 12 = 832 ✓
const SHOJI_Y  = FX;       // shoji paper section start
const SHOJI_H  = 572;      // ~69% of H (matches reference proportions)
const SHOJI_B  = SHOJI_Y + SHOJI_H;  // 580

const RAIL_H   = 12;       // separator rail
const RAIL_B   = SHOJI_B + RAIL_H;   // 592

const TAMI_Y   = RAIL_B;              // tatami start
const TAMI_H   = 228;                 // ~27% of H
const TAMI_B   = TAMI_Y + TAMI_H;    // 820
// Bottom frame: 820–832 = 12px

// ── Shoji grid ────────────────────────────────────────────────────────────────
const COL   = Math.round(IW / 3);      // 57
const VX    = [FX + COL, FX + COL * 2]; // [65, 122]
const ROW_H = Math.round(SHOJI_H / 5); // 114
const HY_G  = [1, 2, 3, 4].map(i => SHOJI_Y + ROW_H * i); // [122,236,350,464]

function ShojiFace({ side }) {
  const uid = side === 'left' ? 'L' : 'R';

  // Handle on the inner (meeting) edge, just above separator rail
  const HX = side === 'left' ? W - FX - 20 : FX + 20;
  const HY = SHOJI_B - 24; // 556

  // Seam-shadow direction
  const csX1 = side === 'left' ? '0' : '1';
  const csX2 = side === 'left' ? '1' : '0';

  return (
    <svg
      width={W} height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        {/* ── Aged rice-paper horizontal fiber texture ── */}
        <pattern id={`pf${uid}`} width="4" height="3" patternUnits="userSpaceOnUse">
          <line x1="0" y1="1"   x2="4" y2="1"   stroke="#8a6a30" strokeWidth="0.5" opacity="0.09"/>
          <line x1="0" y1="2.5" x2="4" y2="2.5" stroke="#a08040" strokeWidth="0.3" opacity="0.06"/>
        </pattern>

        {/* ── Paper lateral vignette (darker at L/R edges) ── */}
        <linearGradient id={`pv${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#4a2e08" stopOpacity="0.22"/>
          <stop offset="16%"  stopColor="#4a2e08" stopOpacity="0"/>
          <stop offset="84%"  stopColor="#4a2e08" stopOpacity="0"/>
          <stop offset="100%" stopColor="#4a2e08" stopOpacity="0.22"/>
        </linearGradient>

        {/* ── Paper vertical vignette (dark at top, fades into paper) ── */}
        <linearGradient id={`ptv${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#1a0c02" stopOpacity="0.28"/>
          <stop offset="10%" stopColor="#1a0c02" stopOpacity="0"/>
        </linearGradient>

        {/* ── Center seam deep shadow ── */}
        <linearGradient id={`cs${uid}`} x1={csX1} y1="0" x2={csX2} y2="0">
          <stop offset="0%"   stopColor="black" stopOpacity="0"/>
          <stop offset="55%"  stopColor="black" stopOpacity="0"/>
          <stop offset="85%"  stopColor="black" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.42"/>
        </linearGradient>

        {/* ── Ambient top+bottom panel vignette ── */}
        <linearGradient id={`av${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="black" stopOpacity="0.18"/>
          <stop offset="6%"   stopColor="black" stopOpacity="0"/>
          <stop offset="94%"  stopColor="black" stopOpacity="0"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.22"/>
        </linearGradient>

        {/* ── Warm handle glow (radial, subtle) ── */}
        <radialGradient id={`hg${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#c8900a" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#c8900a" stopOpacity="0"/>
        </radialGradient>

        {/* ── Tatami diagonal basket-weave pattern ── */}
        <pattern id={`tw${uid}`} width="18" height="18" patternUnits="userSpaceOnUse">
          {/* Base warm amber */}
          <rect width="18" height="18" fill="#b89040"/>
          {/* NE-going weft thread (light) */}
          <line x1="-2" y1="12" x2="6"  y2="0"  stroke="#d4a848" strokeWidth="6" opacity="0.55"/>
          <line x1="10"  y1="20" x2="20" y2="8"  stroke="#d4a848" strokeWidth="6" opacity="0.55"/>
          {/* NW-going warp thread (dark, overlaid) */}
          <line x1="6"  y1="0"  x2="20" y2="14" stroke="#7a5018" strokeWidth="6" opacity="0.50"/>
          <line x1="-4" y1="4"  x2="6"  y2="18" stroke="#7a5018" strokeWidth="6" opacity="0.50"/>
          {/* Cross-point accent */}
          <circle cx="6"  cy="6"  r="2.5" fill="#cca040" opacity="0.35"/>
          <circle cx="14" cy="14" r="2.5" fill="#cca040" opacity="0.35"/>
        </pattern>

        {/* ── Wood rail grain texture ── */}
        <pattern id={`wg${uid}`} width="40" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="1" x2="40" y2="1.5" stroke="#2e1a08" strokeWidth="0.8" opacity="0.4"/>
          <line x1="0" y1="3" x2="40" y2="2.5" stroke="#0a0602" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
      </defs>

      {/* ══ OUTER WOOD FRAME ══ */}
      <rect width={W} height={H} fill="#170c03"/>
      {/* Frame grain overlay */}
      <rect width={W} height={H} fill={`url(#wg${uid})`}/>
      {/* Frame bevel highlights */}
      <line x1="0.5" y1="0"   x2="0.5"   y2={H}   stroke="#2e1a08" strokeWidth="1" opacity="0.7"/>
      <line x1={W-0.5} y1="0" x2={W-0.5} y2={H}   stroke="#080402" strokeWidth="1" opacity="0.8"/>
      <line x1="0" y1="0.5"   x2={W}     y2="0.5"  stroke="#2e1a08" strokeWidth="1" opacity="0.6"/>
      <line x1="0" y1={H-0.5} x2={W}     y2={H-0.5} stroke="#080402" strokeWidth="1" opacity="0.8"/>

      {/* ══ TOP INNER RAIL ══ */}
      <rect x={FX} y={FX} width={IW} height="4" fill="#1c1006"/>
      <rect x={FX} y={FX} width={IW} height="1" fill="#3a2010" opacity="0.5"/>

      {/* ══ UPPER SHOJI PAPER SECTION ══ */}
      {/* Base aged parchment — warm, not cold cream */}
      <rect x={FX} y={SHOJI_Y} width={IW} height={SHOJI_H} fill="#d0ba8a"/>
      {/* Second tonal layer: slightly warmer/lighter center zone */}
      <rect x={FX + 12} y={SHOJI_Y + 10} width={IW - 24} height={SHOJI_H - 20}
            fill="#dac898" opacity="0.6"/>
      {/* Horizontal paper fiber texture */}
      <rect x={FX} y={SHOJI_Y} width={IW} height={SHOJI_H} fill={`url(#pf${uid})`}/>
      {/* Lateral edge shadow */}
      <rect x={FX} y={SHOJI_Y} width={IW} height={SHOJI_H} fill={`url(#pv${uid})`}/>
      {/* Top-of-section drop shadow */}
      <rect x={FX} y={SHOJI_Y} width={IW} height={80} fill={`url(#ptv${uid})`}/>

      {/* ── Shoji horizontal rail dividers ── */}
      {HY_G.map((y, i) => (
        <g key={i}>
          {/* Main dark beam */}
          <rect x={FX} y={y - 2} width={IW} height="5" fill="#1e1006"/>
          {/* Beam grain */}
          <rect x={FX} y={y - 2} width={IW} height="5" fill={`url(#wg${uid})`}/>
          {/* Top edge highlight */}
          <rect x={FX} y={y - 2} width={IW} height="1" fill="#3a2010" opacity="0.7"/>
          {/* Bottom edge shadow */}
          <rect x={FX} y={y + 3} width={IW} height="1" fill="#080402" opacity="0.5"/>
          {/* Cell top-shadow (fades into cell below) */}
          <rect x={FX} y={y + 4} width={IW} height="10" fill="#0a0602" opacity="0.08"/>
        </g>
      ))}

      {/* ── Shoji vertical rail dividers ── */}
      {VX.map((x, i) => (
        <g key={i}>
          <rect x={x - 2} y={SHOJI_Y} width="5" height={SHOJI_H} fill="#1e1006"/>
          <rect x={x - 2} y={SHOJI_Y} width="5" height={SHOJI_H} fill={`url(#wg${uid})`}/>
          {/* Left face highlight */}
          <rect x={x - 2} y={SHOJI_Y} width="1" height={SHOJI_H} fill="#3a2010" opacity="0.7"/>
          {/* Right face shadow */}
          <rect x={x + 3} y={SHOJI_Y} width="1" height={SHOJI_H} fill="#080402" opacity="0.5"/>
        </g>
      ))}

      {/* ── Pixel-art corner brackets at each grid intersection ── */}
      {HY_G.flatMap((y, hi) =>
        VX.map((x, vi) => {
          const bx = x - 2, by = y - 2;
          return (
            <g key={`${hi}-${vi}`} fill="#d4a820" opacity="0.45">
              {/* NW corner dot */}
              <rect x={bx - 3} y={by - 3} width="2" height="2"/>
              {/* NE corner dot */}
              <rect x={bx + 6} y={by - 3} width="2" height="2"/>
              {/* SW corner dot */}
              <rect x={bx - 3} y={by + 6} width="2" height="2"/>
              {/* SE corner dot */}
              <rect x={bx + 6} y={by + 6} width="2" height="2"/>
            </g>
          );
        })
      )}

      {/* ══ SEPARATOR RAIL ══ */}
      <rect x={FX} y={SHOJI_B}     width={IW} height={RAIL_H} fill="#170c03"/>
      <rect x={FX} y={SHOJI_B}     width={IW} height={RAIL_H} fill={`url(#wg${uid})`}/>
      {/* Rail top edge highlight */}
      <rect x={FX} y={SHOJI_B}     width={IW} height="1"      fill="#3a2010" opacity="0.7"/>
      {/* Rail inner highlight at mid */}
      <rect x={FX} y={SHOJI_B + 5} width={IW} height="1"      fill="#2e1a08" opacity="0.4"/>
      {/* Rail bottom shadow */}
      <rect x={FX} y={RAIL_B - 1}  width={IW} height="1"      fill="#060402" opacity="0.7"/>

      {/* ══ TATAMI / WOVEN BAMBOO SECTION ══ */}
      <rect x={FX} y={TAMI_Y} width={IW} height={TAMI_H} fill={`url(#tw${uid})`}/>
      {/* Tatami lateral vignette */}
      <rect x={FX} y={TAMI_Y} width={IW} height={TAMI_H} fill={`url(#pv${uid})`} opacity="0.55"/>
      {/* Top ambient shadow into tatami */}
      <rect x={FX} y={TAMI_Y} width={IW} height="18" fill="#0a0602" opacity="0.18"/>
      {/* Top accent line */}
      <rect x={FX} y={TAMI_Y}     width={IW} height="2" fill="#0e0804" opacity="0.5"/>
      <rect x={FX} y={TAMI_Y + 2} width={IW} height="1" fill="#c8a040" opacity="0.12"/>
      {/* Bottom accent line */}
      <rect x={FX} y={TAMI_B - 2} width={IW} height="2" fill="#0e0804" opacity="0.5"/>

      {/* ══ BOTTOM FRAME RAIL ══ */}
      <rect x={FX} y={TAMI_B} width={IW} height="4" fill="#1c1006"/>
      <rect x={FX} y={TAMI_B} width={IW} height="1" fill="#3a2010" opacity="0.4"/>

      {/* ══ INNER BEVEL LINE ══ */}
      <rect x={FX + 1} y={FX + 1} width={IW - 2} height={H - FX * 2 - 2}
            fill="none" stroke="#2e1a08" strokeWidth="1" opacity="0.55"/>

      {/* ══ CENTER SEAM SHADOW ══ */}
      <rect x={FX} y={FX} width={IW} height={H - FX * 2} fill={`url(#cs${uid})`}/>

      {/* ══ AMBIENT TOP / BOTTOM VIGNETTE ══ */}
      <rect width={W} height={H} fill={`url(#av${uid})`}/>

      {/* ══ WARM HANDLE GLOW (environmental) ══ */}
      <ellipse cx={HX} cy={HY} rx={40} ry={36}
               fill={`url(#hg${uid})`}/>

      {/* ══ ORNATE BRASS MEDALLION HANDLE ══ */}
      {/* Drop shadow */}
      <ellipse cx={HX + 1} cy={HY + 3} rx={17} ry={16} fill="#080402" opacity="0.35"/>
      {/* Outer dark bezel */}
      <circle cx={HX} cy={HY} r={17} fill="#1e1208"/>
      {/* Bezel highlight ring */}
      <circle cx={HX} cy={HY} r={17} fill="none" stroke="#4a3010" strokeWidth="1.5" opacity="0.6"/>
      {/* Brass base plate */}
      <circle cx={HX} cy={HY} r={14} fill="#9a7208"/>
      {/* Gold raised face */}
      <circle cx={HX} cy={HY} r={12} fill="#c89010"/>
      {/* Face highlight gradient approximation */}
      <ellipse cx={HX - 2} cy={HY - 3} rx={7} ry={6} fill="#ddb828" opacity="0.4"/>
      {/* Inner dark channel ring */}
      <circle cx={HX} cy={HY} r={9}  fill="none" stroke="#2a1808" strokeWidth="2.5"/>
      {/* Inner boss */}
      <circle cx={HX} cy={HY} r={7}  fill="#b88a0a"/>
      {/* Inner gold */}
      <circle cx={HX} cy={HY} r={5}  fill="#d4a818"/>
      {/* Decorative 4-petal pattern (matching reference's knotwork) */}
      <circle cx={HX}      cy={HY - 4} r={3} fill="#1e1208" opacity="0.8"/>
      <circle cx={HX}      cy={HY + 4} r={3} fill="#1e1208" opacity="0.8"/>
      <circle cx={HX - 4}  cy={HY}     r={3} fill="#1e1208" opacity="0.8"/>
      <circle cx={HX + 4}  cy={HY}     r={3} fill="#1e1208" opacity="0.8"/>
      {/* Petal highlights */}
      <circle cx={HX}      cy={HY - 4} r={1.5} fill="#c89010" opacity="0.6"/>
      <circle cx={HX}      cy={HY + 4} r={1.5} fill="#c89010" opacity="0.6"/>
      <circle cx={HX - 4}  cy={HY}     r={1.5} fill="#c89010" opacity="0.6"/>
      <circle cx={HX + 4}  cy={HY}     r={1.5} fill="#c89010" opacity="0.6"/>
      {/* Center pivot */}
      <circle cx={HX} cy={HY} r={2.5} fill="#2a1808"/>
      <circle cx={HX} cy={HY} r={1}   fill="#c89010"/>
      {/* Primary specular highlight */}
      <circle cx={HX - 4} cy={HY - 5} r={2.5} fill="#f0d040" opacity="0.6"/>
      {/* Secondary rim catch-light */}
      <circle cx={HX + 6} cy={HY - 8} r={1.2} fill="#ffe080" opacity="0.35"/>
    </svg>
  );
}

function DojoPanel({ side, localPos, phase, reducedMotion }) {
  const isLeft   = side === 'left';
  const atCenter = localPos === 'center';
  const animating = phase === 'closing' || phase === 'opening';

  // CSS inward shadow deepens the center seam when closed
  const seamShadow = isLeft
    ? 'inset -8px 0 16px rgba(0,0,0,0.45)'
    : 'inset  8px 0 16px rgba(0,0,0,0.45)';

  const style = reducedMotion
    ? {
        position: 'absolute', top: 0, [isLeft ? 'left' : 'right']: 0,
        width: W, height: '100%',
        opacity: atCenter ? 1 : 0,
        transition: animating ? `opacity ${FADE_MS}ms ease` : 'none',
        pointerEvents: 'none',
        boxShadow: atCenter ? seamShadow : 'none',
      }
    : {
        position: 'absolute', top: 0, [isLeft ? 'left' : 'right']: 0,
        width: W, height: '100%',
        transform: `translateX(${atCenter ? '0%' : (isLeft ? '-100%' : '100%')})`,
        transition: animating
          ? `transform ${phase === 'opening' ? OPEN_MS : CLOSE_MS}ms cubic-bezier(0.42, 0, 0.18, 1)`
          : 'none',
        pointerEvents: 'none',
        boxShadow: seamShadow,
      };

  return <div style={style}><ShojiFace side={side} /></div>;
}

// phase: null | 'closing' | 'closed' | 'opening'
// App.jsx owns all timing — this component is purely presentational.
export default function DojoDoorTransition({ phase, reducedMotion = false }) {
  const [localPos, setLocalPos] = useState(() =>
    phase === 'closed' ? 'center' : 'offscreen'
  );

  useEffect(() => {
    if (phase === 'closing') {
      setLocalPos('offscreen');
      let raf2;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setLocalPos('center'));
      });
      return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
    }
    if (phase === 'closed')  { setLocalPos('center');    return; }
    if (phase === 'opening') { setLocalPos('offscreen'); return; }
    if (!phase)              { setLocalPos('offscreen'); return; }
  }, [phase]);

  if (!phase && localPos === 'offscreen') return null;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200,
      overflow: 'hidden',
      pointerEvents: phase ? 'all' : 'none',
    }}>
      <DojoPanel side="left"  localPos={localPos} phase={phase} reducedMotion={reducedMotion} />
      <DojoPanel side="right" localPos={localPos} phase={phase} reducedMotion={reducedMotion} />
    </div>
  );
}
