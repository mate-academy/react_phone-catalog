import Home from '../icons/home.svg?react';
import Cart from '../icons/cart.svg?react';
import Favorite from '../icons/favorite.svg?react';
import ArrowRight from '../icons/arrow-right.svg?react';
import ArrowLeft from '../icons/arrow-left.svg?react';
import ArrowDown from '../icons/arrow-down.svg?react';
import ArrowUp from '../icons/arrow-up.svg?react';
import BurgerMenu from '../icons/burger-menu.svg?react';
import IsFavorite from '../icons/favorite-highlighted.svg?react';
import Minus from '../icons/minus.svg?react';
import Plus from '../icons/plus.svg?react';
import Search from '../icons/search.svg?react';
import Moon from '../icons/moon.svg?react';
import Sun from '../icons/sun.svg?react';
import Close from '../icons/close.svg?react';

export const ICONS = {
  home: Home,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  arrowDown: ArrowDown,
  arrowUp: ArrowUp,
  burgerMenu: BurgerMenu,
  favorite: Favorite,
  isFavorite: IsFavorite,
  close: Close,
  cart: Cart,
  minus: Minus,
  plus: Plus,
  search: Search,
  moon: Moon,
  sun: Sun,
} as const;

export type IconName = keyof typeof ICONS;
