// import styles from '../components/Header/Header.module.css';
import { NavLink } from 'react-router-dom';
import React from 'react';

export const FavoritesIcon: React.FC<{ count: string | number }> = ({
  count,
}) => {
  const num = Number(count);

  return (
    <div className="actions">
      <NavLink to="/favorites" className="icon" aria-label="Favorites">
        <img src="/img/favorites.svg" alt="Favourites" />
        {num > 0 && <span className="badge">{count}</span>}
      </NavLink>
    </div>
  );
};
