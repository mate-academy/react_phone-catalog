import React from 'react';
import styles from './Icon.module.scss';
import { IconType } from '../../types/IconTypes';
import FavouriteWhite from '../../assets/images/Icons/icon-liked-white.png';
import CartWhite from '../../assets/images/Icons/cartWhite.png';

type Props = {
  type: IconType;
};

export const Icon: React.FC<Props> = ({ type }) => {
  let iconSrc = '';

  switch (type) {
    case 'favourite':
      iconSrc = FavouriteWhite;
      break;
    case 'cart':
      iconSrc = CartWhite;
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
