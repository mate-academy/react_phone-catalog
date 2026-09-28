const COLOR_MAP: Record<string, string> = {
  rosegold: '#b98f82',
  spacegray: '#535154',
  midnight: '#19232d',
  sierrablue: '#9fb5ce',
  gold: '#f9e5c9',
  silver: '#e2e4e1',
  spaceblack: '#2e2c2e',
  graphite: '#4c4b49',
  pacificblue: '#2d5362',
  starlight: '#f8f9ec',
  green: '#aee1cd',
  purple: '#e5d7f2',
  red: '#e30000',
  black: '#1f2020',
  white: '#f8f8f8',
  yellow: '#f3d060',
  blue: '#2d5362',
};

export const getBgColor = (color: string): string => {
  if (!color) {
    return '#fff';
  }

  const normalized = color.toLowerCase().replace(/[\s-]/g, '');

  return COLOR_MAP[normalized] || color;
};
