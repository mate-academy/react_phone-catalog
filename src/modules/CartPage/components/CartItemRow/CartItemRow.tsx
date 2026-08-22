import { CartItem } from '../../../../types/CartItem';
import { useCart } from '../../../../contexts/CartContext';
import { Icon } from '../../../shared/components/Icon';
import { ProductImage } from '../../../shared/components/ProductImage';
import styles from './CartItemRow.module.scss';

type Props = {
  item: CartItem;
};

export const CartItemRow: React.FC<Props> = ({ item }) => {
  const { removeFromCart, setQuantity } = useCart();

  return (
    <li className={styles.row}>
      <button
        type="button"
        aria-label="Remove from cart"
        className={styles.row__remove}
        onClick={() => removeFromCart(item.id)}
      >
        <Icon name="close" />
      </button>

      <div className={styles.row__image}>
        <ProductImage src={item.product.image} alt={item.product.name} />
      </div>

      <p className={styles.row__title}>{item.product.name}</p>

      <div className={styles.row__quantity}>
        <button
          type="button"
          aria-label="Decrease quantity"
          className={styles.row__step}
          disabled={item.quantity <= 1}
          onClick={() => setQuantity(item.id, item.quantity - 1)}
        >
          <Icon name="minus" />
        </button>

        <span className={styles.row__count}>{item.quantity}</span>

        <button
          type="button"
          aria-label="Increase quantity"
          className={styles.row__step}
          onClick={() => setQuantity(item.id, item.quantity + 1)}
        >
          <Icon name="plus" />
        </button>
      </div>

      <span className={styles.row__price}>
        ${item.product.price * item.quantity}
      </span>
    </li>
  );
};
