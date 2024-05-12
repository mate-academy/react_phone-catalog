import React from 'react';
import styles from './pageMenu.module.scss';
import { NavLink } from 'react-router-dom';
import FavoritesHeardIcon from './Pictures/Favourites (Heart Like).png';
import shopsIcon from './Pictures/Shopping bag (Cart).png';
import { useAppSelector } from '../../Hooks/hooks';
import { Header } from '../Header/Header';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return [styles.navigation__links, isActive ? styles.isActive : ''].join(' ');
};

export const PageMenu: React.FC = () => {
  const items = useAppSelector(state => state.cartAndFavorits.favorites);
  const cart = useAppSelector(state => state.cartAndFavorits.cart);

  return (
    <>
      <Header />
      <section className={styles.PageMenuSection}>
        <div className={styles.pageMenuNav}>
          <nav className={styles.nav}>
            <ul className={styles.navigation}>
              <li className={styles.navigation__li}>
                <NavLink
                  to={{ pathname: '/', search: '' }}
                  className={getLinkClass}
                >
                  Home
                </NavLink>
              </li>
              <li className={styles.navigation__li}>
                <NavLink
                  to={{ pathname: '/phones', search: '' }}
                  className={getLinkClass}
                >
                  Phones
                </NavLink>
              </li>
              <li className={styles.navigation__li}>
                <NavLink
                  to={{ pathname: '/tablets', search: '' }}
                  className={getLinkClass}
                >
                  Tablets
                </NavLink>
              </li>
              <li className={styles.navigation__li}>
                <NavLink
                  to={{ pathname: '/accessories', search: '' }}
                  className={getLinkClass}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.buttonsContainer}>
          <NavLink to={'/favorites'} className={styles.buttonsLink}>
            <div className={styles.menuButtons}>
              {items.length > 0 && (
                <div className={styles.favoriteCounts}>{items.length}</div>
              )}
              <img
                className={styles.pageButtonIcon}
                src={FavoritesHeardIcon}
                alt="Favorites"
              />
            </div>
          </NavLink>
          <NavLink to={'/cart'} className={styles.buttonsLink}>
            <div className={styles.menuButtons}>
              {cart.length > 0 && (
                <div className={styles.favoriteCounts}>{cart.length}</div>
              )}
              <img
                className={styles.pageButtonIcon}
                src={shopsIcon}
                alt="Shopping"
              />
            </div>
          </NavLink>
        </div>
      </section>
    </>
  );
};
