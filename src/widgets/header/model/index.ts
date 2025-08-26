import { CartIcon, HeartIcon } from '@shared/icons';
import { NavAriaLabels, NavElementName, RoutePath } from '@shared/types';

type UINavLinkType = {
  title: NavElementName;
  path: RoutePath;
  ariaLabel: NavAriaLabels;
};

const navLinksList = [
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

type UiLink = {
  ariaName: NavAriaLabels;
  to: RoutePath;
  icon: ({ filled }: { filled?: boolean | undefined }) => JSX.Element;
};

const uiLinksList: UiLink[] = [
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

export { navLinksList, uiLinksList, type UiLink, type UINavLinkType };
