import styles from '../Header/Header.module.scss';
import { Navigation } from '../Navigation/Navigation';
import { useState } from 'react';
import { Burger } from '../Burger';
import cn from 'classnames';
import { FavoriteAndBag } from '../FavoriteAndBag';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { Logo } from '../Logo';
import { useTheme } from '@/shared/context/FavoriteContext/useTheme';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

export const Header = () => {
  const [showBurger, setShowBurger] = useState(false);
  const { theme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [, setSearchParams] = useSearchParams();

  const closeBurger = () => {
    setShowBurger(false);
  };

  const location = useLocation();

  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);

  const onlyOnCatalogue =
    location.pathname === '/phones' ||
    location.pathname === '/tablets' ||
    location.pathname === '/accessories';

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams(params => {
        const newParams = new URLSearchParams(params);

        if (searchValue.trim()) {
          newParams.set('query', searchValue);
        } else {
          newParams.delete('query');
        }

        return newParams;
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, setSearchParams]);

  useEffect(() => {
    setSearchValue('');
    setSearchParams({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (inputRef.current && (isSearchOpen || window.innerWidth >= 1000)) {
      inputRef.current.focus();
    }
  }, [isSearchOpen, location.pathname]);

  return (
    <>
      <header className={cn(styles.header)}>
        <div className={styles.header__content}>
          <div className={styles.leftPart}>
            <div className={styles.logoWrapper}>
              <Logo />
            </div>

            <div className={styles.desktopNavigation}>
              <Navigation />
            </div>
          </div>

          <div className={styles.rightPart}>
            {onlyOnCatalogue && (
              <div
                className={`${styles.search} ${isSearchOpen ? styles.searchOpen : ''}`}
              >
                <button
                  type="button"
                  className={styles.lupa}
                  onClick={openSearch}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>

                <div className={styles.inputWrapper}>
                  <input
                    className={styles.searchInput}
                    type="search"
                    value={searchValue}
                    placeholder={t('header.search')}
                    onChange={event => setSearchValue(event.target.value)}
                    ref={inputRef}
                  />

                  {!searchValue.length && (
                    <button
                      type="button"
                      className={styles.closeButton}
                      onClick={closeSearch}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            )}
            <LanguageSwitcher />
            <ThemeSwitcher />
            <div className={styles.onlyDesktop}>
              <FavoriteAndBag />
            </div>
            <div
              className={styles.burgerBlock}
              onClick={() => {
                setShowBurger(prev => !prev);
              }}
            >
              <a className={styles.burgerMenu}>
                {!showBurger ? (
                  <img
                    src={
                      theme === 'light'
                        ? 'icons/menu.svg'
                        : 'icons/menu-white.svg'
                    }
                    alt="burger"
                  />
                ) : (
                  <img
                    src={
                      theme === 'light'
                        ? 'icons/Close.svg'
                        : 'icons/close-white.svg'
                    }
                    alt="close"
                  />
                )}
              </a>
            </div>
          </div>
        </div>
      </header>

      {showBurger && <Burger onClose={closeBurger} />}
    </>
  );
};
