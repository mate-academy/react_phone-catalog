import type React from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../../../../helper';
import type { CartItem } from '../../../../types/CartItem';
import styles from './CartItemDetails.module.scss';

type Props = {
  item: CartItem;
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
};

export const CartItemDetails: React.FC<Props> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const { id, quantity, product } = item;

  return (
    <div className={styles['cart-item']}>
      <div className={styles.info}>
        <button
          type="button"
          className={styles.remove}
          onClick={() => onRemove(id)}
        >
          <img src={asset('img/close-secondary.svg')} alt="" />
        </button>
        <Link
          to={`/${product.category}/${product.id}`}
          className={styles['product-link']}
        >
          <img
            className={styles.image}
            src={asset(product.images[0])}
            alt={product.name}
          />
          <p className={styles.name}>{product.name}</p>
        </Link>
      </div>

      <div className={styles.controls}>
        <div className={styles.quantity}>
          <button
            type="button"
            className={styles['quantity-button']}
            disabled={quantity <= 1}
            onClick={() => onQuantityChange(id, -1)}
          >
            –
          </button>
          <span className={styles['quantity-value']}>{quantity}</span>
          <button
            type="button"
            className={styles['quantity-button']}
            onClick={() => onQuantityChange(id, 1)}
          >
            +
          </button>
        </div>
        <p className={styles.price}>${product.priceDiscount * quantity}</p>
      </div>
    </div>
  );
};
