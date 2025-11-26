import { useState } from 'react';
import { Link } from 'react-router-dom';

// import { BurgerNavigation } from '../BurgerNavigation';
import { HeaderNavigation } from '../HeaderNavigation';

import close from '../../../public/img/Icons/close-icon.svg';
import menu from '../../../public/img/Icons/menu-icon.svg';
import logo from '../../../public/img/Icons/Logo.svg';

import styles from './Header.module.scss';

export const Header = () => {
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__container}>
          <div className={styles.header__logo}>
            <Link
              to="/"
              className={styles.header__link}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsBurgerMenu(false);
              }}
            >
              <img src={logo} alt="Company logo" className={styles.logo} />
            </Link>
          </div>

          <HeaderNavigation />

          <div
            className={styles.burger__menu}
            onClick={() => {
              setIsBurgerMenu(prev => !prev);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img
              src={isBurgerMenu ? close : menu}
              alt="menu icon"
              className={styles.icon}
            />
          </div>
        </div>
      </div>

      {/* <BurgerNavigation
        isBurgerMenu={isBurgerMenu}
        onClose={() => setIsBurgerMenu(false)}
      /> */}
    </>
  );
};
