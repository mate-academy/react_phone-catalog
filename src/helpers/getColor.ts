export const getColor = (color: string) => {
  switch (color) {
    case 'midnightgreen':
      return '#5f7170';

    case 'spacegray':
      return '#4c4c4c';

    case 'gold':
      return '#fcdbc1';

    case 'white':
      return '#e2e5e9';

    case 'rosegold':
      return 'pink';

    default:
      return color;
  }
};
