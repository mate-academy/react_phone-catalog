import {
  Link,
  NavLink,
  Outlet,
  useLocation,
} from 'react-router-dom';
import classNames from 'classnames';
import './App.scss';
import './utils/_vars.scss';
import './blocks/header.scss';
import './blocks/logo.scss';
import './blocks/nav.scss';
import './blocks/active-link.scss';
import './blocks/footer.scss';
import './blocks/back-to-top.scss';
import './blocks/icon.scss';

import { useEffect, useState } from 'react';

import logo from './images/logo.svg';
import favourites from './images/icons/favourites.svg';
import shoppingBag from './images/icons/shopping_bag.svg';
import arrow from './images/icons/arrow.svg';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'nav__link',
  { 'active-link': isActive },
);

const getIconLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'header__icon',
  { 'active-link': isActive },
);

export const App = () => {
  const { pathname } = useLocation();
  const [likedProductsCount, setLikedProductsCount] = useState(0);

  const updateLikedProductsCount = () => {
    const likedProducts = JSON
      .parse(localStorage.getItem('LikedProducts') || '[]');

    console.log('test');

    setLikedProductsCount(likedProducts.length);
  };

  const localItems = JSON
    .parse(localStorage.getItem('LikedProducts') || '[]').length;

  useEffect(() => {
    // function updateLikedProductsCount() {
    //   const likedProducts = JSON
    //     .parse(localStorage.getItem('LikedProducts') || '[]');

    //   console.log('test');

    //   setLikedProductsCount(likedProducts.length);
    // }

    console.log('useEffect');

    window.addEventListener('storage', updateLikedProductsCount);

    return () => {
      window.removeEventListener('storage', updateLikedProductsCount);
    };
  }, [localItems]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div className="App">
      <header className="header">
        <div className="header__left">
          <div className="logo header__logo">
            <Link to="/" className="logo__link">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          {pathname !== '/cart' && (
            <nav className="nav">
              <NavLink to="/" className={getNavLinkClass}>
                Home
              </NavLink>
              <NavLink to="/phones" className={getNavLinkClass}>
                Phones
              </NavLink>
              <NavLink to="/tablets" className={getNavLinkClass}>
                Tablets
              </NavLink>
              <NavLink to="/accessories" className={getNavLinkClass}>
                Accessories
              </NavLink>
            </nav>
          )}
        </div>
        <div className="header__right">
          <NavLink to="/favourites" className={getIconLinkClass}>
            <img
              src={favourites}
              alt="favourites"
              className="header__image"
            />
            {likedProductsCount > 0 && (
              <p className="header__likeCounter">{likedProductsCount}</p>
            )}
          </NavLink>
          <NavLink to="/cart" className={getIconLinkClass}>
            <img
              src={shoppingBag}
              alt="bag"
              className="header__image"
            />
          </NavLink>
        </div>
      </header>

      <Outlet />

      <footer className="footer">
        <div className="footer__content">
          <Link to="/" className="logo">
            <img src={logo} alt="logo" />
          </Link>

          <nav className="nav">
            <Link
              to="https://github.com/vadymboichenkoAcupower"
              target="_blank"
              className="nav__link nav__link--footer"
            >
              Github
            </Link>
            <Link
              to="/contacts"
              className="nav__link nav__link--footer"
            >
              Contacts
            </Link>
            <Link
              to="/rights"
              className="nav__link nav__link--footer"
            >
              Rights
            </Link>
          </nav>

          <div className="back-to-top">
            <Link
              to={{ pathname }}
              className="back-to-top__text"
              onClick={() => scrollToTop()}
            >
              Back to top
            </Link>
            <Link
              to={{ pathname }}
              className="icon icon--back-to-top"
              onClick={() => scrollToTop()}
            >
              <img
                src={arrow}
                alt="arrow"
                className="icon__arrow"
              />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
