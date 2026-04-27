import { Link } from 'react-router-dom';
import { CartItem } from '../../../shared/types/catalog';
import {
  formatPrice,
  getProductImagePath,
} from '../../../shared/utils/catalog';
import styles from './CartItemCard.module.scss';

interface Props {
  item: CartItem;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
}

export const CartItemCard = ({
  item,
  onDecrease,
  onIncrease,
  onRemove,
}: Props) => (
  <article className={styles.card}>
    <button
      type="button"
      className={styles.remove}
      onClick={onRemove}
      aria-label="Remove"
    >
      <i className="fa-solid fa-xmark" />
    </button>

    <Link to={`/product/${item.product.itemId}`} className={styles.imageLink}>
      <img
        src={getProductImagePath(item.product.image)}
        alt={item.product.name}
        className={styles.image}
      />
    </Link>

    <div className={styles.main}>
      <Link to={`/product/${item.product.itemId}`} className={styles.title}>
        {item.product.name}
      </Link>

      <div className={styles.footer}>
        <div className={styles.quantity}>
          <button type="button" className={styles.stepper} onClick={onDecrease}>
            <i className="fa-solid fa-minus" />
          </button>
          <span>{item.quantity}</span>
          <button type="button" className={styles.stepper} onClick={onIncrease}>
            <i className="fa-solid fa-plus" />
          </button>
        </div>

        <strong className={styles.price}>
          {formatPrice(item.product.price * item.quantity)}
        </strong>
      </div>
    </div>
  </article>
);
