export const scrollToTop = () => {
  if (window.scrollY > 200) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
};
