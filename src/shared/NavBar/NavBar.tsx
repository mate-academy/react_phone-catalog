import React, { useEffect, useState } from 'react';
import styles from './NavBar.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { useWindowWidth } from '../../hooks/WindowWidth';
import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import { useStorage } from '../../context/StorageContext';
import { useTheme } from '../../context/PageTheme';
import { useTranslation } from 'react-i18next';
import { Aside } from './components/Aside';
import { PhoneNav } from './components/PhoneNav';
import { LinkItem } from './components/Links';

const links = ['home', 'phones', 'tablets', 'accessories'];
const linksUA = ['головна', 'смартфони', 'планшети', 'aксесуари'];

type Languages = 'en' | 'uk';

export const NavBar: React.FC = () => {
  const [isPhone, setIsPhone] = useState<boolean>(false);
  const [visibleAside, setVisibleAside] = useState<boolean>(false);
  const [linkIndex, setLinkIndex] = useState<number>(0);
  const windowWidth = useWindowWidth();
  const { cartItems, favouritesItems } = useStorage();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [currentLinks, setCurrentLinks] = useState<Languages>('en');
  const { i18n } = useTranslation();

  useEffect(() => {
    const newIndex = links.findIndex(el =>
      location.pathname.includes(`/${el}`),
    );

    setLinkIndex(newIndex);
  }, [location]);

  useEffect(() => {
    if (windowWidth < 750) {
      setIsPhone(true);
    } else {
      setVisibleAside(false);
      setIsPhone(false);
    }
  }, [windowWidth]);

  function changeLanguage(lng: Languages) {
    i18n.changeLanguage(lng);
    setCurrentLinks(lng);
  }

  useEffect(() => {
    if (i18n.isInitialized && i18n.language !== currentLinks) {
      setCurrentLinks(i18n.language as Languages);
    }
  }, [i18n.language, currentLinks, i18n.isInitialized]);

  return (
    <>
      <nav className={styles.navBar}>
        <a href="/react_phone-catalog/#/home">
          <div className={styles.logo}>
            <img
              className={styles.logo__img}
              src={
                theme === 'light'
                  ? `${import.meta.env.BASE_URL}/img/icons/Logo.svg`
                  : `${import.meta.env.BASE_URL}/img/dark_logo.svg`
              }
              alt="Logo"
            />
          </div>
        </a>

        {isPhone ? (
          <>
            {/* #region Phone Navigation */}
            <PhoneNav
              isVisible={visibleAside}
              setVisible={setVisibleAside}
              theme={theme}
            />
            {/* #region Phone Navigation */}
          </>
        ) : (
          <>
            {/* #region Tablet&PC Navigation */}
            <div className={styles.links}>
              {(currentLinks === 'en' ? links : linksUA).map(
                (item, itemIndex) => {
                  return (
                    <LinkItem
                      key={item}
                      item={item}
                      isSelected={itemIndex === linkIndex}
                      handleClick={() => setLinkIndex(itemIndex)}
                    />
                  );
                },
              )}
            </div>

            <div className={styles.wrapper}>
              <button
                onClick={() =>
                  i18n.language === 'en'
                    ? changeLanguage('uk')
                    : changeLanguage('en')
                }
                style={{
                  cursor: 'pointer',
                  padding: windowWidth < 790 ? 0 : undefined,
                  background: 'none',
                  border: 'none',
                }}
              >
                <img
                  src={
                    i18n.language === 'en'
                      ? `${import.meta.env.BASE_URL}/img/icons/uk_logo.png`
                      : `${import.meta.env.BASE_URL}/img/icons/en_logo.png`
                  }
                  alt="flag logo"
                />
              </button>

              <button
                onClick={() =>
                  theme === 'light' ? setTheme('dark') : setTheme('light')
                }
                style={{
                  cursor: 'pointer',
                  padding: windowWidth < 790 ? 0 : undefined,
                  backgroundColor: theme === 'light' ? '#fff' : '#B4BDC3',
                  border: 'none',
                }}
              >
                <img
                  src={
                    theme === 'light'
                      ? `${import.meta.env.BASE_URL}/img/icons/theme_light.png`
                      : `${import.meta.env.BASE_URL}/img/icons/theme_dark.png`
                  }
                  alt="theme"
                />
              </button>

              <div className={styles.icon}>
                <NavLink to="/favourites" className={styles.links__item}>
                  <img
                    src={
                      theme === 'light'
                        ? `${import.meta.env.BASE_URL}/img/icons/favourites.svg`
                        : `${import.meta.env.BASE_URL}/img/icons/dark_like.svg`
                    }
                    alt="favourites"
                  />
                  {cartItems.length > 0 && (
                    <div className={classNames(styles.count, styles.cartCount)}>
                      {cartItems.length}
                    </div>
                  )}
                </NavLink>
              </div>

              <div className={styles.icon}>
                <NavLink to="/case" className={styles.links__item}>
                  <img
                    src={
                      theme === 'light'
                        ? `${import.meta.env.BASE_URL}/img/icons/case.svg`
                        : `${import.meta.env.BASE_URL}/img/icons/dark_cart.svg`
                    }
                    alt="case"
                  />
                  {favouritesItems.length > 0 && (
                    <div
                      className={classNames(
                        styles.count,
                        styles.favouritesCount,
                      )}
                    >
                      {favouritesItems.length}
                    </div>
                  )}
                </NavLink>
              </div>
            </div>
            {/* #endregion Tablet&PC Navigation */}
          </>
        )}
      </nav>

      {/* #region Aside */}
      <AnimatePresence>
        <Aside
          isVisible={visibleAside}
          setVisible={setVisibleAside}
          theme={theme}
          cartLength={cartItems.length}
          favLength={favouritesItems.length}
        />
      </AnimatePresence>
      {/* #endregion Aside */}
    </>
  );
};
