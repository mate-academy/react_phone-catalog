import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { useStore } from '../../context';
import { Menu } from '../Menu';

export const Header: React.FC = () => {
  const { cart, favorites } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favCount = favorites.length;

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.navLink, { [styles.isActive]: isActive });

  const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.iconLink, { [styles.isActive]: isActive });

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            <img
              src="img/logo.svg"
              alt="Nice Gadgets"
              className={styles.logoImg}
            />
          </Link>

          <nav className={styles.nav}>
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>
            <NavLink to="/phones" className={getLinkClass}>
              Phones
            </NavLink>
            <NavLink to="/tablets" className={getLinkClass}>
              Tablets
            </NavLink>
            <NavLink to="/accessories" className={getLinkClass}>
              Accessories
            </NavLink>
          </nav>
        </div>

        <div className={styles.right}>
          <NavLink to="/favorites" className={getIconLinkClass}>
            <div className={styles.iconWrapper}>
              <img
                src="img/icons/Favourites (Heart Like).svg"
                alt="Favorites"
                className={styles.icon}
              />
              {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
            </div>
          </NavLink>

          <NavLink to="/cart" className={getIconLinkClass}>
            <div className={styles.iconWrapper}>
              <img
                src="img/icons/Shopping bag (Cart).svg"
                alt="Cart"
                className={styles.icon}
              />
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </div>
          </NavLink>

          <button
            className={styles.burgerBtn}
            onClick={() => setIsMenuOpen(true)}
          >
            <img src="img/icons/Menu.svg" alt="Menu" />
          </button>
        </div>
      </header>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
