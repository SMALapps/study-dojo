import { useEffect, useRef } from 'react';

const W = 80;
const H = 64;

// Palette indices
const C = {
  SKY_TOP:    0,
  SKY_MID:    1,
  SKY_LIGHT:  2,
  SUN:        3,
  CLOUD:      4,
  CLIFF_DARK: 5,
  CLIFF_MID:  6,
  CLIFF_LITE: 7,
  MOSS:       8,
  TREE_DRK:   9,
  TREE_MID:   10,
  TREE_LIT:   11,
  WATER_DRK:  12,
  WATER_MID:  13,
  WATER_LIT:  14,
  FOAM:       15,
  POOL_DRK:   16,
  POOL_MID:   17,
  POOL_LIT:   18,
  ROCK_DRK:   19,
  ROCK_MID:   20,
  GROUND:     21,
  NINJA_BDY:  22,
  NINJA_EYE:  23,
  LANTERN_Y:  24,
  LANTERN_O:  25,
  LEAF_GRN:   26,
  EMPTY:      27,
};

const PALETTE = [
  '#7ec8e3', // 0  sky top
  '#a8dce8', // 1  sky mid
  '#c8ecf0', // 2  sky light
  '#ffffc0', // 3  sun
  '#f0f8ff', // 4  cloud
  '#4a5240', // 5  cliff dark
  '#6a7258', // 6  cliff mid
  '#8a9270', // 7  cliff lite
  '#4a7a38', // 8  moss
  '#2a5a28', // 9  tree dark
  '#3d7a38', // 10 tree mid
  '#5a9e50', // 11 tree light
  '#5595d0', // 12 water dark
  '#78b0e0', // 13 water mid
  '#a0ccf0', // 14 water light
  '#e8f4ff', // 15 foam/white
  '#3a7ab8', // 16 pool dark
  '#5090cc', // 17 pool mid
  '#78b0e0', // 18 pool light
  '#3a3a30', // 19 rock dark
  '#5a5a48', // 20 rock mid
  '#7a9060', // 21 ground green
  '#1a1a1a', // 22 ninja body
  '#c0a060', // 23 ninja eyes/band
  '#e8c840', // 24 lantern yellow
  '#d06820', // 25 lantern orange
  '#3a8030', // 26 leaf green
  '#00000000',// 27 empty/transparent
];

// Build the scene row by row (80×64 pixels)
function buildScene() {
  const grid = [];
  for (let y = 0; y < H; y++) {
    const row = [];
    for (let x = 0; x < W; x++) {
      row.push(C.EMPTY);
    }
    grid.push(row);
  }

  function set(x, y, c) {
    if (x >= 0 && x < W && y >= 0 && y < H) grid[y][x] = c;
  }

  function rect(x1, y1, x2, y2, c) {
    for (let y = y1; y <= y2; y++)
      for (let x = x1; x <= x2; x++)
        set(x, y, c);
  }

  // Sky gradient
  for (let y = 0; y < 26; y++) {
    const c = y < 8 ? C.SKY_TOP : y < 16 ? C.SKY_MID : C.SKY_LIGHT;
    for (let x = 0; x < W; x++) set(x, y, c);
  }

  // Sun
  rect(36, 2, 43, 9, C.SUN);

  // Clouds
  rect(8, 5, 20, 8, C.CLOUD);
  rect(6, 6, 22, 9, C.CLOUD);
  rect(55, 3, 66, 6, C.CLOUD);
  rect(53, 4, 68, 7, C.CLOUD);

  // Back cliffs (left & right)
  // Left cliff
  rect(0, 14, 16, 50, C.CLIFF_MID);
  rect(0, 14, 8, 50, C.CLIFF_DARK);
  rect(8, 14, 16, 50, C.CLIFF_LITE);
  // Right cliff
  rect(63, 14, 79, 50, C.CLIFF_MID);
  rect(63, 14, 72, 50, C.CLIFF_DARK);
  rect(72, 14, 79, 50, C.CLIFF_LITE);

  // Mid cliffs (wider ledge)
  rect(0, 26, 22, 56, C.CLIFF_DARK);
  rect(10, 24, 22, 56, C.CLIFF_MID);
  rect(57, 24, 79, 56, C.CLIFF_MID);
  rect(57, 26, 69, 56, C.CLIFF_DARK);

  // Moss on cliff tops
  rect(10, 24, 22, 25, C.MOSS);
  rect(57, 24, 68, 25, C.MOSS);

  // Trees on left cliff
  // Tree 1
  rect(3, 10, 8, 24, C.TREE_DRK);
  rect(2, 8, 9, 14, C.TREE_MID);
  rect(3, 6, 8, 10, C.TREE_LIT);
  // Tree 2
  rect(12, 12, 16, 25, C.TREE_DRK);
  rect(11, 10, 17, 16, C.TREE_MID);
  rect(12, 8, 16, 12, C.TREE_LIT);

  // Trees on right cliff
  rect(63, 10, 68, 24, C.TREE_DRK);
  rect(62, 8, 69, 14, C.TREE_MID);
  rect(63, 6, 68, 10, C.TREE_LIT);
  rect(72, 12, 77, 25, C.TREE_DRK);
  rect(71, 10, 78, 16, C.TREE_MID);
  rect(72, 8, 77, 12, C.TREE_LIT);

  // Waterfall — main cascade (center, from top)
  // Left fall
  for (let y = 14; y < 48; y++) {
    for (let x = 28; x <= 35; x++) {
      const streak = (y + x) % 4;
      set(x, y, streak < 1 ? C.FOAM : streak < 2 ? C.WATER_LIT : streak < 3 ? C.WATER_MID : C.WATER_DRK);
    }
  }
  // Right fall
  for (let y = 14; y < 48; y++) {
    for (let x = 44; x <= 51; x++) {
      const streak = (y + x) % 4;
      set(x, y, streak < 1 ? C.FOAM : streak < 2 ? C.WATER_LIT : streak < 3 ? C.WATER_MID : C.WATER_DRK);
    }
  }
  // Center mist between falls
  for (let y = 38; y < 50; y++) {
    for (let x = 34; x < 46; x++) {
      if ((x + y) % 3 === 0) set(x, y, C.WATER_LIT);
    }
  }

  // Pool / base water
  rect(18, 48, 61, 60, C.POOL_DRK);
  rect(20, 48, 59, 58, C.POOL_MID);
  rect(24, 49, 55, 55, C.POOL_LIT);
  // Ripples
  for (let x = 22; x < 58; x += 6) {
    set(x, 52, C.FOAM);
    set(x+1, 52, C.FOAM);
  }
  // Splash at base of falls
  for (let x = 28; x <= 35; x++) {
    set(x, 48, C.FOAM);
    if (x % 2 === 0) set(x, 47, C.FOAM);
  }
  for (let x = 44; x <= 51; x++) {
    set(x, 48, C.FOAM);
    if (x % 2 === 0) set(x, 47, C.FOAM);
  }

  // Rocks in pool
  rect(21, 52, 24, 56, C.ROCK_DRK);
  rect(22, 51, 25, 55, C.ROCK_MID);
  rect(55, 52, 58, 56, C.ROCK_DRK);
  rect(54, 51, 57, 55, C.ROCK_MID);

  // Ground / bank
  rect(0, 56, 79, 63, C.GROUND);
  rect(0, 56, 17, 63, C.CLIFF_DARK);
  rect(62, 56, 79, 63, C.CLIFF_DARK);

  // Lantern left
  rect(19, 44, 22, 56, C.ROCK_DRK);   // post
  rect(17, 42, 24, 44, C.ROCK_MID);   // cap
  rect(18, 44, 23, 50, C.LANTERN_Y);  // body
  rect(19, 45, 22, 49, C.LANTERN_O);  // glow
  // Lantern right
  rect(57, 44, 60, 56, C.ROCK_DRK);
  rect(55, 42, 62, 44, C.ROCK_MID);
  rect(56, 44, 61, 50, C.LANTERN_Y);
  rect(57, 45, 60, 49, C.LANTERN_O);

  // Ninja (center, sitting on rock in pool)
  // Rock base
  rect(35, 52, 44, 56, C.ROCK_DRK);
  rect(36, 51, 43, 55, C.ROCK_MID);

  // Ninja body (seated cross-legged)
  // Legs
  rect(33, 56, 38, 59, C.NINJA_BDY);
  rect(41, 56, 46, 59, C.NINJA_BDY);
  // Torso
  rect(35, 50, 44, 57, C.NINJA_BDY);
  // Head
  rect(36, 44, 43, 51, C.NINJA_BDY);
  // Eye band
  rect(36, 46, 43, 48, C.NINJA_BDY);
  set(38, 47, C.NINJA_EYE);
  set(41, 47, C.NINJA_EYE);
  // Hood knot
  rect(38, 43, 41, 45, C.NINJA_BDY);

  // Leaf details on trees
  for (let i = 0; i < 6; i++) {
    set(3 + i*2, 7, C.LEAF_GRN);
    set(63 + i*2, 7, C.LEAF_GRN);
  }

  return grid;
}

const SCENE = buildScene();

export default function PixelWaterfall({ animFrame }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const scale = 1;
    canvas.width = W;
    canvas.height = H;

    // Animate waterfall streaks
    const frame = animFrame % 4;

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        let c = SCENE[y][x];

        // Animate falls
        const inLeftFall = x >= 28 && x <= 35 && y >= 14 && y < 48;
        const inRightFall = x >= 44 && x <= 51 && y >= 14 && y < 48;
        if (inLeftFall || inRightFall) {
          const streak = (y + x + frame) % 4;
          c = streak < 1 ? C.FOAM : streak < 2 ? C.WATER_LIT : streak < 3 ? C.WATER_MID : C.WATER_DRK;
        }

        // Animate pool ripples
        if (y >= 48 && y <= 60 && x >= 18 && x <= 61) {
          const ripple = (x + frame * 2) % 8;
          if (ripple === 0 && y === 53) c = C.FOAM;
        }

        const color = PALETTE[c];
        if (!color || color === '#00000000') continue;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, [animFrame]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', imageRendering: 'pixelated' }} />;
}
