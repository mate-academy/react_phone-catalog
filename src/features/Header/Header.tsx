/* eslint-disable import/no-extraneous-dependencies */
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

import { useEffect, useState } from 'react';

import logo from '/img/Logo.svg';
import { Burger } from '../Burger';
import { NavIcon } from '../NavIcon';
import styles from './Header.module.scss';
import { BurgerIcon } from '../../shared/components/Icons/BurgerIcon';
import { SearchIcon } from '../../shared/components/Icons/SearchIcon';
import { getSearchWith, SearchParams } from '../../shared/utils/searchHelper';

const getClassName = (baseClass: string) =>
  function ({ isActive }: { isActive: boolean }) {
    return classNames(styles[baseClass], { [styles['is-active']]: isActive });
  };

const getLinkClass = getClassName('navbar--item');

export const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  function setSearchWith(params: SearchParams) {
    const updatedParams = { ...params };

    if (updatedParams.perPage === 'all') {
      updatedParams.perPage = null;
    }

    if (updatedParams.page === '1') {
      updatedParams.perPage = null;
    }

    const search = getSearchWith(searchParams, updatedParams);

    setSearchParams(search, { replace: true });
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
    // navigate(`/search/${event.target.value}`, { replace: true });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && query.trim()) {
      navigate(`/search/${query.trim()}`, { replace: true });
    }
  }

  // useEffect(() => {
  //   if (query) {
  //     navigate(`search`);
  //   }
  // }, [query]);

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
            <span className={classNames(styles.search__icon)}>
              <SearchIcon />
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
