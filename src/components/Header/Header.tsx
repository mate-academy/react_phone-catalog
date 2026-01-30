import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import { useFavorites } from '../../context';
import styles from './Header.module.scss';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Phones', to: '/phones' },
  { label: 'Tablets', to: '/tablets' },
  { label: 'Accessories', to: '/accessories' },
];

export const Header = () => {
  const { favorites } = useFavorites();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logo} to="/">
          <img src="/img/Logo.svg" alt="Nice Gadgets" />
        </Link>

        <nav className={styles.nav}>
          {navItems.map(item => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                classNames(styles.navLink, { [styles.isActive]: isActive })
              }
            >
              {item.label}
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
            <img src="/img/heart.svg" alt="Favorites" />
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </NavLink>
          <a className={styles.action} href="#">
            <img src="/img/shopping_cart.svg" alt="Cart" />
          </a>
        </div>

        <button className={styles.burger} type="button">
          <img src="/img/burger_menu.svg" alt="Menu" />
        </button>
      </div>
    </header>
  );
};
