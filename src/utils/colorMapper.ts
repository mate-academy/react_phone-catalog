export const COLOR_MAP: Record<string, string> = {
  black: '#1F2022',
  rosegold: '#E6C7C2',
  gold: '#F9E4C5',
  silver: '#E2E6E9',
  spacegray: '#4E5154',
  white: '#FFFFFF',
  midnight: '#2E3641',
  yellow: '#FFE17D',
  purple: '#D1CDDA',
  blue: '#005dbb',
  red: '#8B0000',
};

export const getHexColor = (colorName: string): string => {
  const normalizedName = colorName.toLowerCase().replace(/\s+/g, '');

  return COLOR_MAP[normalizedName] || '#8993a4';
};
