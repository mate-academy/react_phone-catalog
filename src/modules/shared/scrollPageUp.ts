export const scrollPageUp = () => {
  window.scrollTo({
    top: 0,
  });
};

export const scrollPageUpSmooth = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
