import { useState, useEffect } from 'react';
import heroBg   from './assets/themes/daytime-waterfall/background.png';
import ninjaImg from './assets/ninja/white-belt/meditating.png';

const CHIP_ICONS = {
  Study:      '📖', Work:      '💼', Reading:   '📚',
  'Deep Work': '🎯', Meditation: '🧘',
  Gentle:     '🍃', Disciplined: '💠', Shinobi:   '⭐',
};

function BreakModal({ onStay, onBreak }) {
  return (
    <div className="as-modal-overlay">
      <div className="as-modal-card">
        <span className="as-modal-title">Leave the waterfall?</span>
        <span className="as-modal-body">
          Leaving now will end this training session.
        </span>
        <button className="as-modal-btn as-modal-stay"  onClick={onStay}>Stay Focused</button>
        <button className="as-modal-btn as-modal-break" onClick={onBreak}>Break Session</button>
      </div>
    </div>
  );
}

export default function ActiveSession({
  duration   = 25,
  category   = 'Study',
  difficulty = 'Disciplined',
  onBreak,
}) {
  const totalSecs = (duration === 'custom' ? 25 : Number(duration)) * 60;
  const [secsLeft,  setSecsLeft]  = useState(totalSecs);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (secsLeft <= 0) return;
    const id = setInterval(() => setSecsLeft(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const mins     = String(Math.floor(secsLeft / 60)).padStart(2, '0');
  const secs     = String(secsLeft % 60).padStart(2, '0');
  const elapsed  = totalSecs - secsLeft;
  const progress = totalSecs > 0 ? Math.round((elapsed / totalSecs) * 100) : 0;

  return (
    <div className="screen as-screen">

      {/* ── Hero (header floats over it) ── */}
      <div className="as-hero">
        <img src={heroBg}   alt=""                 className="as-hero-bg"    />
        <img src={ninjaImg} alt="Meditating ninja" className="as-hero-ninja" />
        <div className="as-hero-fade" />

        {/* Header overlaid on hero */}
        <div className="as-header">
          <button className="as-back-btn" onClick={() => setShowModal(true)} aria-label="Back">‹</button>
          <div className="as-title-pill">FOCUS SESSION</div>
          <div className="as-xp-badge">🔥 <span>120 XP</span></div>
        </div>
      </div>

      {/* ── Dark content area ── */}
      <div className="as-content">
        <div className="as-timer">{mins}:{secs}</div>
        <div className="as-tagline">Stay still. Stay sharp.</div>

        <div className="as-chips">
          <span className="as-chip">
            {CHIP_ICONS[category] && <span className="as-chip-icon">{CHIP_ICONS[category]}</span>}
            {category}
          </span>
          <span className="as-chip">
            {CHIP_ICONS[difficulty] && <span className="as-chip-icon">{CHIP_ICONS[difficulty]}</span>}
            {difficulty}
          </span>
        </div>

        <div className="as-progress-section">
          <div className="as-progress-top">
            <span className="as-progress-label">PROGRESS</span>
            <span className="as-progress-pct">{progress}%</span>
          </div>
          <div className="as-progress-bar-wrap">
            <div className="as-progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <button className="as-break-btn" onClick={() => setShowModal(true)}>
          BREAK FOCUS
        </button>
      </div>

      {showModal && (
        <BreakModal
          onStay={() => setShowModal(false)}
          onBreak={onBreak}
        />
      )}
    </div>
  );
}
