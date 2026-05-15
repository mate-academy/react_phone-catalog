import React from 'react';
import styles from './Icon.module.scss';
import classNames from 'classnames';
import { Badge } from '../../components/Badge';

import Home from './assets/home.svg?react';
import Search from './assets/search.svg?react';
import Heart from './assets/heart.svg?react';
import HeartFilled from './assets/heart-filled.svg?react';
import ShoppingBag from './assets/shopping-bag.svg?react';
import Plus from './assets/plus.svg?react';
import Minus from './assets/minus.svg?react';
import Close from './assets/close.svg?react';
import ArrowUp from './assets/arrow-up.svg?react';
import ArrowDown from './assets/arrow-down.svg?react';
import ArrowRight from './assets/arrow-right.svg?react';
import ArrowLeft from './assets/arrow-left.svg?react';
import Menu from './assets/menu.svg?react';

const iconMap = {
  home: Home,
  search: Search,
  heart: Heart,
  'heart-filled': HeartFilled,
  'shopping-bag': ShoppingBag,
  plus: Plus,
  minus: Minus,
  close: Close,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  menu: Menu,
};

interface IconProps {
  variant: keyof typeof iconMap;
  count?: number;
  className?: string;
  selected?: boolean;
}

export const Icon: React.FC<IconProps> = ({ variant, count, className, selected = false }) => {
  let variantName = variant;

  if (variant === 'heart' && selected) {
    variantName = 'heart-filled';
  }

  const SvgIcon = iconMap[variantName];

  const iconContent = (
    <span
      className={classNames(styles.wrapper, className, {
        [styles.selected]: selected,
      })}
    >
      <SvgIcon className={styles.icon} />
    </span>
  );

  if (count !== undefined && count > 0) {
    return <Badge count={count}>{iconContent}</Badge>;
  }

  return iconContent;
};
