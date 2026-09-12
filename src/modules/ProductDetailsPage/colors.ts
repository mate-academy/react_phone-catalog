/**
 * Swatch colours for the "Available colors" picker. The API spells the same
 * colour in several ways ("space gray" / "spacegray"), so keys are normalised.
 */
const swatches: Record<string, string> = {
  black: '#1f2020',
  blue: '#a0b4c8',
  coral: '#f0625d',
  gold: '#fcdbc1',
  graphite: '#53514f',
  green: '#aee1cd',
  midnight: '#171e27',
  midnightgreen: '#4e5851',
  pink: '#f9d9d6',
  purple: '#d1cdda',
  red: '#ba0c2e',
  rosegold: '#eec7c0',
  sierrablue: '#a7c1d9',
  silver: '#f0f2f2',
  skyblue: '#a7c1d9',
  spaceblack: '#57534e',
  spacegray: '#4c4c4c',
  starlight: '#faf6f2',
  white: '#f9f9f9',
  yellow: '#ffe680',
};

export const getSwatchColor = (colorName: string): string => {
  const key = colorName.toLowerCase().replace(/[\s-]/g, '');

  return swatches[key] ?? colorName;
};
