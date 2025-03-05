import React, { useContext } from 'react';
import { FavouritesContext } from '../../context/FavouritesContext';
import styles from './Counter.module.scss';
import classNames from 'classnames';
import { NavLinks } from '../../enums/NavLinks';
import { CartContext } from '../../context/CartContext';

interface Props {
  query: NavLinks;
}

export const Counter: React.FC<Props> = React.memo(({ query }) => {
  const { favourites } = useContext(FavouritesContext);
  const { cart } = useContext(CartContext);
  const value =
    query === NavLinks.favourites
      ? Object.values(favourites).length
      : Object.values(cart).length;

  return (
    <div className={classNames(styles.counter, 'flex-center')}>{value}</div>
  );
});

Counter.displayName = 'Counter';
