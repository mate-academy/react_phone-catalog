import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.scss';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Phones', to: '/phones' },
  { label: 'Tablets', to: '/tablets' },
  { label: 'Accessories', to: '/accessories' },
];

export const Header = () => (
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
        <a className={styles.action} href="#" aria-label="Favorites">
          <img src="/img/heart.svg" alt="Favorites" />
        </a>
        <a className={styles.action} href="#" aria-label="Cart">
          <img src="/img/shopping_cart.svg" alt="Cart" />
        </a>
      </div>

      <button className={styles.burger} type="button" aria-label="Menu">
        <img src="/img/burger_menu.svg" alt="Menu" />
      </button>
    </div>
  </header>
);
