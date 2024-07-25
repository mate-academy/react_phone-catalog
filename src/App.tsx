import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './App.module.scss';
import './modules/shared/_main.scss';
import { Link } from 'react-router-dom';
import styles from './App.module.scss';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchPhonesAsync } from './features/fetchPhonesSlice';
import { fetchTablesAsync } from './features/fetchTabletsSlice';
import { fetchAccessoriesAsync } from './features/fetchAccessoriesSlice';
import { fetchProductsAsync } from './features/fetchProductsSlice';
import { sethidenMenuIco } from './features/iconsChangerSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const hidenMenuIco = useAppSelector(state => state.iconsChanger.hidenMenuIco);

  useEffect(() => {
    dispatch(fetchPhonesAsync());
    dispatch(fetchTablesAsync());
    dispatch(fetchAccessoriesAsync());
    dispatch(fetchProductsAsync());
  }, []);

  function handleMenuOrCloseButton() {
    const newIco =
      hidenMenuIco === './icons/burger-menu-ico.svg'
        ? './icons/close-ico.svg'
        : './icons/burger-menu-ico.svg';

    dispatch(sethidenMenuIco(newIco));
  }

  return (
    <div className={styles.app}>
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
              <li className={styles.navItem}>
                <Link className={styles.navLink} to="/">
                  HOME
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link className={styles.navLink} to="/">
                  PHONES
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link className={styles.navLink} to="/">
                  TABLETS
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link className={styles.navLink} to="/">
                  ACCESORIES
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.icons}>
          <div
            className={`${styles.icons__containerFavourite} ${styles.icons__container}`}
          >
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
            <Link
              className={styles.icons__link}
              to={
                hidenMenuIco === './icons/burger-menu-ico.svg'
                  ? './hidenMenu'
                  : '/'
              }
            >
              <img
                onClick={handleMenuOrCloseButton}
                className={styles.icons__icon}
                src={hidenMenuIco}
                alt="menu"
              />
            </Link>
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
              <Link className={styles.footer__contactsLink} to="/">
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
              <Link className={styles.footer__goUpTextLink} to="/">
                Back to top
              </Link>

              <div className={styles.footer__goUpButton}>
                <a className={styles.footer__goUpIcoLink} href="#">
                  <img
                    className={styles.footer__goUpIco}
                    src="/icons/arrow-up-ico.svg"
                    alt="arrow-up"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
