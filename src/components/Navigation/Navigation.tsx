import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.scss';
import React from 'react';
import { useAppSelector } from '../../app/hooks';

export const Navigation: React.FC = () => {
  const favoritesNumber = useAppSelector(state => state.favorites.length);
  const cartNumber = useAppSelector(state => state.cart.length);
  const location = useLocation();

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink className="nav__link" to="/">
            home
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink className="nav__link" to="/phones">
            phones
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink className="nav__link" to="/tablets">
            tablets
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink className="nav__link" to="/accessories">
            accessories
          </NavLink>
        </li>
      </ul>

      <div className="nav__buttons">
        <NavLink
          className="nav__button nav__button--favourites"
          to="/favourites"
        >
          {favoritesNumber > 0 && (
            <div className="nav__button-counter">{favoritesNumber}</div>
          )}
        </NavLink>
        <NavLink
          className="nav__button nav__button--cart"
          to="/cart"
          state={{ pathname: location.pathname + location.search }}
        >
          {cartNumber > 0 && (
            <div className="nav__button-counter">{cartNumber}</div>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
