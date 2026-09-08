import React from 'react';

import styles from './Icon.module.scss';
import HeartIcon from '@assets/icons/heart-icon.svg?react';
import CartIcon from '@assets/icons/cart-icon.svg?react';
import MenuIcon from '@assets/icons/menu-icon.svg?react';
import CloseIcon from '@assets/icons/close-icon.svg?react';
import ArrowRightIcon from '@assets/icons/arrow-right-icon.svg?react';
import ArrowLeftIcon from '@assets/icons/arrow-left-icon.svg?react';
import ArrowUpIcon from '@assets/icons/arrow-up-icon.svg?react';
import ArrowDownIcon from '@assets/icons/arrow-down-icon.svg?react';
import HomeIcon from '@assets/icons/home-icon.svg?react';
import MinusIcon from '@assets/icons/minus-icon.svg?react';
import PlusIcon from '@assets/icons/plus-icon.svg?react';
import { IconType } from '../../types/IconType';

type Props = {
  type: IconType;
};

const components = {
  heart: <HeartIcon />,
  cart: <CartIcon />,
  menu: <MenuIcon />,
  close: <CloseIcon />,
  home: <HomeIcon />,
  plus: <PlusIcon />,
  minus: <MinusIcon />,
  ['arrow-right']: <ArrowRightIcon />,
  ['arrow-left']: <ArrowLeftIcon />,
  ['arrow-up']: <ArrowUpIcon />,
  ['arrow-down']: <ArrowDownIcon />,
};

export const Icon: React.FC<Props> = ({ type }) => {
  const iconComponent = components[type];

  return <div className={styles.icon}>{iconComponent}</div>;
};
