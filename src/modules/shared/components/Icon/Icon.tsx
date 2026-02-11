/* eslint-disable @typescript-eslint/indent */
import cn from 'classnames';
import { LucideProps } from 'lucide-react';
import React, { lazy } from 'react';

// #region Types
type IconType =
  | 'ChevronLeft'
  | 'ChevronRight'
  | 'ChevronUp'
  | 'Menu'
  | 'Heart'
  | 'ShoppingBag'
  | 'Home'
  | 'X'
  | 'Minus'
  | 'Plus'
  | 'BookHeart';

interface Props {
  iconSlug: IconType;
  toIncludeBaseIconClass?: boolean;
  className?: string;
}

type LucideIcon = React.LazyExoticComponent<
  React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
>;
// #endregion

// #region Lazy imports
const icons: {
  [key: string]: LucideIcon;
} = {
  ChevronLeft: lazy(() =>
    import('lucide-react').then(module => ({
      default: module.ChevronLeftIcon,
    })),
  ),
  ChevronRight: lazy(() =>
    import('lucide-react').then(module => ({
      default: module.ChevronRightIcon,
    })),
  ),
  ChevronUp: lazy(() =>
    import('lucide-react').then(module => ({ default: module.ChevronUpIcon })),
  ),
  Menu: lazy(() =>
    import('lucide-react').then(module => ({ default: module.Menu })),
  ),
  Heart: lazy(() =>
    import('lucide-react').then(module => ({ default: module.Heart })),
  ),
  Home: lazy(() =>
    import('lucide-react').then(module => ({ default: module.Home })),
  ),
  ShoppingBag: lazy(() =>
    import('lucide-react').then(module => ({
      default: module.ShoppingBagIcon,
    })),
  ),
  X: lazy(() => import('lucide-react').then(module => ({ default: module.X }))),
  Minus: lazy(() =>
    import('lucide-react').then(module => ({ default: module.Minus })),
  ),
  Plus: lazy(() =>
    import('lucide-react').then(module => ({ default: module.Plus })),
  ),
  BookHeart: lazy(() =>
    import('lucide-react').then(module => ({ default: module.BookHeart })),
  ),
};
// #endregion

export const Icon: React.FC<Props> = ({
  iconSlug,
  toIncludeBaseIconClass = true,
  className = '',
}) => {
  const I = icons[iconSlug];

  if (!I) {
    return false;
  }

  return <I className={cn(className, { icon: toIncludeBaseIconClass })}></I>;
};
