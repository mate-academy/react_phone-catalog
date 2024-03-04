import {
  ReactComponent as ArrowDown,
} from '../../../assets/icons/arrow-down.svg';
import {
  ReactComponent as ArrowUp,
} from '../../../assets/icons/arrow-up.svg';
import {
  ReactComponent as ArrowLeft,
} from '../../../assets/icons/arrow-left.svg';
import {
  ReactComponent as ArrowRight,
} from '../../../assets/icons/arrow-right.svg';
import { ReactComponent as Home } from '../../../assets/icons/home.svg';
import { ReactComponent as Close } from '../../../assets/icons/close.svg';
import { ReactComponent as Search } from '../../../assets/icons/search.svg';
import {
  ReactComponent as Favourites,
} from '../../../assets/icons/favourites.svg';
import {
  ReactComponent as FavouritesCounter,
} from '../../../assets/icons/favourites-counter.svg';
import { ReactComponent as Shopping } from '../../../assets/icons/shopping.svg';
import {
  ReactComponent as ShoppingCounter,
} from '../../../assets/icons/shopping-counter.svg';
import {
  ReactComponent as BurgerMenu,
} from '../../../assets/icons/burger-menu.svg';
import {
  ReactComponent as BurgerMenuHover,
} from '../../../assets/icons/burger-menu-hover.svg';

type IconName =
'arrowUp'
| 'arrowDown'
| 'arrowLeft'
| 'arrowRight'
| 'home'
| 'close'
| 'search'
| 'favourites'
| 'favouritesCounter'
| 'shopping'
| 'shoppingCounter'
| 'burgerMenu'
| 'burgerMenuHover';

const iconNameToIcon: Record<
IconName,
React.FC<React.SVGProps<SVGSVGElement>>
> = {
  arrowDown: ArrowDown,
  arrowUp: ArrowUp,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  home: Home,
  close: Close,
  search: Search,
  favourites: Favourites,
  favouritesCounter: FavouritesCounter,
  shopping: Shopping,
  shoppingCounter: ShoppingCounter,
  burgerMenu: BurgerMenu,
  burgerMenuHover: BurgerMenuHover,
};

export { type IconName, iconNameToIcon };
