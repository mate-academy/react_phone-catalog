import { useContext, useLayoutEffect, useState } from 'react';
import cn from 'classnames';
import './App.scss';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { getSearchWith } from './helper/getSearchWith';
import { CatalogContext } from './components/CatalogContext';

export function debounce<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
) {
  let timerId = 0;

  return (...args: T) => {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export const App = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [asideIsOpen, setAsideIsOpen] = useState(false);
  const [backToTopIsVisible, setBackToTopIsVisible] = useState(false);

  const { cartItems, favoriteProducts } = useContext(CatalogContext);

  const itemsOnCart = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.quantity,
    0,
  );

  const toggleBurgerButton = () => {
    setAsideIsOpen(!asideIsOpen);
  };

  const getActiveNavLink = ({ isActive }: { isActive: boolean }) => {
    return cn('nav__link', { 'nav__link--isActive': isActive });
  };

  const getActiveBurgerLinks = ({ isActive }: { isActive: boolean }) => {
    return cn('nav__link', 'burger-menu__link', {
      'burger-menu__link--isActive': isActive,
    });
  };

  const getActiveIconsLink = ({ isActive }: { isActive: boolean }) => {
    return cn('header__icon', {
      'header__icon--isActive': isActive,
    });
  };

  const getActiveBurgerIconsLink = ({ isActive }: { isActive: boolean }) => {
    return cn('burger-menu__icon', {
      'burger__icon--isActive': isActive,
    });
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setBackToTopIsVisible(true);
      } else {
        setBackToTopIsVisible(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchWith = (params: Record<string, string | null>) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const debounceQuery = debounce(setSearchWith, 1000);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchActive(true);

    setSearchValue(event.target.value);
    debounceQuery({ query: event.target.value });
  };

  const location = useLocation();

  const handleDeleteInput = () => {
    setSearchWith({ query: null });
    setSearchValue('');
    setSearchActive(false);
  };

  return (
    <div className="App">
      <h1 style={{ display: 'none' }}>Product Catalog</h1>
      <header className="header" id="backToTop">
        <div className="header--left">
          <Link to="/" className="header__logo">
            <img className="logo" src="./icons/Logo.svg" alt="logo" />
          </Link>

          <nav className="nav header__nav">
            <li className="nav__list">
              <ul className="nav__item">
                <NavLink to="/" className={getActiveNavLink}>
                  home
                </NavLink>
              </ul>
              <ul className="nav__item">
                <NavLink to="/phones" className={getActiveNavLink}>
                  phones
                </NavLink>
              </ul>
              <ul className="nav__item">
                <NavLink to="/tablets" className={getActiveNavLink}>
                  tablets
                </NavLink>
              </ul>
              <ul className="nav__item">
                <NavLink to="/accessories" className={getActiveNavLink}>
                  accessories
                </NavLink>
              </ul>
            </li>
          </nav>
        </div>

        <div className="header--right">
          {(location.pathname === '/phones' ||
            location.pathname === '/tablets' ||
            location.pathname === '/accessories' ||
            location.pathname === '/favorites') && (
            <div className="header__search">
              {!searchActive ? (
                <img
                  className="header__search-icon"
                  src="./icons/Search.svg"
                  alt="search"
                />
              ) : (
                <button
                  onClick={handleDeleteInput}
                  type="button"
                  className="header__delete-button"
                >
                  <img
                    className="header__delete-icon"
                    src="./icons/Close.svg"
                    alt="search"
                  />
                </button>
              )}

              <input
                type="search"
                className="header__search-input"
                placeholder={`Search`}
                value={searchValue}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="header__icons-wrapper">
            <NavLink to="/favorites" className={getActiveIconsLink}>
              <img
                src="./icons/Favourites-Heart-Like.svg"
                alt="favorites"
                className="header__icon-image"
              />
              {favoriteProducts.length > 0 && (
                <div className="header__icon-circle">
                  {favoriteProducts.length}
                </div>
              )}
            </NavLink>

            <NavLink to="/cart" className={getActiveIconsLink}>
              <img
                src="./icons/CartSmall.svg"
                alt="cart"
                className="header__icon-image"
              />
              {cartItems.length > 0 && (
                <div className="header__icon-circle">{itemsOnCart}</div>
              )}
            </NavLink>
          </div>

          {asideIsOpen ? (
            <button
              type="button"
              className="header__burger-button"
              onClick={toggleBurgerButton}
            >
              <img
                src="./icons/Close.svg"
                alt="burger-menu"
                className="header__burger-icon"
              />
            </button>
          ) : (
            <button
              type="button"
              className="header__burger-button"
              onClick={toggleBurgerButton}
            >
              <img
                src="./icons/Burger.svg"
                alt="burger-menu"
                className="header__burger-icon"
              />
            </button>
          )}
        </div>
      </header>

      {asideIsOpen && (
        <aside id="menu" className="burger-menu">
          <li className="nav__list burger-menu__list">
            <ul className="nav__item burger-menu__item">
              <NavLink
                to="/"
                className={getActiveBurgerLinks}
                onClick={() => setAsideIsOpen(false)}
              >
                home
              </NavLink>
            </ul>
            <ul className="nav__item burger-menu__item">
              <NavLink
                to="/phones"
                className={getActiveBurgerLinks}
                onClick={() => setAsideIsOpen(false)}
              >
                phones
              </NavLink>
            </ul>
            <ul className="nav__item burger-menu__item">
              <NavLink
                to="/tablets"
                className={getActiveBurgerLinks}
                onClick={() => setAsideIsOpen(false)}
              >
                tablets
              </NavLink>
            </ul>
            <ul className="nav__item burger-menu__item">
              <NavLink
                to="/accessories"
                className={getActiveBurgerLinks}
                onClick={() => setAsideIsOpen(false)}
              >
                accessories
              </NavLink>
            </ul>
          </li>

          <div className="burger-menu__icons-wrapper">
            <NavLink
              to="/favorites"
              className={getActiveBurgerIconsLink}
              onClick={() => setAsideIsOpen(false)}
            >
              <div
                className="
                  burger-menu__icon-image
                  burger-menu__icon-image--favorite"
              >
                {favoriteProducts.length > 0 && (
                  <div className="burger-menu__icon-circle">
                    {favoriteProducts.length}
                  </div>
                )}
              </div>
            </NavLink>

            <NavLink
              to="/cart"
              className={getActiveBurgerIconsLink}
              onClick={() => setAsideIsOpen(false)}
            >
              <div
                className="
                  burger-menu__icon-image
                  burger-menu__icon-image--cart"
              >
                {cartItems.length > 0 && (
                  <div className="burger-menu__icon-circle">{itemsOnCart}</div>
                )}
              </div>
            </NavLink>
          </div>
        </aside>
      )}

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer__content">
          <Link to="/" className="footer__logo">
            <img className="logo" src="./icons/Logo.svg" alt="logo" />
          </Link>

          <nav className="nav footer__nav">
            <li className="nav__list footer__list">
              <ul className="nav__item footer__item">
                <a
                  href="
                  https://github.com/NataliaTopornitska/react_phone_catalog"
                  className="nav__link"
                  target="_blank"
                >
                  github
                </a>
              </ul>
              <ul className="nav__item footer__item">
                <NavLink to="/contacts" className="nav__link">
                  contacts
                </NavLink>
              </ul>
              <ul className="nav__item footer__item">
                <NavLink to="/rights" className="nav__link">
                  rights
                </NavLink>
              </ul>
            </li>
          </nav>

          {backToTopIsVisible && (
            <div className="footer__back">
              <p className="footer__back-text">Back to top</p>
              <button
                type="button"
                className="footer__back-link"
                aria-label="Back to top"
                onClick={scrollToTop}
              />
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
