import { useState } from 'react';
import TabBar from './TabBar';
import daytimeImg  from './assets/themes/daytime-waterfall/background.png';
import forestImg   from './assets/themes/daytime-waterfall/forest-sunbeams.png';
import nightImg    from './assets/themes/daytime-waterfall/night-waterfall.png';


const THEMES = [
  {
    id:          'daytime',
    title:       'Daytime Waterfall',
    description: 'A bright, peaceful waterfall for everyday focus.',
    badge:       'active',
    badgeLabel:  'Active',
    img:         daytimeImg,
    imgPos:      'center center',
    locked:      false,
  },
  {
    id:          'forest',
    title:       'Forest Sunbeams',
    description: 'A quiet forest waterfall with golden sunbeams for deep focus.',
    badge:       'premium',
    badgeLabel:  'Premium',
    img:         forestImg,
    imgPos:      'center 58%',
    locked:      true,
  },
  {
    id:          'night',
    title:       'Night Waterfall',
    description: 'A moonlit waterfall for late-night study sessions.',
    badge:       'soon',
    badgeLabel:  'Coming Soon',
    img:         nightImg,
    imgPos:      'center 58%',
    locked:      true,
  },
];

function LockIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
      <rect x="1.5" y="9" width="15" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M5 9V6.5a4 4 0 018 0V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="9" cy="15.5" r="1.5" fill="currentColor"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
      <path d="M1.5 6.5L6 11L14.5 1.5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ComingSoonModal({ onClose }) {
  return (
    <div className="hm-overlay" onClick={onClose}>
      <div className="hm-card" onClick={e => e.stopPropagation()}>
        <span className="hm-title">Coming Soon</span>
        <div className="hm-divider" />
        <p className="hm-body">Night Waterfall is under development and will be available in a future update.</p>
        <button className="hm-close" onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default function Themes({ xp = 0, onTabChange, onPremiumUpsell, onHamburger }) {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleCardTap = (theme) => {
    if (theme.id === 'daytime') return;
    if (theme.id === 'forest')  onPremiumUpsell?.();
    if (theme.id === 'night')   setShowComingSoon(true);
  };

  return (
    <div className="screen th-screen">
      {showComingSoon && <ComingSoonModal onClose={() => setShowComingSoon(false)} />}

      {/* Header */}
      <div className="top-nav">
        <button className="hamburger-btn" aria-label="Menu" onClick={onHamburger}>
          <span /><span /><span />
        </button>
        <span className="app-title">THEMES</span>
        <div className="xp-badge">
          <span className="flame">🔥</span>
          <span className="xp-num">{xp} XP</span>
        </div>
      </div>

      {/* Theme list */}
      <div className="th-scroll">
        {THEMES.map((theme) => (
          <div
            key={theme.id}
            className={`th-card${theme.id === 'daytime' ? ' th-card-active' : ''}${theme.locked ? ' th-card-locked' : ''}`}
            onClick={() => handleCardTap(theme)}
          >
            {/* Thumbnail */}
            <div className="th-thumb-wrap">
              <img
                src={theme.img}
                alt={theme.title}
                className="th-thumb-img"
                style={{ objectPosition: theme.imgPos }}
              />
            </div>

            {/* Title → badge → description stacked */}
            <div className="th-card-body">
              <span className="th-card-title">{theme.title}</span>
              <span className={`th-badge th-badge-${theme.badge}`}>{theme.badgeLabel}</span>
              <p className="th-card-desc">{theme.description}</p>
            </div>

            {/* Status icon */}
            <div className="th-card-status">
              {theme.id === 'daytime' && (
                <div className="th-check"><CheckIcon /></div>
              )}
              {theme.locked && (
                <div className="th-lock"><LockIcon /></div>
              )}
            </div>
          </div>
        ))}
      </div>

      <TabBar activeId="themes" onTabChange={onTabChange} />
    </div>
  );
}
