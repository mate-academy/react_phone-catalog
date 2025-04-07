import React from 'react';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  setActiveAside: (arg: boolean) => void;
  width: number;
};

export const Header: React.FC<Props> = ({ setActiveAside, width }) => {
  const handlerActiveLink = ({ isActive }: { isActive: boolean }) => {
    return classNames(`${styles.header_nav_link}`, {
      [styles.active_link]: isActive,
      [styles.active_wrapper]: isActive,
    });
  };

  return (
    <>
      {width < 640 && (
        <>
          <nav className={`${styles.header_nav_container}`}>
            <div className={`${styles.header_nav_logo_container}`}>
              <Link to="/">
                <img
                  src="./img/logo/logo-main.svg"
                  alt="logo nice gadgets"
                />
              </Link>
            </div>

            <div
              className={`${styles.header_nav_burger_container}`}
              onClick={() => {
                setActiveAside(true);
              }}
            >
              <button className={`${styles.header_nav_burger_button}`}>
                <img
                  src="./img/icons/burger-menu-icon.svg"
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
                  src="./img/logo/logo-main.svg"
                  alt="logo nice gadgets"
                />
              </Link>
            </div>

            <div className={`${styles.header_nav_pages_container}`}>
              <NavLink to="/" className={handlerActiveLink}>
                <div className={`${styles.header_nav_title_wrapper}`}>
                  <h3 className={`${styles.header_nav_title} `}>home</h3>
                </div>
              </NavLink>
              <NavLink to="/phones" className={handlerActiveLink}>
                <div className={`${styles.header_nav_title_wrapper}`}>
                  <h3 className={`${styles.header_nav_title}`}>phones</h3>
                </div>
              </NavLink>
              <NavLink to="/tablets" className={handlerActiveLink}>
                <div className={`${styles.header_nav_title_wrapper}`}>
                  <h3 className={`${styles.header_nav_title}`}>tablets</h3>
                </div>
              </NavLink>
              <NavLink to="/accessories" className={handlerActiveLink}>
                <div className={`${styles.header_nav_title_wrapper}`}>
                  <h3 className={`${styles.header_nav_title}`}>accessories</h3>
                </div>
              </NavLink>
            </div>

            <div className={`${styles.header_nav_buttons_container}`}>
              <button className={`${styles.header_nav_favourite_button}`}>
                <img
                  src="./img/icons/card-default-like.svg"
                  alt="favourite items"
                  className={`${styles.header_nav_icon}`}
                />
              </button>
              <button className={`${styles.header_nav_shop_bag_button}`}>
                <img
                  src="./img/icons/shopping-bag.svg"
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
