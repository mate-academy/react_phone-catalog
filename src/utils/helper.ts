export const getColor = (color: string) => {
  const normalize = color.replaceAll(/[\s-]+/g, '').toLowerCase();
  const colorMap: Record<string, string> = {
    spacegray: '#6E6E73',
    midnightgreen: '#004B43',
    silver: '#C0C0C0',
    rosegold: '#B76E79',
    midnight: '#0B1220',
    spaceblack: '#121212',
    graphite: '#4B4F54',
    sierrablue: '#6BA3D6',
    skyblue: '#87CEEB',
    starlight: '#F1EDE6',
  };

  return colorMap[normalize] || color;
};
