import { CartItem as CartItemType } from '../../../../types';
import { useCart } from '../../../../context';
import { getImageUrl } from '../../../../utils';
import styles from './CartItem.module.scss';

type Props = {
  item: CartItemType;
};

export const CartItem = ({ item }: Props) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <div className={styles.item}>
      {/* Remove button + image + name */}
      <div className={styles.info}>
        <button
          className={styles.remove}
          onClick={() => removeFromCart(product.id)}
          aria-label={`Remove ${product.name} from cart`}
        >
          <img
            src={getImageUrl('/img/icons/Close.svg')}
            alt=""
            aria-hidden="true"
          />
        </button>

        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className={styles.image}
        />

        <p className={styles.name}>{product.name}</p>
      </div>

      {/* Quantity controls + price */}
      <div className={styles.controls}>
        <div className={styles.quantity}>
          <button
            className={styles.quantityBtn}
            onClick={() => decreaseQuantity(product.id)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            –
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button
            className={styles.quantityBtn}
            onClick={() => increaseQuantity(product.id)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <p className={styles.price}>${product.price * quantity}</p>
      </div>
    </div>
  );
};
