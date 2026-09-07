export type HexColors = `#${string}`;

type Color = {
  [key: string]: HexColors;
};

export const Colors: Color = {
  white: '#f4eeeb',
  starlight: '#efe7e0',
  yellow: '#f0df69',
  gold: '#eee1ca',
  blue: '#a1b7ce',
  black: '#000',
  spaceblack: '#4e4b49',
  coral: '#ff6a55',
  red: '#d22f30',
  green: '#b8e6d2',
  graphite: '#5c5a56',
  spacegray: '#61615f',
  midnight: '#1d242d',
  midnightgreen: '#3f4741',
  pink: '#f8d4d7',
  purple: '#e0d9e8',
  'rose gold': '#f2d0cb',
  rosegold: '#ebbdb5',
  sierrablue: '#a0b7ce',
  silver: '#e2e2dd',
  'sky blue': '#bfcedc',
  'space gray': '#4d4c4f',
  'space-gray': '#393736',
};
