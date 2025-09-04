import React, { useState } from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useCartState } from '../../contexts/CartContext';
import { Menu } from '../../components/Menu/Menu';

export const Header = () => {
  const { cartCount, favCount } = useCartState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActiveLinks = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.header__navListLink, {
      [styles.isActiveLink]: isActive,
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <NavLink className={styles.header__navLogoLink} to="/">
          <img
            className={styles.header__navLogo}
            src="icons/logo.svg"
            alt="Logotype"
          />
        </NavLink>

        <ul className={styles.header__navList}>
          <li className={styles.header__navListItem}>
            <NavLink to="/" className={isActiveLinks}>
              home
            </NavLink>
          </li>
          <li className={styles.header__navListItem}>
            <NavLink to="phones" className={isActiveLinks}>
              Phones
            </NavLink>
          </li>
          <li className={styles.header__navListItem}>
            <NavLink to="tablets" className={isActiveLinks}>
              tablets
            </NavLink>
          </li>
          <li className={styles.header__navListItem}>
            <NavLink to="accessories" className={isActiveLinks}>
              accessories
            </NavLink>
          </li>
        </ul>

        <div className={styles.header__links}>
          <NavLink
            className={({ isActive }) => {
              return classNames(styles.header__link, styles.header__linkLike, {
                [styles.isActiveLink]: isActive,
              });
            }}
            to="/favourites"
          >
            {favCount > 0 && (
              <span className={styles.header__likeCount}>{favCount}</span>
            )}
          </NavLink>

          <NavLink
            className={({ isActive }) => {
              return classNames(styles.header__link, styles.header__linkBag, {
                [styles.isActiveLink]: isActive,
              });
            }}
            to="/cart"
          >
            {cartCount > 0 && (
              <span className={styles.header__bagCount}>{cartCount}</span>
            )}
          </NavLink>
        </div>

        <button
          className={classNames(styles.header__menu, {
            [styles.header__menuOpen]: isMenuOpen,
          })}
          type="button"
          onClick={toggleMenu}
        ></button>

        <Menu isOpen={isMenuOpen} closeMenu={closeMenu} />
      </nav>
    </header>
  );
};
