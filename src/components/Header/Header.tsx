import styles from './Header.module.scss';

import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigation';
import { HeaderActions } from '../HeaderActions';
import { SearchInput, SearchInputRef } from '../SearchInput';
import { useMenu, useMenuDispatch } from '../../context/useMenu';

import searchIcon from '../../images/icons/search.svg';

export const Header: React.FC = () => {
  const { isMenuOpen } = useMenu();
  const dispatch = useMenuDispatch();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { pathname } = useLocation();

  const searchInputRef = useRef<SearchInputRef>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const showSearchOn = ['/phones', '/tablets', '/accessories', '/favourites'];
  const shouldShowSearch = showSearchOn.some(pagePath =>
    pathname.startsWith(pagePath),
  );

  const closeSearch = () => setIsSearchVisible(false);

  const toggleSearch = () => {
    if (isSearchVisible) {
      searchInputRef.current?.clearAndClose();
    } else {
      setIsSearchVisible(true);
    }
  };

  useEffect(() => {
    closeSearch();
    searchInputRef.current?.clearAndClose();
  }, [pathname]);

  useEffect(() => {
    if (!isSearchVisible) {
      return;
    }

    const focusTimeout = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 300);

    return () => clearTimeout(focusTimeout);
  }, [isSearchVisible]);

  const toggleMenu = () => {
    dispatch({ type: 'TOGGLE_MENU' });
  };

  const handleCloseMenu = () => {
    dispatch({ type: 'CLOSE_MENU' });
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__content}>
          <Logo onLogoClick={handleCloseMenu} />
          <div className={styles.header__navigation}>
            <Navigation onLinkClick={handleCloseMenu} />
          </div>
          <div className={styles.header__actions}>
            {shouldShowSearch && (
              <button
                ref={searchButtonRef}
                className={styles.header__searchButton}
                onClick={toggleSearch}
                aria-label="Toggle search"
              >
                <img src={searchIcon} alt="Search" />
              </button>
            )}
            <div className={styles.header__headerActions}>
              <HeaderActions />
            </div>
            <div
              className={styles.header__burgemMenuWrapper}
              onClick={toggleMenu}
            >
              <div
                className={classNames(styles.header__burgerMenu, {
                  [styles['header__burgerMenu--active']]: isMenuOpen,
                })}
              >
                <span className={styles.header__burgerMenuLine}></span>
                <span className={styles.header__burgerMenuLine}></span>
                <span className={styles.header__burgerMenuLine}></span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={classNames(styles.header__searchBar, {
            [styles['header__searchBar--visible']]: isSearchVisible,
          })}
        >
          {shouldShowSearch && (
            <SearchInput
              ref={searchInputRef}
              onSearchClose={closeSearch}
              toggleButtonRef={searchButtonRef}
            />
          )}
        </div>
      </header>
    </>
  );
};
