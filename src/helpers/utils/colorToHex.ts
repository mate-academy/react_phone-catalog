import { Palette } from '../types/Palette';

export const colorToHex = (color: string) => {
  const palette: Palette = {
    black: '#303234',
    green: '#99eeae',
    yellow: '#fff190',
    white: '#fff',
    purple: '#e6e6fa',
    red: '#ff0038',
    spacegray: '#575757',
    gold: '#ffd5b3',
    midnightgreen: '#5e7266',
    silver: '#d8d8d8',
    coral: '#f56549',
    rosegold: '#ffd5cf',
  };

  return palette[color as keyof Palette] || '#000';
};
