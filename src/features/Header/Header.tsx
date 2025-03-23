/* eslint-disable import/no-extraneous-dependencies */
import debounce from 'lodash.debounce';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

import { useCallback, useEffect, useRef, useState } from 'react';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const navigate = useNavigate();

  const query = searchParams.get('query') || '';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState(query);

  const savedPath = useRef<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  function setSearchWith(params: SearchParams) {
    const updatedParams = { ...params };
    const search = getSearchWith(searchParams, updatedParams);

    setSearchParams(search, { replace: true });
  }

  // const applyQuery = useCallback(debounce(setInputValue, 1000), []);

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;

    if (!savedPath.current && !query) {
      savedPath.current = window.location.pathname;
    }

    setSearchWith({ query: newQuery || null });

    if (newQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(newQuery)}`, {
        replace: true,
      });
    }
  }

  // function handleSearchClick() {
  //   if (inputValue.trim()) {
  //     setSearchWith({ query: inputValue }); // Теперь добавляем query в URL
  //     navigate(`/search?query=${encodeURIComponent(inputValue)}`, {
  //       replace: true,
  //     });
  //   }
  // }

  const handleClearQuery = () => {
    setInputValue('');
    setSearchWith({ query: null });

    if (savedPath.current) {
      navigate(savedPath.current, { replace: true });
      savedPath.current = null;
    }
  };

  useEffect(() => {
    if (!query && savedPath.current) {
      navigate(savedPath.current, { replace: true });
      savedPath.current = null;
    }
  }, [query]);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink to="/" className={styles.navbarBrand}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </NavLink>
          {isMobile && (
            <BurgerIcon isMenuOpen={isMenuOpen} onClick={toggleMenu} />
          )}
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
          <div className={styles.search__wrapper}>
            <input
              className={classNames(
                styles.search__input,
                styles.search__active,
              )}
              type="text"
              placeholder="Search..."
              value={query}
              onChange={handleQueryChange}
            />
            <span
              className={classNames(styles.search__icon)}
              onClick={handleClearQuery}
            >
              {query ? <CloseIcon /> : <SearchIcon />}
            </span>
          </div>
          <div className={styles.buttons}>
            <NavIcon icon="heart" link="favourites" />
            <NavIcon icon="cart" link="cart" />
          </div>
        </nav>
      </header>
      {isMobile && <Burger isMenuOpen={isMenuOpen} onClose={toggleMenu} />}
    </>
  );
};
