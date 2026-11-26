import { Link } from 'react-router-dom';
import { useCart } from '../../../shared/context/CartContext';
import {
  IconRemove,
  IconMinus,
  IconPlus,
} from '../../../shared/components/Icons';
import type { CartItem } from '../../../shared/types/Product';
import styles from './CartItem.module.scss';
import { assetUrl } from '../../../shared/utils';

export interface CartItemComponentProps {
  item: CartItem;
}

export function CartItemComponent({
  item,
}: CartItemComponentProps): JSX.Element {
  const { removeFromCart, changeQuantity } = useCart();
  const { product } = item;
  const imageUrl = assetUrl(product.image);

  const handleRemove = (): void => {
    removeFromCart(item.id);
  };

  const handleDecrease = (): void => {
    if (item.quantity > 1) {
      changeQuantity(item.id, -1);
    }
  };

  const handleIncrease = (): void => {
    changeQuantity(item.id, 1);
  };

  return (
    <article className={styles.item} data-testid={`cart-item-${item.id}`}>
      <button
        className={styles.removeButton}
        onClick={handleRemove}
        aria-label={`Remove ${product.name} from cart`}
      >
        <IconRemove />
      </button>

      <Link
        to={`/product/${product.itemId}`}
        className={styles.imageLink}
        aria-label={product.name}
      >
        <img
          src={imageUrl}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
      </Link>

      <Link
        to={`/product/${product.itemId}`}
        className={styles.titleLink}
        aria-label={product.name}
      >
        <h3 className={styles.title}>{product.name}</h3>
      </Link>

      <div className={styles.quantity}>
        <button
          className={styles.quantityButton}
          onClick={handleDecrease}
          disabled={item.quantity <= 1}
          aria-label={`Decrease quantity of ${product.name}`}
        >
          <IconMinus />
        </button>
        <span className={styles.quantityValue} aria-live="polite">
          {item.quantity}
        </span>
        <button
          className={styles.quantityButton}
          onClick={handleIncrease}
          aria-label={`Increase quantity of ${product.name}`}
        >
          <IconPlus />
        </button>
      </div>

      <div className={styles.price}>
        <span className={styles.priceValue}>
          ${product.price * item.quantity}
        </span>
      </div>
    </article>
  );
}
