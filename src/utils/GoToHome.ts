export const GoToHome = () => {
  localStorage.setItem('scrollPosition', '0');
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
