const generateColorHexMapping: { [key: string]: string } = {
  spacegray: '#808080',
  midnightgreen: '#004953',
  rosegold: '#B76E79',
  midnight: '#2B1B17',
  spaceblack: '#1F1F1F',
  graphite: '#383838',
  sierrablue: '#6C8CA0',
};

export const unusualColor = (color: string) => {
  const hexColor = generateColorHexMapping[color];

  return hexColor ? hexColor : color;
};
