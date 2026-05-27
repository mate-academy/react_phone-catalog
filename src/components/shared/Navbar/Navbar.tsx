import './Navbar.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useFavorite } from '../../../context/FavoriteContext';

export const Navbar: React.FC = () => {
  const { cartItems } = useCart();
  const { favoriteItems } = useFavorite();
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <header className="header">
      <nav className="navbar">
        <input type="checkbox" id="menu-toggle" className="navbar__checkbox" />

        <NavLink to="/" className="navbar__logo" />

        <label
          htmlFor="menu-toggle"
          className="navbar__action navbar__action--menu"
          aria-label="Toggle menu"
        >
          <span style={{ display: 'none' }}>Toggle menu</span>
        </label>

        <div className="navbar__menu">
          <NavLink to="/" className="navbar__link">
            Home
          </NavLink>
          <NavLink to="/phones" className="navbar__link">
            Phones
          </NavLink>
          <NavLink to="/tablets" className="navbar__link">
            Tablets
          </NavLink>
          <NavLink to="/accessories" className="navbar__link">
            Accessories
          </NavLink>
        </div>

        <div className="navbar__actions">
          <div className="navbar__action">
            {favoriteItems.length !== 0 ? <p>{favoriteItems.length}</p> : ''}

            <NavLink
              to="/favorite"
              className="navbar__action navbar__action--compare"
            />
          </div>
          <div className="navbar__action">
            {totalCartItems > 0 ? <p>{totalCartItems}</p> : ''}
            <NavLink
              to="/cart"
              className="navbar__action navbar__action--basket"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};
