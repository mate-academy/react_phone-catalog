import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../../../types/CartItem';
import { Icon } from '../../../shared/components/Icon';
import { useCart } from '../../../shared/context/CartContext';
import styles from './CartItem.module.scss';

interface Props {
  item: CartItemType;
}

export const CartItem = ({ item }: Props) => {
  const { removeFromCart, changeQuantity } = useCart();
  const { id, quantity, product } = item;
  const path = `/product/${product.itemId}`;

  return (
    <article className={styles.item}>
      <button
        type="button"
        className={styles.remove}
        aria-label={`Remove ${product.name} from cart`}
        onClick={() => removeFromCart(id)}
      >
        <Icon name="close" />
      </button>

      <Link
        to={path}
        className={styles.imageLink}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={product.image} alt="" className={styles.image} />
      </Link>

      <Link to={path} className={styles.title}>
        {product.name}
      </Link>

      <div className={styles.quantity}>
        <button
          type="button"
          className={styles.control}
          aria-label="Decrease quantity"
          disabled={quantity <= 1}
          onClick={() => changeQuantity(id, -1)}
        >
          <Icon name="minus" />
        </button>

        <span className={styles.count} aria-live="polite">
          {quantity}
        </span>

        <button
          type="button"
          className={styles.control}
          aria-label="Increase quantity"
          onClick={() => changeQuantity(id, 1)}
        >
          <Icon name="plus" />
        </button>
      </div>

      <p className={styles.price}>${product.price * quantity}</p>
    </article>
  );
};
