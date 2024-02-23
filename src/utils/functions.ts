export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const createCssColor = (color: string) => {
  switch (color) {
    case 'spacegray':
      return '#4c4a49';
    case 'midnightgreen':
      return '#3d654f';
    case 'rosegold':
      return '#e6bdb7';
    default:
      return color;
  }
};
