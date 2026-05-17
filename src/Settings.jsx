import { useState } from 'react';
import TabBar from './TabBar';
import { playGong } from './gongAudio';

function Toggle({ on, onChange }) {
  return (
    <button
      className={`sg-toggle${on ? ' sg-toggle-on' : ''}`}
      onClick={() => onChange(!on)}
      aria-pressed={on}
    >
      <span className="sg-toggle-thumb" />
    </button>
  );
}

function ChevronRight() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
      <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PickerModal({ title, options, current, onSelect, onCancel, onComingSoon }) {
  return (
    <div className="hm-overlay" onClick={onCancel}>
      <div className="hm-card" onClick={e => e.stopPropagation()}>
        <span className="hm-title">{title}</span>
        <div className="hm-divider" />
        {options.map(opt => (
          <button
            key={opt.value}
            className={`pk-option${opt.value === current ? ' pk-option-active' : ''}`}
            onClick={() => {
              if (opt.comingSoon) { onComingSoon?.(opt.label); return; }
              onSelect(opt.value);
            }}
          >
            <span className="pk-option-label">{opt.label}</span>
            {opt.value === current && <span className="pk-check">✓</span>}
            {opt.comingSoon && <span className="pk-soon-tag">Soon</span>}
          </button>
        ))}
        <div className="hm-divider" />
        <button className="hm-close" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

function CustomDurationModal({ initial, onSet, onCancel }) {
  const [raw,   setRaw]   = useState(initial ? String(initial) : '');
  const [error, setError] = useState('');

  const handleSet = () => {
    const n = parseInt(raw, 10);
    if (!raw || isNaN(n)) { setError('Enter a number.');         return; }
    if (n <= 0)            { setError('Must be greater than 0.'); return; }
    if (n > 180)           { setError('Max is 180 minutes.');    return; }
    onSet(n);
  };

  return (
    <div className="ss-modal-overlay">
      <div className="ss-modal-card">
        <span className="ss-modal-title">CUSTOM DURATION</span>
        <input
          className="ss-modal-input"
          type="number" min="1" max="180" placeholder="25"
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

function InfoModal({ message, onClose }) {
  return (
    <div className="hm-overlay" onClick={onClose}>
      <div className="hm-card" onClick={e => e.stopPropagation()}>
        <div className="hm-divider" />
        <p className="hm-body">{message}</p>
        <div className="hm-divider" />
        <button className="hm-close" onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

const PRESET_DURATIONS = [
  { value: 15,       label: '15 min'  },
  { value: 25,       label: '25 min'  },
  { value: 45,       label: '45 min'  },
  { value: 60,       label: '60 min'  },
  { value: 'custom', label: 'Custom…' },
];

const DIFFICULTY_OPTIONS = [
  { value: 'Gentle',      label: 'Gentle'      },
  { value: 'Disciplined', label: 'Disciplined'  },
  { value: 'Shinobi',     label: 'Shinobi'     },
];

const SOUNDSCAPE_OPTIONS = [
  { value: 'Waterfall',       label: 'Waterfall'      },
  { value: 'Forest Ambience', label: 'Forest Ambience' },
  { value: 'Night Ambience',  label: 'Night Ambience'  },
  { value: 'Uploaded Music',  label: 'Uploaded Music', comingSoon: true },
];

export default function Settings({ xp = 0, settings, onSettingsChange, onTabChange, onHamburger, onReset }) {
  const [confirmReset,   setConfirmReset]   = useState(false);
  const [showDuration,   setShowDuration]   = useState(false);
  const [showCustomDur,  setShowCustomDur]  = useState(false);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [showSoundscape, setShowSoundscape] = useState(false);
  const [infoMessage,    setInfoMessage]    = useState(null);

  const set = (key, val) => onSettingsChange(s => ({ ...s, [key]: val }));

  const durIsPreset = [15, 25, 45, 60].includes(settings.defaultDuration);
  const durLabel    = durIsPreset
    ? `${settings.defaultDuration} min`
    : `Custom (${settings.defaultDuration} min)`;

  const handleDurationSelect = (val) => {
    if (val === 'custom') {
      setShowDuration(false);
      setShowCustomDur(true);
      return;
    }
    set('defaultDuration', val);
    setShowDuration(false);
  };

  return (
    <div className="screen sg-screen">

      {/* Header */}
      <div className="top-nav">
        <button className="hamburger-btn" aria-label="Menu" onClick={onHamburger}>
          <span /><span /><span />
        </button>
        <span className="app-title">SETTINGS</span>
        <div className="xp-badge">
          <span className="flame">🔥</span>
          <span className="xp-num">{xp} XP</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="sg-scroll">

        {/* ── Session Preferences ── */}
        <span className="sg-section-label">Session Preferences</span>
        <div className="sg-card">
          <div className="sg-row sg-row-tappable" onClick={() => setShowDuration(true)}>
            <span className="sg-row-label">Default Duration</span>
            <span className="sg-row-value">{durLabel} <ChevronRight /></span>
          </div>
          <div className="sg-divider" />
          <div className="sg-row sg-row-tappable" onClick={() => setShowDifficulty(true)}>
            <span className="sg-row-label">Default Difficulty</span>
            <span className="sg-row-value">{settings.defaultDifficulty} <ChevronRight /></span>
          </div>
          <div className="sg-divider" />
          <div className="sg-row">
            <span className="sg-row-label">Auto-start breaks</span>
            {/* Future: auto-start a short break timer after a session completes */}
            <Toggle on={settings.autoBreaks} onChange={v => set('autoBreaks', v)} />
          </div>
          <div className="sg-divider" />
          <div className="sg-row sg-row-tappable" onClick={() => setShowSoundscape(true)}>
            <span className="sg-row-label">Soundscape</span>
            <span className="sg-row-value">{settings.soundscape} <ChevronRight /></span>
          </div>
        </div>

        {/* ── Notifications ── */}
        <span className="sg-section-label">Notifications</span>
        <div className="sg-card">
          <div className="sg-row">
            <span className="sg-row-label">Training reminders</span>
            <Toggle on={settings.trainingRem} onChange={v => set('trainingRem', v)} />
          </div>
          <div className="sg-divider" />
          <div className="sg-row">
            <span className="sg-row-label">Streak reminders</span>
            <Toggle on={settings.streakRem} onChange={v => set('streakRem', v)} />
          </div>
          <div className="sg-divider" />
          <div className="sg-row">
            <span className="sg-row-label">Session complete alerts</span>
            <Toggle on={settings.sessionAlerts} onChange={v => set('sessionAlerts', v)} />
          </div>
        </div>

        {/* ── Experience ── */}
        <span className="sg-section-label">Experience</span>
        <div className="sg-card">
          <div className="sg-row">
            <span className="sg-row-label">Dark Mode</span>
            {/* Full dark theme support is planned for a future release */}
            <Toggle on={settings.darkMode} onChange={v => set('darkMode', v)} />
          </div>
          <div className="sg-divider" />
          <div className="sg-row">
            <span className="sg-row-label">Haptics</span>
            <Toggle on={settings.haptics} onChange={v => set('haptics', v)} />
          </div>
          <div className="sg-divider" />
          <div className="sg-row">
            <span className="sg-row-label">Waterfall Ambience</span>
            <Toggle on={settings.ambience} onChange={v => set('ambience', v)} />
          </div>
          <div className="sg-divider" />
          <div className="sg-row">
            <span className="sg-row-label">Reduced Motion</span>
            <Toggle on={settings.reducedMotion} onChange={v => set('reducedMotion', v)} />
          </div>
        </div>

        {/* ── Account ── */}
        <span className="sg-section-label">Account</span>
        <div className="sg-card">
          <div className="sg-row sg-row-tappable" onClick={() => setInfoMessage('Profiles are coming soon.')}>
            <span className="sg-row-label">Profile</span>
            <span className="sg-row-chevron"><ChevronRight /></span>
          </div>
          <div className="sg-divider" />
          <div className="sg-row sg-row-tappable" onClick={() => setInfoMessage('Cloud sync is coming soon.')}>
            <span className="sg-row-label">Sync Progress</span>
            <span className="sg-row-chevron"><ChevronRight /></span>
          </div>
          <div className="sg-divider" />
          <div className="sg-row sg-row-tappable" onClick={() => setInfoMessage('Help center is coming soon.')}>
            <span className="sg-row-label">Help &amp; Support</span>
            <span className="sg-row-chevron"><ChevronRight /></span>
          </div>
        </div>

        {/* ── Prototype ── */}
        <span className="sg-section-label sg-proto-label">Prototype</span>
        <div className="sg-card">
          <div className="sg-row sg-row-tappable" onClick={() => playGong()}>
            <span className="sg-row-label">Test Gong</span>
            <span className="sg-row-chevron"><ChevronRight /></span>
          </div>
          <div className="sg-divider" />
          {confirmReset ? (
            <div className="sg-row">
              <span className="sg-confirm-label">Confirm reset? This clears all progress.</span>
              <button className="sg-confirm-btn" onClick={() => { setConfirmReset(false); onReset?.(); }}>YES</button>
            </div>
          ) : (
            <div className="sg-row sg-row-tappable" onClick={() => setConfirmReset(true)}>
              <span className="sg-row-label sg-reset-label">Reset All Progress</span>
              <span className="sg-row-chevron"><ChevronRight /></span>
            </div>
          )}
        </div>

        <div className="sg-bottom-pad" />
      </div>

      <TabBar activeId="settings" onTabChange={onTabChange} />

      {/* ── Modals ── */}
      {showDuration && (
        <PickerModal
          title="DEFAULT DURATION"
          options={PRESET_DURATIONS}
          current={durIsPreset ? settings.defaultDuration : 'custom'}
          onSelect={handleDurationSelect}
          onCancel={() => setShowDuration(false)}
        />
      )}
      {showCustomDur && (
        <CustomDurationModal
          initial={!durIsPreset ? settings.defaultDuration : null}
          onSet={n => { set('defaultDuration', n); setShowCustomDur(false); }}
          onCancel={() => setShowCustomDur(false)}
        />
      )}
      {showDifficulty && (
        <PickerModal
          title="DEFAULT DIFFICULTY"
          options={DIFFICULTY_OPTIONS}
          current={settings.defaultDifficulty}
          onSelect={v => { set('defaultDifficulty', v); setShowDifficulty(false); }}
          onCancel={() => setShowDifficulty(false)}
        />
      )}
      {showSoundscape && (
        <PickerModal
          title="SOUNDSCAPE"
          options={SOUNDSCAPE_OPTIONS}
          current={settings.soundscape}
          onSelect={v => { set('soundscape', v); setShowSoundscape(false); }}
          onCancel={() => setShowSoundscape(false)}
          onComingSoon={() => { setShowSoundscape(false); setInfoMessage('Uploaded music is coming soon.'); }}
        />
      )}
      {infoMessage && (
        <InfoModal message={infoMessage} onClose={() => setInfoMessage(null)} />
      )}
    </div>
  );
}
