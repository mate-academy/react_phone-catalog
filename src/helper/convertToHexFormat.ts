import convert from 'color-convert';

export const convertToHexFormat = (colorName: any) => {
  if (colorName === 'spacegray') {
    return '#4C4C4C';
  }

  if (colorName === 'midnight') {
    return '#1d1936';
  }

  if (colorName === 'spaceblack') {
    return '#505150';
  }

  if (colorName === 'sierrablue') {
    return '#BFDAF7';
  }

  if (colorName === 'graphite') {
    return '#41424C';
  }

  if (colorName === 'midnightgreen') {
    return '#5F7170';
  }

  if (colorName === 'rosegold') {
    return '#F8D8D3';
  }

  if (colorName === 'purple') {
    return '#CCC2D9';
  }

  if (colorName === 'green') {
    return '#BEE8D5';
  }

  if (colorName === 'yellow') {
    return '#FEE889';
  }

  if (colorName === 'gold') {
    return '#FCDBC1';
  }

  if (colorName === 'red') {
    return '#D31B35';
  }

  const rgbArray = convert.keyword.rgb(colorName);
  const hexValue = convert.rgb.hex(rgbArray);

  return `#${hexValue}`;
};
