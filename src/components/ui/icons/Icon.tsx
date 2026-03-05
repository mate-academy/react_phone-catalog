import React from 'react';
import {
  Home,
  Search,
  ShoppingBag,
  Heart,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Menu,
  Minus,
  Plus,
  X,
  Headphones,
  Truck,
  LogIn,
  LogOut,
  UserPlus,
  CircleUserRound,
  Check,
  Bookmark,
  Sun,
  Moon,
  Settings,
  DollarSign,
  Euro,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type IconName =
  | 'home'
  | 'search'
  | 'shoppingBag'
  | 'heart'
  | 'chevronLeft'
  | 'chevronRight'
  | 'chevronUp'
  | 'chevronDown'
  | 'menu'
  | 'minus'
  | 'plus'
  | 'close'
  | 'headphones'
  | 'truck'
  | 'signIn'
  | 'signUp'
  | 'signOut'
  | 'profileIcon'
  | 'check'
  | 'bookmark'
  | 'sun'
  | 'moon'
  | 'settings'
  | 'dollarSign'
  | 'euro'
  | 'x';

export type IconSize = 'sm' | 'md';

export type IconVariant = 'default' | 'black';

export type IconState = 'default' | 'selected';

const icons = {
  home: Home,
  search: Search,
  shoppingBag: ShoppingBag,
  heart: Heart,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  menu: Menu,
  minus: Minus,
  plus: Plus,
  close: X,
  headphones: Headphones,
  truck: Truck,
  signIn: LogIn,
  signUp: UserPlus,
  signOut: LogOut,
  profileIcon: CircleUserRound,
  check: Check,
  bookmark: Bookmark,
  sun: Sun,
  moon: Moon,
  settings: Settings,
  dollarSign: DollarSign,
  euro: Euro,
  x: X,
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: IconSize;
  variant?: IconVariant;
  state?: IconState;
  count?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'sm',
  variant = 'default',
  state = 'default',
  count,
  className,
  ...props
}) => {
  const IconComponent = icons[name];

  const isHeart = name === 'heart';
  const isThickIcon = name === 'headphones' || name === 'truck';
  const hasCounter = typeof count === 'number' && count > 0;

  const sizeClass =
    hasCounter ? 'w-7 h-7'
    : size === 'sm' ? 'w-4 h-4'
    : 'w-6 h-6';

  const variantsOfClasses: Record<IconVariant, string> = {
    default: 'text-foreground',
    black: 'text-black',
  };

  const baseHover = 'transition-all duration-200 hover:opacity-80';

  const colorClass =
    isHeart ?
      state === 'selected' ?
        'text-red-600'
      : 'text-foreground hover:text-red-500'
    : isThickIcon ? variantsOfClasses[variant]
    : variantsOfClasses[variant];

  const fillValue = isHeart && state === 'selected' ? 'currentColor' : 'none';

  const strokeWidthValue = isThickIcon ? 2.5 : 2;

  const iconElement = (
    <IconComponent
      className={cn(sizeClass, baseHover, colorClass, className)}
      fill={fillValue}
      stroke="currentColor"
      strokeWidth={strokeWidthValue}
      {...props}
    />
  );

  if (!hasCounter) return iconElement;

  const displayValue = count > 99 ? '99+' : count;
  const hasLimitations = count > 99;

  return (
    <div className="relative inline-flex w-7 h-7 items-center justify-center">
      {iconElement}

      <span
        className={cn(
          'absolute -top-1 -right-1 flex items-center justify-center bg-destructive text-white text-[9px] font-medium leading-none',
          hasLimitations ?
            'h-[14px] px-1.5 rounded-full'
          : 'w-[14px] h-[14px] rounded-full',
        )}
      >
        {displayValue}
      </span>
    </div>
  );
};
