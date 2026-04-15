import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './Header.module.scss';
// import { FavoritesIcon } from '../../utils/icons';

type Props = {
  cartCount?: number;
  favoritesCount?: number;
};

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  `navbar-item  ${isActive ? 'has-background-white-lighter' : ''}`;

export const Header: React.FC<Props> = ({ cartCount = 0 }) => {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <nav
          data-cy="nav"
          className="navbar is-fixed-top has-shadow"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <NavLink to="/" className="navbar-item">
              <img src="img/logo.png" alt="Logo" className={styles.logo} />
            </NavLink>
            <NavLink to="/" className={getLinkClass}>
              HOME
            </NavLink>

            <NavLink to="/phones" className={getLinkClass}>
              PHONES
            </NavLink>

            <NavLink to="/tablets" className={getLinkClass}>
              TABLETS
            </NavLink>

            <NavLink
              to="/accessories"
              aria-current="page"
              className={getLinkClass}
            >
              ACCESSORIES
            </NavLink>
          </div>
        </nav>
        <div className={styles.actions}>
          {/* <FavoritesIcon count={0} /> */}

          <NavLink to="/cart" className={styles.icon} aria-label="Card">
            <img src="img/cart.png" alt="Cart" />
            <i className="fas fa-shopping-cart" />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
