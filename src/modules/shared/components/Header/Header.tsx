import styles from './Header.module.scss';

import { useContext, useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { NavLinks } from '../NavLinks';
import { LogoHeader } from '../LogoHeader';
import { Container } from '../Container';
import { IconLink } from '../IconLink';
import { FavoritesContext } from '../../_store/FavoritesProvider';
import { CartContext } from '../../_store/CartProvider';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const { favorites } = useContext(FavoritesContext);
  const { cart } = useContext(CartContext);

  const totalAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header
      className={classNames(styles.header, {
        [styles['header--menu-open']]: isMenuOpen,
      })}
    >
      <div className={styles.header__top}>
        <LogoHeader isMenuOpen={isMenuOpen} />
        <nav className={styles.header__nav}>
          <ul className={styles.header__navList}>
            <NavLinks />
          </ul>
        </nav>

        <div className={styles.header__icons}>
          <ThemeSwitcher />
          <IconLink modificator="favourites" count={favorites.length} />
          <IconLink modificator="cart" count={totalAmount} />
        </div>
        <div
          className={`${styles.header__icons} ${styles['header__icons--mobile']}`}
        >
          <ThemeSwitcher />
          {isMenuOpen ? (
            <IconLink modificator={'close'} onClick={toggleMenu} />
          ) : (
            <IconLink modificator={'menu'} onClick={toggleMenu} />
          )}
        </div>
      </div>
      {isMenuOpen && (
        <aside className={styles.header__menu}>
          <Container>
            <ul className={styles['header__menu-list']}>
              <NavLinks />
            </ul>
          </Container>
          <div className={styles['header__menu-indicators']}>
            <NavLink
              to="favourites"
              className={({ isActive }) =>
                classNames(
                  styles['header__menu-indicator'],
                  styles['header__menu-indicator--favourites'],
                  {
                    [styles['header__menu-indicator--active']]: isActive,
                  },
                )
              }
            />
            <NavLink
              to="cart"
              className={({ isActive }) =>
                classNames(
                  styles['header__menu-indicator'],
                  styles['header__menu-indicator--cart'],
                  {
                    [styles['header__menu-indicator--active']]: isActive,
                  },
                )
              }
            />
          </div>
        </aside>
      )}
    </header>
  );
};
