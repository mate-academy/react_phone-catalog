const colorMap: Record<string, string> = {
  spacegray: '#535150',
  midnightgreen: '#004953',
  gold: '#D4AF37',
  silver: '#C0C0C0',

  purple: '#6F42C1',
  red: '#C91F37',
  green: '#4CD964',
  blue: '#0A84FF',
  pink: '#FF2D55',
  starlight: '#F5F5DC',
};

export const getColor = (color: string) => {
  return colorMap[color.toLowerCase()] || color;
};
