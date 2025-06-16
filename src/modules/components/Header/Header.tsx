import { Link, useLocation } from 'react-router-dom';
import logo from '../../../img/navigation/logo.svg';
import logoBlack from '../../../img/navigation/logo-black.svg';
import menu from '../../../img/navigation/menu.svg';
import menuBlack from '../../../img/navigation/menu-black.svg';
import close from '../../../img/navigation/close.svg';
import closeBlack from '../../../img/navigation/close-black.svg';
import favourite from '../../../img/icons/favourite-button.svg';
import favouriteBlack from '../../../img/icons/favourite-button-black.svg';
import shoppingBag from '../../../img/icons/shopping-bag.svg';
import shoppingBagBlack from '../../../img/icons/shopping-bag-black.svg';
import { useState } from 'react';
import { Menu } from '../Menu';
import { useFavourites } from '../../../Context/FavoriteContext';
import styles from './Header.module.scss';
import { useCart } from '../../../Context/CartContext';
import { ModeSwitcher } from '../ModeSwitcher';

type Props = {
  isLightMode: boolean;
  handleSetMode: () => void;
};

export const Header: React.FC<Props> = ({ isLightMode, handleSetMode }) => {
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
          <img
            src={!isLightMode ? logo : logoBlack}
            alt="logo"
            className={styles.header__logo}
          />
        </Link>

        <div className={styles.header__menu__tablet}>
          <Menu isOpen={true} closeMenu={closeMenu} isLightMode={isLightMode} />
        </div>

        <div className={styles.header__icons}>
          <Link
            to="/favourites"
            className={`${styles.header__icon__item} ${pathname.includes('favourites') ? styles['header__icon__item--is-active'] : ''}`}
          >
            <img
              className={styles.header__icon__img}
              src={!isLightMode ? favourite : favouriteBlack}
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
          <Link
            to="/cart"
            className={`${styles.header__icon__item} ${pathname.includes('cart') ? styles['header__icon__item--is-active'] : ''}`}
          >
            <img
              className={styles.header__icon__img}
              src={!isLightMode ? shoppingBag : shoppingBagBlack}
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
          <div
            className={`${styles.header__mode} ${styles['header__item--menu-border']} ${styles['header__mode--tablet']}`}
          >
            <ModeSwitcher
              isLightMode={isLightMode}
              handleSetMode={handleSetMode}
            />
          </div>
        </div>

        <div className={styles.header__mobile__icons}>
          <div
            className={`${styles.header__mode} ${styles['header__item--menu-border']}`}
          >
            <ModeSwitcher
              isLightMode={isLightMode}
              handleSetMode={handleSetMode}
            />
          </div>

          <div className={styles.header__burger}>
            {openMenu ? (
              <div
                className={`${styles.header__item} ${styles['header__item--menu-close']}`}
                onClick={() => closeMenu()}
              >
                <img
                  src={!isLightMode ? close : closeBlack}
                  alt="close"
                  className={styles.header__menu}
                />
              </div>
            ) : (
              <div
                className={`${styles.header__item} ${styles['header__item--menu-border']}`}
                onClick={() => handleOpenMenu()}
              >
                <img
                  src={!isLightMode ? menu : menuBlack}
                  alt="menu"
                  className={styles.header__menu}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.header__menu__mobile}>
        <Menu
          isOpen={openMenu}
          closeMenu={closeMenu}
          isLightMode={isLightMode}
        />
      </div>
    </div>
  );
};
