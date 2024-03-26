import React from 'react';
import {
  Link, NavLink, Outlet, useLocation,
} from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';
import { Search } from './components/Search/Search';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar__item', {
    'is-active': isActive,
  },
);

export const App: React.FC = () => {
  const { pathname } = useLocation();
  const isPhonesPage = pathname === '/phones';

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="App">
      <header className="header">
        <nav className="navbar">
          <div className="navbar__brand">
            <Link to="/" className="navbar__item">
              <img src="/icons/Logo.svg" alt="MA" className="logo" />
            </Link>

            {pathname !== './cart' && (
              <div className="navbar__menu">
                <NavLink
                  to="/"
                  className={getLinkClass}
                >
                  HOME
                </NavLink>

                <NavLink
                  to="/phones"
                  className={getLinkClass}
                >
                  PHONES
                </NavLink>

                <NavLink
                  to="/tablets"
                  className={getLinkClass}
                >
                  TABLETS
                </NavLink>

                <NavLink
                  to="accessories"
                  className={getLinkClass}
                >
                  ACCESSORIES
                </NavLink>
              </div>
            )}
          </div>

          <div className="navbar__icons">
            {isPhonesPage && <Search />}
            {/* <Search /> */}
            <Link to="/favorites" className="navbar__icon">
              <img
                src="/icons/Favourites(HeartLike).svg"
                alt="MA"
                className="icon icon--header"
              />
            </Link>

            <Link to="/cart" className="navbar__icon">
              <img
                src="/icons/Shoppingbag(Cart).svg"
                alt="MA"
                className="icon icon--header"
              />
            </Link>
          </div>
        </nav>
      </header>

      <div className="section">
        <Outlet />
      </div>
      <footer className="footer">
        <div className="footer__container">
          <nav className="navbar">
            <Link to="/" className="navbar__item">
              <img src="/icons/Logo.svg" alt="MA" className="logo" />
            </Link>
            <div className="navbar__brand">
              <Link
                to="#/"
                className="navbar__item"
              >
                GITHUB
              </Link>

              <Link to="#/users" className="navbar__item">
                CONTACTS
              </Link>

              <Link to="#/posts" className="navbar__item">
                RIGHTS
              </Link>
            </div>

            <button
              type="button"
              className="footer__icon"
              onClick={scrollToTop}
            >
              Back to top
              <img
                src="/icons/buttons-icons/Slider-button-top.svg"
                alt="MA"
                className="icon icon--footer"
              />
            </button>
          </nav>
        </div>
      </footer>
    </div>
  );
};
