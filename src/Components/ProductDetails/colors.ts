type Colors = {
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
}

export type Color = keyof typeof Colors;

export const Colors: Colors = {
  midnightgreen: '#5F6960',
  rosegold: '#F9D2CD',
  gold: '#F3DBC4',
  silver: '#D9DADB',
  black: '#363539',
  green: '#BEE8D5',
  yellow: '#FEE889',
  white: '#FCF7F4',
  purple: '#CCC2D6',
  red: '#CD283F',
  spacegray: '#4E4D4B',
  coral: '#FD6A56',
};
