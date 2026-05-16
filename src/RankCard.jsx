import ninjaImg from './assets/ninja/white-belt/meditating.png';
import { getRankInfo } from './gameLogic';

// Crops the meditating ninja PNG to show just the head inside a circle.
// The PNG is 1024×1536; visible body spans ~33–66% of canvas height.
// backgroundSize 300% → 180×270px; backgroundPosition 50% 30% centres on the head.
function NinjaPortrait() {
  return (
    <div
      style={{
        width: 60,
        height: 60,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        border: '1.5px solid rgba(0,0,0,0.12)',
        backgroundColor: '#dbd7ce',
        backgroundImage: `url(${ninjaImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '300%',
        backgroundPosition: '50% 40%',
      }}
    />
  );
}

// Belt palette: [main strap, strap highlight, strap shadow, knot body, knot top, knot bottom, knot center]
const BELT_COLORS = {
  'White Belt':  ['#d8d8d8', '#f0f0f0', '#b0b0b0', '#c4c4c4', '#dcdcdc', '#a8a8a8', '#e8e8e8'],
  'Yellow Belt': ['#e8c820', '#f8e060', '#b89808', '#d4b010', '#f0d030', '#a88000', '#fce870'],
  'Orange Belt': ['#e07818', '#f09040', '#a84c00', '#cc6010', '#e88030', '#943800', '#f8a050'],
  'Green Belt':  ['#2e9030', '#50b850', '#186018', '#287828', '#3ca03c', '#145014', '#60c860'],
  'Blue Belt':   ['#1850c8', '#3878e8', '#0c2e90', '#1040b0', '#2060d0', '#082080', '#4898f8'],
  'Brown Belt':  ['#7a3c10', '#a05820', '#4e2008', '#6a2e08', '#8a4818', '#3c1604', '#b06828'],
  'Black Belt':  ['#181818', '#303030', '#080808', '#101010', '#202020', '#040404', '#404040'],
};

function BeltIcon({ beltName }) {
  const c = BELT_COLORS[beltName] ?? BELT_COLORS['White Belt'];
  const [strap, strapHi, strapSh, knot, knotTop, knotBot, knotCtr] = c;
  return (
    <svg width="52" height="34" viewBox="0 0 52 34" style={{ imageRendering: 'pixelated', flexShrink: 0 }}>
      {/* Strap */}
      <rect x="2"  y="11" width="48" height="12" fill={strap}/>
      <rect x="2"  y="12" width="48" height="3"  fill={strapHi}/>
      <rect x="2"  y="20" width="48" height="2"  fill={strapSh}/>
      {/* Knot */}
      <rect x="19" y="6"  width="14" height="22" fill={knot}/>
      <rect x="20" y="7"  width="12" height="3"  fill={knotTop}/>
      <rect x="20" y="24" width="12" height="3"  fill={knotBot}/>
      <rect x="22" y="9"  width="8"  height="16" fill={strap}/>
      <rect x="23" y="10" width="6"  height="14" fill={knotCtr}/>
      <rect x="24" y="13" width="4"  height="8"  fill={strapHi}/>
    </svg>
  );
}

export default function RankCard({ xp = 0 }) {
  const { current, next, rankXp, rankMax, progress } = getRankInfo(xp);

  return (
    <div className="rank-card">
      <NinjaPortrait />

      <div className="rank-info">
        <span className="rank-super-label">YOUR RANK</span>
        <span className="rank-name">{current.name}</span>
        <span className="rank-tier">{current.tier}</span>

        <div className="rank-bar-wrap">
          <div className="rank-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="rank-xp">{xp} / {next ? next.minXp : xp} XP</span>
        <span className="rank-motto">Every minute of focus makes you stronger.</span>
      </div>

      {/* Show the NEXT belt the user is working toward; at max rank show Black Belt */}
      <BeltIcon beltName={next ? next.name : current.name} />
    </div>
  );
}
