import { useState, useEffect } from 'react';
import HeroScene from './HeroScene';
import RankCard from './RankCard';
import SessionSetup from './SessionSetup';
import ActiveSession from './ActiveSession';
import SessionComplete from './SessionComplete';
import BrokenFocus from './BrokenFocus';
import Progress from './Progress';
import Themes from './Themes';
import PremiumUpsell from './PremiumUpsell';
import './App.css';

function StatusBar() {
  const [time, setTime] = useState('9:41');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`);
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="status-bar">
      <span className="status-time">{time}</span>
      <div className="status-icons">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
          <rect x="0"    y="7"   width="3" height="5"   rx="0.5"/>
          <rect x="4.5"  y="4.5" width="3" height="7.5" rx="0.5"/>
          <rect x="9"    y="2"   width="3" height="10"  rx="0.5"/>
          <rect x="13.5" y="0"   width="3" height="12"  rx="0.5"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
          <path d="M8 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
          <path d="M3.5 6.5C4.9 5.1 6.35 4.4 8 4.4s3.1.7 4.5 2.1l1.4-1.4C12.1 3.3 10.15 2.4 8 2.4s-4.1.9-5.9 2.7l1.4 1.4z"/>
          <path d="M.7 3.7C2.6 1.8 5.15.9 8 .9s5.4.9 7.3 2.8l1.4-1.4C14.6 .5 11.5-.1 8-.1S1.4.5-.7 2.3L.7 3.7z"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="white">
          <rect x="0"    y="1"   width="21" height="10" rx="2" stroke="white" strokeWidth="1.2" fill="none"/>
          <rect x="1.5"  y="2.5" width="17" height="7"  rx="1" fill="white"/>
          <rect x="21.5" y="3.5" width="3"  height="5"  rx="1" fill="white"/>
        </svg>
      </div>
    </div>
  );
}

const TABS = [
  { id: 'dojo',     label: 'DOJO',     icon: '🥷'  },
  { id: 'train',    label: 'TRAIN',    icon: '⚔️'  },
  { id: 'progress', label: 'PROGRESS', icon: '📊'  },
  { id: 'themes',   label: 'THEMES',   icon: '🏔️' },
  { id: 'settings', label: 'SETTINGS', icon: '⚙️'  },
];

function PlaceholderScreen({ title, onTabChange }) {
  const activeId = title.toLowerCase();
  const activeIdx = TABS.findIndex(t => t.id === activeId);
  const tabUnderlineLeft = `calc(${activeIdx} * 20% + 10% - 14px)`;
  return (
    <div className="screen">
      <div className="top-nav">
        <button className="hamburger-btn" aria-label="Menu"><span /><span /><span /></button>
        <span className="app-title">{title}</span>
        <div className="xp-badge"><span className="flame">🔥</span><span className="xp-num">120 XP</span></div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: 'var(--text-light)', textAlign: 'center', padding: '0 24px' }}>
          {title}{'\n'}COMING SOON
        </span>
      </div>
      <div className="tab-bar">
        {TABS.map((tab) => (
          <div
            key={tab.id}
            className={`tab-item${tab.id === activeId ? ' active' : ''}`}
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

export default function App() {
  const [activeTab,     setActiveTab]     = useState('dojo');
  const [animFrame,     setAnimFrame]     = useState(0);
  const [screen,        setScreen]        = useState('home');
  const [sessionConfig, setSessionConfig] = useState(null);

  useEffect(() => {
    const id = setInterval(() => setAnimFrame(f => f + 1), 180);
    return () => clearInterval(id);
  }, []);

  const handleTabChange = (tabId) => {
    if (tabId === 'dojo')     { setActiveTab('dojo'); setScreen('home'); }
    else if (tabId === 'train')    setScreen('sessionSetup');
    else if (tabId === 'progress') setScreen('progress');
    else if (tabId === 'themes')   setScreen('themes');
    else if (tabId === 'settings') setScreen('settings');
  };

  // ── Session Setup screen ──────────────────────────────────────────────────
  if (screen === 'sessionSetup') {
    return (
      <div className="phone-shell">
        <div className="dynamic-island" />
        <StatusBar />
        <SessionSetup
          onBack={() => setScreen('home')}
          onStart={(cfg) => { setSessionConfig(cfg); setScreen('activeSession'); }}
        />
      </div>
    );
  }

  // ── Active Session ────────────────────────────────────────────────────────
  if (screen === 'activeSession') {
    return (
      <div className="phone-shell">
        <div className="dynamic-island" />
        <StatusBar />
        <ActiveSession
          {...(sessionConfig || {})}
          onBreak={() => setScreen('brokenFocus')}
          onComplete={() => setScreen('sessionComplete')}
          onHome={() => setScreen('home')}
        />
      </div>
    );
  }

  // ── Session Complete ──────────────────────────────────────────────────────
  if (screen === 'sessionComplete') {
    return (
      <div className="phone-shell">
        <div className="dynamic-island" />
        <StatusBar />
        <SessionComplete
          {...(sessionConfig || {})}
          onReturnHome={() => setScreen('home')}
          onStartAgain={() => setScreen('sessionSetup')}
        />
      </div>
    );
  }

  // ── Broken Focus ──────────────────────────────────────────────────────────
  if (screen === 'brokenFocus') {
    return (
      <div className="phone-shell">
        <div className="dynamic-island" />
        <StatusBar />
        <BrokenFocus
          {...(sessionConfig || {})}
          onTryAgain={() => setScreen('sessionSetup')}
          onReturnHome={() => setScreen('home')}
        />
      </div>
    );
  }

  // ── Progress screen ───────────────────────────────────────────────────────
  if (screen === 'progress') {
    return (
      <div className="phone-shell">
        <div className="dynamic-island" />
        <StatusBar />
        <Progress onTabChange={handleTabChange} />
      </div>
    );
  }

  // ── Themes screen ─────────────────────────────────────────────────────────
  if (screen === 'themes') {
    return (
      <div className="phone-shell">
        <div className="dynamic-island" />
        <StatusBar />
        <Themes
          onTabChange={handleTabChange}
          onPremiumUpsell={() => setScreen('premiumUpsell')}
        />
      </div>
    );
  }

  // ── Premium Upsell ────────────────────────────────────────────────────────
  if (screen === 'premiumUpsell') {
    return (
      <div className="phone-shell">
        <div className="dynamic-island" />
        <StatusBar />
        <PremiumUpsell
          onClose={() => setScreen('themes')}
          onStartPremium={() => setScreen('themes')}
        />
      </div>
    );
  }

  // ── Settings placeholder ──────────────────────────────────────────────────
  if (screen === 'settings') {
    return (
      <div className="phone-shell">
        <div className="dynamic-island" />
        <StatusBar />
        <PlaceholderScreen title="SETTINGS" onTabChange={handleTabChange} />
      </div>
    );
  }

  // ── Home / Dojo screen ────────────────────────────────────────────────────
  const activeIdx = TABS.findIndex(t => t.id === activeTab);
  const tabUnderlineLeft = `calc(${activeIdx} * 20% + 10% - 14px)`;

  return (
    <div className="phone-shell">
      <div className="dynamic-island" />
      <StatusBar />

      <div className="screen">
        <div className="top-nav">
          <button className="hamburger-btn" aria-label="Menu">
            <span /><span /><span />
          </button>
          <span className="app-title">FOCUS DOJO</span>
          <div className="xp-badge">
            <span className="flame">🔥</span>
            <span className="xp-num">120 XP</span>
          </div>
        </div>

        <div className="scroll-content">
          <div className="hero-section">
            <HeroScene animFrame={animFrame} />
          </div>

          <div className="stats-card">
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-label">FOCUS TODAY</span>
                <span className="stat-value">42</span>
                <span className="stat-unit">min</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">STREAK</span>
                <span className="stat-value streak-val">5</span>
                <span className="stat-unit">days</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">SESSIONS</span>
                <span className="stat-value">3</span>
                <span className="stat-unit">completed</span>
              </div>
            </div>
          </div>

          <button className="cta-button" onClick={() => setScreen('sessionSetup')}>
            <span className="cta-text">START FOCUS SESSION</span>
            <div className="cta-arrow">›</div>
          </button>

          <div className="quick-actions">
            <div className="action-card">
              <span className="action-icon">⛩️</span>
              <span className="action-label">TRAINING{'\n'}MODES</span>
            </div>
            <div className="action-card" onClick={() => handleTabChange('progress')}>
              <span className="action-icon">📊</span>
              <span className="action-label">PROGRESS</span>
            </div>
            <div className="action-card">
              <span className="action-icon">🔒</span>
              <span className="action-label">BLOCKED{'\n'}APPS</span>
            </div>
          </div>

          <RankCard />

          <div className="quote-card">
            <span className="bonsai-icon">🌳</span>
            <div className="quote-text-block">
              <p className="quote-body">Discipline today, freedom tomorrow.</p>
              <p className="quote-attribution">– The Dojo</p>
            </div>
            <span className="quote-arrow">›</span>
          </div>

          <div className="scroll-bottom-pad" />
        </div>

        <div className="tab-bar">
          {TABS.map((tab) => (
            <div
              key={tab.id}
              className={`tab-item${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </div>
          ))}
          <div className="tab-underline" style={{ left: tabUnderlineLeft }} />
          <div className="home-indicator" />
        </div>
      </div>
    </div>
  );
}
