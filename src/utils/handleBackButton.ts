export const handleBackButton = () => {
  window.history.back();

  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
};
