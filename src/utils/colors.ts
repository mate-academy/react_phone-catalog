const COLORS: Record<string, string> = {
  black: '#1f2020',
  spaceblack: '#1f2020',
  midnight: '#191970',
  midnightgreen: '#4e5851',
  graphite: '#5c5b57',
  spacegray: '#6e6e73',
  silver: '#e2e4e1',
  white: '#f9f6ef',
  starlight: '#f0e4d3',
  gold: '#fcd9bd',
  rosegold: '#f1c5c2',
  pink: '#ffc0cb',
  coral: '#ff7f50',
  red: '#ba0c2e',
  yellow: '#ffe681',
  green: '#aee1cd',
  blue: '#215e7c',
  skyblue: '#87ceeb',
  sierrablue: '#69abce',
  purple: '#b8afe6',
};

export const normalizeColor = (color: string) => color.replace(/[\s-]/g, '');

export const getColorCode = (color: string) =>
  COLORS[normalizeColor(color)] ?? '#cccccc';
