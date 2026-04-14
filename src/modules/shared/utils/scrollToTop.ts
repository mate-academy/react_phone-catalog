export const scrollToTop = (behavior: 'smooth' | 'auto' = 'smooth') => {
  window.scrollTo({
    top: 0,
    behavior: behavior,
  });
};
