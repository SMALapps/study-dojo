import daytimeImg  from './assets/themes/daytime-waterfall/background.png';
import forestImg   from './assets/themes/forest-sunbeams/background.png';
import nightImg    from './assets/themes/night-waterfall/background.png';

const TABS = [
  { id: 'dojo',     label: 'DOJO',     icon: '🥷'  },
  { id: 'train',    label: 'TRAIN',    icon: '⚔️'  },
  { id: 'progress', label: 'PROGRESS', icon: '📊'  },
  { id: 'themes',   label: 'THEMES',   icon: '🏔️' },
  { id: 'settings', label: 'SETTINGS', icon: '⚙️'  },
];

const THEMES = [
  {
    id:          'daytime',
    title:       'Daytime Waterfall',
    description: 'A bright, peaceful waterfall for everyday focus.',
    badge:       'active',
    badgeLabel:  'Active',
    img:         daytimeImg,
    locked:      false,
  },
  {
    id:          'forest',
    title:       'Forest Sunbeams',
    description: 'A quiet forest waterfall with golden sunbeams for deep focus.',
    badge:       'premium',
    badgeLabel:  'Premium',
    img:         forestImg,
    locked:      true,
  },
  {
    id:          'night',
    title:       'Night Waterfall',
    description: 'A moonlit waterfall for late-night study sessions.',
    badge:       'soon',
    badgeLabel:  'Coming Soon',
    img:         nightImg,
    locked:      true,
  },
];

export default function Themes({ onTabChange, onPremiumUpsell }) {
  const activeIdx = 3;
  const tabUnderlineLeft = `calc(${activeIdx} * 20% + 10% - 14px)`;

  const handleCardTap = (theme) => {
    if (theme.id === 'daytime') return;
    if (theme.id === 'forest')  onPremiumUpsell?.();
    // night: coming soon — no action
  };

  return (
    <div className="screen th-screen">

      {/* Header */}
      <div className="top-nav">
        <button className="hamburger-btn" aria-label="Menu">
          <span /><span /><span />
        </button>
        <span className="app-title">THEMES</span>
        <div className="xp-badge">
          <span className="flame">🔥</span>
          <span className="xp-num">120 XP</span>
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
              />
            </div>

            {/* Text */}
            <div className="th-card-body">
              <div className="th-card-top">
                <span className="th-card-title">{theme.title}</span>
                <span className={`th-badge th-badge-${theme.badge}`}>{theme.badgeLabel}</span>
              </div>
              <p className="th-card-desc">{theme.description}</p>
            </div>

            {/* Status icon */}
            <div className="th-card-status">
              {theme.id === 'daytime' && (
                <div className="th-check">
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                    <path d="M1.5 5.5L5.5 9.5L12.5 1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
              {theme.locked && (
                <div className="th-lock">
                  <svg width="12" height="15" viewBox="0 0 12 15" fill="none">
                    <rect x="1" y="6" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3.5 6V4a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="6" cy="10.5" r="1" fill="currentColor"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom tab bar */}
      <div className="tab-bar">
        {TABS.map((tab) => (
          <div
            key={tab.id}
            className={`tab-item${tab.id === 'themes' ? ' active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </div>
        ))}
        <div className="tab-underline" style={{ left: tabUnderlineLeft }} />
        <div className="home-indicator" />
      </div>
    </div>
  );
}
