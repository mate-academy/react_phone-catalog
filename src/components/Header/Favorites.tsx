import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { getFavorites } from '../../redux';

export const Favorites = ({ isNavOpen, closeNavMenu }: FavoritesProps) => {
  const favorites: Product[] = useSelector(getFavorites);

  const doFavoritesExist = useMemo(
    () => favorites.length > 0,
    [favorites.length],
  );

  return (
    <div className={cn({
      favorites: true,
      favorites__mobile: isNavOpen,
    })}
    >
      <NavLink
        to="/favorites"
        className="favorites__button"
        activeClassName="favorites__button--active"
        onClick={closeNavMenu}
      >
        {doFavoritesExist
        && <span className="favorites__indicator">{favorites.length}</span>}
      </NavLink>
    </div>
  );
};
