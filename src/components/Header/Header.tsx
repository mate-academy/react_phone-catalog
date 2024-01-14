import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Navigation } from '../Navigation';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <Link
          to="/"
          className="header__logo"
        >
          <div className="header__logo-img" />
        </Link>

        <Navigation />
      </div>

      <div className="header__right">
        <div>
          <input
            type="text"
            className="header__input"
            placeholder="Search in phones..."
          />
        </div>

        <NavLink
          to="/favourites"
          className={({ isActive }) => cn('header__favourites', {
            'header__favourites-is-active': isActive,
          })}
        >
          <div className="icon icon-favourites header__favourites-img" />
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) => cn('header__cart', {
            'header__cart-is-active': isActive,
          })}
        >
          <div className="icon icon-cart header__cart-img" />
        </NavLink>
      </div>
    </header>
  );
};
