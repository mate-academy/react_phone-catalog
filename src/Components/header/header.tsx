// header.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './header.scss';
import {
  useCartContext,
  useFavoritesContext,
} from '../cartcontext/cartcontext';

export const Header: React.FC = () => {
  const location = useLocation();
  const { favoriteProducts } = useFavoritesContext();
  const { cartProducts } = useCartContext();

  return (
    <header className="header">
      <NavLink to="/" className="logo">
        <img src={`${process.env.PUBLIC_URL}/img/Logo.svg`} alt="Logo" className="logo__image" />
      </NavLink>
      <nav className="nav">
        <ul>
          <li className="le">
            <NavLink to="/">
              Home
            </NavLink>
          </li>
          <li className="le">
            <NavLink to="/phones">
              Phones
            </NavLink>
          </li>
          <li className="le">
            <NavLink to="/tablets">
              Tablets
            </NavLink>
          </li>
          <li className="le">
            <NavLink to="/accessories">
              Accessories
            </NavLink>
          </li>
        </ul>
        <ul>

          <li>
            <div className={`rectangle ${location.pathname.includes('/favourites') ? 'activeLink' : ''}`}>
              <NavLink to="/favourites">
                <img src={`${process.env.PUBLIC_URL}/img/Favourites.svg`} alt="Logo" className="" />
                {favoriteProducts.length > 0 && (
                  <div className="favorite-count">
                    {favoriteProducts.length}
                  </div>
                )}
              </NavLink>
            </div>
          </li>
          <li>
            <div className={`rectangle ${location.pathname.includes('/cart') ? 'activeLink' : ''}`}>
              <NavLink to="/cart" className="a">
                <img src={`${process.env.PUBLIC_URL}/img/Group.svg`} alt="Logo" className="" />
                {cartProducts.length > 0 && (
                  <div className="cart-count">{cartProducts.length}</div>
                )}
              </NavLink>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
