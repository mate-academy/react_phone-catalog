import styles from './Header.module.scss';

import { NavLinks } from '../NavLinks';
import { LogoHeader } from '../LogoHeader';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Container } from '../Container';
import { NavLink, useLocation } from 'react-router-dom';
import { IconLink } from '../IconLink';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    setIsMenuOpen(false);
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
          <IconLink
            modificator={isMenuOpen ? 'close' : 'menu'}
            onClick={toggleMenu}
          />
          <IconLink modificator="cart" />
          <IconLink modificator="favourites" count={5} />
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
