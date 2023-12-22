export const scrollToTop = () => {
  document.documentElement.style.scrollBehavior = 'auto';
  window.scroll({ top: 0 });
  document.documentElement.style.scrollBehavior = 'smooth';
};
