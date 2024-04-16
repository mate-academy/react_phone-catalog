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
  | 'plus';

interface BaseIconProps {
  type: IconType;
  isActive?: boolean;
}

const BaseIcon = ({ type }: BaseIconProps) => {
  const iconClassName = type === 'logo' ? styles.logoIcon : styles.iconImg;
  const iconSrc = `/img/icons/${type}_icon.svg`;
  // let cursorStyle = {};

  // if (!isActive && (type === 'arrowLeft' || type === 'arrowRight')) {
  //   iconSrc = `/img/icons/${type}_disabled_icon.svg`;
  //   // cursorStyle = { cursor: 'default' };
  // }

  // const finalIconClassName = isActive
  //   ? `${iconClassName} ${styles.active}`
  //   : iconClassName;

  return (
    <img
      src={iconSrc}
      alt={`${type}_icon`}
      className={iconClassName}
      // style={cursorStyle}
    />
  );
};

const LogoIcon = () => <BaseIcon type="logo" />;
const FavIcon = () => <BaseIcon type="favourites" />;
const CartIcon = () => <BaseIcon type="cart" />;
const MenuIcon = () => <BaseIcon type="menu" />;
const CloseIcon = () => <BaseIcon type="close" />;
// const ArrowLeftIcon = ({ isActive }: { isActive?: boolean }) =>
//   <BaseIcon type='arrowLeft' isActive={isActive}
// />;
// const ArrowRightIcon = ({ isActive }: { isActive?: boolean }) =>
//   <BaseIcon type='arrowRight' isActive={isActive}
// />;
const ArrowTopIcon = () => <BaseIcon type="arrowTop" />;
const ArrowDownIcon = () => <BaseIcon type="arrowDown" />;
const FavActiveIcon = () => <BaseIcon type="favActive" />;
const HomeIcon = () => <BaseIcon type="home" />;
const MinusIcon = () => <BaseIcon type="minus" />;
const MinusDisIcon = () => <BaseIcon type="minusDis" />;
const PlusIcon = () => <BaseIcon type="plus" />;

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
};
