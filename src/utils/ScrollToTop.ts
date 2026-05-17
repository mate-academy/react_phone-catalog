export const ScrollToTop = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
