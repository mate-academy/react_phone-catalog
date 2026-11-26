import React from 'react';
import styles from './CartItem.module.scss';
import { CartItem as CartItemType } from '../../types/CartItem';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

interface Props {
  item: CartItemType;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { quantity, product } = item;
  const { removeFromCart, changeQuantity } = useCart();

  return (
    <article className={styles.cartItem}>
      <div className={styles.cartItem__info}>
        <button
          type="button"
          aria-label="Remove item"
          className={`${styles.cartItem__button} ${styles.cartItem__remove}`}
          onClick={() => removeFromCart(product.id)}
        >
          <span
            className={`${styles.cartItem__icon} ${styles.cartItem__iconClose}`}
            aria-hidden="true"
          />
        </button>

        <Link
          to={`/product/${product.itemId}`}
          className={styles.cartItem__link}
        >
          <img src={product.image} alt="" className={styles.cartItem__image} />
          <h3 className={styles.cartItem__name}>{product.name}</h3>
        </Link>
      </div>

      <div className={styles.cartItem__bottom}>
        <div className={styles.cartItem__counter}>
          <button
            type="button"
            aria-label="Decrease quantity"
            className={`${styles.cartItem__button} ${styles.cartItem__counterButton}`}
            disabled={quantity <= 1}
            onClick={() => changeQuantity(product.id, -1)}
          >
            <span
              className={`${styles.cartItem__icon} ${styles.cartItem__iconMinus}`}
              aria-hidden="true"
            />
          </button>

          <span className={styles.cartItem__quantity}>{quantity}</span>

          <button
            type="button"
            aria-label="Increase quantity"
            className={`${styles.cartItem__button} ${styles.cartItem__counterButton}`}
            onClick={() => changeQuantity(product.id, 1)}
          >
            <span
              className={`${styles.cartItem__icon} ${styles.cartItem__iconPlus}`}
              aria-hidden="true"
            />
          </button>
        </div>

        <p className={styles.cartItem__price}>${product.price * quantity}</p>
      </div>
    </article>
  );
};
