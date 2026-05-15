export const RANKS = [
  { name: 'White Belt',  tier: 'Beginner',    minXp: 0,    maxXp: 500  },
  { name: 'Yellow Belt', tier: 'Novice',       minXp: 500,  maxXp: 1000 },
  { name: 'Orange Belt', tier: 'Apprentice',   minXp: 1000, maxXp: 1750 },
  { name: 'Green Belt',  tier: 'Intermediate', minXp: 1750, maxXp: 2750 },
  { name: 'Blue Belt',   tier: 'Advanced',     minXp: 2750, maxXp: 4000 },
  { name: 'Brown Belt',  tier: 'Expert',       minXp: 4000, maxXp: 6000 },
  { name: 'Black Belt',  tier: 'Master',       minXp: 6000, maxXp: null },
];

const DIFFICULTY_MULT = { Gentle: 0.8, Disciplined: 1.0, Shinobi: 1.25 };

export function calcSessionXp(duration, difficulty) {
  return Math.round(duration * 4 * (DIFFICULTY_MULT[difficulty] ?? 1.0));
}

export function calcBrokenXp(elapsed, difficulty) {
  return Math.round(elapsed * 2 * (DIFFICULTY_MULT[difficulty] ?? 1.0));
}

export function getRankInfo(xp) {
  let idx = 0;
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXp) { idx = i; break; }
  }
  const current = RANKS[idx];
  const next    = RANKS[idx + 1] ?? null;
  const span    = next ? next.minXp - current.minXp : 1;
  const progress = next
    ? Math.min(100, Math.round(((xp - current.minXp) / span) * 100))
    : 100;
  return {
    current,
    next,
    rankXp:  xp - current.minXp,
    rankMax: next ? next.minXp - current.minXp : null,
    progress,
  };
}

export function todayWeekIndex() {
  // Returns 0=Mon … 6=Sun matching the chart's M T W T F S S layout
  return (new Date().getDay() + 6) % 7;
}
