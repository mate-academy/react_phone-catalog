import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './Header.module.css';
import { FavoritesIcon } from '../../utils/icons';

type Props = {
  cartCount?: number;
  favoritesCount?: number;
};

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  `navbar-item  ${isActive ? 'isActive' : ''}`;

export const Header: React.FC<Props> = ({
  cartCount = 0,
  // favoritesCount = 0,
}) => {
  return (
    <header className="header">
      <div className="container">
        <nav
          data-cy="nav"
          className="navbar is-fixed-top has-shadow"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <NavLink to="/" className="navbar-item">
              <img src="/img/logo.svg" alt="Logo" className={styles.logo} />
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
            <div className="actions">
              <FavoritesIcon count={0} />

              <NavLink to="/cart" className="icon" aria-label="Card">
                <img src="/img/cart.svg" alt="Cart" />
                {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
