const productColors = {
  black: '#000',
  gold: '#EFBF04',
  yellow: '#FFDE21',
  green: '#40826D',
  midnightgreen: '#004953',
  silver: '#C4C4C4',
  spacegray: '#717378',
  red: '#CD1C18',
  white: '#FFFAFA',
  purple: '#C9A0DC',
  coral: '#FF7F50',
  rosegold: '#DEA193',
  midnight: '#02011f',
  spaceblack: '#323233',
  blue: '#305CDE',
  pink: '#FC8EAC',
  sierrablue: '#BFDAF7',
  graphite: '#41424C',
  skyblue: '#82C8E5',
  starlight: '#bcc0cc',
};

export const getProductColors = (color: string) => {
  const normalizeColor = color
    .replaceAll(' ', '')
    .replaceAll('-', '')
    .toLowerCase();

  if (normalizeColor in productColors) {
    return productColors[normalizeColor as keyof typeof productColors];
  }

  return '#fff';
};
