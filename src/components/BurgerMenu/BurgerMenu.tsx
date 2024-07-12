import React from 'react';
import styles from './BurgerMenu.module.scss';
import classNames from 'classnames';
import { PageSection } from '../../types/PageSection';
import { useAppContext } from '../../AppContext';
import { NavLink, useNavigate } from 'react-router-dom';

export const BurgerMenu: React.FC = () => {
  const { setCurrentPage, currentPage } = useAppContext();
  const { cart, favourites } = useAppContext();
  const navigate = useNavigate();

  const handleCloseMenu = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleOpenPage = (link: PageSection) => {
    debugger;
    setCurrentPage(link);
  };

  const handleSetCart = () => {
    setCurrentPage(PageSection.Cart);
  };

  const handleSetFavourite = () => {
    setCurrentPage(PageSection.Favorites);
  };

  const pagesToShow = Object.values(PageSection).filter(
    link => link !== PageSection.Favorites && link !== PageSection.Cart,
  );

  return (
    <div id="menu" className={classNames(styles.menu)}>
      <div className={styles.menu__header}>
        <a href="#" className={styles.menu__logo}>
          <img src="img/Logo.svg" alt="" />
        </a>
        <button className={styles.menu__close} onClick={handleCloseMenu}>
          <span className={styles['menu__icon-close']}></span>
        </button>
      </div>
      <nav className={styles.menu__navigation}>
        <ul className={styles.menu__list}>
          {pagesToShow.map(link => (
            <li
              className={classNames(
                styles.menu__item,
                styles['menu__item--page'],
                {
                  [styles['menu__item--active']]: currentPage === link,
                },
              )}
              key={link}
              onClick={() => handleOpenPage(link)}
            >
              <NavLink
                to={link === PageSection.Home ? '/' : `/${link.toLowerCase()}`}
                className={classNames(styles.menu__link, {
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
          onClick={handleSetFavourite}
          className={styles['menu__footer-link']}
        >
          <img src="img/header/favorite.svg" alt="favorite" />
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
          onClick={handleSetCart}
          className={styles['menu__footer-link']}
        >
          <img src="img/header/cart.svg" alt="cart" />
          {cart.length > 0 && (
            <span
              className={`${styles.menu__span} ${styles['menu__span--cart']}`}
            >
              {cart.length}
            </span>
          )}
        </NavLink>
      </div>
    </div>
  );
};
