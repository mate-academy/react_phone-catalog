type ColorPalette = {
  midnightgreen: string,
  rosegold: string,
  gold: string,
  silver: string,
  black: string,
  green: string,
  yellow: string,
  white: string,
  purple: string,
  red: string,
  spacegray: string,
  coral: string,
};

export type Color = keyof ColorPalette;

export const Colors: ColorPalette = {
  midnightgreen: '#5f6960',
  rosegold: '#f9d2cd',
  gold: '#f3ddc4',
  silver: '#d9dadb',
  black: '#363539',
  green: '#bee8d5',
  yellow: '#fee889',
  white: '#fcf7f4',
  purple: '#ccc2d6',
  red: '#cd283f',
  spacegray: '#4e4d4b',
  coral: '#fd6a56',
};
