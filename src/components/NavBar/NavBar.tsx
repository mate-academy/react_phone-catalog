import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { SearchForm } from './SearchForm';
import { Logo } from '../Logo/Logo';
import { CartContext } from '../../context/CartContext';

export const NavBar = () => {
  const location = useLocation();
  const { cartCount } = useContext(CartContext);

  const shouldShowSearchForm = ['/phones', '/tablets', '/accessories']
    .includes(location.pathname);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      {isOpen ? (
        <button
          type="button"
          aria-label="navbar__cross"
          className="navbar__cross"
          onClick={toggleMenu}
        />
      ) : (
        <button
          type="button"
          aria-label="navbar__burger"
          className="navbar__burger"
          onClick={toggleMenu}
        />

      )}

      <Logo />

      <ul
        className={classNames('navbar__list', {
          'navbar__list--mob': isOpen,
        })}
      >
        <NavLink
          to="/"
          className={classNames('navbar__item', {
            'navbar__item--active': location.pathname === '/',
          })}
          onClick={closeMenu}
        >
          home
        </NavLink>

        <NavLink
          to="/phones"
          className={classNames('navbar__item', {
            'navbar__item--active': location.pathname === '/phones',
          })}
          onClick={closeMenu}
        >
          phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={classNames('navbar__item', {
            'navbar__item--active': location.pathname === '/tablets',
          })}
          onClick={closeMenu}
        >
          tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={`navbar__item ${location.pathname === '/accessories' ? 'navbar__item--active' : ''}`}
          onClick={closeMenu}
        >
          accessories
        </NavLink>

        <NavLink
          to="/favourites"
          className={`navbar__item navbar__item-mob ${location.pathname === '/favourites' ? 'navbar__item--active' : ''}`}
          onClick={closeMenu}
        >
          favourites
        </NavLink>

        <NavLink
          to="/cart"
          className={`navbar__item navbar__item-mob ${location.pathname === '/cart' ? 'navbar__item--active' : ''}`}
          onClick={closeMenu}
        >
          cart
        </NavLink>
      </ul>

      <div className="navbar__search">
        {shouldShowSearchForm && <SearchForm />}
      </div>

      <div className="navbar__icons">
        <Link to="/" className="navbar__icon">
          <div className="navbar__icon--favs" />
        </Link>

        <Link to="/cart" className="navbar__icon">
          {cartCount >= 1 ? (
            <>
              <div className="navbar__icon--cart" />

              <span className="navbar__icon--count-box">
                <span className="navbar__icon--count">{cartCount}</span>
              </span>
            </>
          ) : (
            <div className="navbar__icon--cart" />
          )}
        </Link>
      </div>
    </nav>
  );
};
