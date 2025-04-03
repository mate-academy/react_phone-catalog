import React from 'react';
import styles from './SideBar.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  setActiveAside: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SideBar: React.FC<Props> = ({ setActiveAside }) => {
  return (
    <>
      <div className={`${styles.side_bar_container}`}>
        <nav className={`${styles.header_nav_container}`}>
          <div className={`${styles.header_nav_logo_container}`}>
            <a href="/">
              <img src="../../img/logo/logo-main.svg" alt="logo nice gadgets" />
            </a>
          </div>

          <div
            className={`${styles.header_nav_close_container}`}
            onClick={() => setActiveAside(false)}
          >
            <button className={`${styles.header_nav_close_button}`}>
              <img src="../../img/icons/close-icon.svg" alt="close burron" />
            </button>
          </div>
        </nav>

        <div className={`${styles.menu_container}`}>
          <NavLink
            to="/"
            className={`${styles.menu_link} ${styles.active_link}`}
            onClick={() => setActiveAside(false)}
          >
            <p className={`${styles.menu_title}`}>home</p>
          </NavLink>
          <NavLink
            to="/phones"
            className={`${styles.menu_link}`}
            onClick={() => setActiveAside(false)}
          >
            <p className={`${styles.menu_title}`}>phones</p>
          </NavLink>
          <NavLink
            to="/tablets"
            className={`${styles.menu_link}`}
            onClick={() => setActiveAside(false)}
          >
            <p className={`${styles.menu_title}`}>tablets</p>
          </NavLink>
          <NavLink
            to="/accessories"
            className={`${styles.menu_link}`}
            onClick={() => setActiveAside(false)}
          >
            <p className={`${styles.menu_title}`}>accessories</p>
          </NavLink>
        </div>

        <div className={`${styles.footer_container}`}>
          <button className={`${styles.footer_button}`}>
            <img
              src="../../img/icons/card-default-like.svg"
              alt="like icon"
              className={`${styles.footer_img_icon}`}
            />
          </button>
          <button className={`${styles.footer_button}`}>
            <img
              src="../../img/icons/shopping-bag.svg"
              alt="shopping bag icon"
              className={`${styles.footer_img_icon}`}
            />
          </button>
        </div>
      </div>
    </>
  );
};
