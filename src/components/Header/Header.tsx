import styles from './Header.module.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import menuIcon from '../../imgs/svg/menu-icon.svg';
import logo from '../../imgs/svg/Logo.svg';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.header__logo}>
        <img className={styles.header__logo_img} src={logo} alt="logo" />
      </NavLink>
      <button className={styles.header__menu} onClick={toggleMenu}>
        <img
          className={styles.header__logoImg}
          src={menuIcon}
          alt="menu-icon"
        />
      </button>
      <BurgerMenu isOpen={isMenuOpen} onClose={toggleMenu} />
    </header>
  );
};
