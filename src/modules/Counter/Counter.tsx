import React, { useContext } from 'react';
import { FavouritesContext } from '../../context/FavouritesContext';
import styles from './Counter.module.scss';
import classNames from 'classnames';

export const Counter: React.FC = () => {
  const { favourites } = useContext(FavouritesContext);
  const value = Object.values(favourites).length;

  return (
    <div className={classNames(styles.counter, 'flex-center')}>{value}</div>
  );
};
