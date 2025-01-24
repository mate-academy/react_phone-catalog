import React from 'react';
import styles from './Icon.module.scss';
import { IconType } from '../../types/IconTypes';
import FavouriteLight from '../../assets/images/Icons/light/favouriteLight.png';
import FavouriteDark from '../../assets/images/Icons/dark/favouriteDark.png';
import CartLigh from '../../assets/images/Icons/light/cartLight.png';
import CartDark from '../../assets/images/Icons/dark/cartDark.png';
import MenuLight from '../../assets/images/Icons/light/menuLight.svg';
import MenuDark from '../../assets/images/Icons/dark/menuDark.png';
import CloseLight from '../../assets/images/Icons/light/closeLight.svg';
import CloseDark from '../../assets/images/Icons/dark/closeDark.png';
import ArrowPrevLight from '../../assets/images/Icons/light/arrowLeftLight.png';
import ArrowNextLight from '../../assets/images/Icons/light/arrowRightLight.png';
import ArrowPrewDark from '../../assets/images/Icons/dark/arrowLeftDark.png';
import ArrowNextDark from '../../assets/images/Icons/dark/arrowRightDark.png';
import FavouriteActive from '../../assets/images/Icons/FavouriteActive.png';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  type: IconType;
};

export const Icon: React.FC<Props> = ({ type }) => {
  const { theme } = useTheme();
  const darkTheme = theme === 'dark';

  const icons = {
    favourite: darkTheme ? FavouriteDark : FavouriteLight,
    favouriteActive: FavouriteActive,
    cart: darkTheme ? CartDark : CartLigh,
    menu: darkTheme ? MenuDark : MenuLight,
    close: darkTheme ? CloseDark : CloseLight,
    arrowPrev: darkTheme ? ArrowPrewDark : ArrowPrevLight,
    arrowNext: darkTheme ? ArrowNextDark : ArrowNextLight,
  };

  const iconSrc = icons[type];

  return (
    <div className={styles.icon}>
      <img src={iconSrc} alt={type} className={styles.icon__img} />
    </div>
  );
};
