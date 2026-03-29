import { X, Minus, Plus } from 'lucide-react';
import {
  useProductStore,
  CartItem as CartItemType,
} from '@/store/productStore';
import styles from './CartItem.module.scss';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useProductStore();
  const { product, quantity } = item;

  return (
    <div className={styles.item}>
      <button
        className={styles.removeBtn}
        onClick={() => removeFromCart(product.id)}
        aria-label="Remove"
      >
        <X size={14} strokeWidth={2} />
      </button>

      <img
        src={`/${product.image}`}
        alt={product.name}
        className={styles.image}
      />

      <p className={styles.name}>{product.name}</p>

      <div className={styles.controls}>
        <button
          className={styles.controlBtn}
          onClick={() => decreaseQuantity(product.id)}
          disabled={quantity <= 1}
        >
          <Minus size={14} />
        </button>
        <span className={styles.quantity}>{quantity}</span>
        <button
          className={styles.controlBtn}
          onClick={() => increaseQuantity(product.id)}
        >
          <Plus size={14} />
        </button>
      </div>

      <p className={styles.price}>${product.price * quantity}</p>
    </div>
  );
};
