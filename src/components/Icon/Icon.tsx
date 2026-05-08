import styles from './Icon.module.scss';
import React from 'react';

import favourites from '../../images/icons/favourites.svg';
import cart from '../../images/icons/cart.svg';
import search from '../../images/icons/search.svg';
import arrowdown from '../../images/icons/arrowdown.svg';
import arrowleft from '../../images/icons/arrowleft.svg';
import arrowright from '../../images/icons/arrowright.svg';
import arrowup from '../../images/icons/arrowup.svg';
import close from '../../images/icons/close.svg';
import favouritesfilled from '../../images/icons/favouritesfilled.svg';
import home from '../../images/icons/home.svg';
import plus from '../../images/icons/plus.svg';
import menu from '../../images/icons/menu.svg';
import minus from '../../images/icons/minus.svg';
import logo from '../../images/logo.svg';

import { IconName } from '../../types/IconType';

type Props = {
  name: IconName;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
};

export const Icon: React.FC<Props> = ({ name, isActive, className, onClick }) => {
  const icons: Record<IconName, string> = {
    favourites,
    cart,
    menu,
    close,
    logo,
    home,
    plus,
    minus,
    arrowdown,
    arrowleft,
    search,
    arrowright,
    favouritesfilled,
    arrowup,
  };

  return (
    <img
      onClick={onClick}
      src={icons[name]}
      alt={`${name} icon`}
      className={`${styles.icon} ${className ? className : ''} ${isActive ? styles.active : ''}`}
    />
  );
};
