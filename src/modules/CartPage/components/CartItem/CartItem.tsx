import { Link } from 'react-router-dom';
import styles from './CartItem.module.scss';
import { CartItem as CartItemType } from '../../../shared/types';

interface Props {
  item: CartItemType;
  onRemove: () => void;
  onChangeQuantity: (quantity: number) => void;
}

export const CartItem: React.FC<Props> = ({
  item,
  onRemove,
  onChangeQuantity,
}) => (
  <div className={styles.item}>
    <button
      type="button"
      aria-label="Remove from cart"
      className={styles.remove}
      onClick={onRemove}
    >
      ×
    </button>
    <div className={styles.preview}>
      <img src={`/${item.product.image}`} alt={item.product.name} />
    </div>
    <Link to={`/product/${item.product.itemId}`} className={styles.title}>
      {item.product.name}
    </Link>

    <div className={styles.controls}>
      <button
        type="button"
        onClick={() => onChangeQuantity(item.quantity - 1)}
        disabled={item.quantity <= 1}
      >
        -
      </button>
      <span className={styles.count}>{item.quantity}</span>
      <button type="button" onClick={() => onChangeQuantity(item.quantity + 1)}>
        +
      </button>
    </div>

    <p className={styles.price}>
      ${(item.product.price * item.quantity).toLocaleString()}
    </p>
  </div>
);
