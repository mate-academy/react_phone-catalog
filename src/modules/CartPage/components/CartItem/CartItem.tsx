import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../../shared/types/CartItem';
import { useCart } from '../../../shared/context/CartContext';
import closeIcon from '../../../shared/assets/icons/close.svg';
import minusIcon from '../../../shared/assets/icons/minus.svg';
import plusIcon from '../../../shared/assets/icons/plus.svg';
import styles from './CartItem.module.scss';

type Props = {
  item: CartItemType;
};

export const CartItem = ({ item }: Props) => {
  const { removeFromCart, changeQuantity } = useCart();
  const { id, quantity, product } = item;

  return (
    <div className={styles.item}>
      <div className={styles.main}>
        <button
          type="button"
          className={styles.remove}
          onClick={() => removeFromCart(id)}
          aria-label={`Remove ${product.name} from cart`}
        >
          <img src={closeIcon} alt="" />
        </button>

        <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
          <img
            src={`./${product.image}`}
            alt={product.name}
            className={styles.image}
          />
        </Link>

        <Link to={`/product/${product.itemId}`} className={styles.name}>
          {product.name}
        </Link>
      </div>

      <div className={styles.side}>
        <div className={styles.counter}>
          <button
            type="button"
            className={styles.counterButton}
            onClick={() => changeQuantity(id, -1)}
            disabled={quantity === 1}
            aria-label="Decrease quantity"
          >
            <img src={minusIcon} alt="" />
          </button>

          <span className={styles.quantity}>{quantity}</span>

          <button
            type="button"
            className={styles.counterButton}
            onClick={() => changeQuantity(id, 1)}
            aria-label="Increase quantity"
          >
            <img src={plusIcon} alt="" />
          </button>
        </div>

        <p className={styles.price}>${product.price * quantity}</p>
      </div>
    </div>
  );
};
