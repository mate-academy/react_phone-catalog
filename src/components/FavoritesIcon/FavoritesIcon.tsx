import './FavoritesIcon.scss'
import React, { useContext } from 'react';
import { MyContext } from '../../App';
import { NavLink, useLocation } from 'react-router-dom';

export const FavoritesIcon = () => {
  const { favorites } = useContext(MyContext);
  const addresses = ['/cart'];
  const location = useLocation();
  const isOnPage = !addresses.includes(location.pathname)

  return (
    isOnPage
      ? <label
        className="FavoritesIcon"
      >
        {favorites.length > 0
          ? <span className="FavoritesIcon__count">{favorites.length}</span>
          : ""}
        {favorites.length > 0
          ? <NavLink className="FavoritesIcon__link" to="/favorites"></NavLink>
          : <span className="FavoritesIcon__link"></span>}
      </label>
      : <span></span>
  )
}

