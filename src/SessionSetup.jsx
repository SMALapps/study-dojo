import { useState } from 'react';
import previewImg from './assets/themes/daytime-waterfall/active-background.png';

const PRESET_DURATIONS = [
  { value: 15, label: '15\nmin' },
  { value: 25, label: '25\nmin' },
  { value: 45, label: '45\nmin' },
  { value: 60, label: '60\nmin' },
];

const CATEGORIES = [
  { id: 'Study',      icon: '📖', label: 'Study'       },
  { id: 'Work',       icon: '💼', label: 'Work'        },
  { id: 'Reading',    icon: '📚', label: 'Reading'     },
  { id: 'Deep Work',  icon: '🎯', label: 'Deep\nWork'  },
  { id: 'Meditation', icon: '🧘', label: 'Meditate'    },
];

const DIFFICULTIES = [
  { id: 'Gentle',      icon: '🍃', desc: 'Allows one pause.'              },
  { id: 'Disciplined', icon: '💠', desc: 'No pauses. Stay committed.'     },
  { id: 'Shinobi',     icon: '⭐', desc: 'Breaking focus ends the session.' },
];

function CustomModal({ initial, onSet, onCancel }) {
  const [raw,   setRaw]   = useState(initial);
  const [error, setError] = useState('');

  const handleSet = () => {
    const n = parseInt(raw, 10);
    if (!raw || isNaN(n))  { setError('Enter a number.');        return; }
    if (n <= 0)             { setError('Must be greater than 0.'); return; }
    if (n > 180)            { setError('Max is 180 minutes.');    return; }
    onSet(n);
  };

  return (
    <div className="ss-modal-overlay">
      <div className="ss-modal-card">
        <span className="ss-modal-title">CUSTOM DURATION</span>
        <input
          className="ss-modal-input"
          type="number"
          min="1"
          max="180"
          placeholder="25"
          value={raw}
          onChange={e => { setRaw(e.target.value); setError(''); }}
          autoFocus
        />
        <span className={`ss-modal-hint${error ? ' ss-modal-error' : ''}`}>
          {error || '1 – 180 minutes'}
        </span>
        <div className="ss-modal-btns">
          <button className="ss-modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="ss-modal-set"    onClick={handleSet}>Set</button>
        </div>
      </div>
    </div>
  );
}

export default function SessionSetup({ defaultDuration = 25, defaultDifficulty = 'Disciplined', onBack, onStart }) {
  const [duration,   setDuration]   = useState(defaultDuration);
  const [showCustom, setShowCustom] = useState(false);
  const [category,   setCategory]   = useState('Study');
  const [difficulty, setDifficulty] = useState(defaultDifficulty);

  const isCustom      = !PRESET_DURATIONS.map(d => d.value).includes(duration);
  const customLabel   = isCustom ? `Custom\n${duration} min` : 'Custom';

  return (
    <div className="screen">

      {/* ── Header ── */}
      <div className="ss-header">
        <button className="ss-back-btn" onClick={onBack} aria-label="Back">‹</button>
        <span className="ss-title">START TRAINING</span>
        <div className="ss-header-spacer" />
      </div>

      {/* ── Selection sections (shrink-to-fit, no scroll) ── */}
      <div className="ss-body">

        {/* Duration */}
        <div className="ss-section">
          <span className="ss-label">CHOOSE DURATION</span>
          <div className="ss-duration-row">
            {PRESET_DURATIONS.map(d => (
              <button
                key={d.value}
                className={`ss-dur-btn${duration === d.value ? ' active' : ''}`}
                onClick={() => setDuration(d.value)}
              >
                {d.label}
              </button>
            ))}
            <button
              className={`ss-dur-btn${isCustom ? ' active' : ''}`}
              onClick={() => setShowCustom(true)}
            >
              {customLabel}
            </button>
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

      </div>

      {/* ── Scenic preview — flex:1, button overlaid ── */}
      <div className="ss-preview">
        <img src={previewImg} alt="" className="ss-preview-img" />
        <div className="ss-cta-overlay">
          <button className="cta-button ss-cta-btn" onClick={() => onStart({ duration, category, difficulty })}>
            <span className="cta-text">ENTER THE WATERFALL</span>
            <div className="cta-arrow">›</div>
          </button>
        </div>
      </div>

      {/* ── Custom duration modal ── */}
      {showCustom && (
        <CustomModal
          initial={isCustom ? String(duration) : ''}
          onSet={n => { setDuration(n); setShowCustom(false); }}
          onCancel={() => setShowCustom(false)}
        />
      )}

    </div>
  );
}
