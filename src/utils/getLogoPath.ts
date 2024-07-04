import darkModeLogo from '../assets/img/Logo-dark-mode.png';
import lightModeLogo from '../assets/img/Logo.png';

export const getLogoPath = (isThemeDark: boolean) => {
  return isThemeDark ? darkModeLogo : lightModeLogo;
};
