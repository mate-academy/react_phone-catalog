import logoCompanyLight from './logo-light.svg';
import logoCompanyDark from './logo-dark.svg';

import MenuIcon from './icons/icon-menu.svg?react';
import IconClose from './icons/icon-close.svg?react';
import likeIcon from './icons/icon-like.svg?react';
import likeIconFill from './icons/icon-like-fill.svg?react';
import ArrowUpIcon from './icons/icon-arrow-up.svg?react';
import ArrowDownIcon from './icons/icon-arrow-down.svg?react';
import ArrowRightIcon from './icons/icon-arrow-right.svg?react';
import ArrowLeftIcon from './icons/icon-arrow-left.svg?react';
import HomeIcon from './icons/icon-home.svg?react';
import CartIcon from './icons/icon-shopping-bag.svg?react';
import PlusIcon from './icons/icon-plus.svg?react';
import MinusIcon from './icons/icon-minus.svg?react';
import ThemeLightIcon from './icons/theme-light-mode.svg?react';
import ThemeDarkIcon from './icons/theme-dark-mode.svg?react';
import ArrowSmall from './icons/arrow-small.svg?react';
import Search from './icons/search-input.svg?react';
import Cancel from './icons/cancel-input.svg?react';

import banner_1 from './images/banner_1.jpg';
import banner_2 from './images/banner_2.jpg';
import banner_3 from './images/banner_3.jpg';
import banner_4 from './images/banner_4.png';
import banner_5 from './images/banner_5.jpg';
import banner_6 from './images/banner_6.jpg';

import phones from './images/category-phones.webp';
import accessories from './images/category-accessories.png';
import tablets from './images/category-tablets.png';

import type { ImageData } from '../modules/shared/types/Image';
import type { IconList } from '../modules/shared/types/IconList';

export const icons: IconList = {
  menu: { valuePath: MenuIcon, valueName: 'menu' },
  like: { valuePath: likeIcon, valueName: 'like' },
  likeFill: { valuePath: likeIconFill, valueName: 'likeFill' },
  arrowUp: { valuePath: ArrowUpIcon, valueName: 'arrowUp' },
  arrowDown: { valuePath: ArrowDownIcon, valueName: 'arrowDown' },
  arrowRight: { valuePath: ArrowRightIcon, valueName: 'arrowRight' },
  arrowLeft: { valuePath: ArrowLeftIcon, valueName: 'arrowLeft' },
  home: { valuePath: HomeIcon, valueName: 'home' },
  close: { valuePath: IconClose, valueName: 'close' },
  cart: { valuePath: CartIcon, valueName: 'cart' },
  plus: { valuePath: PlusIcon, valueName: 'plus' },
  minus: { valuePath: MinusIcon, valueName: 'minus' },
  themeLight: { valuePath: ThemeLightIcon, valueName: 'themeLight' },
  themeDark: { valuePath: ThemeDarkIcon, valueName: 'themeDark' },
  arrowSmall: { valuePath: ArrowSmall, valueName: 'arrowSmall' },
  search: { valuePath: Search, valueName: 'search' },
  cancel: { valuePath: Cancel, valueName: 'cancel' },
};

export const images: ImageData[] = [
  {
    src: banner_1,
    alt: 'Banner',
  },
  {
    src: banner_2,
    alt: 'Banner',
  },
  {
    src: banner_3,
    alt: 'Banner',
  },
  {
    src: banner_4,
    alt: 'Banner',
  },
  {
    src: banner_5,
    alt: 'Banner',
  },
  {
    src: banner_6,
    alt: 'Banner',
  },
];

export const logoLightMode: string = logoCompanyLight;
export const logoDarkMode: string = logoCompanyDark;
export const homeCategoryPhones: string = phones;
export const homeCategoryTablets: string = tablets;
export const homeCategoryAccessories: string = accessories;
