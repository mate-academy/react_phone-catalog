import React from 'react';
import cn from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectFavoritesCount } from '../../features/favorites';
import { selectTotalQuantity } from '../../features/cart';
import { useTranslation } from 'react-i18next';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Menu: React.FC<Props> = ({ isOpen, onClose }) => {
  const favoritesCount = useAppSelector(selectFavoritesCount);
  const cartCount = useAppSelector(selectTotalQuantity);

  const { t } = useTranslation();

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/phones', label: t('phones') },
    { to: '/tablets', label: t('tablets') },
    { to: '/accessories', label: t('accessories') },
  ];

  return (
    <div
      className={cn('menu-backdrop', { 'is-active': isOpen })}
      onClick={onClose}
    >
      <nav className={cn('menu', { 'menu--open': isOpen })}>
        <div className="menu__header">
          <Link to="/">
            <img src="./img/logo.png" alt="logo" className="menu__logo" />
          </Link>

          <div className="menu__icons">
            <span className="icon-close" onClick={onClose} />
          </div>
        </div>

        <ul className="menu__list">
          {navLinks.map(link => (
            <li key={link.to} className="menu__item">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  cn('menu__link', { 'menu__link--active': isActive })
                }
                onClick={onClose}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="menu__footer">
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              cn('menu__footer-link', { 'menu__footer-link--active': isActive })
            }
            onClick={onClose}
          >
            <span className="icon-fav" />
            {favoritesCount > 0 && (
              <span className="menu__footer-counter">{favoritesCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn('menu__footer-link', { 'menu__footer-link--active': isActive })
            }
            onClick={onClose}
          >
            <span className="icon-cart" />
            {cartCount > 0 && (
              <span className="menu__footer-counter">{cartCount}</span>
            )}
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
