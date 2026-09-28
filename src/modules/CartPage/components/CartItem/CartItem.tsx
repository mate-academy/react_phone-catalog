import React from 'react';
import { Link } from 'react-router-dom';
import type { CartItem as CartItemType } from '../../../shared/types';
import { Icon } from '../../../shared/components/Icon';
import { getImageUrl } from '../../../shared/utils/getImageUrl';
import styles from './CartItem.module.scss';

interface Props {
  item: CartItemType;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

export const CartItem: React.FC<Props> = ({
  item,
  onRemove,
  onQuantityChange,
}) => (
  <li className={styles.row}>
    <button
      type="button"
      className={styles.removeButton}
      aria-label={`Remove ${item.product.name} from cart`}
      onClick={() => onRemove(item.id)}
    >
      <Icon name="close" size={16} />
    </button>

    <Link to={`/product/${item.product.itemId}`} className={styles.info}>
      <img
        src={getImageUrl(item.product.image)}
        alt={item.product.name}
        className={styles.image}
      />
      <p className={styles.name}>{item.product.name}</p>
    </Link>

    <div className={styles.quantity}>
      <button
        type="button"
        className={styles.qtyButton}
        aria-label="Decrease quantity"
        disabled={item.quantity <= 1}
        onClick={() => onQuantityChange(item.id, item.quantity - 1)}
      >
        -
      </button>
      <span className={styles.qtyValue}>{item.quantity}</span>
      <button
        type="button"
        className={styles.qtyButton}
        aria-label="Increase quantity"
        onClick={() => onQuantityChange(item.id, item.quantity + 1)}
      >
        +
      </button>
    </div>

    <span className={styles.price}>${item.product.price * item.quantity}</span>
  </li>
);
