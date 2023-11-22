export const getCorrectColor = (color: string) => {
  switch (color) {
    case 'midnightgreen':
      return '#5f7170';

    case 'spacegray':
      return '#4c4c4c';

    case 'gold':
      return '#fcdbc1';

    case 'rosegold':
      return 'pink';

    default:
      return color;
  }
};
