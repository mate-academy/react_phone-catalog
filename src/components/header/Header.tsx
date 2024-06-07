import React, { useContext, useRef, useState } from 'react';
import styles from './Header.module.scss';
// import { useBreakpoint } from '../../breakPoints/BreakPoint';
import { ContextApp } from '../../appContext/AppContext';
import { Link } from 'react-router-dom';

// const NAVIGATION_OVER_640px = (
//   <nav className={styles['header__nav']}>
//     <ul className={styles[`header__nav__list`]}>
//       <li className={styles[`header__nav__list__element`]}>Home</li>
//       <li className={styles[`header__nav__list__element`]}>products</li>
//       <li className={styles[`header__nav__list__element`]}>Tablets</li>
//       <li className={styles[`header__nav__list__element`]}>Accessories</li>
//     </ul>
//   </nav>
// );

export const Header: React.FC = () => {
  const { app } = useContext(ContextApp);
  const burger = useRef<HTMLDivElement>(null);
  const [isBurgerClose, setIsBurgerClose] = useState(true);
  // const isPhone = useBreakpoint('phone');

  const handlerBurgerMenu = () => {
    if (burger.current && app.current && isBurgerClose) {
      setIsBurgerClose(state => !state);
      burger.current.style.transform = 'translateX(0)';
      document.body.style.overflow = 'hidden';
    } else if (burger.current && app.current && !isBurgerClose) {
      setIsBurgerClose(state => !state);
      burger.current.style.transform = 'translateX(+100%)';
      document.body.style.overflow = 'visible';
    }
  };

  return (
    <header className={styles.header} id="header">
      <div className={styles[`header__container--1`]}>
        <Link to={'/home'}>
          <img src=".\img\svg\header_Logo.svg" className="logo" />
        </Link>
      </div>

      <div className={styles[`header__container--2`]}>
        <div onClick={handlerBurgerMenu} className={styles[`header__burger`]}>
          {isBurgerClose && (
            <img
              src=".\img\svg\burger_menu.svg"
              alt="burger menu"
              className={styles['header__burger__img']}
            />
          )}

          {!isBurgerClose && (
            <img
              src=".\img\svg\close_burger.svg"
              alt="burger menu"
              className={styles['header__burger__img']}
            />
          )}
        </div>

        <div ref={burger} className={styles[`header__burger_menu`]}>
          <ul className={styles[`header__burger_menu__list`]}>
            <li className={styles[`header__burger_menu__list__element`]}>
              <Link to={'/home'}>home</Link>
            </li>
            <li className={styles[`header__burger_menu__list__element`]}>
              <Link to={'/phones'}>phones</Link>
            </li>
            <li className={styles[`header__burger_menu__list__element`]}>
              <Link to={'/Tablets'}>tablets</Link>
            </li>
            <li className={styles[`header__burger_menu__list__element`]}>
              <Link to={'/accessories'}>accessories</Link>
            </li>
          </ul>

          <div className={styles[`header__burger_menu__footer`]}>
            <div className={styles[`header__burger_menu__footer__fav`]}></div>
            <div className={styles[`header__burger_menu__footer__cart`]}></div>
          </div>
        </div>
      </div>
    </header>
  );
};
