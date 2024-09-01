import { ThemeType } from '../types/ThemeType';
import { BASE_URL } from '../utils/const';

const ICON_BASE_PATH = `${BASE_URL}/img/icons`;

const getIconSrc = (iconName: string, theme: ThemeType): string => {
  const themePath = theme === 'dark' ? `--DarkTheme` : '';

  return `${ICON_BASE_PATH}/${iconName}${themePath}.svg`;
};

export const getLogoIconSrc = (theme: ThemeType): string =>
  getIconSrc('LogoIcon', theme);
export const getMenuIconSrc = (
  isMenuOpen: boolean,
  theme: ThemeType,
): string => {
  return getIconSrc(isMenuOpen ? 'CloseMenuIcon' : 'MenuIcon', theme);
};

export const getFavoritesIconSrc = (theme: ThemeType): string =>
  getIconSrc('FavoritesIcon', theme);

export const getCartIconSrc = (theme: ThemeType): string =>
  getIconSrc('CartIcon', theme);

export const getChevronIconSrc = (theme: ThemeType): string =>
  getIconSrc('ChevronIcon', theme);

export const getHomeIconSrc = (theme: ThemeType): string =>
  getIconSrc('HomeIcon', theme);

export const getRemoveIconSrc = (theme: ThemeType): string =>
  getIconSrc('CrossIcon', theme);

export const getIncreaseIconSrc = (theme: ThemeType): string =>
  getIconSrc('PlusIcon', theme);

export const getDecreaseIconSrc = (theme: ThemeType): string =>
  getIconSrc('MinusIcon', theme);
