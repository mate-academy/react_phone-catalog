/* eslint-disable max-len */
import { useContext } from 'react';
import styles from './Favorites.module.scss';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../../StoreProvider';
import classNames from 'classnames';

export const Favorites = () => {
  const { favourites } = useContext(StoreContext);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.favorites, { [styles.active]: isActive });

  return (
    <NavLink to="/favorites" className={getLinkClass}>
      {favourites.length > 0 && <div className={styles.counter}>{favourites.length}</div>}
      <img src="images/Favourites (Heart Like).svg" alt="Favorites Logo" className={styles.icon} />
    </NavLink>
  );
};
