import './FavoritesIcon.scss'
import React from 'react';
import { NavLink } from 'react-router-dom';
import {Product} from '../../interfaces';

export const FavoritesIcon = ({favorites}:{favorites: Product[]}) => {





  return (
    <label
      className="FavoritesIcon"
    >
      {favorites.length > 0
        ? <span className="FavoritesIcon__count">{favorites.length}</span>
        : ""}
      {favorites.length > 0
        ? <NavLink className="FavoritesIcon__link" to="/favorites"></NavLink>
        : <span className="FavoritesIcon__link"></span>}

    </label>
  )
}

