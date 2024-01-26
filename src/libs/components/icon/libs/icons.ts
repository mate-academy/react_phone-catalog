import { IconNames } from '../../../enums';

import LOGO_PATH, {
  ReactComponent as logo,
} from '../../../../assets/icons/logo.svg';
import { ReactComponent as Arrow } from '../../../../assets/icons/arrow.svg';
import { ReactComponent as Cart } from '../../../../assets/icons/cart.svg';
import { ReactComponent as Close } from '../../../../assets/icons/close.svg';
import { ReactComponent as Favorite } from '../../../../assets/icons/heart.svg';
import {
  ReactComponent as FavoriteActive,
} from '../../../../assets/icons/heart-filled.svg';
import { ReactComponent as Home } from '../../../../assets/icons/home.svg';
import {
  ReactComponent as Menu,
} from '../../../../assets/icons/burger-menu.svg';
import {
  ReactComponent as MenuHover,
} from '../../../../assets/icons/burger-menu-hover.svg';
import { ReactComponent as Minus } from '../../../../assets/icons/minus.svg';
import { ReactComponent as Plus } from '../../../../assets/icons/plus.svg';
import { ReactComponent as Search } from '../../../../assets/icons/search.svg';

const IconsComponents = {
  [IconNames.LOGO]: logo,
  [IconNames.ARROW]: Arrow,
  [IconNames.CART]: Cart,
  [IconNames.CLOSE]: Close,
  [IconNames.FAVORITE]: Favorite,
  [IconNames.FAVORITE_ACTIVE]: FavoriteActive,
  [IconNames.HOME]: Home,
  [IconNames.MENU]: Menu,
  [IconNames.MENU_HOVER]: MenuHover,
  [IconNames.MINUS]: Minus,
  [IconNames.PLUS]: Plus,
  [IconNames.SEARCH]: Search,
};

export { IconsComponents, LOGO_PATH };
