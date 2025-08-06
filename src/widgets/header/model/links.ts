import { CartIcon, HeartIcon } from '@shared/icons';
import {
  NavAriaLabels,
  NavElementName,
  NavLinkProps,
  RoutePath,
} from '@shared/types';

const navLinksList: NavLinkProps[] = [
  {
    title: NavElementName.Home,
    path: RoutePath.Home,
    ariaLabel: NavAriaLabels.Home,
  },
  {
    title: NavElementName.Phones,
    path: RoutePath.Phones,
    ariaLabel: NavAriaLabels.Phones,
  },
  {
    title: NavElementName.Tablets,
    path: RoutePath.Tablets,
    ariaLabel: NavAriaLabels.Tablets,
  },
  {
    title: NavElementName.Accessories,
    path: RoutePath.Accessories,
    ariaLabel: NavAriaLabels.Accessories,
  },
];

const uiLinksList = [
  {
    ariaName: NavAriaLabels.Favorites,
    to: RoutePath.Favorites,
    icon: HeartIcon,
  },
  {
    ariaName: NavAriaLabels.Cart,
    to: RoutePath.Cart,
    icon: CartIcon,
  },
];

export { navLinksList, uiLinksList };
