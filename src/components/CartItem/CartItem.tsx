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

  const productLink = `/${product.category}/${product.itemId}`;

  return (
    <div className={styles.cartItem} data-cy="cartItem">
      <button
        type="button"
        className={styles.deleteBtn}
        onClick={() => removeFromCart(product.id)}
        aria-label={`Remove ${product.name} from cart`}
        data-cy="cartDeleteButton"
      >
        ✕
      </button>

      <Link to={productLink} className={styles.imageLink}>
        <img
          src={normalizePath(product.image)}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link to={productLink} className={styles.title}>
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
