import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCartValues } from '../../store/CartStore';
import { useFavouriteValues } from '../../store/FavouriteContext';
import styles from './MobileMenu.module.scss';
import classNames from 'classnames';
import logo from '../../../public/img/Logo.png';
import deleteIcon from '../../../public/img/delete.png';
import favouriteIcon from '../../../public/img/favourite-icon.png';
import cartIcon from '../../../public/img/Shopping-cart.png';

type Props = {
  isOpenMenu: boolean;
  handleCloseMenu: () => void;
};

export const MobileMenu: React.FC<Props> = ({ isOpenMenu, handleCloseMenu }) => {
  const location = useLocation();
  const { cartCount } = useCartValues();
  const { favouritesCount } = useFavouriteValues();

  useEffect(() => {
    if (isOpenMenu) {
      document.body.classList.add(styles.noScroll);
    }

    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [isOpenMenu]);

  if (!isOpenMenu) {
    return null;
  }

  const handleNavClick = () => {
    handleCloseMenu();
  };

  return (
    <div className={styles.mobileMenu}>
      <header className={styles.MobileMenu__header}>
        <div className={styles.headerMenu__logo}>
          <img src={logo} alt="Logo" className={styles.headerMenu__logo_pict} />
        </div>
        <div className={styles.headerMenu__button}>
          <button 
            className={styles.headerMenu__button_icon} 
            onClick={handleCloseMenu}
          >
            <img
              src={deleteIcon}
              alt="icon close"
              className={classNames(styles.icon, styles.icon_menu)}
            />
          </button>
        </div>
      </header>

      <div className={styles.MobileMenu__body}>
        <nav className={styles.bodyMenu__nav}>
          <NavLink
            to="/"
            onClick={handleNavClick}
            className={({ isActive }) => classNames(styles.bodyMenu__nav_link, {
              [styles.is_active]: isActive,
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/phones"
            onClick={handleNavClick}
            className={({ isActive }) => classNames(styles.bodyMenu__nav_link, {
              [styles.is_active]: isActive,
            })}
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            onClick={handleNavClick}
            className={({ isActive }) => classNames(styles.bodyMenu__nav_link, {
              [styles.is_active]: isActive,
            })}
          >
            Tablets
          </NavLink>
          <NavLink
            to="/accessories"
            onClick={handleNavClick}
            className={({ isActive }) => classNames(styles.bodyMenu__nav_link, {
              [styles.is_active]: isActive,
            })}
          >
            Accessories
          </NavLink>
        </nav>
      </div>

      <div className={styles.MobileMenu__user}>
        <NavLink
          data-count={favouritesCount !== 0 ? `${favouritesCount}` : ''}
          to="/favourites"
          onClick={handleNavClick}
          className={({ isActive }) => classNames(
            styles.MobileMenu__user_icon,
            styles.icon_favourites,
            { [styles.is_active]: isActive },
          )}
        >
          <img
            src={favouriteIcon}
            alt="favourite icon"
            className={classNames(styles.icon, styles.icon_user)}
          />
        </NavLink>
        <NavLink
          data-count={cartCount !== 0 ? `${cartCount}` : ''}
          to="/cart"
          onClick={handleNavClick}
          className={({ isActive }) => classNames(
            styles.MobileMenu__user_icon,
            { [styles.is_active]: isActive },
          )}
        >
          <img
            src={cartIcon}
            alt="cart icon"
            className={classNames(styles.icon, styles.icon_user)}
          />
        </NavLink>
      </div>
    </div>
  );
};
