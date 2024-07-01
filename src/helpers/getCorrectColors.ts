export const getCorrectColors = (color: string) => {
  switch (color) {
    case 'midnightgreen': {
      return 'green';
    }

    case 'spacegray': {
      return 'gray';
    }

    case 'coral': {
      return 'orange';
    }

    case 'rosegold': {
      return 'pink';
    }

    default: {
      return color;
    }
  }
};
