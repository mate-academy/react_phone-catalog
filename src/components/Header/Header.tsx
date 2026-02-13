import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import styles from './Header.module.scss';
import { useContext, useMemo, useState } from 'react';
import { BurgerMenu } from '../BurgerMenu';
import favourites from '../../Icons/Favourites(HeartLike).svg';
import cart from '../../Icons/Group17.svg';
import cn from 'classnames';
import { ItemsCounter } from '../ItemsCounter';
// eslint-disable-next-line max-len
import { FavoritesContext } from '../../contexts/FavoritesContext/FavoritesContext';
import { CartContext } from '../../contexts/CartContext';

export const Header = () => {
  const { favorites } = useContext(FavoritesContext);
  const { cartProducts } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const cartCounter = useMemo(() => {
    return cartProducts.reduce((prev, product) => {
      return prev + product.quantity;
    }, 0);
  }, [cartProducts]);
  const handleSetIsOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <header
      className={cn(styles.header, {
        [styles.on__allpage]: isOpen,
      })}
    >
      {isOpen}
      <div className={styles.header__top}>
        <NavLink to="/">
          <img src={logo} alt="logo-img" />
        </NavLink>
        <nav className={styles['nav-bar']}>
          <ul className={styles.nav__list}>
            <li className={styles['nav__list--menu-items']}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.nav__link} ${styles['nav__link--active']}`
                    : styles.nav__link
                }
              >
                HOME
              </NavLink>
            </li>
            <li className={styles['nav__list--menu-items']}>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.nav__link} ${styles['nav__link--active']}`
                    : styles.nav__link
                }
              >
                PHONES
              </NavLink>
            </li>
            <li className={styles['nav__list--menu-items']}>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.nav__link} ${styles['nav__link--active']}`
                    : styles.nav__link
                }
              >
                TABLETS
              </NavLink>
            </li>
            <li className={styles['nav__list--menu-items']}>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.nav__link} ${styles['nav__link--active']}`
                    : styles.nav__link
                }
              >
                ACCESSORIES
              </NavLink>
            </li>
          </ul>
          <div className={styles.nav__buttons}>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                isActive
                  ? `${styles.icon__link} ${styles['icon__link--active']}`
                  : styles.icon__link
              }
            >
              <div className={styles.img__wrapper}>
                <img src={favourites} alt="favourites"></img>
                {favorites.length >= 1 && (
                  <ItemsCounter quantity={favorites.length}></ItemsCounter>
                )}
              </div>
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? `${styles.icon__link} ${styles['icon__link--active']}`
                  : styles.icon__link
              }
              state={{ from: pathname }}
            >
              <div className={styles.img__wrapper}>
                <img src={cart} alt="cart" />
                {cartProducts.length >= 1 && (
                  <ItemsCounter quantity={cartCounter}></ItemsCounter>
                )}
              </div>
            </NavLink>
          </div>
        </nav>

        {!isOpen ? (
          <button
            className={`${styles.icon} ${styles['icon--menu']}`}
            onClick={handleSetIsOpen}
          ></button>
        ) : (
          <button
            className={`${styles.icon} ${styles['icon--menu--cross']}`}
            onClick={handleSetIsOpen}
          ></button>
        )}
      </div>
      <BurgerMenu
        isOpen={isOpen}
        handleSetIsOpen={handleSetIsOpen}
      ></BurgerMenu>
    </header>
  );
};
