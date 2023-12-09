// header.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './header.scss';
import Logo from './Logo.svg';
import Favourites from './Favourites.svg';
import Group from './Group.svg';
import { useFavoriteContext } from '../favoritescontext/FavoriteContext';
import { useCartContext } from '../cartcontext/cartcontext';

export const Header: React.FC = () => {
  const location = useLocation();
  const { favoriteProducts } = useFavoriteContext();
  const { cartProducts } = useCartContext();

  return (
    <header className="header">
      <NavLink to="/">
        <img src={Logo} alt="Logo" className="logo__image" />
      </NavLink>
      <nav className="nav">
        <ul>
          <li className="le">
            <NavLink exact to="/" activeClassName="activeLink">
              Home
            </NavLink>
          </li>
          <li className="le">
            <NavLink to="/phones" activeClassName="activeLink">
              Phones
            </NavLink>
          </li>
          <li className="le">
            <NavLink to="/tablets" activeClassName="activeLink">
              Tablets
            </NavLink>
          </li>
          <li className="le">
            <NavLink to="/accessories" activeClassName="activeLink">
              Accessories
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <div className={`rectangle ${location.pathname.includes('/cart') ? 'activeLink' : ''}`}>
              <NavLink to="/cart" className='a'>
                <img src={Group} alt="Logo" className="" />
                {cartProducts.length > 0 && (
                  <div className="cart-count">{cartProducts.length}</div>
                )}
              </NavLink>
            </div>
          </li>
          <li>
            <div className={`rectangle ${location.pathname.includes('/favourites') ? 'activeLink' : ''}`}>
              <NavLink to="/favourites">
                <img src={Favourites} alt="Logo" className="" />
                {favoriteProducts.length > 0 && (
                  <div className="favorite-count">{favoriteProducts.length}</div>
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
