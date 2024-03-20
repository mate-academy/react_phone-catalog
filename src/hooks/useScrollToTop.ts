export function useScrollToTop() {
  const scrollTop = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  return [scrollTop];
}

// const backToTop = () => {
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth',
//   });
// };
