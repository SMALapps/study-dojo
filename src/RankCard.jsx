import ninjaImg from './assets/ninja/white-belt/meditating.png';
import { getRankInfo, BELT_IMG } from './gameLogic';

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


function BeltIcon({ beltName }) {
  const src = BELT_IMG[beltName] ?? BELT_IMG['White Belt'];
  return (
    <img
      src={src}
      alt={beltName}
      style={{
        width: 60,
        height: 60,
        objectFit: 'contain',
        flexShrink: 0,
        imageRendering: 'pixelated',
      }}
    />
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
