type ColorName = string;

export const convertToHexFormat = (colorName: ColorName): string => {
  const colorCodes: Record<ColorName, string> = {
    spacegray: '#4C4C4C',
    midnight: '#1d1936',
    spaceblack: '#505150',
    sierrablue: '#BFDAF7',
    graphite: '#41424C',
    midnightgreen: '#5F7170',
    rosegold: '#F8D8D3',
    purple: '#CCC2D9',
    green: '#BEE8D5',
    yellow: '#FEE889',
    gold: '#FCDBC1',
    red: '#D31B35',
    black: '#000',
    coral: '#F88379',
    blue: '#023E8A',
    pink: '#FFD1DC',
    silver: '#A9B0B4',
    skyblue: '#87CEEB',
    starlight: '#9A9898',
  };

  return colorCodes[colorName];
};
