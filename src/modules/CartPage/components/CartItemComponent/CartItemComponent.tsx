import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../../../shared/types/Product';
import { useCart } from '../../../shared/context/CartContext';
import styles from './CartItemComponent.module.scss';

interface Props {
  item: CartItem;
}

export const CartItemComponent: React.FC<Props> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <div className={styles.item} data-cy="cartItem">
      <div className={styles.leftGroup}>
        <button
          type="button"
          onClick={() => removeFromCart(item.id)}
          className={styles.deleteButton}
          aria-label="Remove item"
          data-cy="cartDeleteButton"
        >
          <i className="fas fa-times" />
        </button>

        <Link to={`/product/${product.itemId}`} className={styles.imageWrapper}>
          <img
            src={`/${product.image}`}
            alt={product.name}
            className={styles.image}
          />
        </Link>

        <Link to={`/product/${product.itemId}`} className={styles.title}>
          {product.name}
        </Link>
      </div>

      <div className={styles.rightGroup}>
        <div className={styles.counter}>
          <button
            type="button"
            onClick={() => updateQuantity(item.id, quantity - 1)}
            disabled={quantity <= 1}
            className={styles.counterBtn}
            aria-label="Decrease quantity"
          >
            <i className="fas fa-minus" />
          </button>

          <span className={styles.quantity}>{quantity}</span>

          <button
            type="button"
            onClick={() => updateQuantity(item.id, quantity + 1)}
            className={styles.counterBtn}
            aria-label="Increase quantity"
          >
            <i className="fas fa-plus" />
          </button>
        </div>

        <span className={styles.price}>${product.price * quantity}</span>
      </div>
    </div>
  );
};
