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
import Settings from './Settings';
import Onboarding from './Onboarding';
import { calcSessionXp, calcBrokenXp, todayWeekIndex } from './gameLogic';
import { unlockGongAudio } from './gongAudio';
import DojoDoorTransition from './DojoDoorTransition';
import TabBar from './TabBar';
import './App.css';

// ── Home screen action-card icons ─────────────────────────────────────────────
function ToriiGateIcon() {
  const red = '#c43820';
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      {/* Top crossbeam with upswept ends (trapezoid) */}
      <polygon points="0,11 36,11 34,16 2,16" fill={red}/>
      {/* Cap extensions on each end */}
      <rect x="0"  y="8"  width="7"  height="4" rx="1" fill={red}/>
      <rect x="29" y="8"  width="7"  height="4" rx="1" fill={red}/>
      {/* Lower crossbeam */}
      <rect x="3"  y="19" width="30" height="4" rx="1" fill={red}/>
      {/* Left pillar */}
      <rect x="5"  y="19" width="5"  height="15" rx="1" fill={red}/>
      {/* Right pillar */}
      <rect x="26" y="19" width="5"  height="15" rx="1" fill={red}/>
    </svg>
  );
}

function ProgressChartIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="2"  y="22" width="8" height="12" rx="1" fill="#5aaa4e"/>
      <rect x="14" y="14" width="8" height="20" rx="1" fill="#3a8030"/>
      <rect x="26" y="8"  width="8" height="26" rx="1" fill="#2a5820"/>
      <rect x="0"  y="34" width="36" height="2" rx="1" fill="#1a3818"/>
    </svg>
  );
}

function BlockLockIcon() {
  return (
    <svg width="32" height="36" viewBox="0 0 32 36" fill="none">
      {/* Shackle */}
      <path d="M8 18 V11 a8 8 0 0 1 16 0 V18"
            stroke="#6a6a6a" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      {/* Body */}
      <rect x="2"  y="16" width="28" height="18" rx="4" fill="#888"/>
      <rect x="4"  y="18" width="24" height="14" rx="3" fill="#7a7a7a"/>
      {/* Keyhole */}
      <circle cx="16" cy="24" r="3.5" fill="#505050"/>
      <rect x="14.5" y="26" width="3"  height="5"  rx="1" fill="#505050"/>
    </svg>
  );
}

function BonsaiIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      {/* Pot / base */}
      <rect x="13" y="34" width="14" height="5" rx="2" fill="#9a7050"/>
      {/* Trunk */}
      <rect x="18" y="27" width="4"  height="8"  rx="1" fill="#7a5030"/>
      {/* Side branch left */}
      <rect x="10" y="23" width="9"  height="3"  rx="1" fill="#7a5030"/>
      {/* Side branch right */}
      <rect x="21" y="21" width="8"  height="3"  rx="1" fill="#7a5030"/>
      {/* Main canopy layers */}
      <ellipse cx="20" cy="18" rx="14" ry="9"  fill="#2a6a1a"/>
      <ellipse cx="12" cy="20" rx="7"  ry="5"  fill="#2a6a1a"/>
      <ellipse cx="28" cy="19" rx="7"  ry="5"  fill="#2a6a1a"/>
      <ellipse cx="13" cy="14" rx="7"  ry="5.5" fill="#3a7a28"/>
      <ellipse cx="27" cy="13" rx="7"  ry="5.5" fill="#3a7a28"/>
      <ellipse cx="20" cy="11" rx="7"  ry="5"  fill="#4a8a38"/>
      {/* Top highlight */}
      <ellipse cx="20" cy="8"  rx="4.5" ry="3.5" fill="#5a9a48"/>
    </svg>
  );
}

function StatusBar() {
  const [time, setTime] = useState('9:41');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
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

// ── Hamburger menu modal ──────────────────────────────────────────────────────
function HamburgerModal({ onClose }) {
  return (
    <div className="hm-overlay" onClick={onClose}>
      <div className="hm-card" onClick={e => e.stopPropagation()}>
        <span className="hm-title">MENU</span>
        <div className="hm-divider" />
        {['Profile', 'Music', 'Help'].map(item => (
          <button key={item} className="hm-item" onClick={onClose}>{item}</button>
        ))}
        <div className="hm-divider" />
        <button className="hm-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// ── Blocked Apps modal ────────────────────────────────────────────────────────
function BlockedAppsModal({ onClose }) {
  return (
    <div className="hm-overlay" onClick={onClose}>
      <div className="hm-card" onClick={e => e.stopPropagation()}>
        <span className="hm-title">BLOCKED APPS</span>
        <div className="hm-divider" />
        <p className="hm-body">
          Blocked Apps are coming soon. In the full app, this will help protect your focus during sessions.
        </p>
        <div className="hm-divider" />
        <button className="hm-close" onClick={onClose}>Got It</button>
      </div>
    </div>
  );
}

function screenToTab(s) {
  if (s === 'home')                             return 'dojo';
  if (s === 'sessionSetup')                     return 'train';
  if (s === 'progress')                         return 'progress';
  if (s === 'themes' || s === 'premiumUpsell')  return 'themes';
  if (s === 'settings')                         return 'settings';
  return 'dojo';
}

const INITIAL_STATS = {
  totalFocusMinutes: 0,
  focusTodayMinutes: 0,
  currentStreak:     0,
  longestStreak:     0,
  sessionsCompleted: 0,
  xp:                0,
  weeklyFocusData:   [0, 0, 0, 0, 0, 0, 0], // Mon–Sun
};

const STORAGE_KEY = 'focusDojo_stats';

function loadStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...INITIAL_STATS, ...JSON.parse(raw) } : INITIAL_STATS;
  } catch {
    return INITIAL_STATS;
  }
}

const SETTINGS_KEY = 'focusDojo_settings';
const DEFAULT_SETTINGS = {
  defaultDuration:   25,
  defaultDifficulty: 'Disciplined',
  soundscape:        'Waterfall',
  autoBreaks:        true,
  trainingRem:       true,
  streakRem:         true,
  sessionAlerts:     true,
  darkMode:          false,
  haptics:           true,
  ambience:          true,
  reducedMotion:     false,
};

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function hapticFeedback(enabled) {
  if (!enabled) return;
  if (navigator.vibrate) navigator.vibrate(10);
}

export default function App() {
  const [animFrame,     setAnimFrame]     = useState(0);
  const [screen,        setScreen]        = useState(
    () => localStorage.getItem('focusDojo_onboarded') === '1' ? 'home' : 'onboarding'
  );
  const [sessionConfig, setSessionConfig] = useState(null);
  const [timeFocused,   setTimeFocused]   = useState(0);
  const [stats,         setStats]         = useState(loadStats);
  const [lastEarnedXp,  setLastEarnedXp]  = useState(0);
  const [showHamburger, setShowHamburger] = useState(false);
  const [showBlocked,   setShowBlocked]   = useState(false);
  const [settings,            setSettings]            = useState(loadSettings);
  const [toast,               setToast]               = useState(null);
  const [dojoPhase,           setDojoPhase]           = useState(null);
  const [activeSessionCanRun, setActiveSessionCanRun] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setAnimFrame(f => f + 1), 180);
    return () => clearInterval(id);
  }, []);

  // Persist stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    document.body.classList.toggle('reduced-motion', settings.reducedMotion);
  }, [settings.reducedMotion]);

  const activeTab = screenToTab(screen);

  const handleTabChange = (tabId) => {
    if (tabId === 'dojo')          setScreen('home');
    else if (tabId === 'train')    setScreen('sessionSetup');
    else if (tabId === 'progress') setScreen('progress');
    else if (tabId === 'themes')   setScreen('themes');
    else if (tabId === 'settings') setScreen('settings');
  };

  const handleSessionComplete = () => {
    const cfg      = sessionConfig || {};
    const dur      = Number(cfg.duration || 25);
    const diff     = cfg.difficulty || 'Disciplined';
    const earnedXp = calcSessionXp(dur, diff);
    const dayIdx   = todayWeekIndex();
    setLastEarnedXp(earnedXp);
    hapticFeedback(settings.haptics);
    setStats(s => {
      // NOTE: incrementing streak once per completed session is a prototype simplification.
      // Real daily streak logic requires storing the last-session date with persistence.
      const newStreak    = s.currentStreak + 1;
      const weekly       = [...s.weeklyFocusData];
      weekly[dayIdx]     = (weekly[dayIdx] || 0) + dur;
      return {
        ...s,
        totalFocusMinutes: s.totalFocusMinutes + dur,
        focusTodayMinutes: s.focusTodayMinutes + dur,
        sessionsCompleted: s.sessionsCompleted + 1,
        xp:                s.xp + earnedXp,
        currentStreak:     newStreak,
        longestStreak:     Math.max(s.longestStreak, newStreak),
        weeklyFocusData:   weekly,
      };
    });
    if (settings.sessionAlerts) {
      setScreen('sessionComplete');
    } else {
      setScreen('home');
      setToast(`Session complete! +${earnedXp} XP earned.`);
    }
  };

  const handleBreak = (elapsedSecs) => {
    const diff     = (sessionConfig || {}).difficulty || 'Disciplined';
    const brokenXp = calcBrokenXp(elapsedSecs, diff);
    setTimeFocused(Math.floor(elapsedSecs / 60));
    setLastEarnedXp(brokenXp);
    hapticFeedback(settings.haptics);
    // Award partial XP (0 if < 60 s); no streak or sessionsCompleted update
    setStats(s => ({ ...s, xp: s.xp + brokenXp }));
    setScreen('brokenFocus');
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setStats(INITIAL_STATS);
    setLastEarnedXp(0);
    setTimeFocused(0);
    setSessionConfig(null);
    setScreen('home');
  };

  const startDojoTransition = (cfg) => {
    hapticFeedback(settings.haptics);
    unlockGongAudio();
    setActiveSessionCanRun(false);
    setDojoPhase('closing');

    const closeMs = settings.reducedMotion ? 250 : 700;
    const holdMs  = 350;
    const openMs  = settings.reducedMotion ? 250 : 700;

    setTimeout(() => {
      // Doors fully closed: swap screen, timer still frozen
      setSessionConfig(cfg);
      setScreen('activeSession');
      setDojoPhase('closed');

      setTimeout(() => {
        // Begin opening doors + release the timer
        setDojoPhase('opening');
        setActiveSessionCanRun(true);

        setTimeout(() => setDojoPhase(null), openMs + 100);
      }, holdMs);
    }, closeMs + 100);
  };

  // ── Onboarding ────────────────────────────────────────────────────────────
  if (screen === 'onboarding') {
    return (
      <div className="phone-shell">
        <div className="dynamic-island" />
        <StatusBar />
        <Onboarding onBegin={() => {
          localStorage.setItem('focusDojo_onboarded', '1');
          setScreen('home');
        }} />
      </div>
    );
  }

  // ── Session Setup screen ──────────────────────────────────────────────────
  if (screen === 'sessionSetup') {
    return (
      <div className="phone-shell">
        <div className="dynamic-island" />
        <StatusBar />
        <SessionSetup
          defaultDuration={settings.defaultDuration}
          defaultDifficulty={settings.defaultDifficulty}
          onBack={() => setScreen('home')}
          onStart={startDojoTransition}
        />
        <DojoDoorTransition phase={dojoPhase} reducedMotion={settings.reducedMotion} />
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
          shouldTimerRun={activeSessionCanRun}
          onBreak={handleBreak}
          onComplete={handleSessionComplete}
          onHome={() => setScreen('home')}
        />
        <DojoDoorTransition phase={dojoPhase} reducedMotion={settings.reducedMotion} />
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
          earnedXp={lastEarnedXp}
          currentStreak={stats.currentStreak}
          totalXp={stats.xp}
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
          timeFocused={timeFocused}
          earnedXp={lastEarnedXp}
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
        <Progress
          stats={stats}
          onTabChange={handleTabChange}
          onHamburger={() => setShowHamburger(true)}
        />
        {showHamburger && <HamburgerModal onClose={() => setShowHamburger(false)} />}
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
          xp={stats.xp}
          onTabChange={handleTabChange}
          onPremiumUpsell={() => setScreen('premiumUpsell')}
          onHamburger={() => setShowHamburger(true)}
        />
        {showHamburger && <HamburgerModal onClose={() => setShowHamburger(false)} />}
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

  // ── Settings screen ───────────────────────────────────────────────────────
  if (screen === 'settings') {
    return (
      <div className="phone-shell">
        <div className="dynamic-island" />
        <StatusBar />
        <Settings
          xp={stats.xp}
          settings={settings}
          onSettingsChange={setSettings}
          onTabChange={handleTabChange}
          onHamburger={() => setShowHamburger(true)}
          onReset={handleReset}
        />
        {showHamburger && <HamburgerModal onClose={() => setShowHamburger(false)} />}
      </div>
    );
  }

  // ── Home / Dojo screen ────────────────────────────────────────────────────
  const focusHrs         = Math.floor(stats.focusTodayMinutes / 60);
  const focusMins        = stats.focusTodayMinutes % 60;
  const focusDisplay     = focusHrs > 0 ? `${focusHrs}h ${focusMins}m` : String(focusMins);
  const focusUnit        = focusHrs > 0 ? '' : 'min';

  return (
    <div className="phone-shell">
      <div className="dynamic-island" />
      <StatusBar />

      <div className="screen">
        <div className="top-nav">
          <button className="hamburger-btn" aria-label="Menu" onClick={() => setShowHamburger(true)}>
            <span /><span /><span />
          </button>
          <span className="app-title">FOCUS DOJO</span>
          <div className="xp-badge">
            <span className="flame">🔥</span>
            <span className="xp-num">{stats.xp} XP</span>
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
                <span className="stat-value">{focusDisplay}</span>
                <span className="stat-unit">{focusUnit}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">STREAK</span>
                <span className="stat-value streak-val">{stats.currentStreak}</span>
                <span className="stat-unit">days</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">SESSIONS</span>
                <span className="stat-value">{stats.sessionsCompleted}</span>
                <span className="stat-unit">completed</span>
              </div>
            </div>
          </div>

          <button className="cta-button" onClick={() => { hapticFeedback(settings.haptics); setScreen('sessionSetup'); }}>
            <span className="cta-text">START FOCUS SESSION</span>
            <div className="cta-arrow">›</div>
          </button>

          <div className="quick-actions">
            <div className="action-card" onClick={() => setScreen('sessionSetup')}>
              <span className="action-icon"><ToriiGateIcon /></span>
              <span className="action-label">TRAINING{'\n'}MODES</span>
            </div>
            <div className="action-card" onClick={() => handleTabChange('progress')}>
              <span className="action-icon"><ProgressChartIcon /></span>
              <span className="action-label">PROGRESS</span>
            </div>
            <div className="action-card" onClick={() => setShowBlocked(true)}>
              <span className="action-icon"><BlockLockIcon /></span>
              <span className="action-label">BLOCKED{'\n'}APPS</span>
            </div>
          </div>

          <RankCard xp={stats.xp} />

          <div className="quote-card">
            <span className="bonsai-icon"><BonsaiIcon /></span>
            <div className="quote-text-block">
              <p className="quote-body">Discipline today, freedom tomorrow.</p>
              <p className="quote-attribution">– The Dojo</p>
            </div>
            <span className="quote-arrow">›</span>
          </div>

          <div className="scroll-bottom-pad" />
        </div>

        <TabBar activeId={activeTab} onTabChange={handleTabChange} />
      </div>

      {showHamburger && <HamburgerModal onClose={() => setShowHamburger(false)} />}
      {showBlocked   && <BlockedAppsModal onClose={() => setShowBlocked(false)} />}
      {toast && <div className="app-toast">{toast}</div>}
    </div>
  );
}
