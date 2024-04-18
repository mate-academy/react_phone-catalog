import { NavLink } from 'react-router-dom';
import React from 'react';
import './Header.scss';
import Logo from '../../images/homePage/Logo.svg';
import Favorites from '../../images/homePage/Favorites.svg';
import Cart from '../../images/homePage/Cart.svg';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__block">
        <div className="header__top-head">
          <a href="#"></a>
          <NavLink to="/">
            <img className="header__logo" src={Logo} alt="logo" />
          </NavLink>
        </div>
        <ul className="header__top-heads">
          <NavLink to="/" className="header__home">
            HOME
          </NavLink>
          <NavLink to="/phones" className="header__phones">
            PHONES
          </NavLink>
          <NavLink to="/tablets" className="header__tablets">
            TABLETS
          </NavLink>
          <NavLink to="/accessories" className="header__accessories">
            ACCESSORIES
          </NavLink>
        </ul>
      </div>

      <div className="header__burger">
        <a href="#menu" className="header__burger__link" title="menu"></a>
      </div>

      <div className="header__burger">
        <div className="header__burger__cross">
          <a href="#" className="header__burger__cross-link"></a>
        </div>
      </div>

      <div className="header__preferies">
        <NavLink to="/favorites" className="header__favorites">
          <img
            className="header__favorites__img"
            src={Favorites}
            alt="Favorite"
          />
        </NavLink>
        <NavLink to="/cart" className="header__cart">
          <img className="header__cart__img" src={Cart} alt="cart" />
        </NavLink>
      </div>
    </header>
  );
};
