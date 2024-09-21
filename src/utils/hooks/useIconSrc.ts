import { useTheme } from '../../contexts/ThemeProvider';
import { BASE_URL } from '../constants';

export const useIconSrc = () => {
  const { theme } = useTheme();

  const getIconUrl = (iconName: string) => {
    const iconSuffix = theme === 'dark' ? '--dark' : '';

    return `${BASE_URL}img/icons/${iconName}${iconSuffix}.svg`;
  };

  const favoriteSelected = `${BASE_URL}img/icons/favorites--fill.svg`;
  const arrowLeftUrl = getIconUrl('arrow-left');
  const arrowRightUrl = getIconUrl('arrow-right');
  const cartUrl = getIconUrl('cart');
  const closeUrl = getIconUrl('close');
  const favoritesUrl = getIconUrl('favorites');
  const homeUrl = getIconUrl('home');
  const logoUrl = getIconUrl('logo');
  const menuUrl = getIconUrl('menu');
  const minusUrl = getIconUrl('minus');
  const plusUrl = getIconUrl('plus');
  const searchUrl = getIconUrl('search');
  const moonUrl = `${BASE_URL}img/icons/moon.svg`;
  const sunUrl = `${BASE_URL}img/icons/sun.svg`;
  const spinnerUrl = `${BASE_URL}img/icons/spinner.svg`;

  return {
    arrowLeftUrl,
    arrowRightUrl,
    cartUrl,
    closeUrl,
    favoritesUrl,
    homeUrl,
    logoUrl,
    menuUrl,
    minusUrl,
    plusUrl,
    searchUrl,
    favoriteSelected,
    moonUrl,
    sunUrl,
    spinnerUrl,
  };
};
