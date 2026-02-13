import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../../../types';
import { useCart } from '../../../../contexts/CartContext';
import styles from './CartItem.module.scss';

interface Props {
  item: CartItemType;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { dispatch } = useCart();

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: item.id });
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove();

      return;
    }

    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: item.id, quantity: newQuantity },
    });
  };

  return (
    <div className={styles.cartItem}>
      <button
        type="button"
        className={styles.cartItem__remove}
        onClick={handleRemove}
        aria-label="Remove item"
      >
        <img src="img/icons/icon-close.png" alt="Remove" />
      </button>

      <Link
        to={`/product/${item.product.id}`}
        className={styles.cartItem__imageLink}
      >
        <img
          src={item.product.image}
          alt={item.product.name}
          className={styles.cartItem__image}
        />
      </Link>

      <Link
        to={`/product/${item.product.id}`}
        className={styles.cartItem__name}
      >
        {item.product.name}
      </Link>

      <div className={styles.cartItem__quantity}>
        <button
          type="button"
          className={styles.cartItem__quantityBtn}
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
          aria-label="Decrease quantity"
        >
          <img src="img/icons/icon-subtraction.png" alt="Decrease" />{' '}
        </button>

        <span className={styles.cartItem__quantityValue}>{item.quantity}</span>

        <button
          type="button"
          className={styles.cartItem__quantityBtn}
          onClick={() => handleQuantityChange(item.quantity + 1)}
          aria-label="Increase quantity"
        >
          <img src="img/icons/icon-plus.png" alt="Increase" />
        </button>
      </div>

      <div className={styles.cartItem__price}>
        ${item.product.price * item.quantity}
      </div>
    </div>
  );
};
