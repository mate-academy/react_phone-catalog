export const getColor = (colorName: string) => {
  const colors: Record<string, string> = {
    black: 'black',
    green: '#008000',
    yellow: '#FFFF00',
    white: '#FFFFFF',
    purple: '#800080',
    red: '#FF0000',
    spacegray: '#717378',
    midnightgreen: '#4e5850',
    gold: '#FFD700',
    silver: '#C0C0C0',
    rosegold: '#B76E79',
    coral: '#F88379',
    midnight: '#191970',
    spaceblack: '#313238',
    blue: '#007AFF',
    pink: '#FF2D55',
    graphite: '#38373b',
    sierrablue: '#A2C4D2',
    skyblue: '#87CEEB',
    starlight: '#F8F9EC',
  };

  const normalizedColorName = colorName.split(' ').join('');

  for (const key in colors) {
    if (key === normalizedColorName) {
      return colors[key] as string;
    }
  }

  return undefined;
};
