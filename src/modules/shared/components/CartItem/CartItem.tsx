import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../../../types/CartItem';
import { useCart } from '../../../shared/context/CartContext';
import CloseIcon from '../../../../assets/icons/close.svg?react';
import MinusIcon from '../../../../assets/icons/minus.svg?react';
import PlusIcon from '../../../../assets/icons/plus.svg?react';
import styles from './CartItem.module.scss';

interface Props {
  item: CartItemType;
}

export const CartItem = ({ item }: Props) => {
  const { id, quantity, product } = item;
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const productUrl = `/product/${product.itemId}`;

  return (
    <article className={styles.item}>
      <div className={styles.info}>
        <button
          type="button"
          className={styles.remove}
          onClick={() => removeFromCart(id)}
          aria-label={`Remove ${product.name} from cart`}
        >
          <CloseIcon />
        </button>

        <Link
          to={productUrl}
          className={styles.imageLink}
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
        </Link>

        <Link to={productUrl} className={styles.name}>
          {product.name}
        </Link>
      </div>

      <div className={styles.controls}>
        <div className={styles.counter}>
          <button
            type="button"
            className={styles.counterButton}
            onClick={() => decreaseQuantity(id)}
            disabled={quantity === 1}
            aria-label="Decrease quantity"
          >
            <MinusIcon />
          </button>

          <span className={styles.quantity}>{quantity}</span>

          <button
            type="button"
            className={styles.counterButton}
            onClick={() => increaseQuantity(id)}
            aria-label="Increase quantity"
          >
            <PlusIcon />
          </button>
        </div>

        <p className={styles.price}>${product.price * quantity}</p>
      </div>
    </article>
  );
};
