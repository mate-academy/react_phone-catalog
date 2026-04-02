import type { Product } from '../../../types';
import styles from './CartItemCard.module.scss';
import type { CartItem as CartItemType } from '../../../types';

type Props = {
  item: CartItemType;
  onIncrease: (product: Product) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
};

export const CartItemCard: React.FC<Props> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className={styles.item}>
      <button
        className={styles.remove}
        onClick={() => onRemove(item.product.itemId)}
      >
        <img src="/img/close.png" alt="close" />
      </button>
      <img
        className={styles.image}
        src={item.product.image}
        alt={item.product.name}
      />
      <div className={styles.info}>{item.product.name}</div>
      <div className={styles.controls}>
        <button
          className={styles.controlButton}
          disabled={item.quantity === 1}
          onClick={() => onDecrease(item.product.itemId)}
        >
          -
        </button>
        <span className={styles.quantity}>{item.quantity}</span>
        <button
          className={styles.controlButton}
          onClick={() => onIncrease(item.product)}
        >
          +
        </button>
      </div>
      <div className={styles.price}>${item.product.price}</div>
    </div>
  );
};
