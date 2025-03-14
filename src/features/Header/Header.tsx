/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

import { useState } from 'react';

import logo from '/img/Logo.svg';
import { Burger } from '../Burger';
import { NavIcon } from '../NavIcon';
import styles from './Header.module.scss';
import { BurgerIcon } from '../../shared/components/Icons/BurgerIcon';

const getClassName = (baseClass: string) =>
  function ({ isActive }: { isActive: boolean }) {
    return classNames(styles[baseClass], { [styles['is-active']]: isActive });
  };

const getLinkClass = getClassName('navbar--item');

export const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 639 });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink to="/" className={styles.navbarBrand}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </NavLink>
          {isMobile && (
            <BurgerIcon isMenuOpen={isMenuOpen} onClick={toggleMenu} />
          )}
          <div className={styles.navbarMenu}>
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>
            <NavLink to="phones" className={getLinkClass}>
              Phones
            </NavLink>
            <NavLink to="tablets" className={getLinkClass}>
              Tablets
            </NavLink>
            <NavLink to="accessories" className={getLinkClass}>
              Accessories
            </NavLink>
            <div className="navbar-end"></div>
          </div>
          <div className={styles.buttons}>
            <NavIcon icon="heart" link="favourites" />
            <NavIcon icon="cart" link="cart" />
          </div>
        </nav>
      </header>
      {isMobile && <Burger isMenuOpen={isMenuOpen} onClose={toggleMenu} />}
    </>
  );
};
