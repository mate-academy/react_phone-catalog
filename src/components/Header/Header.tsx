import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import { CartContext } from '../contexts/CartContextProvider';
import { FavContext } from '../contexts/FavContextProvider';

export const Header = () => {
  const { cart } = useContext(CartContext);
  const { favourites } = useContext(FavContext);

  return (
    <header className="header header--margin-bottom">
      <div className="header__nav">
        <div className="header__logo">
          <Link
            to="/"
          >
            <img
              src="/imgFigma/LOGO.svg"
              alt="logo"
            />
          </Link>

        </div>

        <NavLink
          className={({ isActive }) => classNames(
            'header__link',
            'header__main-nav-link',
            {
              'header__main-nav-link--is-active': isActive,
            },
          )}
          to="/"
        >
          home
        </NavLink>

        <NavLink
          className={({ isActive }) => classNames(
            'header__link',
            'header__main-nav-link',
            {
              'header__main-nav-link--is-active': isActive,
            },
          )}
          to="/phones"
        >
          phones
        </NavLink>

        <NavLink
          className={({ isActive }) => classNames(
            'header__link',
            'header__main-nav-link',
            {
              'header__main-nav-link--is-active': isActive,
            },
          )}
          to="/tablets"
        >
          tablets
        </NavLink>

        <NavLink
          className={({ isActive }) => classNames(
            'header__link',
            'header__main-nav-link',
            {
              'header__main-nav-link--is-active': isActive,
            },
          )}
          to="/accessories"
        >
          accessories
        </NavLink>
      </div>

      <div className="header__choosed">
        <NavLink
          className={({ isActive }) => classNames(
            'header__link',
            'header__actions-link',
            'header__favourites',
            'header__icon',
            {
              'header__actions-link--is-active': isActive,
            },
          )}
          to="favourites"
        >
          <img
            src="/imgFigma/Icons/Favourites (Heart Like).svg"
            alt="favourites"
          />

          {favourites.length > 0 && (
            <div className="header__icon-count">
              {favourites.length}
            </div>
          )}
        </NavLink>

        <NavLink
          className={({ isActive }) => classNames(
            'header__link',
            'header__actions-link',
            'header__cart',
            'header__icon',
            {
              'header__actions-link--is-active': isActive,
            },
          )}
          to="cart"
        >
          <img
            src="/imgFigma/Icons/Shopping bag (Cart).svg"
            alt="cart"
          />
          {cart.length > 0 && (
            <div className="header__icon-count">
              {cart.length}
            </div>
          )}
        </NavLink>

      </div>
    </header>
  );
};
