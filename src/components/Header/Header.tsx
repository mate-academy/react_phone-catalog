import { Link, NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${styles.navLink} ${isActive ? styles.active : ''}`;

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/" className={styles.logo} aria-label="Phone Catalog home">
          <span className={styles.logoText}>NICE</span>
          <span className={styles.logoText}>GADGETS</span>
        </Link>

        <nav className={styles.navigation}>
          <NavLink to="/" end className={getNavLinkClass}>
            Home
          </NavLink>

          <NavLink to="/phones" className={getNavLinkClass}>
            Phones
          </NavLink>

          <NavLink to="/tablets" className={getNavLinkClass}>
            Tablets
          </NavLink>

          <NavLink to="/accessories" className={getNavLinkClass}>
            Accessories
          </NavLink>
        </nav>

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={getNavLinkClass}
            aria-label="Favorites"
          >
            <i className="far fa-heart" />
          </NavLink>

          <NavLink
            to="/cart"
            className={getNavLinkClass}
            aria-label="Shopping cart"
          >
            <i className="fas fa-shopping-cart" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
