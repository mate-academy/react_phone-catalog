import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getFavouritesGoods } from '../../store';
import './NavFavorite.scss';

export const NavFavourite = () => {
  const favoriteGoods = useSelector(getFavouritesGoods);

  return (
    <NavLink
      to="/favorites"
      className="Container Header-Favorite"
      activeClassName="Header-Favorite_active"
    >
      <img
        src="img/icons/favourite.svg"
        alt="header-favourite"
      />

      {favoriteGoods.length !== 0 && (
        <div className="Header-FavoriteCounter">
          {favoriteGoods.length}
        </div>
      )}
    </NavLink>
  );
};
