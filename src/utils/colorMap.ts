const COLOR_MAP: Record<string, string> = {
  black: '#010101',
  white: '#f7f7f7',
  red: '#b03734',
  green: '#a4bea0',
  yellow: '#f5da8d',
  purple: '#a191bf',
  'deep purple': '#4f4d5f',
  pink: '#e6cadd',
  gold: '#f0dcc8',
  silver: '#e3e4e5',
  spacegray: '#5f5c5c',
  'space gray': '#5f5c5c',
  midnightgreen: '#556158',
  'midnight green': '#556158',
  midnight: '#33373b',
  starlight: '#f4efe6',
  graphite: '#5c5a57',
  sierrablue: '#a8bccb',
  'sierra blue': '#a8bccb',
  coral: '#f5a397',
  blue: '#5c7f9e',
};

export function getSwatchColor(colorName: string): string {
  return COLOR_MAP[colorName.toLowerCase()] ?? '#d0d0d0';
}
