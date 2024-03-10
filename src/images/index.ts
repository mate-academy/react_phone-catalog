/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

export const LOGO = require('./logo/logo.svg').default;

export const ICONS = {
  home: require('./icons/home.svg').default,
  search: require('./icons/search.svg').default,
  close: require('./icons/close.svg').default,

  favorite: require('./icons/favorite.svg').default,
  favoriteSelected: require('./icons/favoriteSelected.svg').default,
  cart: require('./icons/cart.svg').default,

  arrowUp: require('./icons/arrowUp.svg').default,
  arrowLeft: require('./icons/arrowLeft.svg').default,
  arrowRight: require('./icons/arrowRight.svg').default,

  arrowUpDisabled: require('./icons/arrowUpDisabled.svg').default,
  arrowDownDisabled: require('./icons/arrowDownDisabled.svg').default,
  arrowLeftDisabled: require('./icons/arrowLeftDisabled.svg').default,
  arrowRightDisabled: require('./icons/arrowRightDisabled.svg').default,

  minus: require('./icons/minus.svg').default,
  plus: require('./icons/plus.svg').default,
};

export const SLIDES = {
  phones: require('./slider/phones.png').default,
  tablets: require('./slider/tablets.png').default,
  accessories: require('./slider/accessories.png').default,
};

export const CATEGORIES = {
  phones: require('./categories/phones.svg').default,
  tablets: require('./categories/tablets.svg').default,
  accessories: require('./categories/accessories.svg').default,
};
