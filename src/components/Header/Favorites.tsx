import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getFavorites } from '../../redux';

export const Favorites = () => {
  const favorites: Product[] = useSelector(getFavorites);

  const doFavoritesExist = useMemo(
    () => favorites.length > 0,
    [favorites.length],
  );

  return (
    <div className="favorites">
      <Link to="/favorites" className="favorites__button">
        {doFavoritesExist
        && <span className="favorites__indicator">{favorites.length}</span>}
      </Link>
    </div>
  );
};
