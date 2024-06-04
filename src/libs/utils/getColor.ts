import { Colors } from '../types';

export const getColor = (color: string) => {
  switch (color) {
    case 'gold':
      return Colors.Gold;

    case 'yellow':
      return Colors.Yellow;

    case 'green':
      return Colors.Green;

    case 'midnightgreen':
      return Colors.Midnightgreen;

    case 'silver':
      return Colors.Silver;

    case 'spacegray':
      return Colors.Spacegray;

    case 'red':
      return Colors.Red;

    case 'purple':
      return Colors.Purple;

    case 'coral':
      return Colors.Coral;

    case 'rosegold':
    case 'rose gold':
      return Colors.Rosegold;

    case 'midnight':
      return Colors.Midnight;

    case 'spaceblack':
      return Colors.Spaceblack;

    case 'blue':
      return Colors.Blue;

    case 'pink':
      return Colors.Pink;

    case 'sierrablue':
      return Colors.Sierrablue;

    case 'graphite':
      return Colors.Graphite;

    case 'space gray':
    case 'space-gray':
      return Colors.Spacegray;

    case 'sky-blue':
    case 'sky blue':
      return Colors.Skyblue;

    case 'starlight':
      return Colors.Starlight;

    default:
      return color;
  }
};
