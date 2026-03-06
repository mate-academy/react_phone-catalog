export const ColorMap: Record<string, string> = {
  black: '#212122',
  white: '#F0F0F0',
  red: '#BA0C2F',
  yellow: '#FFE681',
  green: '#ABE7D2',
  purple: '#D1CDDA',

  pink: '#FAE3D9',
  gold: '#F9E5C9',
  silver: '#E2E4E1',
  spacegray: '#535150',
  midnightgreen: '#4E5851',
  starlight: '#F8F9EC',

  rosegold: '#E6C7C2',
  skyblue: '#A1C1D9',
  midnight: '#191970',
  pacificblue: '#28475C',
  sierrablue: '#9BB5CE',
  graphite: '#41424C',
  alpinegreen: '#4F5D4E',
};

function normalizeColorKey(name: string) {
  return String(name)
    .toLowerCase()
    .replace(/\s|_|-/g, '');
}

export function getColorHex(colorName: string) {
  const key = normalizeColorKey(colorName);
  return ColorMap[key] || colorName;
}
