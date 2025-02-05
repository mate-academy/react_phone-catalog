import { colorMap } from './consts/objects';

export const getColorValue = (colorName: string): string => {
  const value = colorMap[colorName.replace(/[- ]/g, '').toLowerCase()];

  if (value) {
    return value;
  } else {
    throw new Error(`${colorName} color not found!!!`);
  }
};
