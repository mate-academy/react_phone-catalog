/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
import { ShoppingCart } from '../ShoppingCart';
import { Favourites } from '../Favourites';

import styles from './Header.module.scss';
import menu from '../../images/icons/menu_burger.svg';
import close from '../../images/icons/close.svg';

export const Header = () => {
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = openMenu ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [openMenu]);

  useEffect(() => {
    if (pathname !== '/menu' && openMenu) {
      setOpenMenu(false);
      document.body.style.overflow = '';
    }
  }, [pathname, openMenu]);

  const handleOpenMenu = () => {
    setOpenMenu(true);
    navigate('/menu');
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
    navigate('/');
  };

  return (
    <nav className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <Logo className={styles.header__logo} />
          <Navbar className={styles.header__navbar} />
        </div>

        <div className={styles.header__right}>
          {openMenu ? (
            <button
              className={styles['header__menu-btn']}
              onClick={handleCloseMenu}
            >
              <img src={close} className={styles.header__image} />
            </button>
          ) : (
            <button
              className={styles['header__menu-btn']}
              onClick={handleOpenMenu}
            >
              <img src={menu} className={styles.header__image} />
            </button>
          )}

          {!openMenu && (
            <>
              <Favourites className={styles.header__favourites} />
              <ShoppingCart className={styles.header__cart} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
