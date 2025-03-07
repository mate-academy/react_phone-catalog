import { Link, NavLink, useSearchParams } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '/img/Logo.svg';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';
import { useEffect, useState } from 'react';
import { Burger } from '../Burger';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

const getClassName = (baseClass: string) =>
  function ({ isActive }: { isActive: boolean }) {
    return classNames(styles[baseClass], { [styles['is-active']]: isActive });
  };

const getLinkClass = getClassName('navbar--item');
const getButtonClass = getClassName('button');

export const Header = () => {
  const [searchParams] = useSearchParams();
  const isMenuOpen = searchParams.get('menu');
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <>
      <header className={styles.header}>
        <nav className="navbar is-flex">
          <NavLink to="/" className={styles.navbarBrand}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </NavLink>
          {isMobile && (
            <Link
              className={classNames(styles.burger__button, {
                [styles['is-active']]: isMenuOpen,
              })}
              role="button"
              aria-label="menu"
              aria-expanded="false"
              to={{
                search: getSearchWith(searchParams, {
                  menu: isMenuOpen === 'open' ? null : 'open',
                }),
              }}
            >
              
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </Link>
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
            <NavLink to="favourites" className={getButtonClass}>
              <span
                className={classNames(styles.icon, styles['icon--heart'])}
              ></span>
            </NavLink>
            <NavLink to="cart" className={getButtonClass}>
              <span
                className={classNames(styles.icon, styles['icon--cart'])}
              ></span>
            </NavLink>
          </div>
        </nav>
      </header>
      {isMobile && <Burger />}
    </>
  );
};
