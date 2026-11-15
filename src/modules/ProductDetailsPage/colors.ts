export const COLOR_MAP: Record<string, string> = {
  black: '#1f2020',
  white: '#f5f5f0',
  green: '#aee1cd',
  yellow: '#ffe681',
  purple: '#d1cdda',
  red: '#ba0c2e',
  blue: '#276787',
  pink: '#fad6d1',
  coral: '#f66d5f',
  gold: '#f5dcc4',
  silver: '#ebebe3',
  rosegold: '#e6c7c2',
  graphite: '#54524f',
  midnight: '#232a31',
  starlight: '#f0e5d3',
  spacegray: '#535150',
  midnightgreen: '#4e5851',
  spaceblack: '#403e3d',
  sierrablue: '#a7c1d9',
  skyblue: '#8db3d9',

  'space-gray': '#535150',
  'space gray': '#535150',
  'rose-gold': '#e6c7c2',
  'rose gold': '#e6c7c2',
  'sky-blue': '#8db3d9',
  'sky blue': '#8db3d9',
};

export const getColorValue = (color: string): string => {
  return COLOR_MAP[color.toLowerCase()] ?? color;
};
