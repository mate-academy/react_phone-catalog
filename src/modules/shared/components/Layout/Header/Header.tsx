import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <a href="/">
            <img
              className={styles.logo}
              src="/img/icons/logo.svg"
              alt="Page Logo"
            />
          </a>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <NavLink to="/" className={styles.link}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/catalog/phones" className={styles.link}>
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink to="/catalog/tablets" className={styles.link}>
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink to="/catalog/accessories" className={styles.link}>
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.icons}>
          <div>
            <Link
              className={styles.iconLink}
              to="/favorites"
              aria-label="Favorites"
            >
              <img src="/img/icons/favorites.svg" alt="Favorites" />
            </Link>
          </div>

          <div>
            <Link
              className={styles.iconLink}
              to="/shopping-bag"
              aria-label="Shopping bag"
            >
              <img src="/img/icons/shopping-bag.svg" alt="Shopping bag" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
