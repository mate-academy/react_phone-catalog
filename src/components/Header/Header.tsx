import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useFavorites, useCart, useTheme } from '../../context';
import { LanguageSelect } from '../LanguageSelect';
import { Menu } from '../Menu';
import { ThemeToggle } from '../ThemeToggle';
import styles from './Header.module.scss';

const navItems = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.phones', to: '/phones' },
  { labelKey: 'nav.tablets', to: '/tablets' },
  { labelKey: 'nav.accessories', to: '/accessories' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { favorites } = useFavorites();
  const { totalItems } = useCart();
  const { theme } = useTheme();
  const language = i18n.language === 'en' ? 'en' : 'ua';
  const logoSrc = theme === 'dark' ? '/img/Logo_dark.svg' : '/img/Logo.svg';

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logo} to="/">
          <img src={logoSrc} alt={t('header.logoAlt')} />
        </Link>

        <nav className={styles.nav}>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                classNames(styles.navLink, { [styles.isActive]: isActive })
              }
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <div className={styles.language}>
            <LanguageSelect
              value={language}
              onChange={next => i18n.changeLanguage(next)}
            />
          </div>
          <div className={styles.theme}>
            <ThemeToggle />
          </div>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              classNames(styles.action, { [styles.isActive]: isActive })
            }
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
          >
            <img src="/img/shopping_cart.svg" alt={t('header.cartAlt')} />
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </NavLink>
        </div>

        <div className={styles.mobileActions}>
          <div className={styles.mobileLanguage}>
            <LanguageSelect
              value={language}
              onChange={next => i18n.changeLanguage(next)}
            />
          </div>
          <div className={styles.mobileTheme}>
            <ThemeToggle />
          </div>

          <button
            className={styles.burger}
            type="button"
            onClick={() => setIsMenuOpen(true)}
          >
            <img src="/img/burger_menu.svg" alt={t('header.menuAlt')} />
          </button>
        </div>
      </div>

      {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} />}
    </header>
  );
};
