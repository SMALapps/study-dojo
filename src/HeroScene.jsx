// Hero scene — layered PNG asset renderer.
//
// Drop real artwork into src/assets/ to replace the placeholders:
//   hero_bg.png        186×128  background (sky, cliffs, trees)
//   hero_waterfall.png 186×128  animated waterfall + pool (spritesheet later)
//   hero_fg.png        186×128  foreground (ninja, rock, lanterns, plants)
//
// All layers are positioned absolute inside the hero container so z-order
// is preserved and each file can be swapped independently.

import heroBg        from './assets/themes/daytime-waterfall/background.png';
import heroWaterfall from './assets/themes/daytime-waterfall/waterfall-overlay.png';
import heroFg        from './assets/themes/daytime-waterfall/foreground.png';

// Shared style for every image layer
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
      {/* z=1 background: sky, cliffs, distant trees */}
      <img src={heroBg}        alt="" style={{ ...layerStyle, zIndex: 1 }} />
      {/* z=2 waterfall: falling water, pool, mist */}
      <img src={heroWaterfall} alt="" style={{ ...layerStyle, zIndex: 2 }} />
      {/* z=3 foreground: ninja, rock, lanterns, plants */}
      <img src={heroFg}        alt="" style={{ ...layerStyle, zIndex: 3 }} />
      {/* z=10 status chip: always HTML */}
      <CalmFlowChip />
    </div>
  );
}
