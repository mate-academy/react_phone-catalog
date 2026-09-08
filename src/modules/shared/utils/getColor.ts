export function getColor(color: string) {
  switch (color.toLowerCase()) {
    case 'space gray':
    case 'spacegray':
      return '#5F7170';
    case 'midnight':
      return '#2C2C31';
    case 'spaceblack':
      return '#1D1D1F';
    case 'gold':
      return '#FCDBC1';
    case 'blue':
      return '#2A619F';
    case 'midnightgreen':
      return '#4C4C4C';
    case 'pink':
      return '#F7B5C2';
    case 'silver':
      return '#F0F0F0';
    case 'yellow':
      return '#F5D34C';
    case 'purple':
      return '#A482B3';
    case 'red':
      return '#D1323C';
    case 'white':
      return '#F5F5F5';
    case 'green':
      return '#3C5B3F';
    case 'black':
      return '#2C2C2E';
    case 'coral':
      return '#F5855C';
    case 'rose gold':
    case 'rosegold':
      return '#E0B0B0';
    case 'graphite':
      return '#383838';
    case 'sierrablue':
      return '#6BA0B8';
    case 'sky blue':
      return '#A4D1E3';
    case 'starlight':
      return '#F9F5E8';
    default:
      return '#000000';
  }
}
