export const changeColorToHex = (color: string): string => {
  const palette = {
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

  return palette[color as keyof unknown] || '#000';
};
