import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__container">
        {/* Логотип */}
        <Link to="/" className="header__logo">
          <img src="/img/Logo.svg" alt="Nice Gadgets" />
        </Link>

        {/* Навигация */}
        <nav className={`header__nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
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

          <div className="header__mobile-footer">
            <Link to="/favorites" onClick={() => setIsMenuOpen(false)}>
              <img src="/img/icons/favourites.svg" alt="Favorites" />
            </Link>

            <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
              <img src="/img/icons/cart.svg" alt="Cart" />
            </Link>
          </div>
        </nav>

        {/* Иконки справа */}
        <div className="header__icons">
          <Link to="/favorites" className="icon">
            <img src="/img/icons/favourites.svg" alt="Favorites" />
          </Link>

          <Link to="/cart" className="icon">
            <img src="/img/icons/cart.svg" alt="Cart" />
          </Link>

          {/* Бургер — только на мобильных */}
          <button
            className="header__burger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <img src="/img/icons/close.svg" alt="Close menu" />
            ) : (
              <img src="/img/icons/union.svg" alt="Menu" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
