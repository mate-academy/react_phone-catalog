import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import React from 'react';

export const FavoritesIcon: React.FC<{ count: string | number }> = ({
  count,
}) => {
  const num = Number(count);

  return (
    <div className={styles.actions}>
      <NavLink to="/favorites" className={styles.icon} aria-label="Favorites">
        <img src="/img/favourites.png" alt="Favourites" />
        <i className="fas fa-heart" />
        {num > 0 && <span className={styles.badge}>{count}</span>}
      </NavLink>
    </div>
  );
};
