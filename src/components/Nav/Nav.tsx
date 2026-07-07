import { useContext, useState } from 'react';
import { NavBar } from '../../types/NavBar';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';

import { HeaderCounter } from '../HeaderCounter';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CartContext } from '../../context/CartContext';

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartContext = useContext(CartContext);
  const favoritesContex = useContext(FavoritesContext);

  if (!cartContext || !favoritesContex) {
    throw new Error('Must be used within a CartProvider and FavoritesProvider');
  }

  const { cartItems } = cartContext;
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { favoritesItemsIds } = favoritesContex;

  return (
    <>
      <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        {!isOpen ? (
          <img
            className={styles.icon}
            src="img/icons/burger-menu.svg"
            alt="Menu button"
          />
        ) : (
          <img
            className={styles.icon}
            src="img/icons/icon-close.svg"
            alt="Close button"
          />
        )}
      </button>

      <div className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
        <ul className={styles.navList}>
          {Object.entries(NavBar).map(([key, value]) => (
            <li key={key} className={styles.navItem}>
              <NavLink
                to={`/${value}`}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
                onClick={() => setIsOpen(false)}
              >
                {key.toUpperCase()}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.iconsBlock}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? `${styles.iconLink} ${styles.active}` : styles.iconLink
            }
            onClick={() => setIsOpen(false)}
          >
            <img
              className={styles.icon}
              src="img/icons/fav-icon.svg"
              alt="Favorites icon"
            />

            {favoritesItemsIds.length > 0 && (
              <HeaderCounter quantity={favoritesItemsIds.length} />
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? `${styles.iconLink} ${styles.active}` : styles.iconLink
            }
            onClick={() => setIsOpen(false)}
          >
            <img
              className={styles.icon}
              src="img/icons/cart-icon.svg"
              alt="Cart icon"
            />

            {cartItems.length > 0 && <HeaderCounter quantity={totalQuantity} />}
          </NavLink>
        </div>
      </div>
    </>
  );
};
