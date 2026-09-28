import { Link } from 'react-router-dom';

import { useCart } from '../../../shared/context/CartContext';
import { Product } from '../../../shared/types/Product';
import { getAssetUrl } from '../../../shared/utils/assets';
import styles from './CartItem.module.scss';

type Props = {
  product: Product;
  quantity: number;
};

export const CartItem = ({ product, quantity }: Props) => {
  const { decrementItem, incrementItem, removeFromCart } = useCart();

  return (
    <article className={styles.item}>
      <button
        type="button"
        className={styles.removeButton}
        aria-label="Remove item"
        onClick={() => removeFromCart(product.itemId)}
      >
        <i className="fa-solid fa-xmark" />
      </button>

      <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
        <img src={getAssetUrl(product.image)} alt={product.name} />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.title}>
        {product.name}
      </Link>

      <div className={styles.quantity}>
        <button
          type="button"
          disabled={quantity === 1}
          onClick={() => decrementItem(product.itemId)}
        >
          <i className="fa-solid fa-minus" />
        </button>

        <span>{quantity}</span>

        <button type="button" onClick={() => incrementItem(product.itemId)}>
          <i className="fa-solid fa-plus" />
        </button>
      </div>

      <strong>${product.price * quantity}</strong>
    </article>
  );
};
