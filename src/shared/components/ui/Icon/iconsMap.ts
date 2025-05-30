import { ReactComponent as Arrow } from 'assets/img/icons/arrow.svg';
import { ReactComponent as Burger } from 'assets/img/icons/burger.svg';
import { ReactComponent as Cart } from 'assets/img/icons/cart.svg';
import { ReactComponent as Cross } from 'assets/img/icons/cross.svg';
import { ReactComponent as Heart } from 'assets/img/icons/heart.svg';
import { ReactComponent as Home } from 'assets/img/icons/home.svg';

import { IconNames } from './IconNames';

export const icons: Record<
  IconNames,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  [IconNames.Arrow]: Arrow,
  [IconNames.Home]: Home,
  [IconNames.Cross]: Cross,
  [IconNames.Burger]: Burger,
  [IconNames.Cart]: Cart,
  [IconNames.Heart]: Heart,
};

export type IconName = keyof typeof icons;
