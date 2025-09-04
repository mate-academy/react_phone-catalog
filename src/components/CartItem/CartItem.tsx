import React from 'react';
import styles from './CartItem.module.scss';
import { Product } from '../../types/Product';
import classNames from 'classnames';
import { useCartDispatch } from '../../contexts/CartContext';

type Props = {
  cartItem: {
    product: Product;
    quantity: number;
  };
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { product, quantity } = cartItem;
  const dispatch = useCartDispatch();

  const handleRemoveItem = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: cartItem.product.id });
  };

  const handleIncreaseQuantity = () => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: cartItem.product.id });
  };

  const handleDecreaseQuantity = () => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: cartItem.product.id });
  };

  return (
    <article className={styles.cartItem}>
      <button className={styles.cartItem__delete} onClick={handleRemoveItem}>
        <img
          className={styles.cartItem__imgDelete}
          src="icons/delete-icon.svg"
          alt="remove item"
        />
      </button>
      <img
        className={styles.cartItem__img}
        src={product.image}
        alt={product.name}
      />
      <span className={styles.cartItem__name}>{product.name}</span>
      <div className={styles.cartItem__counterBox}>
        <button
          className={classNames(
            styles.cartItem__btn,
            styles.cartItem__btnMinus,
            { [styles.cartItem__btnDisabled]: quantity === 1 },
          )}
          onClick={handleDecreaseQuantity}
        ></button>
        <span className={styles.cartItem__count}>{quantity}</span>
        <button
          className={classNames(styles.cartItem__btn, styles.cartItem__btnPlus)}
          onClick={handleIncreaseQuantity}
        ></button>
      </div>
      <span className={styles.cartItem__price}>
        ${product.fullPrice * quantity}
      </span>
    </article>
  );
};
