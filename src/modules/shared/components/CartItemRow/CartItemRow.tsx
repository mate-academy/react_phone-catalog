import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import {
  changeQuantity,
  removeFromCart,
  type CartItem,
} from '../../../../features/cartAndFavoritesSlice';
import styles from './CartItemRow.module.scss';

interface Props {
  item: CartItem;
}

export const CartItemRow: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { itemId, name, price, image, quantity, category } = item;

  return (
    <div className={styles.itemRow}>
      <button
        type="button"
        className={styles.removeButton}
        onClick={() => dispatch(removeFromCart(itemId))}
        aria-label={`Remove ${name} from cart`}
      >
        <img src="img/Close.svg" alt="Remove" />
      </button>

      <img src={`${image}`} alt={name} className={styles.image} />

      <p className={styles.name}>
        <Link to={`/${category}/${itemId}`}> {name}</Link>
      </p>

      <div className={styles.quantityWrapper}>
        <button
          type="button"
          className={`${styles.quantityButton} ${styles.minus}`}
          disabled={quantity <= 1}
          onClick={() => dispatch(changeQuantity({ itemId, delta: -1 }))}
          aria-label="Decrease quantity"
        >
          <img src="img/Minus.svg" alt="Minus" />
        </button>

        <span className={styles.quantityNumber}>{quantity}</span>

        <button
          type="button"
          className={`${styles.quantityButton} ${styles.plus}`}
          onClick={() => dispatch(changeQuantity({ itemId, delta: 1 }))}
          aria-label="Increase quantity"
        >
          <img src="img/Plus.svg" alt="Plus" />
        </button>
      </div>

      <span className={styles.price}>${price * quantity}</span>
    </div>
  );
};
