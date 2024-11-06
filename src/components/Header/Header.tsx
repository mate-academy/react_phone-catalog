/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
import { Favourites } from '../Favourites';
import { ShoppingCart } from '../ShoppingCart';

import styles from './Header.module.scss';
import menu from '../../images/icons/menu_burger.png';
import close from '../../images/icons/close.png';

export const Header = () => {
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    document.body.style.overflow = openMenu ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [openMenu]);

  return (
    <nav className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <Logo className={styles.header__logo} />
          <Navbar className={styles.header__navbar} />
        </div>

        <div className={styles.header__right}>
          <Favourites className={styles.header__favourites} />
          <ShoppingCart className={styles.header__cart} />

          {openMenu && pathname === '/menu' ? (
            <Link
              to="/"
              className={cn(styles.header__item_close)}
              onClick={handleCloseMenu}
            >
              <img src={close} alt="Cross" className={styles.header__image} />
            </Link>
          ) : (
            <Link
              to="/menu"
              className={cn(styles.header__item_menu)}
              onClick={handleOpenMenu}
            >
              <img src={menu} alt="Menu" className={styles.header__image} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
