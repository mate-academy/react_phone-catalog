import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

import './Header.scss';

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  const { state: cart } = useCart();
  const { state: favorites } = useFavorites();
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const queryFromUrl = searchParams.get('query') || '';

  const [query, setQuery] = useState(queryFromUrl);

  const showSearch =
    location.pathname === '/phones' ||
    location.pathname === '/tablets' ||
    location.pathname === '/accessories';

  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const favoritesCount = favorites.items.length;

  useEffect(() => {
    setQuery(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    if (!showSearch) {
      return;
    }

    const timer = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);

      if (query.trim()) {
        newParams.set('query', query.trim());
      } else {
        newParams.delete('query');
      }

      setSearchParams(newParams);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, searchParams, setSearchParams, showSearch]);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img
            src={`${import.meta.env.BASE_URL}favicon.png`}
            alt="Phone Catalog"
            className="header__logo-image"
          />

          <span>{t('logo')}</span>
        </Link>

        <nav className="header__categories">
          <Link to="/phones">{t('phones')}</Link>

          <Link to="/tablets">{t('tablets')}</Link>

          <Link to="/accessories">{t('accessories')}</Link>
        </nav>

        {showSearch && (
          <div className="header__search">
            <input
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder={t('search')}
              aria-label={t('search')}
            />
          </div>
        )}

        <nav className="header__nav">
          <button
            type="button"
            onClick={toggleTheme}
            className="header__theme-button"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <Link
            to="/favorites"
            className="header__link"
            aria-label={t('favorites')}
          >
            <span>♥</span>

            {favoritesCount > 0 && (
              <span className="header__count">{favoritesCount}</span>
            )}
          </Link>

          <Link to="/cart" className="header__link" aria-label={t('cart')}>
            <span>🛒</span>

            {cartCount > 0 && (
              <span className="header__count">{cartCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};
