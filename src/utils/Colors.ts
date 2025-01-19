const colors: { [key: string]: string } = {
  spacegray: '#5E5E5E',
  silver: '#C0C0C0',
  gold: '#FFD700',
  blue: '#007AFF',
  red: '#FF3B30',
  black: '#000000',
  green: '#34C759',
  yellow: '#FFCC00',
  white: '#FFFFFF',
  purple: '#AF52DE',
  midnightgreen: '#004E39',
  rosegold: '#B76E79',
  coral: '#FF6A6A',
  midnight: '#121212',
  spaceblack: '#1C1C1E',
  pink: '#FFCDD2',
  graphite: '#4B4B4F',
  sierrablue: '#A2C8E6',
  skyblue: '#87CEEB',
  starlight: '#EFEDEB',
};

export const getColorByName = (name: string) => {
  const normalizedName = name.replaceAll(' ', '');

  return colors[normalizedName] || name;
};
