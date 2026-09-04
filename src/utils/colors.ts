const COLOR_MAP: Record<string, string> = {
  spacegray: '#4b4b4d',
  midnightgreen: '#004953',
  rosegold: '#f4c2c2',
  gold: '#e6ca97',
  graphite: '#41424c',
  sierrablue: '#a7c1d9',
  starlight: '#f6f2e9',
  coral: '#ff7f50',
  midnight: '#1c1c1e',
};

export const getColorValue = (color: string) => COLOR_MAP[color] || color;
