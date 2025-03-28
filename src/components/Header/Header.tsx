import React from 'react';
import styles from './Header.module.scss';

// type Props = {
//   setSideBarVisible: (arg: boolean) => void;
// }

export const Header: React.FC = () => {
  return (
    <>
      <nav className={`${styles.header_nav_container}`}>
        <div className={`${styles.header_nav_logo_container}`}>
          <a href="/">
            <img src="../../img/logo/logo-main.svg" alt="logo nice gadgets" />
          </a>
        </div>

        <div className={`${styles.header_nav_burger_container}`}>
          <button className={`${styles.header_nav_burger_button}`}>
            <img src="../../img/icons/burger-menu-icon.svg" alt="burger menu" />
          </button>
        </div>
      </nav>

      <div className={`${styles.header_title_container}`}>
        <h1 className={`${styles.header_title}`}>
          Welcome to Nice Gadgets store!
        </h1>
      </div>
    </>
  );
};
