const COLOR_HEX: Record<string, string> = {
  black: '#1f2020',
  blue: '#a7c1d9',
  coral: '#ee7762',
  gold: '#f9e5c9',
  graphite: '#5c5b57',
  green: '#aee1cd',
  midnight: '#171e27',
  midnightgreen: '#4e5851',
  pink: '#fad6d6',
  purple: '#d1cdda',
  red: '#ba0c2e',
  rosegold: '#e0a899',
  sierrablue: '#9bb5ce',
  silver: '#e3e4e6',
  skyblue: '#9fc5e8',
  spaceblack: '#403e3d',
  spacegray: '#7d7e80',
  starlight: '#f0e5d3',
  white: '#f9f6ef',
  yellow: '#f9e479',
};

export const normalizeColor = (name: string) => {
  return name.toLowerCase().replace(/[\s-]/g, '');
};

export const getColorHex = (name: string) => {
  return COLOR_HEX[normalizeColor(name)] ?? '#cccccc';
};
