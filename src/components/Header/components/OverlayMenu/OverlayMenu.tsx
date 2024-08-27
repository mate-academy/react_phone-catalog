import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './OverlayMenu.module.scss';
import { OverlayMenuProps } from '../../../../types/OverlayMenu';

export const OverlayMenu: React.FC<OverlayMenuProps> = ({
  isMenuOpen,
  toggleIsMenuOpen,
  cartIconSrc,
  favoritesIconSrc,
}) => {
  return (
    <div
      className={classNames(styles.menuOverlay, {
        [styles.show]: isMenuOpen,
      })}
      aria-expanded={isMenuOpen}
    >
      <nav className={styles.nav} role="navigation">
        <NavLink
          to="/"
          onClick={toggleIsMenuOpen}
          className={({ isActive }) =>
            classNames(styles.item, { [styles.isActive]: isActive })
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/phones"
          onClick={toggleIsMenuOpen}
          className={({ isActive }) =>
            classNames(styles.item, { [styles.isActive]: isActive })
          }
        >
          Phones
        </NavLink>
        <NavLink
          to="/tablets"
          onClick={toggleIsMenuOpen}
          className={({ isActive }) =>
            classNames(styles.item, { [styles.isActive]: isActive })
          }
        >
          Tablets
        </NavLink>
        <NavLink
          to="/accessories"
          onClick={toggleIsMenuOpen}
          className={({ isActive }) =>
            classNames(styles.item, { [styles.isActive]: isActive })
          }
        >
          Accessories
        </NavLink>
      </nav>
      <div className={styles.actions}>
        <NavLink
          to="/favorites"
          onClick={toggleIsMenuOpen}
          className={({ isActive }) =>
            classNames(styles.action, { [styles.isActive]: isActive })
          }
        >
          <div className={styles.actionIcon}>
            <img src={favoritesIconSrc} alt="Favorites" />
          </div>
        </NavLink>
        <NavLink
          to="/cart"
          onClick={toggleIsMenuOpen}
          className={({ isActive }) =>
            classNames(styles.action, { [styles.isActive]: isActive })
          }
        >
          <div className={styles.actionIcon}>
            <img src={cartIconSrc} alt="Cart" className={styles.icon} />
          </div>
        </NavLink>
      </div>
    </div>
  );
};
