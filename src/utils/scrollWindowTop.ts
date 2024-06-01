export const ScrollBackToTop = () => {
  window.scrollTo({ top: 0 });
};

export const ScrollToTop = () => {
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo({ top: 0 });

  document.documentElement.style.scrollBehavior = 'smooth';
};
