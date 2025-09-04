import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';
import React from 'react';
import classNames from 'classnames';
import { useCartState } from '../../contexts/CartContext';

type Props = {
  isOpen: boolean;
  closeMenu: () => void;
};

export const Menu: React.FC<Props> = ({ isOpen, closeMenu }) => {
  const body = document.getElementById('body') as HTMLElement;
  const { favCount, cartCount } = useCartState();

  const activeLink = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.menu__navLink, {
      [styles.menu__navLinkActive]: isActive,
    });
  };

  if (isOpen) {
    body.classList.add('lock');
  } else {
    body.classList.remove('lock');
  }

  return (
    <aside className={classNames(styles.menu, { [styles.menuOpen]: isOpen })}>
      <nav className={styles.menu__nav}>
        <div className={styles.menu__top}>
          <NavLink onClick={closeMenu} to="/">
            <img
              className={styles.menu__logo}
              src="icons/logo.svg"
              alt="Logotype"
            />
          </NavLink>

          <button
            type="button"
            onClick={closeMenu}
            className={styles.menu__close}
          ></button>
        </div>

        <ul className={styles.menu__list}>
          <li className={styles.menu__listItem}>
            <NavLink className={activeLink} onClick={closeMenu} to="/">
              Home
            </NavLink>
          </li>
          <li className={styles.menu__listItem}>
            <NavLink className={activeLink} onClick={closeMenu} to="/phones">
              Phones
            </NavLink>
          </li>
          <li className={styles.menu__listItem}>
            <NavLink className={activeLink} onClick={closeMenu} to="/tablets">
              Tablets
            </NavLink>
          </li>
          <li className={styles.menu__listItem}>
            <NavLink
              className={activeLink}
              onClick={closeMenu}
              to="/accessories"
            >
              Accessories
            </NavLink>
          </li>
        </ul>

        <div className={styles.menu__links}>
          <NavLink
            onClick={closeMenu}
            to="/favourites"
            className={({ isActive }) => {
              return classNames(styles.menu__link, styles.menu__linkLike, {
                [styles.menu__linkActive]: isActive,
              });
            }}
          >
            {favCount > 0 && (
              <span className={classNames(styles.menu__count)}>{favCount}</span>
            )}
          </NavLink>
          <NavLink
            onClick={closeMenu}
            to="/cart"
            className={({ isActive }) => {
              return classNames(styles.menu__link, styles.menu__linkAdd, {
                [styles.menu__linkActive]: isActive,
              });
            }}
          >
            {cartCount > 0 && (
              <span className={classNames(styles.menu__count)}>
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};
