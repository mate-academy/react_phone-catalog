import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation, useSearchParams } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import { useCartContext } from '../context/CartContext';
import './Header.scss';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const { toggleTheme } = useTheme();
  const favoritesCount = favorites.length;

  const { count: cartCount } = useCartContext();

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('query') || '');

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const currentQuery = searchParams.get('query') || '';

      if (search.trim() === currentQuery) {
        return;
      }

      if (search.trim()) {
        params.set('query', search.trim());
      } else {
        params.delete('query');
      }

      setSearchParams(params);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search, searchParams, setSearchParams]);

  const showSearch =
    location.pathname.startsWith('/phones') ||
    location.pathname.startsWith('/tablets') ||
    location.pathname.startsWith('/accessories');

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <img src="/img/Logo.svg" alt="Nice Gadgets" />
        </Link>
        {showSearch && (
          <div className="header__search-wrapper">
            <input
              type="search"
              placeholder="Search..."
              className="header__search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search ? (
              <button
                className="header__search-icon"
                onClick={() => {
                  setSearch('');
                  setSearchParams(prev => {
                    const params = new URLSearchParams(prev);

                    params.delete('query');

                    return params;
                  });
                }}
                aria-label="Clear search"
              >
                <img
                  className="header__search-icon-img"
                  src="/img/icons/close.svg"
                  alt="Clear"
                />
              </button>
            ) : (
              <span className="header__search-icon">
                <img
                  className="header__search-icon-img"
                  src="/img/icons/search.svg"
                  alt="Search"
                />
              </span>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav className={`header__nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="header__menu">
            {[
              { to: '/', label: 'HOME', end: true },
              { to: '/phones', label: 'PHONES' },
              { to: '/tablets', label: 'TABLETS' },
              { to: '/accessories', label: 'ACCESSORIES' },
            ].map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile footer (inside burger menu) */}
          <div className="header__mobile-footer">
            <Link
              to="/favorites"
              className="header__mobile-tab"
              onClick={() => setIsMenuOpen(false)}
            >
              <img src="/img/icons/favourites.svg" alt="Favorites" />
            </Link>

            <Link
              to="/cart"
              className="header__mobile-tab"
              onClick={() => setIsMenuOpen(false)}
            >
              <img src="/img/icons/cart.svg" alt="Cart" />
            </Link>
          </div>
        </nav>

        <button onClick={toggleTheme}>🌙</button>

        {/* Icons + burger */}
        <div className="header__icons">
          <Link to="/favorites" className="icon">
            <img src="/img/icons/favourites.svg" alt="Favorites" />
            {favoritesCount > 0 && (
              <span className="icon__badge">{favoritesCount}</span>
            )}
          </Link>

          <Link to="/cart" className="icon">
            <img src="/img/icons/cart.svg" alt="Cart" />
            {cartCount > 0 && <span className="icon__badge">{cartCount}</span>}
          </Link>

          <button
            className="header__burger"
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <img
              src={isMenuOpen ? '/img/icons/close.svg' : '/img/icons/union.svg'}
              alt="Menu"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
