import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../../../types/Cart';
import { useCart } from '../../../../context/CartContext';
import { Icon } from '../../../../components/Icon/Icon';
import { formatPrice } from '../../../../utils/formatPrice';
import styles from './CartItem.module.scss';

type Props = {
  item: CartItemType;
};

const getImageUrl = (path: string) => {
  const baseUrl = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith('public/')
    ? path.replace('public/', '')
    : path;

  return baseUrl.endsWith('/')
    ? `${baseUrl}${cleanPath}`
    : `${baseUrl}/${cleanPath}`;
};

export const CartItem = ({ item }: Props) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const { id, quantity, product } = item;

  return (
    <li className={styles.item}>
      <button
        type="button"
        className={styles.removeButton}
        onClick={() => removeFromCart(id)}
        aria-label="Remove from cart"
      >
        <Icon name="close" />
      </button>

      <Link to={`/product/${id}`} className={styles.imageLink}>
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link to={`/product/${id}`} className={styles.name}>
        {product.name}
      </Link>

      <div className={styles.quantityControls}>
        <button
          type="button"
          className={styles.quantityButton}
          onClick={() => decreaseQuantity(id)}
          disabled={quantity === 1}
          aria-label="Decrease quantity"
        >
          <Icon name="minus" />
        </button>
        <span className={styles.quantityValue}>{quantity}</span>
        <button
          type="button"
          className={styles.quantityButton}
          onClick={() => increaseQuantity(id)}
          aria-label="Increase quantity"
        >
          <Icon name="plus" />
        </button>
      </div>

      <span className={styles.price}>
        {formatPrice(product.price * quantity)}
      </span>
    </li>
  );
};
