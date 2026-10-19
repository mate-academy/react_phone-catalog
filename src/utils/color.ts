const COLOR_MAP: Record<string, string> = {
  'space gray': '#4c4c4c',
  spacegray: '#4c4c4c',
  midnightgreen: '#004953',
  graphite: '#41424c',
  gold: '#f5e7d3',
  sierrablue: '#9bb5ce',
  spaceblack: '#2e2c2f',
  'rose gold': '#e0bfb8',
  'sky blue': '#87ceeb',
  midnight: '#191970',
};

export function getColorCode(color: string) {
  return COLOR_MAP[color] ?? color;
}
