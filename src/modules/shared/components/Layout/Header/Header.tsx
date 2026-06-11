import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.isActive : ''} `;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <Link to="/">
            <img
              className={styles.logo}
              src="/img/icons/logo.svg"
              alt="Page Logo"
            />
          </Link>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <NavLink to="/" className={getLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/catalog/phones" className={getLinkClass}>
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink to="/catalog/tablets" className={getLinkClass}>
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink to="/catalog/accessories" className={getLinkClass}>
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
