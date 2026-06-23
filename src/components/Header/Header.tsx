import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src="img/icons/logo-top.png" alt="Logo" />
      </Link>

      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Phones
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Tablets
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link to="/favorites" className={styles.actionLink}>
            <img
              src="img/icons/favorite.png"
              alt="Favorites"
              className={styles.icon}
            />
          </Link>
          <Link to="/cart" className={styles.actionLink}>
            <img
              src="img/icons/cart.png"
              alt="Shopping Cart"
              className={styles.icon}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
