import React from 'react';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';

type Props = {
  setActiveAside: (arg: boolean) => void;
  width: number;
};

export const Header: React.FC<Props> = ({ setActiveAside, width }) => {
  return (
    <>
      {width < 640 && (
        <>
          <nav className={`${styles.header_nav_container}`}>
            <div className={`${styles.header_nav_logo_container}`}>
              <Link to="/">
                <img
                  src="../../img/logo/logo-main.svg"
                  alt="logo nice gadgets"
                />
              </Link>
            </div>

            <div
              className={`${styles.header_nav_burger_container}`}
              onClick={() => {
                console.log('unset');
                setActiveAside(true);
                console.log('set');
              }}
            >
              <button className={`${styles.header_nav_burger_button}`}>
                <img
                  src="../../img/icons/burger-menu-icon.svg"
                  alt="burger menu"
                />
              </button>
            </div>
          </nav>
        </>
      )}
      {width >= 640 && (
        <>
          <nav className={`${styles.header_nav_container}`}>
            <div className={`${styles.header_nav_logo_container}`}>
              <Link to="/">
                <img
                  src="../../img/logo/logo-main.svg"
                  alt="logo nice gadgets"
                />
              </Link>
            </div>

            <div className={`${styles.header_nav_pages_container}`}>
              <div
                className={`${styles.header_nav_title_wrapper} ${styles.active_wrapper}`}
              >
                <NavLink to="/home" className={`${styles.header_nav_link}`}>
                  <h3
                    className={`${styles.header_nav_title} ${styles.active_link}`}
                  >
                    home
                  </h3>
                </NavLink>
              </div>
              <div className={`${styles.header_nav_title_wrapper}`}>
                <NavLink to="/phones" className={`${styles.header_nav_link}`}>
                  <h3 className={`${styles.header_nav_title}`}>phones</h3>
                </NavLink>
              </div>
              <div className={`${styles.header_nav_title_wrapper}`}>
                <NavLink to="/tablets" className={`${styles.header_nav_link}`}>
                  <h3 className={`${styles.header_nav_title}`}>tablets</h3>
                </NavLink>
              </div>
              <div className={`${styles.header_nav_title_wrapper}`}>
                <NavLink
                  to="/accessories"
                  className={`${styles.header_nav_link}`}
                >
                  <h3 className={`${styles.header_nav_title}`}>accessories</h3>
                </NavLink>
              </div>
            </div>

            <div className={`${styles.header_nav_buttons_container}`}>
              <button className={`${styles.header_nav_favourite_button}`}>
                <img
                  src="../../img/icons/card-default-like.svg"
                  alt="favourite items"
                  className={`${styles.header_nav_icon}`}
                />
              </button>
              <button className={`${styles.header_nav_shop_bag_button}`}>
                <img
                  src="../../img/icons/shopping-bag.svg"
                  alt="shopping bag"
                  className={`${styles.header_nav_icon}`}
                />
              </button>
            </div>
          </nav>
        </>
      )}
    </>
  );
};
