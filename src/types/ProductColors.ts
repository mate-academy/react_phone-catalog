export const COLOR_MAP: Record<string, string> = {
  black: '#000000',
  gold: '#FFD700',
  rosegold: '#B76E79',
  'rose-gold': '#B76E79',
  silver: '#C0C0C0',
  spacegray: '#657383',
  gray: '#657383',
  green: '#008000',
  red: '#FF0000',
  white: '#FFFFFF',
  yellow: '#FFFF00',
  midnightgreen: '#004953',
  purple: '#800080',
  pink: '#FFC0CB',
  graphite: '#383838',
  sierrablue: '#69ABCE',
  midnight: '#00070F',
  coral: '#FF7F50',
} as const;

export type ColorName = keyof typeof COLOR_MAP;
