import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.scss';

import logo from '../../img/icons/Logo.svg';
import favoritesIcon from '../../img/icons/Favourites.svg';
import cartIcon from '../../img/icons/Cart.svg';
import Search from '../../img/icons/Search.svg';

import { Icon } from '../Icon/Icon';

export const Header = () => {
  const pathnameArr = useLocation().pathname.split('/');
  const carrPage = pathnameArr[pathnameArr.length - 1];

  const pagesHasSearch: { [key: string]: boolean } = {
    phones: true,
    tablets: true,
    accessories: true,
    favourites: true,
    default: false,
  };

  const isShowSearch = pagesHasSearch[carrPage] || pagesHasSearch.default;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>

        <Icon path="/" icon={logo} alt="logo" />

        <ul className={styles.nav}>
          <li>
            <NavLink
              className={({ isActive }) => classNames('uppercase', {
                [styles.active]: isActive,
              })}
              to="/"
            >
              home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => classNames('uppercase', {
                [styles.active]: isActive,
              })}
              to="catalog/phones"
            >
              phones
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => classNames('uppercase', {
                [styles.active]: isActive,
              })}
              to="catalog/tablets"
            >
              tablets
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => classNames('uppercase', {
                [styles.active]: isActive,
              })}
              to="catalog/accessories"
            >
              accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.rightBlock}>
        { isShowSearch && (
          <form action="#" className={styles.rightForm}>
            <label>
              <input type="text" placeholder={`Search in ${carrPage}...`} />
            </label>
            <img src={Search} alt="search" />
          </form>
        )}

        <Icon
          path="/favourites"
          icon={favoritesIcon}
          stylesName={styles.rightIcons}
        />
        <Icon
          path="/cart"
          icon={cartIcon}
          stylesName={styles.rightIcons}
        />
      </div>
    </header>
  );
};
