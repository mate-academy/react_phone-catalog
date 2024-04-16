import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { icons } from '../../../global/Icons';

import styles from './AsideMenu.module.scss';
import stylesHeader from '../../Header.module.scss';
import classNames from 'classnames';
import { Navbar } from '../../../../components/Navbar';
import { menuItems } from '../../../../helpers/constArrs';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
};

const getBottomLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.bottomLink, {
    [styles.active]: isActive,
  });

export const AsideMenu: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();

  return (
    <aside className={classNames(styles.menu, { [styles.shown]: isMenuOpen })}>
      <div className={stylesHeader.header}>
        <div className={stylesHeader.headerLeft}>
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className={stylesHeader.logoLink}
          >
            {icons.logo}
          </Link>
        </div>
        <div className={stylesHeader.headerRight}>
          <button
            type="button"
            aria-label="side-menu"
            onClick={() => setIsMenuOpen(false)}
            className={classNames(stylesHeader.iconLink, stylesHeader.iconMob)}
          >
            {icons.close}
          </button>
        </div>
      </div>

      <div className="container">
        <div className={styles.navbarMenu}>
          <Navbar
            onClick={() => setIsMenuOpen(false)}
            links={menuItems}
            customStyle={styles.navLinks}
          />
        </div>
      </div>

      <div className={styles.menuBottom}>
        <NavLink
          to="favourites"
          onClick={() => setIsMenuOpen(false)}
          className={classNames(
            stylesHeader.iconLink,
            styles.bottomLink,
            getBottomLinkClass({
              isActive: location.pathname === '/favourites',
            }),
          )}
        >
          {icons.favourites}
        </NavLink>

        <NavLink
          to="cart"
          onClick={() => setIsMenuOpen(false)}
          className={classNames(
            stylesHeader.iconLink,
            styles.bottomLink,
            styles.noLeftBorder,
            getBottomLinkClass({ isActive: location.pathname === '/cart' }),
          )}
        >
          {icons.cart}
        </NavLink>
      </div>
    </aside>
  );
};
