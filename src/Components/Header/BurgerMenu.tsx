import React from 'react';
import { NavLink } from 'react-router-dom';
import { CartIcon } from '../../Pages/Cart/CartIcon';
import { FavouritesIcon } from '../../Pages/Favourites/FavouritesIcon';
import './NavbarBurger.scss';

type Props = {
  onClose: () => void;
};

export const BurgerMenu: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="burger-menu-overlay active">
      <div className="burger-menu">
        <div className="burger-header">
          <NavLink
            to="/"
            className="logo"
            onClick={onClose}
          >
            <img
              src="./img/Logo.png"
              alt="Logo"
            />
          </NavLink>

          <button
            className="close-button"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <nav className="burger-links">
          <NavLink
            to="/"
            className="burger-link"
            onClick={onClose}
          >
            HOME
          </NavLink>
          <NavLink
            to="/phones"
            className="burger-link"
            onClick={onClose}
          >
            PHONES
          </NavLink>
          <NavLink
            to="/tablets"
            className="burger-link"
            onClick={onClose}
          >
            TABLETS
          </NavLink>
          <NavLink
            to="/accessories"
            className="burger-link"
            onClick={onClose}
          >
            ACCESSORIES
          </NavLink>
        </nav>

        <div className="burger-footer">
          <NavLink
            to="/favourites"
            className="burger-link"
            onClick={onClose}
          >
            <FavouritesIcon />
          </NavLink>
          <NavLink
            to="/cart"
            className="burger-link"
            onClick={onClose}
          >
            <CartIcon />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
