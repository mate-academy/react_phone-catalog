const productColors: Record<string, string> = {
  black: '#1f2020',
  white: '#f5f5f0',
  yellow: '#f4d06f',
  green: '#5f8f72',
  purple: '#b8afe6',
  red: '#c91c1c',
  gold: '#f3d6a3',
  silver: '#e3e5e8',
  spacegray: '#4c4c4c',
  rosegold: '#f6c7b5',
  midnightgreen: '#4e5f58',
  coral: '#ff7f6e',
  midnight: '#171e27',
  starlight: '#f5f1e6',
  blue: '#4f7cae',
  pink: '#f5b8c8',
  graphite: '#4a4a4d',
  sierrablue: '#9bb5ce',
  skyblue: '#b7d7ee',
};

const getColorValue = (color: string) => {
  const preparedColor = color.toLowerCase().replace(/[\s-]+/g, '_');

  return productColors[preparedColor] || color;
};
