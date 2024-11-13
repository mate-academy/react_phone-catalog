import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './ShoppingCart.module.scss';
import cart from '../../images/icons/shopping_bag.svg';

type Props = {
  className?: string;
};

export const ShoppingCart: React.FC<Props> = ({ className }) => {
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
    </NavLink>
  );
};
