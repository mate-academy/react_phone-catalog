const mediaQueries = [
  window.matchMedia('(max-width: 980px)'),
  window.matchMedia('(max-width: 760px)'),
];

export const scrollToTop = () => {
  if (window.scrollY > 200) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
};

export const getVisibleNumberOfProducts = () => {
  if (mediaQueries[1].matches) {
    return 2;
  }

  if (mediaQueries[0].matches) {
    return 3;
  }

  return 4;
};
