import React from 'react';
import styles from './pageMenu.module.scss';
import { NavLink } from 'react-router-dom';
import FavoritesHeardIcon from './Pictures/Favourites (Heart Like).png';
import FavoritesDark from './Pictures/favoritesDark.png';
import shopsIcon from './Pictures/Shopping bag (Cart).png';
import shopsIconDark from './Pictures/shopDark.png';
import { useAppSelector } from '../../Hooks/hooks';
import { Header } from '../Header/Header';
import { Theme } from '../../Helpers/theme';
import { motion } from 'framer-motion';

export const PageMenu: React.FC = () => {
  const items = useAppSelector(state => state.cartAndFavorits.favorites);
  const cart = useAppSelector(state => state.cartAndFavorits.cart);
  const theme = useAppSelector(state => state.theme.theme);

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return [
      isActive ? styles.isActive : '',
      theme === Theme.light
        ? styles.navigation__links
        : styles.navigation__linksDark,
    ].join(' ');
  };

  const animationVariants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={animationVariants}
        transition={{ duration: 0.5 }}
      >
        <Header />
        <section
          className={
            theme === Theme.light
              ? styles.PageMenuSection
              : styles.PageMenuSectionDark
          }
        >
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
          <div
            className={
              theme === Theme.light
                ? styles.buttonsContainer
                : styles.buttonsContainerDark
            }
          >
            <NavLink
              to={'/favorites'}
              className={
                theme === Theme.light
                  ? styles.buttonsLink
                  : styles.buttonsLinkDark
              }
            >
              <div
                className={
                  theme === Theme.light
                    ? styles.menuButtons
                    : styles.menuButtonsDark
                }
              >
                {items.length > 0 && (
                  <div className={styles.favoriteCounts}>{items.length}</div>
                )}
                <img
                  className={styles.pageButtonIcon}
                  src={
                    theme === Theme.light ? FavoritesHeardIcon : FavoritesDark
                  }
                  alt="Favorites"
                />
              </div>
            </NavLink>
            <NavLink
              to={'/cart'}
              className={
                theme === Theme.light
                  ? styles.buttonsLink
                  : styles.buttonsLinkDark
              }
            >
              <div
                className={
                  theme === Theme.light
                    ? styles.menuButtons
                    : styles.menuButtonsDark
                }
              >
                {cart.length > 0 && (
                  <div className={styles.favoriteCounts}>{cart.length}</div>
                )}
                <img
                  className={styles.pageButtonIcon}
                  src={theme === Theme.light ? shopsIcon : shopsIconDark}
                  alt="Shopping"
                />
              </div>
            </NavLink>
          </div>
        </section>
      </motion.div>
    </>
  );
};
