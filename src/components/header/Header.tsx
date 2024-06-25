import React, { useContext, useRef, useState } from 'react';
import Styles from './Header.module.scss';
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
  const { app, fav, cart } = useContext(ContextApp);
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

  const handleClick = () => {
    if (burger.current && app.current && !isBurgerClose) {
      setIsBurgerClose(state => !state);
      burger.current.style.transform = 'translateX(+100%)';
      document.body.style.overflow = 'visible';
    }
  };

  return (
    <header className={Styles.header} id="header">
      <div className={Styles[`header__container--1`]}>
        <Link to={'/home'}>
          <img src=".\img\svg\header_Logo.svg" className="logo" />
        </Link>
      </div>

      <div className={Styles[`header__container--2`]}>
        <div onClick={handlerBurgerMenu} className={Styles[`header__burger`]}>
          {isBurgerClose && (
            <img
              src=".\img\svg\burger_menu.svg"
              alt="burger menu"
              className={Styles['header__burger__img']}
            />
          )}

          {!isBurgerClose && (
            <img
              src=".\img\svg\close.svg"
              alt="burger menu"
              className={Styles['header__burger__img']}
            />
          )}
        </div>

        <div ref={burger} className={Styles[`header__burger_menu`]}>
          <ul className={Styles[`header__burger_menu__list`]}>
            <li className={Styles[`header__burger_menu__list__element`]}>
              <Link onClick={handleClick} to={'/home'}>
                home
              </Link>
            </li>
            <li className={Styles[`header__burger_menu__list__element`]}>
              <Link onClick={handleClick} to={'/phones'}>
                phones
              </Link>
            </li>
            <li className={Styles[`header__burger_menu__list__element`]}>
              <Link onClick={handleClick} to={'/Tablets'}>
                tablets
              </Link>
            </li>
            <li className={Styles[`header__burger_menu__list__element`]}>
              <Link onClick={handleClick} to={'/accessories'}>
                accessories
              </Link>
            </li>
          </ul>

          <div className={Styles[`header__burger_menu__footer`]}>
            <div className={Styles[`header__burger_menu__footer__fav`]}>
              <Link
                className={Styles.header__burger_menu__footer__fav__link}
                onClick={handleClick}
                to={'/fav'}
              >
                {fav.length ? (
                  <>
                    <img
                      className={Styles.header__burger_menu__footer__fav__item}
                      src="./img/svg/fav_icon.svg"
                      alt="fav icon"
                    />

                    <div
                      className={
                        Styles.header__burger_menu__footer__fav__number
                      }
                    >
                      {fav.length}
                    </div>
                  </>
                ) : (
                  <img
                    className={Styles.header__burger_menu__footer__fav__item}
                    src="./img/svg/fav_icon.svg"
                    alt="fav icon"
                  />
                )}
              </Link>
            </div>

            <div className={Styles.header__burger_menu__footer__cart}>
              {cart.length ? (
                <Link onClick={handleClick} to={'/cart'}>
                  <img
                    className={Styles.header__burger_menu__footer__fav__item}
                    src="./img/svg/Shopping_bag_Cart.svg"
                    alt="fav icon"
                  />

                  <div
                    className={Styles.header__burger_menu__footer__fav__number}
                  >
                    {cart.length}
                  </div>
                </Link>
              ) : (
                <img
                  className={Styles.header__burger_menu__footer__fav__item}
                  src="./img/svg/Shopping_bag_Cart.svg"
                  alt="fav icon"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
