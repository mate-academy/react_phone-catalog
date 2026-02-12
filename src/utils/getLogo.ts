import { ColorTheme } from '../types/ColorTheme';

type LogoSrc = Record<ColorTheme, string>;

const logoSrc: LogoSrc = {
  light: 'img/header-logo-light.png',
  dark: 'img/header-logo-dark.png',
};

export function getLogo(theme: ColorTheme) {
  return logoSrc[theme];
}
