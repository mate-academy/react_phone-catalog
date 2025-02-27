export function getHexFromColorName(colorName: string) {
  switch (colorName) {
    case 'black':
      return '#000';
    case 'blue':
      return '#3C798B';
    case 'coral':
      return '#FF7F50';
    case 'gold':
      return '#FFD7B9';
    case 'graphite':
      return '#747372';
    case 'green':
      return '#CFEBCF';
    case 'midnight':
      return '#242424';
    case 'midnightgreen':
      return '#728875';
    case 'pink':
      return '#FEE7F4';
    case 'purple':
      return '#E1D4FF';
    case 'red':
      return '#ED261D';
    case 'rosegold':
      return '#FDD7D3';
    case 'rose gold':
      return '#FDD7D3';
    case 'sierrablue':
      return '#B1D6E2';
    case 'silver':
      return '#E6ECEF';
    case 'sky-blue':
      return '#E1EAFF';
    case 'sky blue':
      return '#E1EAFF';
    case 'spaceblack':
      return '#5C5151';
    case 'spacegray':
      return '#525C60';
    case 'space gray':
      return '#525C60';
    case 'space-gray':
      return '#525C60';
    case 'starlight':
      return '#FAF1F0';
    case 'white':
      return '#EFEFEF';
    case 'yellow':
      return '#F5EC80';
    default:
      return colorName;
  }
}
