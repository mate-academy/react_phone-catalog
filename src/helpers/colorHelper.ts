type Colors = {
  [key: string]: string;
};

const colors: Colors = {
  rosegold: '#F9D2CD',
  gold: '#F3DBC4',
  silver: '#D9DADB',
  black: '#363539',
  green: '#BEE8D5',
  yellow: '#FEE889',
  white: '#FCF7F4',
  purple: '#CCC2D6',
  red: '#CD283F',
  spacegray: '#4E4D4B',
  midnightgreen: '#5F6960',
  coral: '#FD6A56',
};

export const colorsRegEx = new RegExp(Object.keys(colors).join('|'), 'gi');

export function getColor(color: string): string {
  if (color in colors) {
    return colors[color];
  }

  return 'none';
}
