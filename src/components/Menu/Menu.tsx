import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useFavorites, useCart, useTheme } from '../../context';
import styles from './Menu.module.scss';

const navItems = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.phones', to: '/phones' },
  { labelKey: 'nav.tablets', to: '/tablets' },
  { labelKey: 'nav.accessories', to: '/accessories' },
];

interface Props {
  onClose: () => void;
}

export const Menu = ({ onClose }: Props) => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();
  const { totalItems } = useCart();
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? '/img/Logo_dark.svg' : '/img/Logo.svg';

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={styles.menu}>
      <header className={styles.header}>
        <Link className={styles.logo} to="/" onClick={onClose}>
          <img src={logoSrc} alt={t('header.logoAlt')} />
        </Link>

        <button className={styles.close} type="button" onClick={onClose}>
          <img src="/img/close_black.svg" alt="Close menu" />
        </button>
      </header>

      <nav className={styles.nav}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              classNames(styles.navLink, { [styles.isActive]: isActive })
            }
            onClick={onClose}
          >
            {t(item.labelKey)}
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            classNames(styles.action, { [styles.isActive]: isActive })
          }
          onClick={onClose}
        >
          <img src="/img/heart.svg" alt={t('header.favoritesAlt')} />
          {favorites.length > 0 && (
            <span className={styles.badge}>{favorites.length}</span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            classNames(styles.action, { [styles.isActive]: isActive })
          }
          onClick={onClose}
        >
          <img src="/img/shopping_cart.svg" alt={t('header.cartAlt')} />
          {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </NavLink>
      </div>
    </div>
  );
};
