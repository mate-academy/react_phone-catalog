import styles from './Header.module.scss';

import { NavLinks } from '../NavLinks/NavLinks';
import { Icon } from '../Icon/Icon';
import { LogoHeader } from '../LogoHeader/LogoHeader';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Container } from '../Container/Container';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const activePath = (indicator: string) =>
    location.pathname.includes(indicator);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

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
          <Icon
            modificator={isMenuOpen ? 'close' : 'menu'}
            onClick={toggleMenu}
          />
          <Icon modificator="cart" />
          <Icon modificator="favourites" count={5} />
        </div>
      </div>
      {isMenuOpen && (
        <div className={styles.header__menu}>
          <Container>
            <ul className={styles['header__menu-list']}>
              <NavLinks />
            </ul>
          </Container>
          <div className={styles['header__menu-indicators']}>
            <div
              className={classNames(
                styles['header__menu-indicator'],
                styles['header__menu-indicator--favourites'],
                {
                  [styles['header__menu-indicator--active']]:
                    activePath('favourites'),
                },
              )}
            ></div>
            <div
              className={classNames(
                styles['header__menu-indicator'],
                styles['header__menu-indicator--cart'],
                {
                  [styles['header__menu-indicator--active']]:
                    activePath('cart'),
                },
              )}
            ></div>
          </div>
        </div>
      )}
    </header>
  );
};
