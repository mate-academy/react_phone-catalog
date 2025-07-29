import { FC, useEffect } from 'react';
import { navLinks } from '../../../constants/navLinks';
import cn from 'classnames';
import styles from './BurgerMenu.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { useGlobalState } from '../../../context/store';

export const BurgerMenu: FC = () => {
  const { isMenuOpen, toggleMenu, cart, favourites, theme } = useGlobalState();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleResize = () => {
      if (window.innerWidth > 640 && isMenuOpen) {
        toggleMenu();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen, toggleMenu]);

  return (
    <aside className={cn(styles.menu, { [styles.menuOpen]: isMenuOpen })}>
      <div className={styles.menuTop}>
        <Link to="/" className={styles.logoLink} onClick={toggleMenu}>
          <img
            src={
              theme === 'dark'
                ? '/img/icons/logo.svg'
                : '/img/icons/logo-light-theme.svg'
            }
            alt="logo"
            className={styles.logoImg}
          />
        </Link>

        <button onClick={toggleMenu} className={styles.buttonMenu}>
          <span
            className={cn(styles.iconClose, {
              [styles.iconCloseLight]: theme === 'light',
            })}
          ></span>
        </button>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navLinks.map(link => (
            <li key={link.title} className={styles.navItem}>
              <NavLink
                to={link.path}
                className={styles.navLink}
                onClick={toggleMenu}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.menuBottom}>
        <NavLink
          to="/favourites"
          className={styles.iconLink}
          onClick={toggleMenu}
        >
          <div className={styles.iconWrapper}>
            <span
              className={cn(styles.iconFavourite, {
                [styles.iconFavouriteLight]: theme === 'light',
              })}
            ></span>

            {favourites.length > 0 && (
              <span className={styles.itemsAmount}>{favourites.length}</span>
            )}
          </div>
        </NavLink>

        <NavLink to="/cart" className={styles.iconLink} onClick={toggleMenu}>
          <div className={styles.iconWrapper}>
            <span
              className={cn(styles.iconCart, {
                [styles.iconCartLight]: theme === 'light',
              })}
            ></span>

            {cart.length > 0 && (
              <span className={styles.itemsAmount}>{cart.length}</span>
            )}
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
