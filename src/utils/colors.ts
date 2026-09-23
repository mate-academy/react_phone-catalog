const COLOR_HEX: Record<string, string> = {
  black: '#27282c',
  white: '#f9f6ef',
  yellow: '#ffe681',
  green: '#aee1cd',
  purple: '#d1cdda',
  red: '#ba0c2e',
  pink: '#fad8d3',
  gold: '#fcdbc1',
  silver: '#e4e4e2',
  gray: '#8b8b8b',
  blue: '#276787',
  coral: '#ee6b57',
  graphite: '#54524f',
  midnight: '#232a31',
  midnightgreen: '#49554b',
  rosegold: '#ecc5c0',
  'rose gold': '#ecc5c0',
  sierrablue: '#9bb5ce',
  'sky blue': '#8fb7d4',
  spaceblack: '#3c3c3d',
  spacegray: '#4c4c4c',
  'space gray': '#4c4c4c',
  starlight: '#f0ede3',
};

export const getColorHex = (color: string): string => {
  return COLOR_HEX[color.toLowerCase()] ?? color;
};
