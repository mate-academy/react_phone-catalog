export const COLOR_MAP: Record<string, string> = {
  midnight: '#2c3e50',
  midnightgreen: '#2e8b57',
  spaceblack: '#1c1c1c',
  graphite: '#4b4b4b',
  spacegray: '#5f5f5f',
  sierrablue: '#5e7c8a',
  skyblue: '#87ceeb',
  starlight: '#f5f5dc',
  rosegold: '#b76e79',
};

export const COLOR_LABELS: Record<string, string> = {
  midnight: 'Midnight',
  midnightgreen: 'Midnight Green',
  spaceblack: 'Space Black',
  graphite: 'Graphite',
  spacegray: 'Space Gray',
  sierrablue: 'Sierra Blue',
  skyblue: 'Sky Blue',
  starlight: 'Starlight',
  rosegold: 'Rose Gold',
};

const normalizeColorKey = (color: string): string =>
  color.toLowerCase().replace(/[\s-]/g, '');

export const getColorValue = (color: string): string =>
  COLOR_MAP[normalizeColorKey(color)] ?? color;

export const getColorLabel = (color: string): string =>
  COLOR_LABELS[normalizeColorKey(color)] ?? color;
