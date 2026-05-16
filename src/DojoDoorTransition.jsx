import { useState, useEffect } from 'react';

const CLOSE_MS = 620;
const OPEN_MS  = 620;
const FADE_MS  = 250;

function ShojiFace({ side }) {
  const w = 187, h = 832;
  const fw = 6;

  const paperTop = fw + 18 + 2;
  const tamiTop  = h - fw - 14 - 2 - 90;
  const tamiBot  = tamiTop + 90;
  const paperH   = tamiTop - paperTop;
  const iw       = w - fw * 2;

  // Grid
  const colW   = iw / 3;
  const vLines = [fw + colW, fw + colW * 2];
  const hStep  = paperH / 5;
  const hLines = Array.from({ length: 4 }, (_, i) => paperTop + hStep * (i + 1));

  // Handle on the inner (meeting) edge
  const hx = side === 'left' ? w - fw - 14 : fw + 14;
  const hy = h * 0.44;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}
         style={{ display: 'block', position: 'absolute', inset: 0 }}>

      {/* Wood frame */}
      <rect width={w} height={h} fill="#1e1008" />

      {/* Top green accent */}
      <rect x={fw} y={fw}      width={iw} height={18} fill="#3d5c2a" />
      <rect x={fw} y={fw + 18} width={iw} height={2}  fill="#2a4018" />

      {/* Paper / shoji body */}
      <rect x={fw} y={paperTop} width={iw} height={paperH} fill="#ede5c8" />

      {/* Shoji horizontal rules */}
      {hLines.map((y, i) => (
        <rect key={i} x={fw} y={y - 0.8} width={iw} height={1.6}
              fill="#b09858" opacity="0.55" />
      ))}

      {/* Shoji vertical dividers */}
      {vLines.map((x, i) => (
        <rect key={i} x={x - 0.8} y={paperTop} width={1.6} height={paperH}
              fill="#b09858" opacity="0.55" />
      ))}

      {/* Tatami weave band */}
      <rect x={fw} y={tamiTop} width={iw} height={90} fill="#c4a864" />
      {Array.from({ length: 15 }, (_, i) => (
        <rect key={i} x={fw} y={tamiTop + i * 6 + 1} width={iw} height={2.5}
              fill="#a88840" opacity="0.28" />
      ))}
      {Array.from({ length: 15 }, (_, i) => (
        <rect key={i} x={fw + i * 12} y={tamiTop} width={2} height={90}
              fill="#8a7030" opacity="0.16" />
      ))}

      {/* Bottom accent strip */}
      <rect x={fw} y={tamiBot}     width={iw} height={2}  fill="#2a4018" />
      <rect x={fw} y={tamiBot + 2} width={iw} height={14} fill="#3d5c2a" />

      {/* Inner frame line */}
      <rect x={fw + 2} y={fw + 2} width={iw - 4} height={h - fw * 2 - 4}
            fill="none" stroke="#4a2808" strokeWidth={1} opacity="0.45" />

      {/* Gold circular handle */}
      <circle cx={hx} cy={hy} r={11}   fill="#b88a06" />
      <circle cx={hx} cy={hy} r={11}   fill="none" stroke="#7a5a02" strokeWidth={1.5} />
      <circle cx={hx} cy={hy} r={7}    fill="#d4aa22" />
      <circle cx={hx} cy={hy} r={3.5}  fill="#7a5a02" />
      <circle cx={hx} cy={hy - 3} r={1.2} fill="#e8c84a" opacity="0.6" />
    </svg>
  );
}

function DojoPanel({ side, localPos, phase, reducedMotion }) {
  const isLeft  = side === 'left';
  const atCenter = localPos === 'center';
  const animating = phase === 'closing' || phase === 'opening';

  const style = reducedMotion
    ? {
        position: 'absolute', top: 0, [isLeft ? 'left' : 'right']: 0,
        width: 187, height: '100%',
        opacity: atCenter ? 1 : 0,
        transition: animating ? `opacity ${FADE_MS}ms ease` : 'none',
        pointerEvents: 'none',
      }
    : {
        position: 'absolute', top: 0, [isLeft ? 'left' : 'right']: 0,
        width: 187, height: '100%',
        transform: `translateX(${atCenter ? '0%' : (isLeft ? '-100%' : '100%')})`,
        transition: animating
          ? `transform ${phase === 'opening' ? OPEN_MS : CLOSE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
          : 'none',
        pointerEvents: 'none',
      };

  return <div style={style}><ShojiFace side={side} /></div>;
}

// phase: null | 'closing' | 'closed' | 'opening'
// App.jsx owns all timing; this component is purely presentational.
export default function DojoDoorTransition({ phase, reducedMotion = false }) {
  // localPos drives the actual CSS transform/opacity.
  // Initialize to 'center' when mounting mid-transition (phase='closed').
  const [localPos, setLocalPos] = useState(() =>
    phase === 'closed' ? 'center' : 'offscreen'
  );

  useEffect(() => {
    if (phase === 'closing') {
      // Snap to offscreen, then animate to center on the next two paint frames
      setLocalPos('offscreen');
      let raf2;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setLocalPos('center'));
      });
      return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
    }
    if (phase === 'closed')  { setLocalPos('center');   return; } // instant snap, no transition
    if (phase === 'opening') { setLocalPos('offscreen'); return; } // animate out
    if (!phase)              { setLocalPos('offscreen'); return; } // hide
  }, [phase]);

  // Unmount once fully hidden
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
