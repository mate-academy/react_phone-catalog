import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './BurgerMenu.module.scss';
import { HeaderPageListsSection } from '../../types/PageForShow';
import { useAppContext } from '../../AppContext';

export const BurgerMenu: React.FC = () => {
  const { setCurrentPage, currentPage } = useAppContext();
  const { cart, favourites } = useAppContext();
  const navigate = useNavigate();

  const handleCloseMenu = () => {
    navigate(-1);
  };

  const handleOpenPage = (link: HeaderPageListsSection) => {
    setCurrentPage(link);
  };

  const handleSetShopingCart = () => {
    setCurrentPage(HeaderPageListsSection.Cart);
  };

  const handleSetFavourites = () => {
    setCurrentPage(HeaderPageListsSection.Favorites);
  };

  const pageToShow = Object.values(HeaderPageListsSection).filter(
    link =>
      link !== HeaderPageListsSection.Favorites &&
      link !== HeaderPageListsSection.Cart,
  );

  return (
    <div className={styles.menu}>
      <div className={styles.menu__header}>
        <a href="#" className={styles.menu__logo}>
          <img src="./img/icons/Logo.png" alt="Nice Gadget Logo" />
        </a>
        <button className={styles.menu__close} onClick={handleCloseMenu}>
          <span className={styles['menu__icon-close']}></span>
        </button>
      </div>
      <nav className={styles.menu__navigation}>
        <ul className={styles.menu__list}>
          {pageToShow.map(link => (
            <li
              className={cn(styles.menu__item, styles['menu__item--page'], {
                [styles['menu__item--active']]: currentPage === link,
              })}
              key={link}
              onClick={() => handleOpenPage(link)}
            >
              <NavLink
                to={
                  link === HeaderPageListsSection.Home
                    ? '/'
                    : `/${link.toLowerCase()}`
                }
                className={cn(styles.menu__link, {
                  [styles['menu__link--active']]: currentPage === link,
                })}
              >
                {link}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.menu__footer}>
        <NavLink
          to="/favourites"
          className={styles['menu__footer-link']}
          onClick={handleSetFavourites}
        >
          <img
            src="./img/icons/Favourites-empty.svg"
            alt="Favourites (Heart Like)"
          />
          {favourites.length > 0 && (
            <span
              className={`${styles.menu__span} ${styles['menu__span--favourite']}`}
            >
              {favourites.length}
            </span>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className={styles['menu__footer-link']}
          onClick={handleSetShopingCart}
        >
          <img
            src="./img/icons/shoping-cart-empty.svg"
            alt="Shopping bag (Cart)"
          />
          {cart.length > 0 && (
            <span
              className={`${styles.menu__span} ${styles['menu__span--shopingcart']}`}
            >
              {cart.length}
            </span>
          )}
        </NavLink>
      </div>
    </div>
  );
};
