import classNames from 'classnames';
import React, { useContext } from 'react';

import { CartContext } from '../../context/CartContext';
import { FavouritesContext } from '../../context/FavouritesContext';
import { NavLinks } from '../../enums/NavLinks';
import styles from './Counter.module.scss';

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
