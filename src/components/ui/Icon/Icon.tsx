import './Icon.scss';
import HeartIcon from '/public/svg/icons/Favourites.svg?react';
import HeartIconFilled from '/public/svg/icons/FavouritesFilled.svg?react';
import CartIcon from '/public/svg/icons/Shoppingbag.svg?react';
import ArrowLeftIcon from '/public/svg/icons/ChevronArrowLeft.svg?react';
import ArrowRightIcon from '/public/svg/icons/ChevronArrowRight.svg?react';
import ArrowUpIcon from '/public/svg/icons/ChevronArrowUp.svg?react';
import ArrowDownIcon from '/public/svg/icons/ChevronArrowDown.svg?react';
import CloseIcon from '/public/svg/icons/Close.svg?react';
import HomeIcon from '/public/svg/icons/Home.svg?react';
import MenuIcon from '/public/svg/icons/Menu.svg?react';
import MinusIcon from '/public/svg/icons/Minus.svg?react';
import PlusIcon from '/public/svg/icons/Plus.svg?react';
import SearchIcon from '/public/svg/icons/Search.svg?react';

export type TypeIcon =
  | 'heart'
  | 'cart'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'arrow-down'
  | 'close'
  | 'favorites'
  | 'home'
  | 'menu'
  | 'minus'
  | 'plus'
  | 'search'
  | 'shopingbag';

type Props = {
  name: TypeIcon;
  badge?: number;
  filled?: boolean;
};

export function Icon({ name, filled = false }: Props) {
  const icons: Record<TypeIcon, React.FC<React.SVGProps<SVGSVGElement>>> = {
    heart: filled ? HeartIconFilled : HeartIcon,
    cart: CartIcon,
    'arrow-left': ArrowLeftIcon,
    'arrow-right': ArrowRightIcon,
    'arrow-up': ArrowUpIcon,
    'arrow-down': ArrowDownIcon,
    close: CloseIcon,
    favorites: HeartIcon,
    home: HomeIcon,
    menu: MenuIcon,
    minus: MinusIcon,
    plus: PlusIcon,
    search: SearchIcon,
    shopingbag: CartIcon,
  };

  const IconComponent = icons[name];

  return <IconComponent className="Icon" />;
}

export function IconWithBadge({ name, badge = 0, filled }: Props) {
  return (
    <div className="icon-with-badge">
      <Icon name={name} filled={filled} />
      {badge > 0 && <span className="badge">{badge}</span>}
    </div>
  );
}
