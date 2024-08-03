/* eslint-disable max-len */
import React, { useCallback, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.module.scss';
import './modules/shared/_main.scss';
import { Link } from 'react-router-dom';
import styles from './App.module.scss';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchPhonesAsync } from './features/fetchPhonesSlice';
import { fetchTablesAsync } from './features/fetchTabletsSlice';
import { fetchAccessoriesAsync } from './features/fetchAccessoriesSlice';
import { fetchProductsAsync } from './features/fetchProductsSlice';
import { setHidenMenuIco } from './features/iconsChangerSlice';
import { setIsMenuShown } from './features/booleanSlice';
import { HidenMenu } from './modules/HidenMenu/components';
import {
  setAddToCart,
  setAddTofavorite,
  setCleanCart,
  setCleanFavorite,
} from './features/chosenItemsSlice';
import { Product } from './types/Product';
import { CartNumberOfItems } from './types/PageDetails';
import {
  cleanCartNumberOfItems,
  setCartNumberOfItems,
} from './features/pagesDetailsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isMenu = useAppSelector(state => state.boolean.isMenuShown);
  const BURGER_MENU_ICO = './icons/burger-menu-ico.svg';
  const CLOSE_ICO = './icons/close-ico.svg';

  useEffect(() => {
    dispatch(fetchPhonesAsync());
    dispatch(fetchTablesAsync());
    dispatch(fetchAccessoriesAsync());
    dispatch(fetchProductsAsync());

    const favString = localStorage.getItem('favorite');

    if (favString) {
      dispatch(setCleanFavorite());
      const favArray = JSON.parse(favString);

      for (const obj of favArray) {
        dispatch(setAddTofavorite(obj));
      }
    }

    const cartString = localStorage.getItem('cart');

    if (cartString) {
      dispatch(setCleanCart());
      const cartArray: Product[] = JSON.parse(cartString);

      for (const obj of cartArray) {
        dispatch(setAddToCart(obj));
      }
    }

    const cartNumberOfItemsString = localStorage.getItem('cartNumberOfItems');

    if (cartNumberOfItemsString) {
      dispatch(cleanCartNumberOfItems());
      const cartNumberOfItemsObject: CartNumberOfItems = JSON.parse(
        cartNumberOfItemsString,
      );

      dispatch(setCartNumberOfItems(cartNumberOfItemsObject));
    }
  }, []);

  const hidenMenuIco = useAppSelector(state => state.iconsChanger.hidenMenuIco);
  const isMenuShown = useAppSelector(state => state.boolean.isMenuShown);
  const favoritesArray = useAppSelector(state => state.chosenItems.favorite);
  const cartArray = useAppSelector(state => state.chosenItems.cart);

  const handleMenuOrCloseButton = useCallback(() => {
    dispatch(setIsMenuShown(!isMenuShown ? true : false));

    window.scrollTo({
      top: 0,
    });

    const newIco =
      hidenMenuIco === BURGER_MENU_ICO ? CLOSE_ICO : BURGER_MENU_ICO;

    dispatch(setHidenMenuIco(newIco));
  }, [hidenMenuIco, dispatch, isMenuShown]);

  const handleDoUpButton = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleLogoClick = () => {
    dispatch(setIsMenuShown(false));
    dispatch(setHidenMenuIco(BURGER_MENU_ICO));
  };

  return (
    <div className={`${styles.app} ${isMenu && styles.noScrol}`}>
      <HidenMenu />

      <header className={styles.header}>
        <div className={styles.header__left}>
          <Link
            onClick={handleLogoClick}
            className={styles.header__logo}
            to="/"
          >
            <img src="./icons/header-logo.png" alt="logo" />
          </Link>

          <nav className={styles.navBar}>
            <ul className={styles.navList}>
              <Link
                className={`${styles.navItem} ${location.pathname === '/' && styles.active}`}
                to="/"
              >
                HOME
              </Link>

              <Link
                className={`${styles.navItem} ${location.pathname.includes('phones') && styles.active}`}
                to="/phones"
              >
                PHONES
              </Link>

              <Link
                className={`${styles.navItem} ${location.pathname.includes('tablets') && styles.active}`}
                to="/tablets"
              >
                TABLETS
              </Link>

              <Link
                className={`${styles.navItem} ${location.pathname.includes('accessories') && styles.active}`}
                to="/accessories"
              >
                ACCESORIES
              </Link>
            </ul>
          </nav>
        </div>

        <div className={styles.icons}>
          <div
            className={`${styles.icons__containerfavorite} ${styles.icons__container} ${location.pathname.includes('favorite') && styles.activeIco}`}
          >
            {favoritesArray.length > 0 && (
              <div className={styles.redSpot}>
                <p className={styles.redSpot__number}>
                  {favoritesArray.length}
                </p>
              </div>
            )}
            <Link className={styles.icons__link} to="/favorites">
              <img
                className={styles.icons__icon}
                src="./icons/heart-ico.svg"
                alt="favorite"
              />
            </Link>
          </div>

          <div
            className={`${styles.icons__containerBasket} ${styles.icons__container} ${location.pathname.includes('cart') && styles.activeIco}`}
          >
            {cartArray.length > 0 && (
              <div className={styles.redSpot}>
                <p className={styles.redSpot__number}>{cartArray.length}</p>
              </div>
            )}
            <Link className={styles.icons__link} to="/cart">
              <img
                className={styles.icons__icon}
                src="./icons/basket-ico.svg"
                alt="basket"
              />
            </Link>
          </div>

          <div
            className={`${styles.icons__containerMenu} ${styles.icons__container}`}
          >
            <div
              onClick={handleMenuOrCloseButton}
              id="hidenMenuIco"
              className={styles.icons__link}
            >
              <img
                className={styles.icons__icon}
                src={hidenMenuIco}
                alt="menu"
              />
            </div>
          </div>
        </div>
      </header>

      <Outlet />

      <footer className={styles.footer}>
        <div className={styles.footer__container}>
          <div className={styles.footer__gridWraper}>
            <Link className={styles.footer__logoLink} to="/">
              <img
                className={styles.Footer__logoImg}
                src="./icons/header-logo.png"
                alt="logo"
              />
            </Link>

            <div className={styles.footer__contactsBlock}>
              <Link
                target="_blank"
                className={styles.footer__contactsLink}
                to="https://github.com/yurovych/react_phone-catalog/tree/develop"
              >
                github
              </Link>
              <Link className={styles.footer__contactsLink} to="/">
                contacts
              </Link>
              <Link className={styles.footer__contactsLink} to="/">
                rights
              </Link>
            </div>

            <div className={styles.footer__goUpBlock}>
              <div
                onClick={handleDoUpButton}
                className={styles.footer__goUpButtonArea}
              >
                <div className={styles.footer__goUpTextLink}>Back to top</div>

                <div className={styles.footer__goUpButton}>
                  <img
                    className={styles.footer__goUpIco}
                    src="/icons/arrow-up-ico.svg"
                    alt="arrow-up"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
