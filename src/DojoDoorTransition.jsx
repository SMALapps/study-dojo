import { useState, useEffect } from 'react';

const CLOSE_MS = 620;
const OPEN_MS  = 620;
const FADE_MS  = 250;

// ── Panel layout constants (all absolute Y from SVG top) ──────────────────
// Total: 6 + 8 + 16 + 3 + 534 + 5 + 100 + 5 + 120 + 5 + 16 + 8 + 6 = 832 ✓
const W  = 187, H = 832;
const FX = 6;             // outer frame thickness (all sides)
const IW = W - FX * 2;   // inner width = 175

const LAYOUT = {
  topRail:  { y: 6,   h: 8   },
  greenT:   { y: 14,  h: 16  },
  rail0:    { y: 30,  h: 3   },
  shojiHi:  { y: 33,  h: 534 },
  rail1:    { y: 567, h: 5   },
  shojiLo:  { y: 572, h: 100 },
  rail2:    { y: 672, h: 5   },
  tatami:   { y: 677, h: 120 },
  rail3:    { y: 797, h: 5   },
  greenB:   { y: 802, h: 16  },
  botRail:  { y: 818, h: 8   },
};

// Shoji grid
const COL = Math.round(IW / 3);         // 58
const VX  = [FX + COL, FX + COL * 2];  // [64, 122]

const hiRow = Math.round(LAYOUT.shojiHi.h / 5);  // 107
const HI_H  = [1, 2, 3, 4].map(i => LAYOUT.shojiHi.y + hiRow * i); // [140,247,354,461]
const LO_H  = [LAYOUT.shojiLo.y + Math.round(LAYOUT.shojiLo.h / 2)]; // [622]

function ShojiFace({ side }) {
  const uid = side === 'left' ? 'L' : 'R';
  const L   = LAYOUT;

  // Handle sits on the inner (meeting) edge, vertically centred at 44%
  const HX  = side === 'left' ? W - FX - 15 : FX + 15;
  const HY  = Math.round(H * 0.44);  // 366

  // Seam-shadow gradient direction: darkest at the inner edge
  const seamX1 = side === 'left' ? '0' : '1';
  const seamX2 = side === 'left' ? '1' : '0';

  return (
    <svg
      width={W} height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        {/* Rice-paper diagonal grain */}
        <pattern id={`pg${uid}`} width="8" height="8" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="8" y2="8" stroke="#9a8050" strokeWidth="0.6" opacity="0.08"/>
          <line x1="8" y1="0" x2="0" y2="8" stroke="#9a8050" strokeWidth="0.6" opacity="0.05"/>
        </pattern>

        {/* Paper lateral edge shadow (darker at left & right rims) */}
        <linearGradient id={`pe${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#5a3c10" stopOpacity="0.28"/>
          <stop offset="14%"  stopColor="#5a3c10" stopOpacity="0"/>
          <stop offset="86%"  stopColor="#5a3c10" stopOpacity="0"/>
          <stop offset="100%" stopColor="#5a3c10" stopOpacity="0.28"/>
        </linearGradient>

        {/* Top-of-paper shadow (fades downward) */}
        <linearGradient id={`pts${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#2a1a04" stopOpacity="0.22"/>
          <stop offset="12%" stopColor="#2a1a04" stopOpacity="0"/>
        </linearGradient>

        {/* Center seam shadow — deepens the inner meeting edge */}
        <linearGradient id={`cs${uid}`} x1={seamX1} y1="0" x2={seamX2} y2="0">
          <stop offset="0%"   stopColor="black" stopOpacity="0"/>
          <stop offset="65%"  stopColor="black" stopOpacity="0"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.32"/>
        </linearGradient>

        {/* Tatami basket-weave: weft rows + warp dividers */}
        <pattern id={`tw${uid}`} width="14" height="10" patternUnits="userSpaceOnUse">
          <rect width="14" height="10" fill="#b89050"/>
          {/* upper weft thread */}
          <rect x="0" y="0" width="14" height="4" fill="#caa85a" opacity="0.32"/>
          {/* lower weft shadow */}
          <rect x="0" y="6" width="14" height="4" fill="#8a6830" opacity="0.28"/>
          {/* warp thread */}
          <rect x="6"  y="0" width="2" height="10" fill="#6e5020" opacity="0.22"/>
        </pattern>

        {/* Forest green gradient for accent rails */}
        <linearGradient id={`gg${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#527840"/>
          <stop offset="100%" stopColor="#2e4a1c"/>
        </linearGradient>

        {/* Wood frame subtle highlight ramp */}
        <linearGradient id={`wf${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#3a2010" stopOpacity="0.5"/>
          <stop offset="50%"  stopColor="#3a2010" stopOpacity="0"/>
          <stop offset="100%" stopColor="#3a2010" stopOpacity="0.5"/>
        </linearGradient>
      </defs>

      {/* ══ OUTER WOOD FRAME ══ */}
      <rect width={W} height={H} fill="#160c02"/>
      {/* Wood face highlight band */}
      <rect width={W} height={H} fill={`url(#wf${uid})`}/>
      {/* Outer bevel: top & left bright edge */}
      <line x1="0" y1="0" x2={W}  y2="0"  stroke="#3a2010" strokeWidth="1.5" opacity="0.6"/>
      <line x1="0" y1="0" x2="0"  y2={H}  stroke="#3a2010" strokeWidth="1.5" opacity="0.6"/>
      {/* Outer bevel: bottom & right dark edge */}
      <line x1="0"    y1={H-1} x2={W} y2={H-1} stroke="#0a0602" strokeWidth="1.5" opacity="0.8"/>
      <line x1={W-1}  y1="0"   x2={W-1} y2={H} stroke="#0a0602" strokeWidth="1.5" opacity="0.8"/>

      {/* ══ TOP INNER DARK RAIL ══ */}
      <rect x={FX} y={L.topRail.y} width={IW} height={L.topRail.h} fill="#1a0e04"/>
      <rect x={FX} y={L.topRail.y} width={IW} height="1"           fill="#2e1a08" opacity="0.6"/>

      {/* ══ TOP GREEN ACCENT ══ */}
      <rect x={FX} y={L.greenT.y} width={IW} height={L.greenT.h} fill={`url(#gg${uid})`}/>
      {/* Green top highlight */}
      <rect x={FX} y={L.greenT.y}                    width={IW} height="1" fill="#6a9050" opacity="0.7"/>
      {/* Green bottom shadow */}
      <rect x={FX} y={L.greenT.y + L.greenT.h - 1}  width={IW} height="1" fill="#1a2e10" opacity="0.9"/>
      {/* Green inner dots (pixel-art detail) */}
      {[24, 48, 72, 96, 120, 144].map(x => (
        <rect key={x} x={FX + x} y={L.greenT.y + 6} width="2" height="2" fill="#3a5828" opacity="0.5"/>
      ))}

      {/* ══ RAIL 0 ══ */}
      <rect x={FX} y={L.rail0.y} width={IW} height={L.rail0.h} fill="#100804"/>

      {/* ══ UPPER SHOJI PAPER ══ */}
      {/* Base paper */}
      <rect x={FX} y={L.shojiHi.y} width={IW} height={L.shojiHi.h} fill="#ede5c8"/>
      {/* Paper grain overlay */}
      <rect x={FX} y={L.shojiHi.y} width={IW} height={L.shojiHi.h} fill={`url(#pg${uid})`}/>
      {/* Paper lateral edge shadow */}
      <rect x={FX} y={L.shojiHi.y} width={IW} height={L.shojiHi.h} fill={`url(#pe${uid})`}/>
      {/* Top-of-section drop shadow */}
      <rect x={FX} y={L.shojiHi.y} width={IW} height={Math.round(L.shojiHi.h * 0.12)}
            fill={`url(#pts${uid})`}/>

      {/* Upper shoji horizontal divisions */}
      {HI_H.map((y, i) => (
        <g key={i}>
          {/* Main divider beam */}
          <rect x={FX} y={y - 1} width={IW} height="3" fill="#6a4820" opacity="0.75"/>
          {/* Beam top highlight */}
          <rect x={FX} y={y - 1} width={IW} height="1" fill="#c8a060" opacity="0.45"/>
          {/* Beam bottom shadow */}
          <rect x={FX} y={y + 2} width={IW} height="1" fill="#1a0e04" opacity="0.2"/>
        </g>
      ))}

      {/* Upper shoji vertical divisions */}
      {VX.map((x, i) => (
        <g key={i}>
          <rect x={x - 1} y={L.shojiHi.y} width="3" height={L.shojiHi.h} fill="#6a4820" opacity="0.75"/>
          <rect x={x - 1} y={L.shojiHi.y} width="1" height={L.shojiHi.h} fill="#c8a060" opacity="0.4"/>
          <rect x={x + 2} y={L.shojiHi.y} width="1" height={L.shojiHi.h} fill="#1a0e04" opacity="0.18"/>
        </g>
      ))}

      {/* ══ MID RAIL ══ */}
      <rect x={FX} y={L.rail1.y}     width={IW} height={L.rail1.h} fill="#100804"/>
      <rect x={FX} y={L.rail1.y}     width={IW} height="1" fill="#3a2010" opacity="0.6"/>
      <rect x={FX} y={L.rail1.y + 4} width={IW} height="1" fill="#0a0602" opacity="0.5"/>

      {/* ══ LOWER SHOJI PAPER ══ */}
      <rect x={FX} y={L.shojiLo.y} width={IW} height={L.shojiLo.h} fill="#ede5c8"/>
      <rect x={FX} y={L.shojiLo.y} width={IW} height={L.shojiLo.h} fill={`url(#pg${uid})`}/>
      <rect x={FX} y={L.shojiLo.y} width={IW} height={L.shojiLo.h} fill={`url(#pe${uid})`}/>
      <rect x={FX} y={L.shojiLo.y} width={IW} height={Math.round(L.shojiLo.h * 0.18)}
            fill={`url(#pts${uid})`}/>

      {/* Lower shoji horizontal division */}
      {LO_H.map((y, i) => (
        <g key={i}>
          <rect x={FX} y={y - 1} width={IW} height="3" fill="#6a4820" opacity="0.75"/>
          <rect x={FX} y={y - 1} width={IW} height="1" fill="#c8a060" opacity="0.45"/>
          <rect x={FX} y={y + 2} width={IW} height="1" fill="#1a0e04" opacity="0.2"/>
        </g>
      ))}

      {/* Lower shoji vertical divisions */}
      {VX.map((x, i) => (
        <g key={i}>
          <rect x={x - 1} y={L.shojiLo.y} width="3" height={L.shojiLo.h} fill="#6a4820" opacity="0.75"/>
          <rect x={x - 1} y={L.shojiLo.y} width="1" height={L.shojiLo.h} fill="#c8a060" opacity="0.4"/>
          <rect x={x + 2} y={L.shojiLo.y} width="1" height={L.shojiLo.h} fill="#1a0e04" opacity="0.18"/>
        </g>
      ))}

      {/* ══ RAIL 2 ══ */}
      <rect x={FX} y={L.rail2.y} width={IW} height={L.rail2.h} fill="#100804"/>

      {/* ══ TATAMI WEAVE BAND ══ */}
      <rect x={FX} y={L.tatami.y} width={IW} height={L.tatami.h} fill={`url(#tw${uid})`}/>
      {/* Tatami edge shadows (top & bottom) */}
      <rect x={FX} y={L.tatami.y}                       width={IW} height="5"
            fill="#2a1a04" opacity="0.25"/>
      <rect x={FX} y={L.tatami.y + L.tatami.h - 5}     width={IW} height="5"
            fill="#2a1a04" opacity="0.25"/>
      {/* Tatami lateral vignette */}
      <rect x={FX} y={L.tatami.y} width={IW} height={L.tatami.h} fill={`url(#pe${uid})`} opacity="0.5"/>
      {/* Tatami top accent line */}
      <rect x={FX} y={L.tatami.y}     width={IW} height="2" fill="#4a3010" opacity="0.55"/>
      <rect x={FX} y={L.tatami.y + 2} width={IW} height="1" fill="#c8a050" opacity="0.15"/>
      {/* Tatami bottom accent line */}
      <rect x={FX} y={L.tatami.y + L.tatami.h - 2} width={IW} height="2" fill="#4a3010" opacity="0.55"/>

      {/* ══ RAIL 3 ══ */}
      <rect x={FX} y={L.rail3.y} width={IW} height={L.rail3.h} fill="#100804"/>

      {/* ══ BOTTOM GREEN ACCENT ══ */}
      <rect x={FX} y={L.greenB.y} width={IW} height={L.greenB.h} fill={`url(#gg${uid})`}/>
      <rect x={FX} y={L.greenB.y}                   width={IW} height="1" fill="#6a9050" opacity="0.7"/>
      <rect x={FX} y={L.greenB.y + L.greenB.h - 1} width={IW} height="1" fill="#1a2e10" opacity="0.9"/>
      {[24, 48, 72, 96, 120, 144].map(x => (
        <rect key={x} x={FX + x} y={L.greenB.y + 6} width="2" height="2" fill="#3a5828" opacity="0.5"/>
      ))}

      {/* ══ BOTTOM INNER DARK RAIL ══ */}
      <rect x={FX} y={L.botRail.y}                   width={IW} height={L.botRail.h} fill="#1a0e04"/>
      <rect x={FX} y={L.botRail.y + L.botRail.h - 1} width={IW} height="1"           fill="#0a0602" opacity="0.6"/>

      {/* ══ INNER BEVEL LINE (inset from frame) ══ */}
      <rect x={FX + 1} y={7} width={IW - 2} height={H - 14}
            fill="none" stroke="#3a2010" strokeWidth="1" opacity="0.5"/>

      {/* ══ CENTER SEAM SHADOW (full panel height) ══ */}
      <rect x={FX} y={FX} width={IW} height={H - FX * 2} fill={`url(#cs${uid})`}/>

      {/* ══ ORNATE BRASS HANDLE ══ */}
      {/* Drop shadow */}
      <ellipse cx={HX} cy={HY + 2} rx={14} ry={14} fill="#0a0602" opacity="0.3"/>
      {/* Outer bezel ring */}
      <circle cx={HX} cy={HY} r={14}  fill="#7a5802"/>
      {/* Raised plate */}
      <circle cx={HX} cy={HY} r={12}  fill="#c08c0a"/>
      {/* Gold face */}
      <circle cx={HX} cy={HY} r={10}  fill="#d4a018"/>
      {/* Inner channel ring */}
      <circle cx={HX} cy={HY} r={7}   fill="#b07808"/>
      {/* Inner gold boss */}
      <circle cx={HX} cy={HY} r={5}   fill="#c89a10"/>
      {/* Center pivot */}
      <circle cx={HX} cy={HY} r={2.5} fill="#7a5202"/>
      {/* Specular highlight */}
      <circle cx={HX - 3} cy={HY - 4} r={2.5} fill="#f0d050" opacity="0.55"/>
      {/* Ambient rim light */}
      <circle cx={HX} cy={HY} r={14} fill="none" stroke="#e8c030" strokeWidth="0.8" opacity="0.2"/>
    </svg>
  );
}

function DojoPanel({ side, localPos, phase, reducedMotion }) {
  const isLeft   = side === 'left';
  const atCenter = localPos === 'center';
  const animating = phase === 'closing' || phase === 'opening';

  // CSS box-shadow creates the center seam depth without extra DOM nodes
  const seamShadow = isLeft
    ? 'inset -6px 0 12px rgba(0,0,0,0.35)'
    : 'inset  6px 0 12px rgba(0,0,0,0.35)';

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
