import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getFavorites } from '../../store';

const FavoriteLink = () => {
  const favoriteProducts = useSelector(getFavorites);
  const counter = favoriteProducts.length;

  return (
    <>
      <NavLink to="/favorites" className="header__icons" activeClassName="header__icons--active">
        <div className="header__icons--item">
          <img
            src="./img/icons/favorites.svg"
            alt="cart icon"
            className="header__icons--img"
          />
          {counter !== 0 && (
            <span className="header__counter">{counter}</span>
          )}

        </div>
      </NavLink>
    </>
  );
};

export default FavoriteLink;
