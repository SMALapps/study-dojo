import { useState } from 'react';
import previewImg from './assets/themes/daytime-waterfall/active-background.png';

const DURATIONS = [
  { value: 15,       label: '15\nmin'  },
  { value: 25,       label: '25\nmin'  },
  { value: 45,       label: '45\nmin'  },
  { value: 60,       label: '60\nmin'  },
  { value: 'custom', label: 'Custom'   },
];

const CATEGORIES = [
  { id: 'Study',      icon: '📖', label: 'Study'    },
  { id: 'Work',       icon: '💼', label: 'Work'     },
  { id: 'Reading',    icon: '📚', label: 'Reading'  },
  { id: 'Deep Work',  icon: '🎯', label: 'Deep\nWork'  },
  { id: 'Meditation', icon: '🧘', label: 'Meditate' },
];

const DIFFICULTIES = [
  {
    id:   'Gentle',
    icon: '🍃',
    desc: 'Allows one pause.',
  },
  {
    id:   'Disciplined',
    icon: '💠',
    desc: 'No pauses. Stay committed.',
  },
  {
    id:   'Shinobi',
    icon: '⭐',
    desc: 'Breaking focus ends the session.',
  },
];

export default function SessionSetup({ onBack, onStart }) {
  const [duration,   setDuration]   = useState(25);
  const [category,   setCategory]   = useState('Study');
  const [difficulty, setDifficulty] = useState('Disciplined');

  return (
    <div className="screen">

      {/* ── Header ── */}
      <div className="ss-header">
        <button className="ss-back-btn" onClick={onBack} aria-label="Back">‹</button>
        <span className="ss-title">START TRAINING</span>
        <div className="ss-header-spacer" />
      </div>

      {/* ── Scrollable body ── */}
      <div className="scroll-content">

        {/* Duration */}
        <div className="ss-section">
          <span className="ss-label">CHOOSE DURATION</span>
          <div className="ss-duration-row">
            {DURATIONS.map(d => (
              <button
                key={d.value}
                className={`ss-dur-btn${duration === d.value ? ' active' : ''}`}
                onClick={() => setDuration(d.value)}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="ss-section">
          <span className="ss-label">CHOOSE CATEGORY</span>
          <div className="ss-cat-row">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                className={`ss-cat-btn${category === c.id ? ' active' : ''}`}
                onClick={() => setCategory(c.id)}
              >
                <span className="ss-cat-icon">{c.icon}</span>
                <span className="ss-cat-label">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="ss-section">
          <span className="ss-label">CHOOSE DIFFICULTY</span>
          <div className="ss-diff-row">
            {DIFFICULTIES.map(d => (
              <button
                key={d.id}
                className={`ss-diff-card${difficulty === d.id ? ' active' : ''}`}
                onClick={() => setDifficulty(d.id)}
              >
                <span className="ss-diff-icon">{d.icon}</span>
                <span className="ss-diff-name">{d.id}</span>
                <span className="ss-diff-desc">{d.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scenic preview — fills remaining space, edge-to-edge */}
        <div className="ss-preview">
          <img src={previewImg} alt="" className="ss-preview-img" />
        </div>

      </div>

      {/* ── Fixed CTA ── */}
      <div className="ss-cta-wrap">
        <button className="cta-button ss-cta-btn" onClick={() => onStart({ duration, category, difficulty })}>
          <span className="cta-text">ENTER THE WATERFALL</span>
          <div className="cta-arrow">›</div>
        </button>
      </div>

    </div>
  );
}
