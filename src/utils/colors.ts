// colors as they are written in the API -> css colors for the swatches
const COLORS: Record<string, string> = {
  black: '#1f2020',
  blue: '#4f7fa8',
  coral: '#f76e5a',
  gold: '#fad7bd',
  graphite: '#54524f',
  green: '#aee1cd',
  midnight: '#232a31',
  midnightgreen: '#4e5851',
  pink: '#fad6dd',
  purple: '#d1cdda',
  red: '#ba0c2e',
  rosegold: '#e6c7c2',
  sierrablue: '#9bb5ce',
  silver: '#e2e4e1',
  skyblue: '#a7c1d9',
  spaceblack: '#35373a',
  spacegray: '#535150',
  starlight: '#f0e4d3',
  white: '#f5f5f5',
  yellow: '#fae29c',
};

const FALLBACK_COLOR = '#cccccc';

// the API spells some colors differently: "space gray" and "space-gray"
const normalizeColor = (color: string) => color.replace(/[\s-]/g, '');

export const isSameColor = (a: string, b: string) =>
  normalizeColor(a) === normalizeColor(b);

export const getColorValue = (color: string) =>
  COLORS[normalizeColor(color)] ?? FALLBACK_COLOR;

// "space gray" / "midnightgreen" -> "Space gray" / "Midnightgreen"
export const getColorLabel = (color: string) =>
  color.charAt(0).toUpperCase() + color.slice(1).replace('-', ' ');
