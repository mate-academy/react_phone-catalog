import { Link } from 'react-router-dom';
import {
  useCart,
  type CartItem as CartItemType,
} from '../../context/CartContext';
import styles from './CartItem.module.scss';

interface Props {
  item: CartItemType;
}

export const CartItem = ({ item }: Props) => {
  const { removeFromCart, changeQuantity } = useCart();

  const { product, quantity } = item;
  const productLink = `/product/${product.itemId}`;

  return (
    <article className={styles.item}>
      <button
        type="button"
        className={styles.remove}
        aria-label="Remove from cart"
        onClick={() => removeFromCart(item.id)}
      >
        ×
      </button>

      <Link to={productLink} className={styles.imageLink}>
        <img className={styles.image} src={product.image} alt={product.name} />
      </Link>

      <Link to={productLink} className={styles.name}>
        {product.name}
      </Link>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.quantityButton}
          aria-label="Decrease quantity"
          disabled={quantity === 1}
          onClick={() => changeQuantity(item.id, -1)}
        >
          −
        </button>

        <span className={styles.quantity}>{quantity}</span>

        <button
          type="button"
          className={styles.quantityButton}
          aria-label="Increase quantity"
          onClick={() => changeQuantity(item.id, 1)}
        >
          +
        </button>
      </div>
      <p className={styles.price}>${product.price * quantity}</p>
    </article>
  );
};
