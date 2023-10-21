import './App.scss';

import {
  Link,
  NavLink,
  Outlet,
  useLocation,
} from 'react-router-dom';
import classNames from 'classnames';
import { useContext } from 'react';
import { Category } from './types/Category';
import { Search } from './components/Search';
import { CartContext } from './contexts/CartContext';

const menuItems = [
  'home',
  ...Object.values(Category),
];

export const App: React.FC = () => {
  const location = useLocation();
  const { totalQuantity } = useContext(CartContext);

  const getPageName = () => {
    const index = location.pathname.lastIndexOf('/');

    return location.pathname.slice(index + 1) as Category;
  };

  const isSearchShown = Object.values(Category).includes(getPageName());
  const isCartOpened = location.pathname.includes('cart');

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <div className="header__content">
            <Link to="/" className="logo header__logo">Logo</Link>

            {!isCartOpened && (
              <nav className="nav">
                <ul className="nav__list">
                  {menuItems.map(item => (
                    <li key={item} className="nav__item">
                      <NavLink
                        to={item === 'home' ? '/' : item}
                        className={
                          ({ isActive }) => classNames('nav__link', {
                            'nav__link--active': isActive,
                          })
                        }
                      >
                        {item}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className="header__stretchable-block" />

            {isSearchShown && (
              <div className="header__search-wrapper">
                <Search page={getPageName()} />
              </div>
            )}

            {!isCartOpened && (
              <NavLink
                to="favourites"
                className={({ isActive }) => classNames(
                  'nav__link',
                  'nav__link--favourites',
                  {
                    'nav__link--active': isActive,
                  },
                )}
              />
            )}

            <div className="App__cart-link-wrapper">
              <NavLink
                to="cart"
                className={({ isActive }) => classNames(
                  'nav__link',
                  'nav__link--cart',
                  {
                    'nav__link--active': isActive,
                  },
                )}
              />

              <div className="App__total-quantity">
                {totalQuantity}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="App__main">
        <div className="container container--main">
          <Outlet />
        </div>
      </main>

      <footer className="footer">
        <div className="container container--main">
          <div className="footer__content">
            <Link to="/" className="logo">Logo</Link>

            <nav className="nav footer__nav">
              <ul className="nav__list">
                <li className="nav__item">
                  <a
                    // eslint-disable-next-line max-len
                    href="https://github.com/denis-kononenko/react_phone-catalog"
                    className="nav__link"
                  >
                    Github
                  </a>
                </li>

                <li className="nav__item">
                  <a href="#contacts" className="nav__link">Contacts</a>
                </li>

                <li className="nav__item">
                  <a href="#rights" className="nav__link">Rights</a>
                </li>
              </ul>
            </nav>

            <button
              type="button"
              className="footer__to-top"
              onClick={() => window.scrollTo({
                top: 0, left: 0, behavior: 'smooth',
              })}
            >
              Back to top
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
