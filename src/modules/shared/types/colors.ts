export const colors = {
  black: '#000',
  green: '#008000',
  white: '#fff',
  yellow: '#ff0',
  purple: '#800080',
  red: '#f00',
  blue: '#00f',
  pink: '#ffc0cb',
  spacegray: '#4b4f54',
  midnightgreen: '#004953',
  gold: '#ffd700',
  silver: '#c0c0c0',
  rosegold: '#b76e79',
  coral: '#ff7f50',
  midnight: '#2c3e50',
  graphite: '#383838',
  sierrablue: '#6cabdd',
  spaceblack: '#1d1d1d',
} as const;

export type ColorName = keyof typeof colors;
