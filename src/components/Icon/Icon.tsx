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
import logo_purple from '../../images/logo_purple.svg';
import logo_black from '../../images/logo_black.svg';

import { useThemeContext } from '../../modules/shared/context/ThemeContext';

type Props = {
  name: string;
  isDisable?: boolean;
  className?: string;
  onClick?: () => void;
};

export const Icon: React.FC<Props> = ({
  name,
  isDisable,
  className,
  onClick,
}) => {
  const { theme } = useThemeContext();

  const icons: Record<string, string> = {
    favourites,
    cart,
    menu,
    close,
    home,
    plus,
    minus,
    arrowdown,
    arrowleft,
    search,
    arrowright,
    favouritesfilled,
    arrowup,
    logo_purple,
    logo_black,
  };

  if (name === 'logo') {
    const logoKey = theme === 'blue' ? 'logo_purple' : 'logo_black';

    return (
      <img
        src={icons[logoKey]}
        alt={name}
        className={`${styles.logo} ${className || ''}`}
        onClick={onClick}
      />
    );
  }

  const iconUrl = icons[name] || '';

  return (
    <span
      onClick={onClick}
      role="img"
      aria-label={`${name} icon`}
      className={`
        ${styles.icon}
        ${className ? className : ''}
        ${isDisable ? styles.disable : ''}
        ${name === 'favouritesfilled' ? styles.favouritesfilled : ''}
      `}
      style={{
        WebkitMaskImage: `url("${iconUrl}")`,
        maskImage: `url("${iconUrl}")`,
      }}
    />
  );
};
