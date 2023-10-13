import {
  Link, NavLink, Outlet, ScrollRestoration, useLocation,
} from 'react-router-dom';
import cn from 'classnames';
import { useCart } from './context/CartContext';
import { useFavourites } from './context/FavouritesContext';
import { Logo } from './components/Logo/Logo';
import { Navbar } from './components/Navbar';
import { Search } from './components/Search';
import './App.scss';

const App = () => {
  const location = useLocation();
  const isSearch = location.pathname === '/phones'
    || location.pathname === '/tablets'
    || location.pathname === '/accessories'
    || location.pathname === '/favorites';

  const { totalQuantity } = useCart();
  const { favourites } = useFavourites();

  return (
    <div className="App">
      <ScrollRestoration />
      <header className="header">
        <div className="header__wrapper header__wrapper--left">
          <Logo />
          <Navbar />
        </div>

        <div className="header__wrapper">
          {!!isSearch && (
            <Search key={location.pathname} />
          )}

          <NavLink
            to="favorites"
            className={({ isActive }) => cn('icon icon--favourites', {
              'icon--active': isActive,
            })}
          >
            {!!favourites.length && (
              <span className="icon__quantity">{favourites.length}</span>
            )}
          </NavLink>
          <NavLink
            to="cart"
            className={({ isActive }) => cn('icon icon--cart', {
              'icon--active': isActive,
            })}
          >
            {!!totalQuantity && (
              <span className="icon__quantity">{totalQuantity}</span>
            )}
          </NavLink>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="footer">
        <div className="footer__logo">
          <Logo />
        </div>

        <div className="footer__link-wrapper">
          <a
            href="https://github.com/akozlovska/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
            className="footer__link"
          >
            Github
          </a>
          <Link to="/contacts" className="footer__link">Contacts</Link>
          <Link to="/rights" className="footer__link">Rights</Link>
        </div>

        <div className="footer__button-wrapper">
          <p className="footer__button-text">Back to top</p>
          <button
            type="button"
            className="button button--arrow-up"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </div>
      </footer>
    </div>
  );
};

export default App;
