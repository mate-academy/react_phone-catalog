/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { NavItem } from '../NavItem';
import { NAV_ITEMS } from '../../constants/constJS';
import { IconLink } from '../IconLink';
import { RoutesLink } from '../../types/routes';
import { useLocation } from 'react-router-dom';
import { BurgerMenu } from '../BurgerMenu';
import { useAppSelector } from '../../hooks/helperToolkit';
import { useDispatch } from 'react-redux';
import { loadFavoritesFromStorage } from '../../slices/favoritesSlice';
import { loadCardFromStorage } from '../../slices/cartSlice';
import { TransitionLink } from '../TransitionLink';
import { CountBadge } from '../CountBadge';

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const favoritesCount = useAppSelector(state => state.favorites.items.length);
  const cartItemCount = useAppSelector(state => state.cart.itemsCount);

  useEffect(() => {
    dispatch(loadFavoritesFromStorage());
    dispatch(loadCardFromStorage());
  }, [dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isFavoritesPage = location.pathname === RoutesLink.FavoritesPage;
  const isCartPage = location.pathname === RoutesLink.CartPage;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <TransitionLink to={RoutesLink.HomePage}>
              <div className={styles.logoIcon}></div>
            </TransitionLink>
          </div>

          <nav className={styles.navContainer}>
            <ul className={styles.navigation}>
              {NAV_ITEMS.map(item => (
                <NavItem key={item.name} {...item} />
              ))}
            </ul>
          </nav>

          <div className={styles.iconsBlock}>
            <div
              className={`${styles.favorites} ${
                isFavoritesPage ? styles.active : ''
              }`}
            >
              <IconLink
                to={RoutesLink.FavoritesPage}
                iconSrc={'img/icons/heart-icon.svg'}
                alt="The icon of favorites page"
                className={styles.favoritesButton}
              />

              <CountBadge count={favoritesCount} className={'headerCount'} />
            </div>

            <div
              className={`${styles.cart} ${isCartPage ? styles.active : ''}`}
            >
              <IconLink
                to={RoutesLink.CartPage}
                iconSrc={'img/icons/cart.svg'}
                alt="The icon of cart page"
                className={styles.cartButton}
              />

              <CountBadge count={cartItemCount} className={'headerCount'} />
            </div>

            <div className={styles.burgerIcon} onClick={toggleMenu}>
              <div
                className={`${styles.iconWrapper} ${isMenuOpen ? styles.active : ''}`}
              >
                <svg
                  className={styles.burgerIconSvg}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={styles.top}
                    d="M1 4.5C1 4.08579 1.39175 3.75 1.875 3.75H14.125C14.6082 3.75 15 4.08579 15 4.5C15 4.91421 14.6082 5.25 14.125 5.25H1.875C1.39175 5.25 1 4.91421 1 4.5Z"
                  />
                  <path
                    className={styles.middle}
                    d="M1 8C1 7.58579 1.39175 7.25 1.875 7.25H14.125C14.6082 7.25 15 7.58579 15 8C15 8.41421 14.6082 8.75 14.125 8.75H1.875C1.39175 8.75 1 8.41421 1 8Z"
                  />
                  <path
                    className={styles.bottom}
                    d="M1.875 10.75C1.39175 10.75 1 11.0858 1 11.5C1 11.9142 1.39175 12.25 1.875 12.25H14.125C14.6082 12.25 15 11.9142 15 11.5C15 11.0858 14.6082 10.75 14.125 10.75H1.875Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={`${styles.sideMenu} ${isMenuOpen ? styles.open : ''}`}>
        <BurgerMenu
          onClose={closeMenu}
          favoritesCount={favoritesCount}
          cartItemCount={cartItemCount}
        />
      </div>
    </>
  );
};
