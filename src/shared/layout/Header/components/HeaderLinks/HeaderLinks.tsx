import React from 'react';
import styles from './HeaderLinks.module.scss';
import { Link, useLocation } from 'react-router-dom';
import heartIcon from '../../../../../../public/img/icons/icon-heart.svg';
import basketIcon from '../../../../../../public/img/icons/icon-basket.svg';
import { Cart } from '../../../../../types/Cart';

type Props = {
  favorites: number[];
  cart: Cart;
  customClass: string;
  setIsOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HeaderLinks: React.FC<Props> = ({
  favorites,
  cart,
  customClass,
  setIsOpenMenu,
}) => {
  const { pathname } = useLocation();
  const validPath = pathname.split('/').filter(Boolean).join('');
  const cartLength = Object.values(cart).reduce((acc, value) => acc + value, 0);

  return (
    <div className={styles.header}>
      <Link
        to={`/favorites`}
        className={`${styles[customClass]}`}
        onClick={() => (setIsOpenMenu ? setIsOpenMenu(false) : '')}
      >
        <img src={heartIcon} alt="icon-heart" />
        {validPath === 'favorites' && (
          <span className={styles.links__underline}></span>
        )}
        {favorites && favorites.length > 0 && (
          <div className={styles.count}>{favorites.length}</div>
        )}
      </Link>
      <Link
        to={`/cart`}
        className={styles[customClass]}
        onClick={() => (setIsOpenMenu ? setIsOpenMenu(false) : '')}
      >
        <img src={basketIcon} alt="icon-basket" />
        {validPath === 'cart' && (
          <span className={styles.links__underline}></span>
        )}
        {cart && cartLength > 0 && (
          <div className={styles.count}>{cartLength}</div>
        )}
      </Link>
    </div>
  );
};
