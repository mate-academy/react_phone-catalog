import React from 'react';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { CartIcon, HeartIcon, MenuIcon, CloseIcon } from '../Icons';
import { Category } from '../../../../types/Category';
import { useHeader } from './useHeader';

interface Props {
  categories: Category[];
  favoritesCount: number;
  cartCount: number;
}

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.nav__link, { [styles.active]: isActive });

const getActionLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.actions__link, { [styles.active]: isActive });

export const Header: React.FC<Props> = ({
  categories,
  favoritesCount,
  cartCount,
}) => {
  const { navLinks, isMenuOpen, toggleMenu, closeMenu } = useHeader(categories);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink
          to="/"
          className={styles.logo}
          aria-label="Go to home page"
          onClick={closeMenu}
        >
          <img
            src="img/logo.png"
            alt="Nice Gadgets"
            className={styles.logoImage}
          />
        </NavLink>

        <nav
          className={classNames(styles.nav, {
            [styles.menuOpen]: isMenuOpen,
          })}
        >
          {navLinks.map(({ title, path, isEnd }) => (
            <NavLink
              key={path}
              to={path}
              end={isEnd}
              className={getNavLinkClass}
              onClick={closeMenu}
            >
              {title}
            </NavLink>
          ))}
        </nav>

        <div className={styles.rightBlock}>
          <div
            className={classNames(styles.actions, {
              [styles.menuOpen]: isMenuOpen,
            })}
          >
            <NavLink
              to="/favorites"
              className={getActionLinkClass}
              onClick={closeMenu}
              aria-label="Favorites"
            >
              <HeartIcon />
              {favoritesCount > 0 && (
                <span className={styles.badge}>{favoritesCount}</span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={getActionLinkClass}
              onClick={closeMenu}
              aria-label="Cart"
            >
              <CartIcon />
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </NavLink>
          </div>

          <button
            className={styles.menuToggle}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
};
