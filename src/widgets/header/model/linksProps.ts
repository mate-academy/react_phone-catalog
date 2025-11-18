import { CartIcon, HeartIcon } from '@shared/icons';
import { NavAriaLabels, NavTitles, RoutePath } from '@shared/types';

const navLinks = [
  {
    title: NavTitles.HOME,
    to: RoutePath.HOME,
  },
  {
    title: NavTitles.PHONES,
    to: RoutePath.PHONES,
  },
  {
    title: NavTitles.TABLETS,
    to: RoutePath.TABLETS,
  },
  {
    title: NavTitles.ACCESSORIES,
    to: RoutePath.ACCESSORIES,
  },
];

const getButtonLinks = (cartAmount: number, favAmount: number) => {
  return [
    {
      ariaName: NavAriaLabels.FAVOURITES,
      to: RoutePath.FAVOURITES,
      icon: HeartIcon,
      amount: favAmount,
    },
    {
      ariaName: NavAriaLabels.CART,
      to: RoutePath.CART,
      icon: CartIcon,
      amount: cartAmount,
    },
  ];
};

export { navLinks, getButtonLinks };
