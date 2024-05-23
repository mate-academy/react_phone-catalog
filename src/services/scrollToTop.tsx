/* eslint-disable @typescript-eslint/indent */
export function scrollToTop(smooth: boolean) {
  return smooth
    ? window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    : window.scrollTo({
        top: 0,
      });
}
