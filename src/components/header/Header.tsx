import React, { useContext, useRef } from 'react';
import styles from './Header.module.scss';
// import { useBreakpoint } from '../../breakPoints/BreakPoint';
import { ContextApp } from '../../appContext/AppContext';

// const NAVIGATION_OVER_640px = (
//   <nav className={styles['header__nav']}>
//     <ul className={styles[`header__nav__list`]}>
//       <li className={styles[`header__nav__list__element`]}>Home</li>
//       <li className={styles[`header__nav__list__element`]}>Phones</li>
//       <li className={styles[`header__nav__list__element`]}>Tablets</li>
//       <li className={styles[`header__nav__list__element`]}>Accessories</li>
//     </ul>
//   </nav>
// );

export const Header: React.FC = () => {
  const { app } = useContext(ContextApp);
  const burger = useRef<HTMLDivElement>(null);
  // const isPhone = useBreakpoint('phone');

  const handlerOpenBurger = () => {
    if (burger.current && app.current) {
      burger.current.style.transform = 'translateX(0)';
      document.body.style.overflow = 'hidden';
      app.current.style.overflow = 'hidden';
    }
  };

  const handlerCloseBurger = () => {
    if (burger.current && app.current) {
      burger.current.style.transform = 'translateX(+100%)';
      document.body.style.overflow = 'visible';
      app.current.style.overflow = 'visible';
      app.current.style.height = 'fit-content';
    }
  };

  return (
    <header className={styles.header} id="header">
      <div className={styles[`header__container--1`]}>
        <img src=".\img\svg\header_Logo.svg" className="logo" />

        <div ref={burger} className={styles[`header__burger_menu`]}>
          <div className={styles['header__burger_menu__container']}>
            <img src=".\img\svg\header_Logo.svg" className="logo" />

            <div
              onClick={handlerCloseBurger}
              className={styles['header__burger_menu__container__close']}
            />
          </div>

          <ul className={styles[`header__burger_menu__list`]}>
            <li className={styles[`header__burger_menu__list__element`]}>
              Home
            </li>
            <li className={styles[`header__burger_menu__list__element`]}>
              Phones
            </li>
            <li className={styles[`header__burger_menu__list__element`]}>
              Tablets
            </li>
            <li className={styles[`header__burger_menu__list__element`]}>
              Accessories
            </li>
          </ul>

          <div className={styles[`header__burger_menu__footer`]}>
            <div className={styles[`header__burger_menu__footer__fav`]}></div>
            <div className={styles[`header__burger_menu__footer__cart`]}></div>
          </div>
        </div>
      </div>

      <div className={styles[`header__container--2`]}>
        <div onClick={handlerOpenBurger} className={styles[`header__burger`]}>
          <img
            src=".\img\svg\burger_menu.svg"
            alt="burger menu"
            className={styles['header__burger__img']}
          />
        </div>

        <a href="#fav" className={styles[`header__fav`]}>
          <img
            src=".\img\svg\fav_icon.svg"
            alt="Fav_logo"
            className="logo__image"
          />
        </a>

        <a href="#cart" className={styles[`header__cart`]}>
          <img
            src="./img/svg/Shopping_bag_Cart.svg"
            alt="Cart_logo"
            className="logo__image"
          />
        </a>
      </div>
    </header>
  );
};
