import React, { useContext, useRef, useState } from 'react';
import cn from 'classnames';
import Styles from './Header.module.scss';
import { ContextApp } from '../../appContext/AppContext';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const { app, fav, cart, isPhone, isTablet, handleClearParams } =
    useContext(ContextApp);

  const NAVIGATION_OVER_640px = (
    <nav className={Styles['header__nav']}>
      <ul className={Styles[`header__nav__list`]}>
        <li
          className={cn(Styles.header__nav__list__element, {
            [Styles['with-after']]: location.hash === '#/',
          })}
        >
          <Link onClick={handleClearParams} to={'/'}>
            home
          </Link>
        </li>

        <li
          className={cn(Styles.header__nav__list__element, {
            [Styles['with-after']]: location.hash === '#/phones',
          })}
        >
          <Link onClick={handleClearParams} to={'/phones'}>
            phones
          </Link>
        </li>

        <li
          className={cn(Styles.header__nav__list__element, {
            [Styles['with-after']]: location.hash === '#/tablets',
          })}
        >
          <Link onClick={handleClearParams} to={'/tablets'}>
            tablets
          </Link>
        </li>

        <li
          className={cn(Styles.header__nav__list__element, {
            [Styles['with-after']]: location.hash === '#/accessories',
          })}
        >
          <Link onClick={handleClearParams} to={'/accessories'}>
            accessories
          </Link>
        </li>
      </ul>
    </nav>
  );

  const burger = useRef<HTMLDivElement>(null);
  const [isBurgerClose, setIsBurgerClose] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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
          <img
            src=".\img\svg\header_Logo.svg"
            className={Styles[`header__container--1__link`]}
          />
        </Link>

        {isTablet && NAVIGATION_OVER_640px}
      </div>

      {isTablet && (
        <div className={Styles.header__links}>
          <div className={Styles.header__links__fav}>
            <Link
              className={Styles.header__links__fav__link}
              onClick={handleClick}
              to={'/fav'}
            >
              {fav.length ? (
                <>
                  <img
                    className={Styles.header__links__fav__item}
                    src="./img/svg/fav_icon.svg"
                    alt="fav icon"
                  />

                  <div className={Styles.header__links__fav__number}>
                    {fav.length}
                  </div>
                </>
              ) : (
                <img
                  className={Styles.header__links__fav__item}
                  src="./img/svg/fav_icon.svg"
                  alt="fav icon"
                />
              )}
            </Link>
          </div>

          <div className={Styles.header__links__cart}>
            <Link
              className={Styles.header__links__cart__link}
              onClick={handleClick}
              to={'/cart'}
            >
              {cart.length ? (
                <>
                  <img
                    className={Styles.header__links__cart__item}
                    src="./img/svg/Shopping_bag_Cart.svg"
                    alt="fav icon"
                  />
                  <div className={Styles.header__links__cart__number}>
                    {cart.length}
                  </div>
                </>
              ) : (
                <img
                  className={Styles.header__links__cart__item}
                  src="./img/svg/Shopping_bag_Cart.svg"
                  alt="fav icon"
                />
              )}
            </Link>
          </div>
        </div>
      )}

      {isPhone && !isTablet && (
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
                style={{
                  transform: isHovered ? 'rotate(90deg)' : 'rotate(0deg)',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            )}
          </div>

          <div ref={burger} className={Styles[`header__burger_menu`]}>
            <ul className={Styles[`header__burger_menu__list`]}>
              <li className={Styles[`header__burger_menu__list__element`]}>
                <Link onClick={handleClick} to={'/'}>
                  home
                </Link>
              </li>
              <li className={Styles[`header__burger_menu__list__element`]}>
                <Link onClick={handleClick} to={'/phones'}>
                  phones
                </Link>
              </li>
              <li className={Styles[`header__burger_menu__list__element`]}>
                <Link onClick={handleClick} to={'/tablets'}>
                  tablets
                </Link>
              </li>
              <li className={Styles[`header__burger_menu__list__element`]}>
                <Link onClick={handleClick} to={'/accessories'}>
                  accessories
                </Link>
              </li>
            </ul>

            <div className={Styles.header__burger_menu__footer}>
              <div className={Styles.header__burger_menu__footer__fav}>
                <Link
                  className={Styles.header__burger_menu__footer__fav__link}
                  onClick={handleClick}
                  to={'/fav'}
                >
                  {fav.length ? (
                    <>
                      <img
                        className={
                          Styles.header__burger_menu__footer__fav__item
                        }
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
                  <Link
                    className={Styles.header__burger_menu__footer__fav__link}
                    onClick={handleClick}
                    to={'/cart'}
                  >
                    <img
                      className={Styles.header__burger_menu__footer__fav__item}
                      src="./img/svg/Shopping_bag_Cart.svg"
                      alt="fav icon"
                    />

                    <div
                      className={
                        Styles.header__burger_menu__footer__fav__number
                      }
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
      )}
    </header>
  );
};
