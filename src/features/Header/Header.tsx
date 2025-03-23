/* eslint-disable import/no-extraneous-dependencies */
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

import { useEffect, useRef, useState } from 'react';

import logo from '/img/Logo.svg';
import { Burger } from '../Burger';
import { NavIcon } from '../NavIcon';
import styles from './Header.module.scss';
import { BurgerIcon } from '../../shared/components/Icons/BurgerIcon';
import { SearchIcon } from '../../shared/components/Icons/SearchIcon';
import { getSearchWith, SearchParams } from '../../shared/utils/searchHelper';
import { CloseIcon } from '../../shared/components/Icons/CloseIcon';

const getClassName = (baseClass: string) =>
  function ({ isActive }: { isActive: boolean }) {
    return classNames(styles[baseClass], { [styles['is-active']]: isActive });
  };

const getLinkClass = getClassName('navbar--item');

export const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 639 });

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const query = searchParams.get('query') || '';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState(query);
  const [isFocus, setIsFocus] = useState(false);

  const savedPath = useRef<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  function setSearchWith(params: SearchParams) {
    const updatedParams = { ...params };
    const search = getSearchWith(searchParams, updatedParams);

    setSearchParams(search, { replace: true });
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleSearchClick() {
    if (!location.pathname.includes('search') && inputValue.trim()) {
      savedPath.current = location.pathname;
    }

    if (inputValue.trim()) {
      setSearchWith({ query: inputValue });
      navigate(`/search?query=${encodeURIComponent(inputValue)}`, {
        replace: true,
      });
    }
  }

  const handleClearQuery = () => {
    setInputValue('');
    setSearchWith({ query: null });

    if (!location.pathname.includes('search')) {
      return;
    }

    if (location.pathname.includes('search') && savedPath.current) {
      navigate(savedPath.current, { replace: true });
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    if (!query) {
      savedPath.current = location.pathname;
    }
  }, [location.pathname, query]);

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearchClick();
    }
  };

  const handleOnBlur = () => {
    setIsFocus(false);
  };

  const handleOnFocus = () => {
    setIsFocus(true);
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink to="/" className={styles.navbarBrand}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </NavLink>

          {!isMobile && (
            <div className={styles.navbarMenu}>
              <NavLink to="/" className={getLinkClass}>
                Home
              </NavLink>
              <NavLink to="phones" className={getLinkClass}>
                Phones
              </NavLink>
              <NavLink to="tablets" className={getLinkClass}>
                Tablets
              </NavLink>
              <NavLink to="accessories" className={getLinkClass}>
                Accessories
              </NavLink>
              <div className="navbar-end"></div>
            </div>
          )}
          <div className={styles.search__wrapper}>
            <div className={styles.search__inputWrapper}>
              <input
                className={classNames(
                  styles.search__input,
                  styles.search__active,
                )}
                type="text"
                placeholder="Search..."
                value={inputValue}
                onChange={handleQueryChange}
                onKeyDown={handleEnterPress}
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
              />
              {/* close icon */}
              <span
                className={classNames(styles.search__close)}
                onClick={handleClearQuery}
              >
                {inputValue && isFocus && <CloseIcon />}
                {/* <CloseIcon /> */}
              </span>
            </div>

            {/* search icon */}
            <span
              className={classNames(styles.search__iconSearch)}
              onClick={handleSearchClick}
            >
              <SearchIcon />
            </span>
          </div>
          {isMobile && (
            <BurgerIcon isMenuOpen={isMenuOpen} onClick={toggleMenu} />
          )}
          {!isMobile && (
            <div className={styles.buttons}>
              <NavIcon icon="heart" link="favourites" />
              <NavIcon icon="cart" link="cart" />
            </div>
          )}
        </nav>
      </header>
      {isMobile && <Burger isMenuOpen={isMenuOpen} onClose={toggleMenu} />}
    </>
  );
};
