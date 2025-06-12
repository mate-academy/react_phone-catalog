import { Link, useLocation } from 'react-router-dom';
import logo from '../../../img/navigation/logo.svg';
import menu from '../../../img/navigation/menu.svg';
import close from '../../../img/navigation/close.svg';
import favourite from '../../../img/icons/favourite-button.svg';
import shoppingBag from '../../../img/icons/shopping-bag.svg';
import { useState } from 'react';
import { Menu } from '../Menu';
import { useFavourites } from '../../../Context/FavoriteContext';
import styles from './Header.module.scss';
import { useCart } from '../../../Context/CartContext';

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const location = useLocation();
  const pathname = location.pathname.replace(/^\//, '');
  const { favourites } = useFavourites();
  const { cartProducts } = useCart();

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__top}>
        <Link to="/" className={styles.header__item}>
          <img src={logo} alt="logo" className={styles.header__logo} />
        </Link>

        <div className={styles.header__menu__tablet}>
          <Menu isOpen={true} closeMenu={closeMenu} />
        </div>

        <div className={styles.header__icons}>
          <Link
            to="/favourites"
            className={`${styles.header__icon__item} ${pathname.includes('favourites') ? styles['header__icon__item--is-active'] : ''}`}
          >
            <img
              className={styles.header__icon__img}
              src={favourite}
              alt="Favourite-icon"
            />
            {favourites.length > 0 && (
              <div className={styles['header__icon__item--storage']}>
                <span className={styles['header__icon__item--text']}>
                  {favourites.length}
                </span>
              </div>
            )}
          </Link>
          <Link to="/cart" className={styles.header__icon__item}>
            <img
              className={styles.header__icon__img}
              src={shoppingBag}
              alt="Shopping-bag-icon"
            />
            {cartProducts.length > 0 && (
              <div className={styles['header__icon__item--storage']}>
                <span className={styles['header__icon__item--text']}>
                  {cartProducts.length}
                </span>
              </div>
            )}
          </Link>
        </div>

        <div className={styles.header__burger}>
          {openMenu ? (
            <div
              className={`${styles.header__item} ${styles['header__item--menu-close']}`}
              onClick={() => closeMenu()}
            >
              <img src={close} alt="close" className={styles.header__menu} />
            </div>
          ) : (
            <div
              className={`${styles.header__item} ${styles['header__item--menu-border']}`}
              onClick={() => handleOpenMenu()}
            >
              <img src={menu} alt="menu" className={styles.header__menu} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.header__menu__mobile}>
        <Menu isOpen={openMenu} closeMenu={closeMenu} />
      </div>
    </div>
  );
};
