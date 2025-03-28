import React from 'react';
import styles from './SideBar.module.scss';

export const SideBar: React.FC = () => {
  return (
    <>
      <div className={`${styles.side_bar_container}`}>
        <nav className={`${styles.header_nav_container}`}>
          <div className={`${styles.header_nav_logo_container}`}>
            <a href="/">
              <img src="../../img/logo/logo-main.svg" alt="logo nice gadgets" />
            </a>
          </div>

          <div className={`${styles.header_nav_close_container}`}>
            <button className={`${styles.header_nav_close_button}`}>
              <img src="../../img/icons/close-icon.svg" alt="close burron" />
            </button>
          </div>
        </nav>

        <div className={`${styles.menu_container}`}>
          <a href="" className={`${styles.menu_link}`}>
            <p className={`${styles.menu_title}`}>home</p>
          </a>
          <a href="" className={`${styles.menu_link}`}>
            <p className={`${styles.menu_title}`}>phones</p>
          </a>
          <a href="" className={`${styles.menu_link}`}>
            <p className={`${styles.menu_title}`}>tablets</p>
          </a>
          <a href="" className={`${styles.menu_link}`}>
            <p className={`${styles.menu_title}`}>accessories</p>
          </a>
        </div>

        <div className={`${styles.footer_container}`}>
          <button className={`${styles.footer_button}`}>
            <img src="../../img/icons/card-default-like.svg" alt="like icon" />
          </button>
          <button className={`${styles.footer_button}`}>
            <img
              src="../../img/icons/shopping-bag.svg"
              alt="shopping bag icon"
            />
          </button>
        </div>
      </div>
    </>
  );
};
