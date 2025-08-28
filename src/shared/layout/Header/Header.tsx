import React, { useState } from 'react';
import styles from './header.module.scss';

import logo from '../../../../public/img/icons/logo.svg';

import menu from '../../../../public/img/icons/icon-menu.svg';
import { Link, useLocation } from 'react-router-dom';
import { useProductsState } from '../../context/ProductsStateContext';
import { useScrollDirection } from './hooks/useScrollDirection';
import { HeaderNavigation } from './components/HeaderNavigation';
import { HeaderLinks } from './components/HeaderLinks';
import { Menu } from './components/Menu';
import { SearchItem } from './components/SearchItem';

export const Header: React.FC = () => {
  const { favorites, cart } = useProductsState();
  const scrollUp = useScrollDirection();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { pathname } = useLocation();
  const pathNames = pathname.split('/');
  const currentPage = pathNames[1];

  const hasInput =
    (currentPage === 'phones' ||
      currentPage === 'tablets' ||
      currentPage === 'accessories') &&
    pathNames.length < 3;

  return (
    <>
      <header
        id="header"
        className={`${styles.header} ${scrollUp ? styles.header__show : styles.header__hide}`}
      >
        <div className={styles.header__container}>
          <Link to={'/'}>
            <div className={styles.header__logo}>
              <img className={styles.header__logo} src={logo} alt="logo" />
            </div>
          </Link>

          <HeaderNavigation currentClass={'navigation__items--desktop'} />

          {hasInput && <SearchItem pathname={pathname} />}

          <div className={styles.header__buttons}>
            <HeaderLinks
              favorites={favorites}
              cart={cart}
              customClass={'header__links--desctop'}
            />

            <div
              className={styles.header__menu}
              onClick={() => setIsOpenMenu(prev => !prev)}
            >
              <img src={menu} alt="icon-menu" />
            </div>
          </div>
        </div>
      </header>

      <Menu
        favorites={favorites}
        cart={cart}
        isOpenMenu={isOpenMenu}
        setIsOpenMenu={setIsOpenMenu}
      />
    </>
  );
};
