import { CartItem as CartItemType } from '../../types/CartItem';
import { useCart } from '../../context/CartContext';
import { getImageUrl } from '../../constants';
import styles from './CartItem.module.scss';

type Props = {
  item: CartItemType;
};

export const CartItem = ({ item }: Props) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <div className={styles.item}>
      <button
        type="button"
        className={styles.remove}
        aria-label="Remove from cart"
        onClick={() => removeFromCart(product.itemId)}
      >
        ×
      </button>

      <img
        src={getImageUrl(product.image)}
        alt={product.name}
        className={styles.image}
      />

      <div className={styles.details}>
        <span className={styles.name}>{product.name}</span>

        <div className={styles.bottomRow}>
          <div className={styles.quantity}>
            <button
              type="button"
              disabled={quantity <= 1}
              onClick={() => updateQuantity(product.itemId, quantity - 1)}
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              onClick={() => updateQuantity(product.itemId, quantity + 1)}
            >
              +
            </button>
          </div>

          <span className={styles.price}>${product.price * quantity}</span>
        </div>
      </div>
    </div>
  );
};
