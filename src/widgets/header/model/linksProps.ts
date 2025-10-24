import { CartIcon, HeartIcon } from '@shared/icons';
import { RoutePath } from '@shared/index';
import { Category } from '@shared/types';

const navLinks = [
  {
    title: 'home',
    to: RoutePath.HOME,
  },
  {
    title: Category.PHONES,
    to: RoutePath.PHONES,
  },
  {
    title: Category.TABLETS,
    to: RoutePath.TABLETS,
  },
  {
    title: Category.ACCESSORIES,
    to: RoutePath.ACCESSORIES,
  },
];

const getButtonLinks = (cartAmount: number, favAmount: number) => {
  return [
    {
      ariaName: 'Go to favourites page',
      to: RoutePath.FAVOURITES,
      icon: HeartIcon,
      amount: favAmount,
    },
    {
      ariaName: 'Go to cart page',
      to: RoutePath.CART,
      icon: CartIcon,
      amount: cartAmount,
    },
  ];
};

export { navLinks, getButtonLinks };
