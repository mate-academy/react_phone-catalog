import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from '../Menu/Menu';
import { useAppSelector } from '../../app/hooks';
import { selectFavoritesCount } from '../../features/favorites';
import { selectTotalQuantity } from '../../features/cart';
import { useTheme } from '../../context/ThemeContext';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/phones', label: t('phones') },
    { to: '/tablets', label: t('tablets') },
    { to: '/accessories', label: t('accessories') },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const favoritesCount = useAppSelector(selectFavoritesCount);
  const cartCount = useAppSelector(selectTotalQuantity);

  return (
    <header className="header">
      <Link to="/">
        <img src="./img/logo.png" alt="logo" className="header__logo" />
      </Link>

      <nav className="header__nav">
        <ul className="header__nav-list">
          {navLinks.map(link => (
            <li key={link.to} className="header__nav-list-item">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? // eslint-disable-next-line
                      'header__nav-list-item-link header__nav-list-item-link--active'
                    : 'header__nav-list-item-link'
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header__icons">
        <span
          className={cn('language-icon', {
            'language-icon--switch': i18n.language === 'ua',
          })}
          onClick={() =>
            i18n.changeLanguage(i18n.language === 'en' ? 'ua' : 'en')
          }
        />
        <span
          className={cn('theme-icon', { 'theme-icon--dark': theme === 'dark' })}
          onClick={() => toggleTheme()}
        />
        <span className="menu-icon" onClick={() => setIsMenuOpen(true)} />
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? 'header__icon-link header__icon-link--active'
              : 'header__icon-link'
          }
        >
          <span className="fav-icon" />
          {favoritesCount > 0 && (
            <span className="header__icon-counter">{favoritesCount}</span>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? 'header__icon-link header__icon-link--active'
              : 'header__icon-link'
          }
        >
          <span className="cart-icon" />
          {cartCount > 0 && (
            <span className="header__icon-counter">{cartCount}</span>
          )}
        </NavLink>
      </div>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};
