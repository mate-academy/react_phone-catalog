import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import './Header.scss';

export const Header = () => {
  const location = useLocation();

  return (
    <header className="header" id="header">
      <nav className="header__nav nav">
        <div className="nav__menu">
          <NavLink to="/" className="nav__logo">
            <span className="logo" />
          </NavLink>
          <NavLink
            to="home"
            className={classNames('nav__link', {
              'is-active-link': location.pathname === '/home',
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="phones"
            className={classNames('nav__link', {
              'is-active-link': location.pathname === '/phones',
            })}
          >
            Phones
          </NavLink>
          <NavLink
            to="tablets"
            className={classNames('nav__link', {
              'is-active-link': location.pathname === '/tablets',
            })}
          >
            Tablets
          </NavLink>
          <NavLink
            to="accessories"
            className={classNames('nav__link', {
              'is-active-link': location.pathname === '/accessories',
            })}
          >
            Accessories
          </NavLink>
        </div>
        <div className="nav__menu">
          <form className="nav__form">
            <input
              type="text"
              className="search"
              placeholder="Search in phones..."
            />
          </form>
          <NavLink to="favourites" className="icon__favourites">
            <span className="icon icon-favourites" />
          </NavLink>
          <NavLink to="cart" className="icon__cart">
            <span className="icon icon-cart" />
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
