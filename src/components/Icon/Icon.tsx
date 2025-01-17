import React from 'react';
import styles from './Icon.module.scss';
import { IconType } from '../../types/IconTypes';
import FavouriteIcon from '../../assets/images/Icons/icon-liked.png';
import CartIcon from '../../assets/images/Icons/cart.png';
import MenuIcon from '../../assets/images/Icons/menu-icon.svg';
import CloseMenu from '../../assets/images/Icons/close-icon.svg';

type Props = {
  type: IconType;
};

export const Icon: React.FC<Props> = ({ type }) => {
  let iconSrc = '';

  switch (type) {
    case 'favourite':
      iconSrc = FavouriteIcon;
      break;
    case 'cart':
      iconSrc = CartIcon;
      break;
    case 'menu':
      iconSrc = MenuIcon;
      break;
    case 'close':
      iconSrc = CloseMenu;
      break;
    default:
      break;
  }

  return (
    <div className={styles.icon}>
      <img src={iconSrc} alt={type} className={styles.icon__img} />
    </div>
  );
};
