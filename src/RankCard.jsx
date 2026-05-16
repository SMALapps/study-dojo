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
        backgroundPosition: '50% 30%',
      }}
    />
  );
}

function BeltIcon() {
  return (
    <svg width="52" height="34" viewBox="0 0 52 34" style={{ imageRendering: 'pixelated', flexShrink: 0 }}>
      <rect x="2"  y="11" width="48" height="12" fill="#d0d0d0"/>
      <rect x="2"  y="12" width="48" height="3"  fill="#e8e8e8"/>
      <rect x="2"  y="20" width="48" height="2"  fill="#b0b0b0"/>
      <rect x="19" y="6"  width="14" height="22" fill="#bcbcbc"/>
      <rect x="20" y="7"  width="12" height="3"  fill="#d8d8d8"/>
      <rect x="20" y="24" width="12" height="3"  fill="#a8a8a8"/>
      <rect x="22" y="9"  width="8"  height="16" fill="#c8c8c8"/>
      <rect x="23" y="10" width="6"  height="14" fill="#d8d8d8"/>
      <rect x="24" y="13" width="4"  height="8"  fill="#e4e4e4"/>
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

      <BeltIcon />
    </div>
  );
}
