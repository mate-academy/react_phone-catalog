import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import './Navbar.scss';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { SearchInput } from '../SearchInput';
import { ThemeContext } from '../../context/ThemeContext';

export const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const isCatalogPage = ['/phones', '/tablets', '/accessories'].includes(
    location.pathname,
  );

  const query = searchParams.get('query') || '';

  useEffect(() => {
    document.documentElement.style.overflow = isMenuOpen ? 'hidden' : '';

    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.documentElement.style.overflow = '';

      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="navbar">
        <div className="navbar__left">
          <NavLink to={'/'} className="navbar__logo">
            <img
              src={
                theme === 'dark'
                  ? '/img/icons/logo.svg'
                  : '/img/icons-light/logo-light.svg'
              }
              alt="Logo"
            />
          </NavLink>
          <nav className="navbar__nav">
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              Home
            </NavLink>
            <NavLink
              to={'/phones'}
              className={({ isActive }) =>
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              Phones
            </NavLink>
            <NavLink
              to={'/tablets'}
              className={({ isActive }) =>
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              Tablets
            </NavLink>
            <NavLink
              to={'/accessories'}
              className={({ isActive }) =>
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              Accessories
            </NavLink>
          </nav>
        </div>

        {isCatalogPage && isSearchOpen && (
          <SearchInput
            value={query}
            onClose={() => setIsSearchOpen(false)}
            onChange={newQuery => {
              const params = new URLSearchParams(searchParams);

              if (newQuery) {
                params.set('query', newQuery);
              } else {
                params.delete('query');
              }

              params.delete('page');

              setSearchParams(params);
            }}
          />
        )}

        <div className="navbar__right">
          {isCatalogPage && !isSearchOpen && (
            <button
              type="button"
              className="navbar__search-button"
              onClick={() => setIsSearchOpen(true)}
            >
              <img
                src={
                  theme === 'dark'
                    ? '/img/icons/search.svg'
                    : '/img/icons-light/search-light.svg'
                }
                alt="Search"
              />
            </button>
          )}
          <button type="button" className="navbar__theme" onClick={toggleTheme}>
            <img
              src={
                theme === 'dark'
                  ? '/img/icons/sun.svg'
                  : '/img/icons-light/moon.svg'
              }
              alt="Toggle theme"
            />
          </button>
          <NavLink
            to={'/favorites'}
            className={({ isActive }) =>
              isActive ? 'navbar__icon navbar__icon--active' : 'navbar__icon'
            }
          >
            <img
              src={
                theme === 'dark'
                  ? '/img/icons/favourites.svg'
                  : '/img/icons-light/favourites-light.svg'
              }
              alt="Favourites icon"
            />
            {favorites.length > 0 && (
              <span className="navbar__counter">{favorites.length}</span>
            )}
          </NavLink>
          <NavLink
            to={'/cart'}
            className={({ isActive }) =>
              isActive ? 'navbar__icon navbar__icon--active' : 'navbar__icon'
            }
          >
            <img
              src={
                theme === 'dark'
                  ? '/img/icons/cart.svg'
                  : '/img/icons-light/cart-light.svg'
              }
              alt="Shopping cart icon"
            />
            {cartQuantity > 0 && (
              <span className="navbar__counter">{cartQuantity}</span>
            )}
          </NavLink>

          <button
            type="button"
            className="navbar__burger"
            onClick={() => setIsMenuOpen(current => !current)}
          >
            <img
              src={
                isMenuOpen
                  ? theme === 'dark'
                    ? '/img/icons/close.svg'
                    : '/img/icons-light/close-light.svg'
                  : theme === 'dark'
                    ? '/img/icons/menu.svg'
                    : '/img/icons-light/menu-light.svg'
              }
              alt="Menu"
            />
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="navbar__mobile-menu">
          <nav className="navbar__mobile-nav">
            <NavLink
              to="/"
              className="navbar__mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/phones"
              className="navbar__mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Phones
            </NavLink>

            <NavLink
              to="/tablets"
              className="navbar__mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Tablets
            </NavLink>

            <NavLink
              to="/accessories"
              className="navbar__mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Accessories
            </NavLink>
          </nav>

          <div className="navbar__mobile-bottom">
            <NavLink
              to="/favorites"
              className="navbar__mobile-icon"
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src={
                  theme === 'dark'
                    ? '/img/icons/favourites.svg'
                    : '/img/icons-light/favourites-light.svg'
                }
                alt="Favorites"
              />
            </NavLink>

            <NavLink
              to="/cart"
              className="navbar__mobile-icon"
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src={
                  theme === 'dark'
                    ? '/img/icons/cart.svg'
                    : '/img/icons-light/cart-light.svg'
                }
                alt="Cart"
              />
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
