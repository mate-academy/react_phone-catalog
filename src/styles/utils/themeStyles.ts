import closeMenuDay from '/img/icons/close-day.svg';
import closeMenuNight from '/img/icons/close-night.svg';

import menuButtonDay from '/img/icons/menu-day.svg';
import menuButtonNight from '/img/icons/menu-night.svg';

import logoDay from '/img/logo/logo-day.png';
import logoNight from '/img/logo/logo-night.png';

import favouritesDay from '/img/icons/favourites-day.svg';
import favouritesNight from '/img/icons/favourites-night.svg';

import favouritesActive from '/img/icons/favourites-active.svg';

import cartDay from '/img/icons/cart-day.svg';
import cartNight from '/img/icons/cart-night.svg';

import day from '/img/icons/day.png';
import night from '/img/icons/night.png';

import arrowDay from '/img/icons/slider-button-day.svg';
import arrowNight from '/img/icons/slider-button-night.svg';

import disabledArrowDay from '/img/icons/disabled-slider-button-day.svg';
import disabledArrowNight from '/img/icons/disabled-slider-button-night.svg';

import sliderDotDay from '/img/icons/slider-dot-day.png';
import sliderDotNight from '/img/icons/slider-dot-night.png';

import sliderDotActiveDay from '/img/icons/slider-dot-active-day.png';
import sliderDotActiveNight from '/img/icons/slider-dot-active-night.png';

import homeDay from '/img/icons/home-day.svg';
import homeNight from '/img/icons/home-night.svg';

import searchDay from '/img/icons/search-icon-day.png';
import searchNight from '/img/icons/search-icon-night.png';

import notFoundProduct from '/img/product-not-found.png';

const themeStyles = (isLightTheme: boolean) => ({
  closeMenuButton: isLightTheme ? closeMenuDay : closeMenuNight,

  menuButton: isLightTheme ? menuButtonDay : menuButtonNight,

  logo: isLightTheme ? logoDay : logoNight,

  favourites: isLightTheme ? favouritesDay : favouritesNight,

  favouritesActive,

  cart: isLightTheme ? cartDay : cartNight,

  theme: isLightTheme ? day : night,

  arrow: isLightTheme ? arrowDay : arrowNight,

  disabledArrow: isLightTheme ? disabledArrowDay : disabledArrowNight,

  sliderDot: isLightTheme ? sliderDotDay : sliderDotNight,

  sliderDotActive: isLightTheme ? sliderDotActiveDay : sliderDotActiveNight,

  home: isLightTheme ? homeDay : homeNight,

  search: isLightTheme ? searchDay : searchNight,

  notFoundProduct,
});

export default themeStyles;
