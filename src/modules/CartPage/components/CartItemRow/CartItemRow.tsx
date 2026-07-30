import { Link } from 'react-router-dom';
import { CartItem } from '@/types/CartItem';
import { getImageUrl } from '@/utils/getImageUrl';
import { Icon } from '@/components/Icon';
import styles from './CartItemRow.module.scss';

type Props = {
  item: CartItem;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
};

export const CartItemRow = ({ item, onRemove, onQuantityChange }: Props) => {
  const { product, quantity } = item;

  return (
    <li className={styles.row}>
      <button
        type="button"
        className={styles.remove}
        aria-label="Remove from cart"
        onClick={() => onRemove(item.id)}
      >
        <Icon name="close" />
      </button>

      <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.name}>
        {product.name}
      </Link>

      <div className={styles.footer}>
        <div className={styles.quantity}>
          <button
            type="button"
            className={styles.quantityButton}
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => onQuantityChange(item.id, quantity - 1)}
          >
            <Icon name="minus" />
          </button>

          <span className={styles.quantityValue}>{quantity}</span>

          <button
            type="button"
            className={styles.quantityButton}
            aria-label="Increase quantity"
            onClick={() => onQuantityChange(item.id, quantity + 1)}
          >
            <Icon name="plus" />
          </button>
        </div>

        <span className={styles.price}>${product.price * quantity}</span>
      </div>
    </li>
  );
};
