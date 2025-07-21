import { AriaNames } from '@shared/types/ButtonProps';
import { HeartIcon, CartIcon } from '@shared/icons';
import { HeaderRoutePath } from '../types/headerLinks';

type NavButton = {
  ariaName: AriaNames;
  to: HeaderRoutePath;
  icon: React.ComponentType;
};

export const navButtons: NavButton[] = [
  {
    ariaName: AriaNames.Fav,
    to: HeaderRoutePath.Favorites,
    icon: HeartIcon,
  },
  {
    ariaName: AriaNames.Cart,
    to: HeaderRoutePath.Cart,
    icon: CartIcon,
  },
];
