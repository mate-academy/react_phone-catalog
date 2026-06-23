export const COLOR = {
  white: 'rgba(255,255,255,1)',
  black: 'rgba(0,0,0,1)',
  red: 'rgba(255,59,48,1)',
  green: 'rgba(0,199,190,1)',
  yellow: 'rgba(238, 242, 10, 1)',
  blue: 'rgba(85, 156, 189, 1)',
  purple: 'rgba(209, 162, 233, 1)',
  pink: 'rgba(239, 159, 211, 1)',
  starlight: 'rgba(245,245,247,1)',
  spacegray: 'rgba(108, 103, 103, 1)',
  silver: 'rgba(199,199,204,1)',
  gold: 'rgba(255, 228, 207, 1)',
  rosegold: 'rgba(244, 185, 216, 1)',
  graphite: 'rgba(83,83,83,1)',
  pacificblue: 'rgba(25,133,221,1)',
  midnight: 'rgba(10,11,29,1)',
  midnightgreen: 'rgba(78,88,81,1)',
  sierrablue: 'rgba(155,181,206,1)',
  spaceblack: 'rgba(18,18,18,1)',
  champagne: 'rgba(247,231,206,1)',
  skyblue: 'rgba(135,206,235,1)',
  purpleblue: 'rgba(88,86,214,1)',
} as const;

export type ColorKey = keyof typeof COLOR;
export type Color = (typeof COLOR)[keyof typeof COLOR];

export function getColor(key: ColorKey): Color {
  return COLOR[key];
}
