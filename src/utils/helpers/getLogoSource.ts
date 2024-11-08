import { Theme } from '@context/ThemeProvider';

import logoDark from '/img/logo/logo-dark.webp';
import logoLight from '/img/logo/logo-white.webp';

export const getLogoSource = (theme: Theme): string => {
  return theme === Theme.LIGHT ? logoDark : logoLight;
};
