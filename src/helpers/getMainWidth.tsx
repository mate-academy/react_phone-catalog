import {
  MIN_WIDTH_DESKTOP,
  MIN_WIDTH_TABLET, WIDTH_MAIN_DESKTOP,
  WIDTH_MARGINS_MOBILE,
  WIDTH_MARGINS_TABLET,
} from './consts';

export const getMainWidth = () => {
  const windowWidth = window.innerWidth;
  const windowScreenWigth = window.screen.width;
  const width = windowWidth < windowScreenWigth
    ? windowWidth
    : windowScreenWigth;

  if (width < MIN_WIDTH_DESKTOP) {
    return width - WIDTH_MARGINS_TABLET;
  }

  if (width < MIN_WIDTH_TABLET) {
    return width - WIDTH_MARGINS_MOBILE;
  }

  return WIDTH_MAIN_DESKTOP;
};
