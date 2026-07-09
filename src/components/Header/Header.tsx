import React, { useState } from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { Icon } from '../Icon';
import { HeaderNav } from '../HeaderNav/HeaderNav';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

export const Header = () => {
  const [isBurgerMenu, setIsBurgerMenu] = useState<boolean>(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__container}>
          <div className={styles.header__logo}>
            <NavLink to="/">
              <Icon name="logo" className={styles.logo} />
            </NavLink>
          </div>

          <HeaderNav />

          <div className={styles.header__burger}>
            <div
              className={styles.header__burger__menu}
              onClick={() => {
                setIsBurgerMenu(!isBurgerMenu);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <Icon name={isBurgerMenu ? 'close' : 'menu'} />
            </div>
          </div>
        </div>
      </header>

      <BurgerMenu
        isBurgerMenu={isBurgerMenu}
        onClose={() => setIsBurgerMenu(false)}
      />
    </>
  );
};
