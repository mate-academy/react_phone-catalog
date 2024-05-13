type ColorsType = {
  spacegray: string;
  'space-gray': string;
  gold: string;
  silver: string;
  black: string;
  rosegold: string;
  'rose-gold': string;
  green: string;
  red: string;
  yellow: string;
  white: string;
  coral: string;
  purple: string;
  midnightgreen: string;
  spaceblack: string;
  graphite: string;
  sierrablue: string;
  blue: string;
  pink: string;
  midnight: string;
  starlight: string;
  'sky-blue': string;
};

export type Color = keyof ColorsType;

export const Colors: ColorsType = {
  spacegray: '#4f4f52',
  'space-gray': '#4f4f52',
  gold: '#c7ab44',
  silver: '#c3c1b9',
  black: '#000',
  rosegold: '#eeaeca',
  'rose-gold': '#eeaeca',
  green: '#54cfbf',
  red: '#bb2e36',
  yellow: '#e7e421',
  white: '#f0f0e5',
  coral: '#97e1e2',
  purple: '#eaa9f0',
  midnightgreen: '#154509',
  spaceblack: '#0c0c0c',
  graphite: '#777688',
  sierrablue: '#b4d1e8',
  blue: '#27618f',
  pink: '#ecb3de',
  midnight: '#383437',
  starlight: '#fad4f9',
  'sky-blue': '#aedde0',
};
