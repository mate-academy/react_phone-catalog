import React, { useContext } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../store/CartContext';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';
import styles from './ShoppingCart.module.scss';
import cart from '../../images/icons/shopping_bag.svg';
import cart_dark from '../../images/icons/cart_for_dark.svg';

type Props = {
  className?: string;
};

export const ShoppingCart: React.FC<Props> = ({ className }) => {
  const { cartProducts } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  return (
    <NavLink
      to="/cart"
      className={({ isActive }) =>
        cn(
          {
            [styles.cart__item]: theme === Theme.Light,
            [styles['cart__item--active']]: isActive && theme === Theme.Light,
            [styles['cart__item-dark']]: theme === Theme.Dark,
            [styles['cart__item-dark--active']]:
              isActive && theme === Theme.Dark,
          },
          className,
        )
      }
    >
      <img
        src={theme === Theme.Light ? cart : cart_dark}
        alt="Shopping Cart"
        className={styles.cart__image}
      />
      {cartProducts.length > 0 && (
        <span className={styles.cart__count}>{cartProducts.length}</span>
      )}
    </NavLink>
  );
};
