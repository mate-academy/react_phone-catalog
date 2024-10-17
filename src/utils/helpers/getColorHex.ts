import { ColorNames } from '@utils/types/colorNames.type';

export const getColorHex = (color: ColorNames) => {
  const colors = {
    white: '#ffffff',
    pink: '#FFC0CB',
    red: '#FF0000',
    black: '#000000',
    blue: '#0000ff',
    green: '#008000',
    yellow: '#FFFF00',
    gold: '#FFD700',
    purple: '#800080',
    silver: '#C0C0C0',
    coral: '#ff7f50',
    midnight: '#00004C',
    midnightgreen: '#004953',
    spaceblack: '#505150',
    sierrablue: '#BFDAF7',
    graphite: '#4B4E53',
    spacegray: '#717378',
    'space gray': '#717378',
    'space-gray': '#717378',
    starlight: '#F8F9EC',
    rosegold: '#E0BFB8',
    'rose gold': '#E0BFB8',
    'sky-blue': '#87CEEB',
  };

  return colors[color] || colors.white;
};
