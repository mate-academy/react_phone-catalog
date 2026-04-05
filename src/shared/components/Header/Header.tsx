import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import React from 'react';
import { useState, useEffect } from 'react';

type Props = {
  cartCount: number;
  favoritesCount: number;
};

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

const getNavLinkClassMenu = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.menu__link} ${styles.active}` : styles.menu__link;

export const Header: React.FC<Props> = ({ cartCount, favoritesCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.containner}>
        <div className={styles.left}>
          <NavLink to="/" className={styles.logo}>
            <img src="./img/logo.png" alt="Nice Gadgets" />
          </NavLink>
          <nav className={styles.nav}>
            <NavLink to="/" end className={getNavLinkClass}>
              HOME
            </NavLink>
            <NavLink to="/phones" className={getNavLinkClass}>
              PHONES
            </NavLink>
            <NavLink to="/tablets" className={getNavLinkClass}>
              TABLETS
            </NavLink>
            <NavLink to="/accessories" className={getNavLinkClass}>
              ACCESSORIES
            </NavLink>
          </nav>
          <div className={styles.button}>
            <button
              onClick={() => setIsMenuOpen(true)}
              className={styles.burger}
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `${styles.iconLink} ${isActive ? styles.active : ''}`
          }
          aria-label="Favorites"
        >
          <img src="./img/heart.svg" alt="heart" />
          {favoritesCount > 0 && (
            <span className={styles.badge}>{favoritesCount}</span>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${styles.iconLink} ${isActive ? styles.active : ''}`
          }
          aria-label="Cart"
        >
          <img src="./img/basket.png" alt="basket" />
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </NavLink>
      </div>
      {isMenuOpen && (
        <div className={styles.menu}>
          <div className={styles.menuHeader}>
            <NavLink
              to="/"
              className={styles.logo}
              onClick={() => setIsMenuOpen(false)}
            >
              <img src="./img/logo.png" alt="Nice Gadgets" />
            </NavLink>

            <button
              onClick={() => setIsMenuOpen(false)}
              className={styles.close}
            >
              ✕
            </button>
          </div>

          <nav className={styles.menuNav}>
            <NavLink
              to="/"
              end
              className={({ isActive }) => getNavLinkClassMenu({ isActive })}
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </NavLink>
            <NavLink
              to="/phones"
              className={getNavLinkClassMenu}
              onClick={() => setIsMenuOpen(false)}
            >
              PHONES
            </NavLink>
            <NavLink
              to="/tablets"
              className={getNavLinkClassMenu}
              onClick={() => setIsMenuOpen(false)}
            >
              TABLETS
            </NavLink>
            <NavLink
              to="/accessories"
              className={getNavLinkClassMenu}
              onClick={() => setIsMenuOpen(false)}
            >
              ACCESSORIES
            </NavLink>
          </nav>

          <div className={styles.menuFooter}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `${styles.iconLink} ${isActive ? styles.active : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <img src="/img/heart.svg" alt="heart" />
              {favoritesCount > 0 && (
                <span className={styles.badge}>{favoritesCount}</span>
              )}
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${styles.iconLink} ${isActive ? styles.active : ''}`
              }
              aria-label="Cart"
              onClick={() => setIsMenuOpen(false)}
            >
              <img src="./img/basket.png" alt="basket" />
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
