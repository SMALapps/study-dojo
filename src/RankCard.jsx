import { useEffect, useRef } from 'react';
import { getRankInfo } from './gameLogic';

function NinjaPortrait() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 48;
    canvas.height = 48;
    ctx.clearRect(0, 0, 48, 48);

    function fr(x, y, w, h, c) {
      ctx.fillStyle = c;
      ctx.fillRect(x, y, w, h);
    }

    ctx.beginPath();
    ctx.arc(24, 24, 24, 0, Math.PI * 2);
    ctx.fillStyle = '#e8e4da';
    ctx.fill();

    fr(12, 34, 24, 14, '#0c0c0c');
    fr(11, 38, 26, 3,  '#e0e0e0');
    fr(10, 32, 5,  8,  '#0c0c0c');
    fr(33, 32, 5,  8,  '#0c0c0c');
    fr(13, 28, 22, 12, '#0c0c0c');
    fr(15, 14, 18, 16, '#0c0c0c');
    fr(17, 12, 14, 4,  '#0c0c0c');
    fr(19, 10, 10, 4,  '#0c0c0c');
    fr(14, 20, 20, 3,  '#e0e0e0');
    fr(16, 20, 16, 3,  '#f0f0f0');
    fr(33, 20, 6,  2,  '#d0d0d0');
    fr(34, 22, 5,  1,  '#c0c0c0');
    fr(19, 25, 4,  2,  '#c09820');
    fr(25, 25, 4,  2,  '#c09820');
    fr(20, 25, 1,  1,  '#e0b428');
    fr(26, 25, 1,  1,  '#e0b428');
    fr(16, 27, 16, 5,  '#141414');
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ width: 60, height: 60, imageRendering: 'pixelated', borderRadius: '50%', flexShrink: 0 }}
    />
  );
}

function BeltIcon() {
  return (
    <svg width="48" height="32" viewBox="0 0 48 32" style={{ imageRendering: 'pixelated', flexShrink: 0 }}>
      <rect x="2"  y="10" width="44" height="12" fill="#d8d8d8" />
      <rect x="2"  y="11" width="44" height="2"  fill="#eeeeee" />
      <rect x="2"  y="19" width="44" height="2"  fill="#b8b8b8" />
      <rect x="18" y="6"  width="12" height="20" fill="#c8c8c8" />
      <rect x="19" y="7"  width="10" height="2"  fill="#e0e0e0" />
      <rect x="19" y="23" width="10" height="2"  fill="#a8a8a8" />
      <rect x="21" y="9"  width="6"  height="14" fill="#d4d4d4" />
      <rect x="22" y="10" width="4"  height="12" fill="#e4e4e4" />
    </svg>
  );
}

export default function RankCard({ xp = 0 }) {
  const { current, next, rankXp, rankMax, progress } = getRankInfo(xp);
  const displayMax = rankMax ?? rankXp;

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
