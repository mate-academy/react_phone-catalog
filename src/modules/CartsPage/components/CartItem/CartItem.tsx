import styles from './CartItem.module.scss';
import { useShop } from '../../../../store/ShopContext';
import { CartItems } from '../../../../types/Product';
import React from 'react';

type Props = {
  cart: CartItems;
};

export const CartItem: React.FC<Props> = ({ cart }) => {
  const { removeFromCart, decreaseQuantity, increaseQuantity } = useShop();

  return (
    <article className={styles.cartItem}>
      <div className={styles.top}>
        <button
          type="button"
          className={styles.removeButton}
          aria-label="Remove from cart"
          onClick={() => removeFromCart(cart.id)}
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
            onClick={() => decreaseQuantity(cart.id)}
          >
            <img src="/img/icon/minus.svg" alt="" />
          </button>
          <span className={styles.quantity}>{cart.quantity}</span>
          <button
            type="button"
            className={styles.quantityButton}
            aria-label="Increase quantity"
            onClick={() => increaseQuantity(cart.id)}
          >
            <img src="/img/icon/plus.svg" alt="" />
          </button>
        </div>
        <span className={styles.price}>{`$${cart.product.price}`}</span>
      </div>
    </article>
  );
};
