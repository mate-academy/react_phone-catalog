/* eslint-disable max-len */
import HomeIcon from '../../assets/icons/Home.svg?react';
import SearchIcon from '../../assets/icons/Search.svg?react';
import CartIcon from '../../assets/icons/Shopping bag (Cart).svg?react';
import HeartIcon from '../../assets/icons/Favourites (Heart Like).svg?react';
import HeartFilledIcon from '../../assets/icons/Favourites Filled (Heart Like).svg?react';
import MinusIcon from '../../assets/icons/Minus.svg?react';
import PlusIcon from '../../assets/icons/Plus.svg?react';
import CloseIcon from '../../assets/icons/Close.svg?react';
import ChevronLeftIcon from '../../assets/icons/Chevron (Arrow Left).svg?react';
import ChevronRightIcon from '../../assets/icons/Chevron (Arrow Right).svg?react';
import ChevronDownIcon from '../../assets/icons/Chevron (Arrow Down).svg?react';
import ChevronUpIcon from '../../assets/icons/Chevron (Arrow Up).svg?react';
import MenuIcon from '../../assets/icons/Menu.svg?react';
import LogoIcon from '../../assets/icons/Logo.svg?react';
import styles from './Icon.module.scss';

export type IconName =
  | 'home'
  | 'search'
  | 'cart'
  | 'heart'
  | 'heartFilled'
  | 'minus'
  | 'plus'
  | 'close'
  | 'chevronLeft'
  | 'chevronRight'
  | 'chevronDown'
  | 'chevronUp'
  | 'menu'
  | 'logo';

const icons: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  home: HomeIcon,
  search: SearchIcon,
  cart: CartIcon,
  heart: HeartIcon,
  heartFilled: HeartFilledIcon,
  minus: MinusIcon,
  plus: PlusIcon,
  close: CloseIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  chevronDown: ChevronDownIcon,
  chevronUp: ChevronUpIcon,
  menu: MenuIcon,
  logo: LogoIcon,
};

type Props = {
  name: IconName;
  className?: string;
};

export const Icon = ({ name, className = '' }: Props) => {
  const SvgIcon = icons[name];

  return <SvgIcon className={`${styles.icon} ${className}`} />;
};
