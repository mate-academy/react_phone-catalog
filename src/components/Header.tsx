import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import './Header.scss';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const { toggleTheme } = useTheme();
  const count = favorites.length;

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <img src="/img/Logo.svg" alt="Nice Gadgets" />
        </Link>

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
            {count > 0 && <span className="icon__badge">{count}</span>}
          </Link>

          <Link to="/cart" className="icon">
            <img src="/img/icons/cart.svg" alt="Cart" />
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
