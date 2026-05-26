import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

import logo from '../../api/img/Logo.png';

import heartIcon from '../../api/icons/heart.png';

import cartIcon from '../../api/icons/cart.png';

import burgerIcon from '../../api/buttoms/Menu.png';

import closeIcon from '../../api/buttoms/Close.png';

import { useGlobal } from '../CartContext/CartContext';

import React, { useState, useEffect } from 'react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/phones', label: 'Phones' },
  { path: '/tablets', label: 'Tablets' },
  { path: '/accessories', label: 'Accessories' },
];

export const Header: React.FC = () => {
  const { cart, favorites } = useGlobal();

  const [isOpen, setIsOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const favCount = favorites.length;

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = 'fixed';

      document.body.style.top = `-${scrollY}px`;

      document.body.style.width = '100%';

      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;

      document.body.style.position = '';

      document.body.style.top = '';

      document.body.style.width = '';

      document.body.style.overflow = originalStyle;

      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo} onClick={closeMenu}>
        <img src={logo} alt="Nice Gadgets logo" />
      </NavLink>

      <button className={styles.burger} onClick={() => setIsOpen(!isOpen)}>
        <img src={isOpen ? closeIcon : burgerIcon} alt="menu" />
      </button>

      <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            {navLinks.map(link => (
              <li key={link.path} className={styles.item}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                  }
                  onClick={closeMenu}
                  end={link.path === '/'}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? `${styles.actionItem} ${styles.active}`
                : styles.actionItem
            }
          >
            <div className={styles.iconWrapper}>
              <img src={heartIcon} alt="Favorites" className={styles.icon} />
              {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? `${styles.actionItem} ${styles.active}`
                : styles.actionItem
            }
          >
            <div className={styles.iconWrapper}>
              <img src={cartIcon} alt="Cart" className={styles.icon} />
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </div>
          </NavLink>
        </div>

        <div className={styles.mobileActions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? `${styles.actionItem} ${styles.active}`
                : styles.actionItem
            }
            onClick={closeMenu}
          >
            <div className={styles.iconWrapper}>
              <img src={heartIcon} alt="Favorites" />
              {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? `${styles.actionItem} ${styles.active}`
                : styles.actionItem
            }
            onClick={closeMenu}
          >
            <div className={styles.iconWrapper}>
              <img src={cartIcon} alt="Cart" />
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
