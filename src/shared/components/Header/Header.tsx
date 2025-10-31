import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { IconButton } from '../IconButton/IconButton';

const menuItems = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const Header = () => {
  // Тут підключаєш свій контекст або redux для cart/favorites
  const cart = [
    /* дані Cart */
  ];
  const favorites = [
    /* дані Favorites */
  ];

  return (
    <header className={styles.header}>
      {/* Логотип */}
      <div className={styles.logo}>
        <NavLink to="/">
          <img
            className={styles.logo_img}
            src="/logo/img.png"
            alt="Nice Gadgets logo"
          />
        </NavLink>
      </div>

      {/* Меню */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {menuItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Іконки Favorites / Cart */}
      <div className={styles.actions}>
        <IconButton
          to="/favorites"
          src="/icons/heard.svg"
          alt="Favorites"
          count={favorites.length}
        />
        <IconButton
          to="/cart"
          src="/icons/basket.svg"
          alt="Cart"
          count={cart.length}
        />
      </div>
    </header>
  );
};
