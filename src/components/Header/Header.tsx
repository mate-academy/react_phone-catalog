import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../../context';
import { useCart } from '../../context';
import styles from './Header.module.scss';

const navItems = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.phones', to: '/phones' },
  { labelKey: 'nav.tablets', to: '/tablets' },
  { labelKey: 'nav.accessories', to: '/accessories' },
];

export const Header = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();
  const { totalItems } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logo} to="/">
          <img src="/img/Logo.svg" alt={t('header.logoAlt')} />
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

        <button className={styles.burger} type="button">
          <img src="/img/burger_menu.svg" alt={t('header.menuAlt')} />
        </button>
      </div>
    </header>
  );
};
