import { NavLink } from 'react-router-dom';
import React from 'react';

type Props = {
  cartCount?: number;
  favoritesCount?: number;
};

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  `navbar-item  ${isActive ? 'isActive' : ''}`;

export const Header: React.FC<Props> = ({
  cartCount = 0,
  favoritesCount = 0,
}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="navbar-item">
          <NavLink to="/">
            <img src="/img/logo.svg" alt="Logo" className="logo" />
          </NavLink>
          <nav className="nav">
            <NavLink to="/" className={getLinkClass}>
              HOME
            </NavLink>
            <NavLink to="/phones" className={getLinkClass}>
              PHONES
            </NavLink>
            <NavLink to="/tablets" className={getLinkClass}>
              TABLETS
            </NavLink>
            <NavLink to="/accessories" className={getLinkClass}>
              ACCESSORIES
            </NavLink>
          </nav>
          <div className="actions-icon">
            <NavLink to="/favorites" className="icon" aria-label="Favorites">
              <img
                src="/img/favorites.svg"
                className="img-icon"
                alt="Favourites"
              />
              {favoritesCount > 0 && (
                <span className="badge">{favoritesCount}</span>
              )}
            </NavLink>

            <NavLink to="/cart" className="icon" aria-label="Card">
              <img src="/img/cart.svg" className="img-icon" alt="Cart" />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};
