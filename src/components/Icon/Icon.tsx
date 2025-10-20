import styles from './Icon.module.scss';
import { IconType } from '../../types/IconTypes';
import FavouriteLight from '../../assets/images/Icons/light/favouriteLight.png';
import FavouriteDark from '../../assets/images/Icons/dark/favouriteDark.png';
import CartLigh from '../../assets/images/Icons/light/cartLight.png';
import CartDark from '../../assets/images/Icons/dark/cartDark.png';
import MenuLight from '../../assets/images/Icons/light/menuLight.svg';
import MenuDark from '../../assets/images/Icons/dark/menuDark.png';
import CloseLight from '../../assets/images/Icons/light/closeLight.svg';
import CloseDark from '../../assets/images/Icons/dark/closeDark.png';
import ArrowPrevLight from '../../assets/images/Icons/light/arrowLeftLight.png';
// eslint-disable-next-line max-len
import ArrowNextLight from '../../assets/images/Icons/light/arrowRightLight.png';
import ArrowPrewDark from '../../assets/images/Icons/dark/arrowLeftDark.png';
import ArrowNextDark from '../../assets/images/Icons/dark/arrowRightDark.png';
import FavouriteActive from '../../assets/images/Icons/FavouriteActive.png';
import ArrowTopLight from '../../assets/images/Icons/light/arrowTopLight.png';
import ArrowTopDark from '../../assets/images/Icons/dark/arrowTopDark.png';
import ArrowDownLight from '../../assets/images/Icons/light/arrowDownLight.png';
import ArrowDownDark from '../../assets/images/Icons/dark/arrowDownDark.png';
import CloseCartDark from '../../assets/images/Icons/dark/CloseCartDark.png';
import CloseCartLight from '../../assets/images/Icons/light/closeCartLight.png';
import MinusDark from '../../assets/images/Icons/dark/minusActiveDark .png';
import MinusLight from '../../assets/images/Icons/light/minusActiveLight.png';
import PlusDark from '../../assets/images/Icons/dark/plusActiveDark.png';
import PlusLight from '../../assets/images/Icons/light/plusActiveLight.png';
import HomeDark from '../../assets/images/Icons/dark/homeDark.png';
import HomeLight from '../../assets/images/Icons/light/homeLight.png';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  type: IconType;
  isSmall?: boolean;
  isCart?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export const Icon = ({ type, onMouseEnter, onMouseLeave }: Props) => {
  const { theme } = useTheme();
  const darkTheme = theme === 'dark';

  const icons = {
    favourite: darkTheme ? FavouriteDark : FavouriteLight,
    favouriteActive: FavouriteActive,
    cart: darkTheme ? CartDark : CartLigh,
    menu: darkTheme ? MenuDark : MenuLight,
    close: darkTheme ? CloseDark : CloseLight,
    arrowPrev: darkTheme ? ArrowPrewDark : ArrowPrevLight,
    arrowNext: darkTheme ? ArrowNextDark : ArrowNextLight,
    arrowTop: darkTheme ? ArrowTopDark : ArrowTopLight,
    arrowDown: darkTheme ? ArrowDownDark : ArrowDownLight,
    closeCart: darkTheme ? CloseCartDark : CloseCartLight,
    plus: darkTheme ? PlusDark : PlusLight,
    minus: darkTheme ? MinusDark : MinusLight,
    home: darkTheme ? HomeDark : HomeLight,
  };

  const iconSrc = icons[type];

  return (
    <div
      className={styles.icon}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={iconSrc} alt={type} className={styles.icon__img} />
    </div>
  );
};
