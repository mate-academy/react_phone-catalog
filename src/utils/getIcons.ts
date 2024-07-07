import { Theme } from '../context/ThemeContext';
import { BASE_URL } from './fetchClient';

const ICONS_BASE_PATH = `${BASE_URL}/img/icons`;

const getIcons = (name: string, theme: Theme): string => {
  const themePath = theme === 'dark' ? `--dark` : '';

  return `${ICONS_BASE_PATH}/${name}${themePath}.svg`;
};

export const getLogoIcon = (theme: Theme): string => getIcons('logo', theme);

export const getMenuIcon = (isMenuOpen: boolean, theme: Theme): string => {
  return getIcons(isMenuOpen ? 'close' : 'menu', theme);
};

export const getArrowDownIcon = (theme: Theme) => getIcons('arrowDown', theme);

export const getArrowLeftActiveIcon = (theme: Theme) =>
  getIcons('arrowLeftActive', theme);

export const getArrowLeftDisabledIcon = (theme: Theme) =>
  getIcons('arrowLeftDisabled', theme);

export const getArrowRightActiveIcon = (theme: Theme) =>
  getIcons('arrowRightActive', theme);

export const getArrowRightDisabledIcon = (theme: Theme) =>
  getIcons('arrowRightDisabled', theme);

export const getArrowUpIcon = (theme: Theme) => getIcons('arrowUp', theme);

export const getCartIcon = (theme: Theme) => getIcons('cart', theme);

export const getCloseIcon = (theme: Theme) => getIcons('close', theme);

export const getFavouriteIcon = (theme: Theme) => getIcons('favourite', theme);

export const getHomeIcon = (theme: Theme) => getIcons('home', theme);

export const getLikeIcon = (theme: Theme) => getIcons('like', theme);

export const getMinusIcon = (theme: Theme) => getIcons('minus', theme);

export const getPlusIcon = (theme: Theme) => getIcons('plus', theme);

export const getSearchIcon = (theme: Theme) => getIcons('search', theme);
