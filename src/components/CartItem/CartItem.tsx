import { Link } from 'react-router-dom';
import type { CartItem as CartItemType } from '../../shared/types';
import { useShop } from '../../shared/context/ShopContext';
import styles from './CartItem.module.scss';

export function CartItemView({ item }: { item: CartItemType }) {
  const { changeQuantity, removeFromCart } = useShop();

  return (
    <article className={styles.item}>
      <button
        className={styles.remove}
        onClick={() => removeFromCart(item.id)}
        aria-label="Remove item"
      >
        ×
      </button>
      <Link to={`/product/${item.product.id}`} className={styles.product}>
        <img src={item.product.image} alt={item.product.name} />
        <span>{item.product.name}</span>
      </Link>
      <div className={styles.quantity}>
        <button
          onClick={() => changeQuantity(item.id, -1)}
          disabled={item.quantity <= 1}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() => changeQuantity(item.id, 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <strong className={styles.total}>
        ${item.product.price * item.quantity}
      </strong>
    </article>
  );
}
