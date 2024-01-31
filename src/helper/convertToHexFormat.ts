import convert from 'color-convert';

export const convertToHexFormat = (colorName: any) => {
  if (colorName === 'spacegray') {
    return '#4C4C4C';
  }

  if (colorName === 'midnightgreen') {
    return '#5F7170';
  }

  if (colorName === 'rosegold') {
    return '#F8D8D3';
  }

  const rgbArray = convert.keyword.rgb(colorName);
  const hexValue = convert.rgb.hex(rgbArray);

  return `#${hexValue}`;
};
