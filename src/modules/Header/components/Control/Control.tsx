import React, { useContext } from 'react';
import styles from './Control.module.scss';
import { HeartLikeSVG } from '../../../../svgs/HeartLikeSVG';
import { ShoppingBagSVG } from '../../../../svgs/ShoppingBagSVG';
import { Link, useLocation } from 'react-router-dom';
import { NavLinks } from '../../../../enums/NavLinks';
import { FavouritesContext } from '../../../../context/FavouritesContext';
import { Counter } from '../../../Counter';
import classNames from 'classnames';
import { CartContext } from '../../../../context/CartContext';

export const Control: React.FC = () => {
  const { favourites } = useContext(FavouritesContext);
  const { cart } = useContext(CartContext);

  const { pathname } = useLocation();

  const favouritesCondition = Object.values(favourites).length > 0;
  const cartCondition = Object.values(cart).length > 0;

  const isOnFavourites = pathname === `/${NavLinks.favourites}`;
  const isOnCart = pathname === `/${NavLinks.cart}`;

  return (
    <div className="flex-center">
      <Link
        to={`/${NavLinks.favourites}`}
        className={classNames(styles.item, {
          [styles['is-active']]: isOnFavourites,
        })}
      >
        {favouritesCondition && <Counter query={NavLinks.favourites} />}
        <HeartLikeSVG />
      </Link>
      <Link
        to={`/${NavLinks.cart}`}
        className={classNames(styles.item, {
          [styles['is-active']]: isOnCart,
        })}
      >
        {cartCondition && <Counter query={NavLinks.cart} />}
        <ShoppingBagSVG />
      </Link>
    </div>
  );
};
