import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';
import { getSearchWith } from '../../shared/utils/searchHelper';

import { useEffect, useState } from 'react';

import logo from '/img/Logo.svg';
import { Burger } from '../Burger';
import { NavIcon } from '../NavIcon';
import styles from './Header.module.scss';

// const useMediaQuery = (query: string) => {
//   const [matches, setMatches] = useState(window.matchMedia(query).matches);

//   useEffect(() => {
//     const media = window.matchMedia(query);
//     const listener = () => setMatches(media.matches);

//     media.addEventListener('change', listener);

//     return () => media.removeEventListener('change', listener);
//   }, [query]);

//   return matches;
// };

const getClassName = (baseClass: string) =>
  function ({ isActive }: { isActive: boolean }) {
    return classNames(styles[baseClass], { [styles['is-active']]: isActive });
  };

const getLinkClass = getClassName('navbar--item');

export const Header = () => {
  // const [searchParams] = useSearchParams();
  // const isMenuOpen = searchParams.get('menu');
  // const isMobile = useMediaQuery('(max-width: 640px)');
  const isMobile = useMediaQuery({ maxWidth: 639 });

  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink to="/" className={styles.navbarBrand}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </NavLink>
          {isMobile && (
            <div
              className={classNames(styles.burger__button, {
                [styles['is-active']]: isMenuOpen,
              })}
              role="button"
              aria-label="menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              {/* need 4 spans for beautiful animation */}
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
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
          <div className={styles.buttons}>
            <NavIcon icon="heart" link="favourites" />
            <NavIcon icon="cart" link="cart" />
          </div>
        </nav>
      </header>
      {isMobile && <Burger isMenuOpen={isMenuOpen} />}
    </>
  );
};
