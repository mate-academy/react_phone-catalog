export const scrollTop = () => {
  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, 0);
};
