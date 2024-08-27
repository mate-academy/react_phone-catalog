import { ThemeType } from '../types/ThemeType';

export const getLogoIconSrs = (theme: ThemeType): string => {
  return theme === 'dark'
    ? 'img/icons/LogoIcon--DarkTheme.svg'
    : 'img/icons/LogoIcon.svg';
};

export const getMenuIconSrc = (
  isMenuOpen: boolean,
  theme: ThemeType,
): string => {
  if (isMenuOpen) {
    return theme === 'dark'
      ? 'img/icons/CloseMenuIcon--DarkTheme.svg'
      : 'img/icons/CloseMenuIcon.svg';
  }

  return theme === 'dark'
    ? 'img/icons/MenuIcon--DarkTheme.svg'
    : 'img/icons/MenuIcon.svg';
};

export const getFavoritesIconSrc = (theme: ThemeType): string => {
  return theme === 'dark'
    ? 'img/icons/FavoritesIcon--DarkTheme.svg'
    : 'img/icons/FavoritesIcon.svg';
};

export const getCartIconSrc = (theme: ThemeType): string => {
  return theme === 'dark'
    ? 'img/icons/CartIcon--DarkTheme.svg'
    : 'img/icons/CartIcon.svg';
};

export const getChevronIconSrc = (theme: ThemeType): string => {
  return theme === 'dark'
    ? 'img/icons/ChevronIcon--DarkTheme.svg'
    : 'img/icons/ChevronIcon.svg';
};

export const getHomeIconSrc = (theme: ThemeType): string => {
  return theme === 'dark'
    ? 'img/icons/HomeIcon--DarkTheme.svg'
    : 'img/icons/HomeIcon.svg';
};

export const getRemoveIconSrc = (theme: ThemeType): string => {
  return theme === 'dark'
    ? 'img/icons/CrossIcon--DarkTheme.svg'
    : 'img/icons/CrossIcon.svg';
};

export const getIncreaseIconSrc = (theme: ThemeType): string => {
  return theme === 'dark'
    ? 'img/icons/PlusIcon--DarkTheme.svg'
    : 'img/icons/PlusIcon.svg';
};

export const getDecreaseIconSrc = (theme: ThemeType): string => {
  return theme === 'dark'
    ? 'img/icons/MinusIcon--DarkTheme.svg'
    : 'img/icons/MinusIcon.svg';
};
