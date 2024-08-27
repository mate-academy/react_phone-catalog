/* eslint-disable max-len */
import React, { useEffect } from 'react';
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
import {
  setIsDark,
  setIsMenuShown,
  setLanguage,
} from './features/booleanSlice';
import { HidenMenu } from './modules/HidenMenu/components';
import {
  addToCart,
  addTofavorite,
  cleanCart,
  cleanFavorite,
  setCurrentGadget,
  setCurrentProduct,
} from './features/chosenItemsSlice';
import { Product } from './types/Product';
import { ItemsQuantity } from './types/PageDetails';
import {
  cleanItemsQuantity,
  setItemsQuantity,
} from './features/pagesDetailsSlice';
import { amount } from './modules/CartPage/services/findAmount';
import { scrollPageUpSmooth } from './modules/shared/scrollPageUp';
import { useTranslation } from 'react-i18next';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const burgerMenuIco = useAppSelector(
    state => state.iconsChanger.burgerMenuIco,
  );
  const closeIco = useAppSelector(state => state.iconsChanger.closeIco);
  const darkMenuIco = useAppSelector(state => state.iconsChanger.darkMenuIco);
  const darkCloseIco = useAppSelector(state => state.iconsChanger.darkCloseIco);
  const hidenMenuIco = useAppSelector(state => state.iconsChanger.hidenMenuIco);
  const isMenuShown = useAppSelector(state => state.boolean.isMenuShown);
  const favoritesArray = useAppSelector(state => state.chosenItems.favorite);
  const cartArray = useAppSelector(state => state.chosenItems.cart);
  const cart = useAppSelector(state => state.chosenItems.cart);
  const itemsQuantity = useAppSelector(
    state => state.pagesDetails.itemsQuantity,
  );
  const reloadTrigger = useAppSelector(state => state.boolean.reloadTrigger);
  const isDark = useAppSelector(state => state.boolean.isDark);
  const language = useAppSelector(state => state.boolean.language);

  const body = document.body;

  body.classList.add(styles.body);

  useEffect(() => {
    const goUpButton = document.getElementById('goUpButtonElement');

    const checkScroll = () => {
      if (window.innerWidth > document.documentElement.clientWidth) {
        goUpButton?.classList.remove(`${styles.hideGoUpButton}`);
      } else {
        goUpButton?.classList.add(`${styles.hideGoUpButton}`);
      }
    };

    const clickDelay = () => {
      setTimeout(() => {
        checkScroll();
      }, 500);
    };

    clickDelay();

    document.documentElement.addEventListener('click', clickDelay);
    window.addEventListener('popstate', clickDelay);
    window.addEventListener('hashchange', clickDelay);
    window.addEventListener('resize', checkScroll);

    return () => {
      document.documentElement.removeEventListener('click', clickDelay);
      window.removeEventListener('popstate', clickDelay);
      window.removeEventListener('hashchange', clickDelay);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.style.setProperty('--white-color', '#0f1121');
      root.style.setProperty('--primary-grey-color', '#f1f2f9');
      root.style.setProperty('--secondary-grey-color', '#75767f');
      root.style.setProperty('--elements-grey-color', '#3b3e4a');

      if (isMenuShown) {
        dispatch(setHidenMenuIco(darkCloseIco));
      } else {
        dispatch(setHidenMenuIco(darkMenuIco));
      }
    } else {
      root.style.setProperty('--white-color', '#fff');
      root.style.setProperty('--primary-grey-color', '#313237');
      root.style.setProperty('--secondary-grey-color', '#89939a');
      root.style.setProperty('--elements-grey-color', '#e2e6e9');

      if (isMenuShown) {
        dispatch(setHidenMenuIco(closeIco));
      } else {
        dispatch(setHidenMenuIco(burgerMenuIco));
      }
    }
  }, [
    isDark,
    burgerMenuIco,
    closeIco,
    darkCloseIco,
    darkMenuIco,
    isMenuShown,
    dispatch,
  ]);

  useEffect(() => {
    if (isMenuShown) {
      document.body.classList.add('hidenMenuHeightNoScroll');
    } else {
      document.body.classList.remove('hidenMenuHeightNoScroll');
    }

    return () => {
      document.body.classList.remove('hidenMenuHeightNoScroll');
    };
  }, [isMenuShown]);

  const closeMenu = () => {
    dispatch(setIsMenuShown(false));
    if (isDark) {
      dispatch(setHidenMenuIco(darkMenuIco));
    } else {
      dispatch(setHidenMenuIco(burgerMenuIco));
    }
  };

  window.addEventListener('resize', closeMenu);

  useEffect(() => {
    dispatch(fetchPhonesAsync());
    dispatch(fetchTablesAsync());
    dispatch(fetchAccessoriesAsync());
    dispatch(fetchProductsAsync());

    const favString = localStorage.getItem('favorite');
    const cartString = localStorage.getItem('cart');
    const itemsQuantityString = localStorage.getItem('itemsQuantity');
    const currentGadget = localStorage.getItem('currentGadget');
    const currentProduct = localStorage.getItem('currentProduct');
    const darkMode = localStorage.getItem('isDark');
    const languageString = localStorage.getItem('language');

    if (favString) {
      dispatch(cleanFavorite());
      const favArray = JSON.parse(favString);

      for (const obj of favArray) {
        dispatch(addTofavorite(obj));
      }
    }

    if (cartString) {
      dispatch(cleanCart());
      const cartArr: Product[] = JSON.parse(cartString);

      for (const obj of cartArr) {
        dispatch(addToCart(obj));
      }
    }

    if (itemsQuantityString) {
      dispatch(cleanItemsQuantity());
      const itemsQuantityObject: ItemsQuantity =
        JSON.parse(itemsQuantityString);

      dispatch(setItemsQuantity(itemsQuantityObject));
    }

    if (currentGadget) {
      dispatch(setCurrentGadget(JSON.parse(currentGadget)));
    }

    if (currentProduct) {
      dispatch(setCurrentProduct(JSON.parse(currentProduct)));
    }

    if (darkMode) {
      dispatch(setIsDark(JSON.parse(darkMode)));
    }

    if (languageString) {
      dispatch(setLanguage(languageString));

      if (languageString === 'en') {
        i18n.changeLanguage('en');
      } else {
        i18n.changeLanguage('ua');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadTrigger]);

  const handleMenuOrCloseButton = () => {
    dispatch(setIsMenuShown(!isMenuShown ? true : false));

    scrollPageUpSmooth();

    let newIco;

    if (isDark) {
      newIco = hidenMenuIco === darkMenuIco ? darkCloseIco : darkMenuIco;
    } else {
      newIco = hidenMenuIco === burgerMenuIco ? closeIco : burgerMenuIco;
    }

    dispatch(setHidenMenuIco(newIco));
  };

  const handleLogoClick = () => {
    dispatch(setIsMenuShown(false));

    scrollPageUpSmooth();

    if (isDark) {
      dispatch(setHidenMenuIco(darkMenuIco));
    } else {
      dispatch(setHidenMenuIco(burgerMenuIco));
    }
  };

  const handleDarkModeSwither = () => {
    if (!isDark) {
      dispatch(setIsDark(true));
      localStorage.setItem('isDark', 'true');
    } else {
      dispatch(setIsDark(false));
      localStorage.setItem('isDark', 'false');
    }
  };

  const handleLanguageChange = () => {
    const newLang = language === 'en' ? 'ua' : 'en';

    dispatch(setLanguage(newLang));
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <div className={styles.app}>
      <HidenMenu />

      <header className={styles.header}>
        <div className={styles.header__left}>
          <Link
            onClick={handleLogoClick}
            className={styles.header__logoLink}
            to="/"
          >
            {isDark ? (
              <img
                src="./icons/dark-theme-icons/header-logo-dark-mode.svg"
                alt="logo"
              />
            ) : (
              <img src="./icons/header-logo-light-mode.svg" alt="logo" />
            )}
          </Link>

          <nav className={styles.navBar}>
            <ul className={styles.navList}>
              <Link
                className={`${styles.navItem} ${location.pathname === '/' && styles.active}`}
                to="/"
              >
                {t('home')}
              </Link>

              <Link
                className={`${styles.navItem} ${location.pathname.includes('phones') && styles.active}`}
                to="/phones"
              >
                {t('phones')}
              </Link>

              <Link
                className={`${styles.navItem} ${location.pathname.includes('tablets') && styles.active}`}
                to="/tablets"
              >
                {t('tablets')}
              </Link>

              <Link
                className={`${styles.navItem} ${location.pathname.includes('accessories') && styles.active}`}
                to="/accessories"
              >
                {t('accessories')}
              </Link>
            </ul>
          </nav>
        </div>

        <div className={styles.header__right}>
          <div onClick={handleLanguageChange} className={styles.languageButton}>
            {language === 'ua' ? (
              <img
                className={`${styles.languageButton__img} ${language === 'ua' && styles.languageChanging}`}
                src="./icons/en-flag-ico.svg"
                alt="en-flag"
              />
            ) : (
              <img
                className={`${styles.languageButton__img} ${language === 'ua' && styles.languageChanging}`}
                src="./icons/ua-flag-ico.svg"
                alt="ua-flag"
              />
            )}
          </div>

          <div
            onClick={handleDarkModeSwither}
            className={styles.darkModeButton}
          >
            <div
              className={`${styles.darkModeButton__runner} ${isDark && styles.isDark}`}
            >
              {isDark ? (
                <img src="./icons/sun-ico.svg" alt="light-mode" />
              ) : (
                <img src="./icons/moon-ico.svg" alt="dark-mode" />
              )}
            </div>
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
                  src={
                    isDark
                      ? './icons/dark-theme-icons/heart-ico.svg'
                      : './icons/heart-ico.svg'
                  }
                  alt="favorite"
                />
              </Link>
            </div>

            <div
              className={`${styles.icons__containerBasket} ${styles.icons__container} ${location.pathname.includes('cart') && styles.activeIco}`}
            >
              {cartArray.length > 0 && (
                <div className={styles.redSpot}>
                  <p className={styles.redSpot__number}>
                    {amount(itemsQuantity, cart, 'items')}
                  </p>
                </div>
              )}
              <Link className={styles.icons__link} to="/cart">
                <img
                  className={styles.icons__icon}
                  src={
                    isDark
                      ? './icons/dark-theme-icons/cart-ico.svg'
                      : './icons/basket-ico.svg'
                  }
                  alt="basket"
                />
              </Link>
            </div>

            <div
              className={`${styles.icons__containerMenu} ${styles.icons__container}`}
            >
              <div
                onClick={handleMenuOrCloseButton}
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
        </div>
      </header>

      <div className={styles.app__content}>
        <Outlet />
      </div>

      <footer className={styles.footer}>
        <div className={styles.footer__container}>
          <div className={styles.footer__gridWraper}>
            <Link
              onClick={handleLogoClick}
              className={styles.footer__logoLink}
              to="/"
            >
              {isDark ? (
                <img
                  src="./icons/dark-theme-icons/header-logo-dark-mode.svg"
                  alt="logo"
                />
              ) : (
                <img src="./icons/header-logo-light-mode.svg" alt="logo" />
              )}
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
                {t('contacts')}
              </Link>
              <Link className={styles.footer__contactsLink} to="/">
                {t('rights')}
              </Link>
            </div>

            <div
              onClick={() => scrollPageUpSmooth()}
              id="goUpButtonElement"
              className={styles.footer__goUpBlock}
            >
              <div className={styles.footer__goUpButtonArea}>
                <div className={styles.footer__goUpTextLink}>{t('go_up')}</div>

                <button
                  className={`${styles.footer__goUpButton} ${isDark && styles.goUpDark}`}
                >
                  {isDark ? (
                    <img
                      className={styles.footer__goUpIco}
                      src="./icons/dark-theme-icons/white-arrow-up-ico.svg"
                      alt="arrow-up"
                    />
                  ) : (
                    <img
                      className={styles.footer__goUpIco}
                      src="./icons/arrow-up-ico.svg"
                      alt="arrow-up"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
