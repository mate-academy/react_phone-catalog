import {
  Link,
  NavLink,
  useLocation,
  Outlet,
} from 'react-router-dom';
import classNames from 'classnames';
import './App.scss';
import { Search } from './components/Search';
import logo from './images/logo.svg';
import favoritesIcon from './images/favorites.svg';
import cartIcon from './images/cart.svg';
import arrowUp from './images/arrow-up.svg';
import { useAppSelector } from './app/hooks';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'nav__link',
  { 'active-link': isActive },
);

const getIconLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'header__icon',
  { 'active-link': isActive },
);

const App = () => {
  const { pathname, search } = useLocation();
  const { favorites } = useAppSelector(state => state.favorites);
  const { cart } = useAppSelector(state => state.cart);

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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
          {(pathname === '/phones'
            || pathname === '/tablets'
            || pathname === '/accessories'
            || pathname === '/favorites') && (
            <Search />
          )}

          {pathname !== '/cart' && (
            <NavLink to="/favorites" className={getIconLinkClass}>
              <img
                src={favoritesIcon}
                alt="favorites"
                className="header__image"
              />
              {favorites.length !== 0 && (
                <span className="header__count">
                  {favorites.length}
                </span>
              )}
            </NavLink>
          )}

          <NavLink
            to="/cart"
            className={getIconLinkClass}
            state={{ pathname, search }}
          >
            <img
              src={cartIcon}
              alt="cart"
              className="header__image"
            />
            {cart.length !== 0 && (
              <span className="header__count">
                {cart.length}
              </span>
            )}
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
              to="https://github.com/LiliiaDanylenko"
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
              onClick={handleScroll}
            >
              Back to top
            </Link>
            <Link
              to={{ pathname }}
              className="icon icon--back-to-top"
              onClick={handleScroll}
            >
              <img
                src={arrowUp}
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

export default App;
