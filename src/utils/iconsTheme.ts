import { getAssetUrl } from '../api/utilis';

export const themeIconBasket = (theme: string) => {
  return theme === 'light'
    ? getAssetUrl('icons/basket.svg')
    : getAssetUrl('icons/basket_dark.svg');
};

export const themeIconFavourite = (theme: string) => {
  return theme === 'light'
    ? getAssetUrl('icons/favourite_heart.svg')
    : getAssetUrl('icons/favourite_dark.svg');
};

export const themeIconBurger = (theme: string) => {
  return theme === 'light'
    ? getAssetUrl('icons/burger.svg')
    : getAssetUrl('icons/burger_dark.svg');
};

export const themeIconClose = (theme: string) => {
  return theme === 'light'
    ? getAssetUrl('icons/close.svg')
    : getAssetUrl('icons/close_dark.svg');
};

export const themeIconLogo = (theme: string) => {
  return theme === 'light'
    ? getAssetUrl('icons/logo.svg')
    : getAssetUrl('icons/logo_dark.svg');
};

export const themeIconHome = (theme: string) => {
  return theme === 'light'
    ? getAssetUrl('icons/home.svg')
    : getAssetUrl('icons/home_dark.svg');
};

export const themeIconBack = (theme: string) => {
  return theme === 'light'
    ? getAssetUrl('icons/arrow_left.svg')
    : getAssetUrl('icons/back_arrow_dark.svg');
};

export const themeIconRemoveProduct = (theme: string) => {
  return theme === 'light'
    ? getAssetUrl('icons/close.svg')
    : getAssetUrl('icons/close_product_dark.svg');
};
