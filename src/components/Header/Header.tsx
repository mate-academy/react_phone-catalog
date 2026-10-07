import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import styles from './Header.module.scss';
import { useContext, useMemo, useState } from 'react';
import { BurgerMenu } from '../BurgerMenu';
import favourites from '../../Icons/Favourites(HeartLike).svg';
import cart from '../../Icons/Group17.svg';
import cn from 'classnames';
import { ItemsCounter } from '../ItemsCounter';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { CartContext } from '../../contexts/CartContext';
import { ThemeToggle } from '../ThemeToggle';
import { Search } from '../Search';

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
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={cn(styles.header, {
        [styles.on__allpage]: isOpen,
      })}
    >
      <div className={styles.header__top}>
        <NavLink to="/" className={styles.logo__link}>
          <img src={logo} alt="logo-img" className={styles.logo__img} />
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

          <div className={styles.nav__actions}>
            <Search />
            <div className={styles.nav__buttons}>
              <div className={styles.toggle__wrapper}>
                <ThemeToggle />
              </div>
              <NavLink
                to="/favourites"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.icon__link} ${styles['icon__link--active']}`
                    : styles.icon__link
                }
                title="Favourites"
              >
                <div className={styles.img__wrapper}>
                  <img src={favourites} alt="favourites" />
                  {favorites.length >= 1 && (
                    <ItemsCounter quantity={favorites.length} />
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
                title="Cart"
              >
                <div className={styles.img__wrapper}>
                  <img src={cart} alt="cart" />
                  {cartProducts.length >= 1 && (
                    <ItemsCounter quantity={cartCounter} />
                  )}
                </div>
              </NavLink>
            </div>
          </div>
        </nav>

        <div className={styles.mobile__controls}>
          <div className={styles.mobile__search}>
            <Search />
          </div>
          <ThemeToggle />
          {!isOpen ? (
            <button
              type="button"
              className={`${styles.icon} ${styles['icon--menu']}`}
              onClick={handleSetIsOpen}
              aria-label="Open menu"
            />
          ) : (
            <button
              type="button"
              className={`${styles.icon} ${styles['icon--menu--cross']}`}
              onClick={handleSetIsOpen}
              aria-label="Close menu"
            />
          )}
        </div>
      </div>
      <BurgerMenu isOpen={isOpen} handleSetIsOpen={handleSetIsOpen} />
    </header>
  );
};
