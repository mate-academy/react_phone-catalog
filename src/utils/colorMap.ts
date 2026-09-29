export const COLOR_MAP: Record<string, string> = {
  black: '#000000',
  white: '#ffffff',
  red: '#e63946',
  green: '#2a9d8f',
  blue: '#2196f3',
  yellow: '#ffe600',
  purple: '#b388ff',
  coral: '#ff7f50',

  spacegray: '#535154',
  'space-gray': '#535154',
  'space gray': '#535154',
  midnight: '#192531',
  starlight: '#f0eec9',
  gold: '#f9e5c9',
  'rose-gold': '#e8c5b8',
  silver: '#e2e4e1',
  sierrablue: '#9bb5ce',
  graphite: '#4c4b49',
  pacificblue: '#2d4b5a',
  'deep-purple': '#483c4d',
  spaceblack: '#2e2c2e',
  'space-black': '#2e2c2e',
};

export const getColorHex = (colorName: string): string => {
  const normalizedColor = colorName.toLowerCase().trim();

  return COLOR_MAP[normalizedColor] || colorName;
};
