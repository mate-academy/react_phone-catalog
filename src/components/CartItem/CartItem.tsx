import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { CartItem as CartItemType } from '../../types/Product';
import { assetUrl } from '../../utils/assets';
import { Icon } from '../Icon';
import styles from './CartItem.module.scss';

export const CartItem = ({ item }: { item: CartItemType }) => {
  const { removeFromCart, changeQuantity } = useShop();
  const { product, quantity } = item;
  const itemId = product.itemId;
  const productUrl = `/product/${encodeURIComponent(product.itemId)}`;

  return (
    <article className={styles.item}>
      <button
        className={styles.remove}
        type="button"
        aria-label={`Remove ${product.name} from cart`}
        onClick={() => removeFromCart(itemId)}
      >
        <Icon name="close" />
      </button>
      <Link className={styles.imageLink} to={productUrl}>
        <img src={assetUrl(product.image)} alt={product.name} />
      </Link>
      <Link className={styles.name} to={productUrl}>
        {product.name}
      </Link>
      <div className={styles.quantity}>
        <button
          className="icon-button"
          type="button"
          aria-label={`Decrease quantity of ${product.name}`}
          disabled={quantity === 1}
          onClick={() => changeQuantity(itemId, -1)}
        >
          <Icon name="minus" />
        </button>
        <span aria-live="polite" aria-atomic="true">
          {quantity}
        </span>
        <button
          className="icon-button"
          type="button"
          aria-label={`Increase quantity of ${product.name}`}
          onClick={() => changeQuantity(itemId, 1)}
        >
          <Icon name="plus" />
        </button>
      </div>
      <strong className={styles.price}>${product.price * quantity}</strong>
    </article>
  );
};
