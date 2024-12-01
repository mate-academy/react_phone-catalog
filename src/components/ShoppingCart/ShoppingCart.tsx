import React, { useContext } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './ShoppingCart.module.scss';
import cart from '../../images/icons/shopping_bag.svg';
import { CartContext } from '../../store/CartContext';

type Props = {
  className?: string;
};

export const ShoppingCart: React.FC<Props> = ({ className }) => {
  const { cartProducts } = useContext(CartContext);

  return (
    <NavLink
      to="/cart"
      className={({ isActive }) =>
        cn(
          styles.cart__item,
          { [styles['cart__item--active']]: isActive },
          className,
        )
      }
    >
      <img src={cart} alt="Shopping Cart" className={styles.cart__image} />
      {cartProducts.length > 0 && (
        <span className={styles.cart__count}>{cartProducts.length}</span>
      )}
    </NavLink>
  );
};
