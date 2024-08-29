import { Link } from 'react-router-dom';
import styles from './HidenMenu.module.scss';
import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import { setHidenMenuIco } from '../../../features/iconsChangerSlice';
import { setIsMenuShown } from '../../../features/booleanSlice';
import React from 'react';

export const HidenMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMenuShown = useAppSelector(state => state.boolean.isMenuShown);
  const favoritesArray = useAppSelector(state => state.chosenItems.favorite);
  const cartArray = useAppSelector(state => state.chosenItems.cart);
  const isDark = useAppSelector(state => state.boolean.isDark);
  const burgerMenuIco = useAppSelector(
    state => state.iconsChanger.burgerMenuIco,
  );
  const darkMenuIco = useAppSelector(state => state.iconsChanger.darkMenuIco);

  const handleCloseHidenMenu = () => {
    if (isDark) {
      dispatch(setHidenMenuIco(darkMenuIco));
    } else {
      dispatch(setHidenMenuIco(burgerMenuIco));
    }

    dispatch(setIsMenuShown(!isMenuShown ? true : false));
  };

  return (
    <div
      id="hidenMenu"
      className={`${styles.hidenMenu} ${!isMenuShown ? styles.hideHidenMenu : styles.showHidenMenu} `}
    >
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <li id="hidenMenuHome" className={styles.nav__item}>
            <Link
              onClick={handleCloseHidenMenu}
              className={styles.nav__link}
              to="/"
            >
              HOME
            </Link>
          </li>

          <li className={styles.nav__item}>
            <Link
              onClick={handleCloseHidenMenu}
              className={styles.nav__link}
              to="/phones"
            >
              PHONES
            </Link>
          </li>

          <li className={styles.nav__item}>
            <Link
              onClick={handleCloseHidenMenu}
              className={styles.nav__link}
              to="/tablets"
            >
              TABLETS
            </Link>
          </li>

          <li className={styles.nav__item}>
            <Link
              onClick={handleCloseHidenMenu}
              className={styles.nav__link}
              to="/accessories"
            >
              ACCESORIES
            </Link>
          </li>
        </ul>
      </nav>

      <footer className={styles.footer}>
        <div className={`${styles.footer__button} ${styles.favorites}`}>
          {favoritesArray.length > 0 && (
            <div className={styles.redSpot}>
              <p className={styles.redSpot__number}>{favoritesArray.length}</p>
            </div>
          )}

          <Link
            onClick={handleCloseHidenMenu}
            className={styles.footer__link}
            to="/favorites"
          >
            {isDark ? (
              <img
                className={styles.footer__icon}
                src="./icons/dark-theme-icons/heart-ico.svg"
                alt="favorites"
              />
            ) : (
              <img
                className={styles.footer__icon}
                src="./icons/heart-ico.svg"
                alt="favorites"
              />
            )}
          </Link>
        </div>

        <div className={styles.footer__button}>
          {cartArray.length > 0 && (
            <div className={styles.redSpot}>
              <p className={styles.redSpot__number}>{cartArray.length}</p>
            </div>
          )}

          <Link
            onClick={handleCloseHidenMenu}
            className={styles.footer__link}
            to="/cart"
          >
            {isDark ? (
              <img
                className={styles.footer__icon}
                src="./icons/dark-theme-icons/cart-ico.svg"
                alt="cart"
              />
            ) : (
              <img
                className={styles.footer__icon}
                src="./icons/basket-ico.svg"
                alt="cart"
              />
            )}
          </Link>
        </div>
      </footer>
    </div>
  );
};
