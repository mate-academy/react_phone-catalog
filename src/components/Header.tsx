import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

import './Header.scss';

type IconName = 'menu' | 'close' | 'heart' | 'bag' | 'sun' | 'moon';

const Icon = ({ name }: { name: IconName }) => {
  const commonProps = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  switch (name) {
    case 'menu':
      return (
        <svg {...commonProps}>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      );

    case 'close':
      return (
        <svg {...commonProps}>
          <path d="m18 6-12 12M6 6l12 12" />
        </svg>
      );

    case 'heart':
      return (
        <svg {...commonProps}>
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
        </svg>
      );

    case 'bag':
      return (
        <svg {...commonProps}>
          <path d="M5 8h14l1 13H4L5 8Z" />
          <path d="M9 9V6a3 3 0 0 1 6 0v3" />
        </svg>
      );

    case 'sun':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
      );

    case 'moon':
      return (
        <svg {...commonProps}>
          <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
        </svg>
      );
  }
};

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const { state: cart } = useCart();
  const { state: favorites } = useFavorites();
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const queryFromUrl = searchParams.get('query') || '';

  const [query, setQuery] = useState(queryFromUrl);
  const [menuOpen, setMenuOpen] = useState(false);

  const showSearch = [
    '/phones',
    '/tablets',
    '/accessories',
  ].includes(location.pathname);

  const cartCount = cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const favoritesCount = favorites.items.length;

  useEffect(() => {
    setQuery(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    if (!showSearch) {
      return;
    }

    const timer = window.setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);

      if (query.trim()) {
        newParams.set('query', query.trim());
      } else {
        newParams.delete('query');
      }

      if (newParams.toString() !== searchParams.toString()) {
        setSearchParams(newParams, { replace: true });
      }
    }, 500);

    return () => window.clearTimeout(timer);
  }, [query, searchParams, setSearchParams, showSearch]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const navItems = [
    { label: 'HOME', to: '/' },
    { label: t('phones'), to: '/phones' },
    { label: t('tablets'), to: '/tablets' },
    { label: t('accessories'), to: '/accessories' },
  ];

  const logo = (
    <Link
      to="/"
      className="header__logo"
      aria-label="Nice Gadgets — Home"
    >
      <img
        src={`${import.meta.env.BASE_URL}favicon.png`}
        alt=""
        className="header__logo-image"
      />
      <span>NICE GADGETS</span>
    </Link>
  );

  const search = showSearch ? (
    <div className="header__search">
      <input
        type="search"
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder={t('search')}
        aria-label={t('search')}
      />
    </div>
  ) : null;

  const themeButton = (
    <button
      type="button"
      onClick={toggleTheme}
      className="header__icon-button"
      aria-label={theme === 'light' ? 'Enable dark theme' : 'Enable light theme'}
      title={theme === 'light' ? 'Dark theme' : 'Light theme'}
    >
      <Icon name={theme === 'light' ? 'moon' : 'sun'} />
    </button>
  );

  const favoritesLink = (
    <Link
      to="/favorites"
      className="header__icon-button header__icon-link"
      aria-label={`${t('favorites')}${favoritesCount ? ` (${favoritesCount})` : ''}`}
    >
      <Icon name="heart" />
      {favoritesCount > 0 && (
        <span className="header__count">{favoritesCount}</span>
      )}
    </Link>
  );

  const cartLink = (
    <Link
      to="/cart"
      className="header__icon-button header__icon-link"
      aria-label={`${t('cart')}${cartCount ? ` (${cartCount})` : ''}`}
    >
      <Icon name="bag" />
      {cartCount > 0 && (
        <span className="header__count">{cartCount}</span>
      )}
    </Link>
  );

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__mobile">
          {logo}

          <button
            type="button"
            className="header__icon-button header__menu-button"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" />
          </button>
        </div>

        <div className="header__tablet">
          {logo}

          <nav className="header__categories" aria-label="Main navigation">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={
                  location.pathname === item.to
                    ? 'header__category header__category--active'
                    : 'header__category'
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {search}

          <div className="header__actions">
            {themeButton}
            {favoritesLink}
            {cartLink}
          </div>
        </div>

        <div className="header__desktop">
          {logo}

          <nav className="header__categories" aria-label="Main navigation">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={
                  location.pathname === item.to
                    ? 'header__category header__category--active'
                    : 'header__category'
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {search}

          <div className="header__actions">
            {themeButton}
            {favoritesLink}
            {cartLink}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          className="header__overlay"
          onClick={event => {
            if (event.target === event.currentTarget) {
              setMenuOpen(false);
            }
          }}
        >
          <section
            className="header__drawer"
            id="mobile-navigation"
            aria-label="Mobile navigation"
          >
            <div className="header__drawer-top">
              {logo}

              <button
                type="button"
                className="header__icon-button"
                aria-label="Close navigation menu"
                onClick={() => setMenuOpen(false)}
              >
                <Icon name="close" />
              </button>
            </div>

            {search}

            <nav className="header__mobile-categories">
              {navItems.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={
                    location.pathname === item.to
                      ? 'header__mobile-category header__mobile-category--active'
                      : 'header__mobile-category'
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="header__drawer-bottom">
              {themeButton}
              {favoritesLink}
              {cartLink}
            </div>
          </section>
        </div>
      )}
    </header>
  );
};
