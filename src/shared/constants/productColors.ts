export const productColors: Record<string, string> = {
  black: '#000000',
  blacktitanium: '#373737',
  blue: '#215EAD',
  coral: '#FF6F61',
  gold: '#FCDBC1',
  graphite: '#5C5B57',
  green: '#A4C9B5',
  jetblack: '#101014',
  lavender: '#D6CADD',
  midnight: '#1D2633',
  midnightgreen: '#5F7170',
  naturaltitanium: '#B8B4AA',
  pink: '#FADADD',
  purple: '#D1C6E6',
  red: '#BA0C2F',
  rosegold: '#E6C7C2',
  sierrablue: '#9BB5CE',
  silver: '#F0F0F0',
  skyblue: '#87CEEB',
  spaceblack: '#2E2E30',
  spacegray: '#4C4C4C',
  starlight: '#F8F3E9',
  ultramarine: '#5B5FC7',
  white: '#FFFFFF',
  yellow: '#F9E46B',
};

export const getProductColor = (color: string): string => {
  const key = color.toLowerCase().replace(/[\s-]/g, '');

  return productColors[key] ?? productColors.silver;
};
