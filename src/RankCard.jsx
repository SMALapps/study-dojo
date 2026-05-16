import { useEffect, useRef } from 'react';
import { getRankInfo } from './gameLogic';

function NinjaPortrait() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width  = 48;
    canvas.height = 48;
    ctx.clearRect(0, 0, 48, 48);

    // Clip everything to the circle so body parts outside are trimmed cleanly
    ctx.save();
    ctx.beginPath();
    ctx.arc(24, 24, 23, 0, Math.PI * 2);
    ctx.clip();

    function fr(x, y, w, h, c) {
      ctx.fillStyle = c;
      ctx.fillRect(x, y, w, h);
    }

    const D = '#0c0c10'; // ninja dark

    // Background
    ctx.fillStyle = '#dbd7ce';
    ctx.fillRect(0, 0, 48, 48);

    // ── Hood (narrows toward top) ──────────────────────────────────────────
    fr(16, 4,  16, 4, D);
    fr(12, 7,  24, 5, D);

    // ── Head block ────────────────────────────────────────────────────────
    fr(9, 11, 30, 22, D);

    // ── Headband (prominent white band across forehead) ───────────────────
    fr(6,  12, 36, 7, '#d8d8d8');
    fr(7,  12, 34, 6, '#ebebeb');
    fr(8,  12, 32, 5, '#f6f6f6');
    fr(9,  12, 30, 3, '#ffffff');
    // Tie trailing right (tapers)
    fr(40, 12, 6, 4, '#d0d0d0');
    fr(42, 16, 4, 2, '#c0c0c0');
    fr(43, 18, 3, 1, '#b0b0b0');

    // ── Face / eyes ───────────────────────────────────────────────────────
    fr(9, 19, 30, 14, '#10101a');
    // Left eye — layered gold
    fr(12, 21, 9, 4, '#8a6010');
    fr(13, 21, 7, 3, '#aa8018');
    fr(14, 21, 5, 2, '#c89a20');
    fr(15, 21, 3, 1, '#e0b428');
    // Right eye — layered gold
    fr(27, 21, 9, 4, '#8a6010');
    fr(28, 21, 7, 3, '#aa8018');
    fr(29, 21, 5, 2, '#c89a20');
    fr(30, 21, 3, 1, '#e0b428');

    // ── Body / gi ─────────────────────────────────────────────────────────
    fr(5,  33, 9,  15, D); // left shoulder
    fr(34, 33, 9,  15, D); // right shoulder
    fr(14, 33, 20, 15, D); // centre torso
    // White belt stripe
    fr(7,  38, 34, 5, '#c8c8c8');
    fr(8,  38, 32, 4, '#dedede');
    fr(9,  38, 30, 2, '#f0f0f0');
    // Belt knot (centre)
    fr(19, 37, 10, 7, '#bcbcbc');
    fr(20, 37, 8,  6, '#cecece');
    fr(21, 38, 6,  4, '#e0e0e0');
    fr(22, 39, 4,  2, '#eeeeee');

    ctx.restore();

    // Subtle circle border
    ctx.beginPath();
    ctx.arc(24, 24, 22.5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.10)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ width: 60, height: 60, imageRendering: 'pixelated', flexShrink: 0 }}
    />
  );
}

function BeltIcon() {
  return (
    <svg width="52" height="34" viewBox="0 0 52 34" style={{ imageRendering: 'pixelated', flexShrink: 0 }}>
      {/* Belt body */}
      <rect x="2"  y="11" width="48" height="12" fill="#d0d0d0"/>
      <rect x="2"  y="12" width="48" height="3"  fill="#e8e8e8"/>
      <rect x="2"  y="20" width="48" height="2"  fill="#b0b0b0"/>
      {/* Centre knot */}
      <rect x="19" y="6"  width="14" height="22" fill="#bcbcbc"/>
      <rect x="20" y="7"  width="12" height="3"  fill="#d8d8d8"/>
      <rect x="20" y="24" width="12" height="3"  fill="#a8a8a8"/>
      {/* Knot cross lines */}
      <rect x="22" y="9"  width="8"  height="16" fill="#c8c8c8"/>
      <rect x="23" y="10" width="6"  height="14" fill="#d8d8d8"/>
      {/* Knot centre highlight */}
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
