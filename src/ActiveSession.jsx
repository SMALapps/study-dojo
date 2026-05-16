import { useState, useEffect, useRef } from 'react';
import { playGong } from './gongAudio';
import { calcLiveXp } from './gameLogic';
import activeBg  from './assets/themes/daytime-waterfall/active-background.png';
import fallbackBg from './assets/themes/daytime-waterfall/background.png';
import ninjaImg from './assets/ninja/white-belt/meditating.png';

const CHIP_ICONS = {
  Study: '📖', Work: '💼', Reading: '📚',
  'Deep Work': '🎯', Meditation: '🧘',
  Gentle: '🍃', Disciplined: '💠', Shinobi: '⭐',
};

function BreakModal({ onStay, onBreak }) {
  return (
    <div className="as-modal-overlay">
      <div className="as-modal-card">
        <span className="as-modal-title">Leave the waterfall?</span>
        <div className="as-modal-divider" />
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
  duration        = 25,
  category        = 'Study',
  difficulty      = 'Disciplined',
  shouldTimerRun  = true,
  onBreak,
  onComplete,
  onHome,
}) {
  const totalSecs             = Number(duration) * 60;
  const [secsLeft,  setSecsLeft]  = useState(totalSecs);
  const [showModal, setShowModal] = useState(false);
  const hasPlayedGongRef          = useRef(false);

  useEffect(() => {
    if (secsLeft <= 0) {
      if (!hasPlayedGongRef.current) {
        hasPlayedGongRef.current = true;
        playGong();
      }
      // Delay gives the gong time to begin before the screen transitions
      const id = setTimeout(() => onComplete?.(), 1500);
      return () => clearTimeout(id);
    }
    if (!shouldTimerRun || showModal) return;
    const id = setInterval(() => setSecsLeft(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [secsLeft, showModal, shouldTimerRun]);

  const elapsedSecs = totalSecs - secsLeft;
  const mins     = String(Math.floor(secsLeft / 60)).padStart(2, '0');
  const secs     = String(secsLeft % 60).padStart(2, '0');
  const progress = Math.round((elapsedSecs / totalSecs) * 100);
  const liveXp   = calcLiveXp(elapsedSecs, difficulty);

  return (
    <div className="screen as-screen">

      {/* Full-screen waterfall background */}
      <img src={activeBg} alt="" className="as-bg" onError={e => { e.currentTarget.src = fallbackBg; }} />

      {/* Dark gradient overlay — transparent top, solid dark at bottom */}
      <div className="as-overlay" />

      {/* Ninja — seated on meditation rock */}
      <img src={ninjaImg} alt="Meditating ninja" className="as-ninja" />

      {/* Floating header over the waterfall */}
      <div className="as-header">
        <button className="as-back-btn" onClick={() => setShowModal(true)} aria-label="Back">‹</button>
        <div className="as-title-pill">FOCUS SESSION</div>
        <div className="as-xp-badge">🔥 <span>+{liveXp} XP</span></div>
      </div>

      {/* Content block: info group + button, sits in lower portion of screen */}
      <div className="as-content">

        {/* Upper group: timer / tagline / chips / progress — evenly distributed */}
        <div className="as-info">
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
        </div>

        {/* Button sits just below info group with a tight gap */}
        <button className="as-break-btn" onClick={() => setShowModal(true)}>
          BREAK FOCUS
        </button>

      </div>

      {showModal && (
        <BreakModal
          onStay={() => setShowModal(false)}
          onBreak={() => onBreak(elapsedSecs)}
        />
      )}

    </div>
  );
}
