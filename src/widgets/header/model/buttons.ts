import { AriaNames } from '@shared/types/ButtonProps';
import { HeartIcon, CartIcon } from '@shared/icons';
import { HeaderRoutePath } from '../types/headerLinks';

export const navButtons = (favAmount: number, cartAmount: number) => {
  const buttons = [
    {
      ariaName: AriaNames.Fav,
      to: HeaderRoutePath.Favorites,
      icon: HeartIcon,
      amount: favAmount,
    },
    {
      ariaName: AriaNames.Cart,
      to: HeaderRoutePath.Cart,
      icon: CartIcon,
      amount: cartAmount,
    },
  ];

  return buttons;
};
