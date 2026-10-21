import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../context/CartContext';
import styles from './CartItem.module.scss';

type Props = {
  item: CartItemType;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
};

export const CartItem = ({ item, onRemove, onQuantityChange }: Props) => {
  const { id, quantity, product } = item;
  const { itemId, name, price, image } = product;

  return (
    <article className={styles.item}>
      <button
        type="button"
        className={styles.removeButton}
        onClick={() => onRemove(id)}
        aria-label="Remove from cart"
      >
        ✕
      </button>
      <Link to={`/product/${itemId}`} className={styles.imageLink}>
        <img src={`/${image}`} alt={name} className={styles.image} />
      </Link>

      <Link to={`/product/${itemId}`} className={styles.title}>
        {name}
      </Link>

      <div className={styles.quantity}>
        <button
          type="button"
          className={styles.quantityButton}
          onClick={() => onQuantityChange(id, quantity - 1)}
          disabled={quantity === 1}
          aria-label="Decrease quantity"
        >
          -
        </button>

        <span className={styles.quantityValue}>{quantity}</span>

        <button
          type="button"
          className={styles.quantityButton}
          onClick={() => onQuantityChange(id, quantity + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <span className={styles.price}>${price * quantity}</span>
    </article>
  );
};
