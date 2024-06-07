export const colors = [
  { name: 'white', value: '#fafafa' },
  { name: 'black', value: '#0f0f11' },
  { name: 'silver', value: '#e8e8e8' },
  { name: 'red', value: '#e61736' },
  { name: 'green', value: '#85ccae' },
  { name: 'yellow', value: '#fae864' },
  { name: 'purple', value: '#c7b5f5' },
  { name: 'gold', value: '#edccad' },
  { name: 'rose gold', value: '#fcd7d2' },
  { name: 'rosegold', value: '#fcd7d2' },
  { name: 'spacegray', value: '#636160' },
  { name: 'space gray', value: '#636160' },
  { name: 'graphite', value: '#636160' },
  { name: 'midnight', value: '#636160' },
  { name: 'spaceblack', value: '#636160' },
  { name: 'midnightgreen', value: '#607064' },
  { name: 'coral', value: '#fa7878' },
  { name: 'sky blue', value: '#cce6ff' },
  { name: 'sierrablue', value: '#cce6ff' },
];

export const getColor = (color: string) => {
  const hexColor = colors.find(clr => color === clr.name)?.value || color;

  return hexColor;
};
