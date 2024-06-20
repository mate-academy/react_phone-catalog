export const topScroll = () => {
  // document.body.scrollTop = 0; // For Safari
  // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
