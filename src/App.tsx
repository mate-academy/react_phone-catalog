import { useEffect, useMemo, useState } from 'react';
import {
  Link, NavLink, Outlet, ScrollRestoration, useLocation,
} from 'react-router-dom';
import cn from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useCart } from './context/CartContext';
import { useFavourites } from './context/FavouritesContext';
import { Logo } from './components/Logo/Logo';
import { Navbar } from './components/Navbar';
import { Search } from './components/Search';
import './App.scss';
import { Sidebar } from './components/Sidebar';

const App = () => {
  const location = useLocation();
  const isSearch = useMemo(() => {
    return location.pathname === '/phones'
    || location.pathname === '/tablets'
    || location.pathname === '/accessories'
    || location.pathname === '/favorites';
  }, [location.pathname]);
  const [isSmallSearch, setIsSmallSearch] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { totalQuantity } = useCart();
  const { favourites } = useFavourites();

  const handleSearch = () => {
    setIsSmallSearch(currState => !currState);
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    setIsSidebarOpen(false);
    setIsSmallSearch(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('lock-scroll');
    } else {
      document.body.classList.remove('lock-scroll');
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isSmallSearch) {
      const search = document.querySelector('.Search__input') as HTMLElement;

      search.focus();
    }
  }, [isSmallSearch]);

  return (
    <div className="App">
      <ScrollRestoration />
      <header className="header header--desktop">
        <div className="header__wrapper header__wrapper--left">
          <Logo />

          <div className="header__nav">
            <Navbar />
          </div>
        </div>

        <div className="header__wrapper">
          {!!isSearch && (
            <>
              <div className="search">
                <Search key={location.pathname} />
              </div>
              <button
                type="button"
                aria-label="Search"
                className="icon icon--search"
                onClick={handleSearch}
              />
            </>
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

          <button
            className="icon icon--menu"
            type="button"
            aria-label="menu"
            onClick={() => setIsSidebarOpen(currState => !currState)}
          >
            <div className="icon__lines">
              <span className="icon__line" />
              <span className={cn('icon__line', {
                'icon__line--short': isSidebarOpen,
              })}
              />
              <span className="icon__line" />
            </div>
          </button>

          <TransitionGroup>
            {isSmallSearch && (
              <CSSTransition
                key={0}
                timeout={300}
                classNames="search-small"
              >
                <div className="search search--small">
                  <Search />
                </div>
              </CSSTransition>
            )}
          </TransitionGroup>
        </div>
      </header>

      <Sidebar isSidebarOpen={isSidebarOpen} />

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
          <Link
            to="https://github.com/akozlovska/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
            className="footer__link"
          >
            Github
          </Link>
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
