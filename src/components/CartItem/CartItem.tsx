import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../types/CartItem';
import { useCart } from '../../context/CartContext';
import { normalizePath } from '../../api/products';
import styles from './CartItem.module.scss';

interface Props {
  cartItem: CartItemType;
}

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { removeFromCart, changeQuantity } = useCart();
  const { product, quantity } = cartItem;

  return (
    <div className={styles.cartItem} data-cy="cartItem">
      <button
        type="button"
        className={styles.deleteBtn}
        onClick={() => removeFromCart(product.id)}
        data-cy="cartDeleteButton"
      >
        ✕
      </button>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.imageLink}
      >
        <img
          src={normalizePath(product.image)}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.title}
        style={{ cursor: 'pointer' }}
      >
        {product.name}
      </Link>

      <div className={styles.counter}>
        <button
          type="button"
          className={styles.counterBtn}
          disabled={quantity <= 1}
          onClick={() => changeQuantity(product.id, -1)}
        >
          -
        </button>
        <span className={styles.quantity}>{quantity}</span>
        <button
          type="button"
          className={styles.counterBtn}
          onClick={() => changeQuantity(product.id, 1)}
        >
          +
        </button>
      </div>

      <span className={styles.price}>${product.price * quantity}</span>
    </div>
  );
};
