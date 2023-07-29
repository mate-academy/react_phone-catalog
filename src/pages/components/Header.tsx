/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import {
  NavLink, useLocation,
} from 'react-router-dom';
import '../../styles/styles.scss';

export const Header: FC = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__content">
        <nav className="header__nav nav">
          <NavLink to="/" className="nav__link">
            <img src="images/logo.jpg" alt="Logo" />
          </NavLink>
          <NavLink to="/" className="nav__link">
            home
          </NavLink>
          <NavLink to={`/phones${location.search.toString()}`} className="nav__link">
            Phones
          </NavLink>
          <NavLink to="/tablets" className="nav__link">
            tablets
          </NavLink>
          <NavLink to="/accessories" className="nav__link">
            accessories
          </NavLink>
        </nav>
        <div
          className="
          header__favorites-card-buttons
          favorites-card-buttons
          favorites
          card
          "
        >
          <a href="http://" className="favorites-card-buttons--link">
            <img
              className="favorites-card-buttons--icon"
              src="images/icons/HeartLike.svg"
              alt="Favorites"
            />
          </a>
          <a href="http://" className="favorites-card-buttons--link">
            <img
              className="favorites-card-buttons--icon"
              src="images/icons/ShoppingbagCart.svg"
              alt="Shopping bag"
            />
          </a>
        </div>
      </div>
    </header>
  );
};
