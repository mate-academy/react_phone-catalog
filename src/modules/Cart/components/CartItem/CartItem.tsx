import React from 'react';
import styles from './CartItem.module.scss';
import { ContextProps } from '../../../../types/ContextProps';
import { useOutletContext } from 'react-router-dom';
import { CartItemType } from '../../../../types/CartItem';

interface Props {
  product: CartItemType;
}

export const CartItem: React.FC<Props> = ({ product }) => {
  const { updateQuantity, removeFromCart } = useOutletContext<ContextProps>();

  const actualPrice = product.price || product.fullPrice;

  return (
    <div className={styles.cartItem}>
      <button
        className={styles.removeBtn}
        onClick={() => removeFromCart(product.itemId)}
      >
        x
      </button>

      <div className={styles.imageBox}>
        <img src={product.image} alt={product.name} />
      </div>

      <h3 className={styles.name}>{product.name}</h3>

      <div className={styles.controls}>
        <button
          onClick={() => updateQuantity(product.itemId, -1)}
          disabled={product.quantity <= 1}
          className={styles.controlBtn}
        >
          -
        </button>

        <span className={styles.quantity}>{product.quantity}</span>

        <button
          onClick={() => updateQuantity(product.itemId, 1)}
          className={styles.controlBtn}
        >
          +
        </button>
      </div>

      <span className={styles.price}>
        ${(actualPrice * product.quantity).toFixed(2)}
      </span>
    </div>
  );
};
