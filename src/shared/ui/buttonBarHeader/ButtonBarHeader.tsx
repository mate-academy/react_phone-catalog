import { NavLink, useLocation } from 'react-router-dom';
import React, { useContext } from 'react';
import styles from './ButtonBarHeader.module.scss';
import { ProductsStateContext } from '../../context/ProductsContext';
import { CartStateContext } from '../../context/CartContext';

type Props = {
  className?: string;
};

export const ButtonBarHeader: React.FC<Props> = ({ className = '' }) => {
  const location = useLocation();
  const isBurgerOpen = location.pathname === '/burgerMenu';

  const { products } = useContext(ProductsStateContext);
  const { cartItems } = useContext(CartStateContext);

  const favProductsQuantity = products.filter(product =>
    product.hasOwnProperty('isFavorite'),
  ).length;

  const cartProductsQuantity = cartItems
    .map(cartItem => cartItem.quantity)
    .reduce((sum, quantity) => sum + quantity, 0);

  return (
    <div className={`${styles.buttonBar} ${className}`}>
      <NavLink
        to="favorites"
        className={({ isActive }) =>
          isActive ? styles.activeButton : styles.button
        }
      >
        <div className={styles.iconWrapper} data-count={favProductsQuantity}>
          <img
            src={`img/icons/favorites.svg`}
            alt="Favorite"
            className={styles.img}
          />
        </div>
      </NavLink>
      <NavLink
        to="cart"
        className={({ isActive }) =>
          isActive ? styles.activeButton : styles.button
        }
      >
        <div className={styles.iconWrapper} data-count={cartProductsQuantity}>
          <img src={`img/icons/cart.svg`} alt="Cart" />
        </div>
      </NavLink>
      <NavLink
        to={isBurgerOpen ? '/' : '/burgerMenu'}
        className={styles.buttonMobile}
      >
        <img
          src={isBurgerOpen ? `img/icons/close.svg` : `img/icons/menu.svg`}
          alt={isBurgerOpen ? 'Close menu' : 'Open menu'}
        />
      </NavLink>
    </div>
  );
};
