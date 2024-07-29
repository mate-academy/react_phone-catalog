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

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchPhonesAsync());
    dispatch(fetchTablesAsync());
    dispatch(fetchAccessoriesAsync());
    dispatch(fetchProductsAsync());
  }, []);

  const hidenMenuIco = useAppSelector(state => state.iconsChanger.hidenMenuIco);
  const isMenuShown = useAppSelector(state => state.boolean.isMenuShown);
  const favouritesArray = useAppSelector(state => state.chosenItems.favourite);
  const cartArray = useAppSelector(state => state.chosenItems.cart);

  const handleMenuOrCloseButton = useCallback(() => {
    dispatch(setIsMenuShown(!isMenuShown ? true : false));

    window.scrollTo({
      top: 0,
    });

    const newIco =
      hidenMenuIco === './icons/burger-menu-ico.svg'
        ? './icons/close-ico.svg'
        : './icons/burger-menu-ico.svg';

    dispatch(setHidenMenuIco(newIco));
  }, [hidenMenuIco, dispatch, isMenuShown]);

  const handleDoUpButton = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.app}>
      <HidenMenu />

      <header className={styles.header}>
        <div className={styles.header__left}>
          <div className={styles.header__logo}>
            <Link className={styles.header__logoLink} to="/">
              <img
                className={styles.header__logoImg}
                src="./icons/header-logo.png"
                alt="logo"
              />
            </Link>
          </div>

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
            className={`${styles.icons__containerFavourite} ${styles.icons__container}`}
          >
            {favouritesArray.length > 0 && (
              <div className={styles.redSpot}>
                <p className={`${styles.redSpot__number}`}>
                  {favouritesArray.length}
                </p>
              </div>
            )}
            <Link className={styles.icons__link} to="/">
              <img
                className={styles.icons__icon}
                src="./icons/heart-ico.svg"
                alt="favourite"
              />
            </Link>
          </div>

          <div
            className={`${styles.icons__containerBasket} ${styles.icons__container}`}
          >
            {cartArray.length > 0 && (
              <div className={styles.redSpot}>
                <p className={`${styles.redSpot__number}`}>
                  {cartArray.length}
                </p>
              </div>
            )}
            <Link className={styles.icons__link} to="/">
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
