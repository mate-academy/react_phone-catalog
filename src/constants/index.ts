import { getImageUrl } from '../utils';

// Icon constants - reusable across all components
export const ICONS = {
  LOGO: getImageUrl('/img/icons/Logo.svg'),
  HOME: getImageUrl('/img/icons/Home.svg'),
  CART: getImageUrl('/img/icons/Cart.svg'),
  FAVOURITES: getImageUrl('/img/icons/Favourites.svg'),
  FAVOURITES_ACTIVE: getImageUrl('/img/icons/FavouritesHilight.svg'),
  ARROW_DOWN: getImageUrl('/img/icons/arrow-down.svg'),
  ARROW_BREADCRUMB: getImageUrl('/img/icons/arrow-breadcrumb.svg'),
  CLOSE: getImageUrl('/img/icons/Close.svg'),
  MENU: getImageUrl('/img/icons/Menu.svg'),
} as const;

// Banner images for HomePage
export const BANNER_IMAGES = {
  PHONES: getImageUrl('/img/banner-phones.png'),
  TABLETS: getImageUrl('/img/banner-tablets.png'),
  ACCESSORIES: getImageUrl('/img/banner-accessories.png'),
} as const;

// Category images
export const CATEGORY_IMAGES = {
  PHONES: getImageUrl('/img/category-phones.png'),
  TABLETS: getImageUrl('/img/category-tablets.png'),
  ACCESSORIES: getImageUrl('/img/category-accessories.png'),
} as const;

export const NOTFOUND_IMAGES = {
  PAGE_NOT_FOUND: getImageUrl('/img/page-not-found.png'),
  PRODUCT_NOT_FOUND: getImageUrl('/img/product-not-found.png'),
} as const;
