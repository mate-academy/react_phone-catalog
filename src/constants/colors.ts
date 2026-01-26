export const PRODUCT_COLORS: { [key: string]: string } = {
  black: '#000000',
  white: '#F0F0F0',
  gold: 'gold',
  silver: 'silver',
  spacegray: '#5C5C5C',
  'space-gray': '#5C5C5C',
  red: 'red',
  green: 'green',
  yellow: 'yellow',
  purple: 'purple',
  midnightgreen: '#004953',
  'midnight-green': '#004953',
  coral: 'coral',
  blue: 'blue',
  pink: 'pink',
  'rose-gold': '#B76E79',
  graphite: '#41424C',
  'sierra-blue': '#69ABCE',
};

export const getProductColor = (colorName: string): string => {
  return PRODUCT_COLORS[colorName] || colorName;
};
