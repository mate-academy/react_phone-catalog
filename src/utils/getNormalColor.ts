export const getNormalColor = (col: string) => {
  switch (col) {
    case 'spacegray':
    case 'space gray':
      return '#535355';
    case 'midnightgreen':
      return '#1e342e';
    case 'midnight':
      return '#18186c';
    case 'starlight':
      return '#e8d5d7';
    case 'rose gold':
    case 'rosegold':
      return '#b16b75';
    case 'sky blue':
      return '#1fa2d4';
    case 'spaceblack':
      return '#4e4e4e';
    case 'sierrablue':
      return '#b9d3ef';
    case 'graphite':
      return '#4d4d52';
    default:
      return col;
  }
};
