import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { NavMenu } from './NavMenu';

export const Header: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleBurgerClick = () => setIsOpenMenu(open => !open);
  const handleMenuClose = () => setIsOpenMenu(false);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.header__logo} onClick={handleMenuClose}>
        <img
          src="./img/Logo.png"
          alt="Nice Gadgets"
          className={styles.header__logoImg}
        />
      </Link>
      <NavMenu
        isOpenMenu={false}
        handleMenuClose={handleMenuClose}
        type="tablet"
      />
      <button
        className={styles.header__button}
        onClick={handleBurgerClick}
        aria-label={isOpenMenu ? 'Close menu' : 'Open menu'}
      >
        <img
          className={styles.header__icon}
          src={isOpenMenu ? './icons/Close.svg' : './icons/Menu.svg'}
          alt={isOpenMenu ? 'Close menu' : 'Open menu'}
          height={16}
        />
      </button>
      <NavMenu
        isOpenMenu={isOpenMenu}
        handleMenuClose={handleMenuClose}
        type="mobile"
      />
    </header>
  );
};
