import { AppRoutes, IconNames } from '../../../../enums';
import { NavbarLinkType } from '../types/navbar-links.type';

export const controlsLinks: NavbarLinkType[] = [
  {
    title: 'Favorites',
    url: AppRoutes.FAVORITES,
    IconNames: IconNames.FAVORITE,
  },
  {
    title: 'Cart',
    url: AppRoutes.CART,
    IconNames: IconNames.CART,
  },
];
