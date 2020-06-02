import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getFavorites } from '../../redux';
import { LOCATIONS } from '../../common/constants';

export const Favorites = ({ headerItemRef }: FavoritesProps) => {
  const favorites: Product[] = useSelector(getFavorites);
  const location = useLocation();

  const refCheck = useMemo(
    () => location.pathname === LOCATIONS.favorites ? headerItemRef : null,
    [location.pathname, headerItemRef]
  );

  const doFavoritesExist = useMemo(
    () => favorites.length > 0,
  [favorites.length]
  );

  return (
    <div
      className="favorites"
      ref={refCheck}
    >
      <Link to="/favorites" className="favorites__button">
        {doFavoritesExist
        && <span className="favorites__indicator">{favorites.length}</span>}
      </Link>
    </div>
  );
};
