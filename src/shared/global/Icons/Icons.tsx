import styles from './Icons.module.scss';

export type IconType =
  | 'logo'
  | 'favourites'
  | 'cart'
  | 'close'
  | 'menu'
  | 'arrowRight'
  | 'arrowLeft'
  | 'arrowRightDis'
  | 'arrowLeftDis'
  | 'arrowTop'
  | 'arrowDown'
  | 'favActive'
  | 'home'
  | 'minus'
  | 'minusDis'
  | 'plus'
  | 'search';

interface BaseIconProps {
  type: IconType;
  isActive?: boolean;
}

const BaseIcon = ({ type }: BaseIconProps) => {
  const iconClassName = type === 'logo' ? styles.logoIcon : styles.iconImg;
  const iconSrc = `img/icons/${type}_icon.svg`;

  return <img src={iconSrc} alt={`${type}_icon`} className={iconClassName} />;
};

const LogoIcon = () => <BaseIcon type="logo" />;
const FavIcon = () => <BaseIcon type="favourites" />;
const CartIcon = () => <BaseIcon type="cart" />;
const MenuIcon = () => <BaseIcon type="menu" />;
const CloseIcon = () => <BaseIcon type="close" />;

const ArrowTopIcon = () => <BaseIcon type="arrowTop" />;
const ArrowDownIcon = () => <BaseIcon type="arrowDown" />;
const FavActiveIcon = () => <BaseIcon type="favActive" />;
const HomeIcon = () => <BaseIcon type="home" />;
const MinusIcon = () => <BaseIcon type="minus" />;
const MinusDisIcon = () => <BaseIcon type="minusDis" />;
const PlusIcon = () => <BaseIcon type="plus" />;
const SearchIcon = () => <BaseIcon type="search" />;

const ArrowRightIcon = () => <BaseIcon type="arrowRight" />;
const ArrowLeftIcon = () => <BaseIcon type="arrowLeft" />;
const ArrowRightDisIcon = () => <BaseIcon type="arrowRightDis" />;
const ArrowLeftDisIcon = () => <BaseIcon type="arrowLeftDis" />;

export const icons: { [key in IconType]: JSX.Element } = {
  logo: <LogoIcon />,
  favourites: <FavIcon />,
  cart: <CartIcon />,
  menu: <MenuIcon />,
  close: <CloseIcon />,
  arrowLeft: <ArrowLeftIcon />,
  arrowRight: <ArrowRightIcon />,
  arrowRightDis: <ArrowRightDisIcon />,
  arrowLeftDis: <ArrowLeftDisIcon />,
  arrowTop: <ArrowTopIcon />,
  arrowDown: <ArrowDownIcon />,
  favActive: <FavActiveIcon />,
  home: <HomeIcon />,
  minus: <MinusIcon />,
  minusDis: <MinusDisIcon />,
  plus: <PlusIcon />,
  search: <SearchIcon />,
};
