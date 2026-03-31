import React from 'react';
import { CartItems } from '../../../../types/Product';
import styles from './CartItem.module.scss';

type Props = {
  cart: CartItems;
  onRemove: (id: string) => void;
  onDecrease: (id: string) => void;
  onIncrease: (id: string) => void;
};

export const CartItem: React.FC<Props> = ({
  cart,
  onRemove,
  onDecrease,
  onIncrease,
}) => {
  return (
    <article className={styles.cartItem}>
      <div className={styles.top}>
        <button
          type="button"
          className={styles.removeButton}
          aria-label="Remove from cart"
          onClick={() => onRemove(cart.id)}
        >
          <img src="/img/icon/close.svg" alt="" />
        </button>
        <a href="" className={styles.imageLink}>
          <img
            src={`/${cart.product.image}`}
            alt={cart.product.name}
            className={styles.image}
          />
        </a>
        <p className={styles.title}>{cart.product.name}</p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.quantityControls}>
          <button
            type="button"
            className={styles.quantityButton}
            aria-label="Decrease quantity"
            onClick={() => onDecrease(cart.id)}
          >
            <img src="/img/icon/minus.svg" alt="" />
          </button>
          <span className={styles.quantity}>{cart.quantity}</span>
          <button
            type="button"
            className={styles.quantityButton}
            aria-label="Increase quantity"
            onClick={() => onIncrease(cart.id)}
          >
            <img src="/img/icon/plus.svg" alt="" />
          </button>
        </div>
        <span className={styles.price}>{`$${cart.product.price}`}</span>
      </div>
    </article>
  );
};
