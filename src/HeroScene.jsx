// Hero scene — layered PNG asset renderer.
//
// Layer stack (z-order):
//   z=1  background.png        — sky, cliffs, trees, waterfall, pool, rock
//   z=2  waterfall-overlay.png — animated water (spritesheet, placeholder for now)
//   z=3  foreground.png        — lanterns, plants overlay (placeholder for now)
//   z=4  ninja meditating.png  — seated ninja, centered on rock
//   z=10 CalmFlowChip          — HTML status overlay

import heroBg        from './assets/themes/daytime-waterfall/background.png';
import heroWaterfall from './assets/themes/daytime-waterfall/waterfall-overlay.png';
import heroFg        from './assets/themes/daytime-waterfall/foreground.png';
import ninjaImg      from './assets/ninja/white-belt/meditating.png';

// Full-bleed layer (background, waterfall overlay, foreground overlay)
const layerStyle = {
  position: 'absolute',
  top: 0, left: 0,
  width: '100%', height: '100%',
  imageRendering: 'pixelated',
  objectFit: 'fill',
  display: 'block',
};

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

// animFrame is accepted but unused until the waterfall spritesheet is wired up.
export default function HeroScene({ animFrame: _animFrame }) {
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      overflow: 'hidden', background: '#0a2460',
    }}>
      {/* z=1 background scene */}
      <img src={heroBg}        alt="" style={{ ...layerStyle, zIndex: 1 }} />
      {/* z=2 waterfall animation overlay (transparent placeholder) */}
      <img src={heroWaterfall} alt="" style={{ ...layerStyle, zIndex: 2 }} />
      {/* z=3 foreground overlay (transparent placeholder) */}
      <img src={heroFg}        alt="" style={{ ...layerStyle, zIndex: 3 }} />
      {/* z=4 ninja — centered on meditation rock */}
      <img
        src={ninjaImg}
        alt="Meditating ninja"
        style={{
          position: 'absolute',
          bottom: '17%',
          left: '50%',
          transform: 'translateX(-50%)',
          height: '42%',
          width: 'auto',
          imageRendering: 'pixelated',
          zIndex: 4,
        }}
      />
      {/* z=10 status chip */}
      <CalmFlowChip />
    </div>
  );
}
