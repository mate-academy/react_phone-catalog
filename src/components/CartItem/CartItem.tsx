import { Link } from 'react-router-dom';

import { useShop } from '../../context/ShopContext';
import { CartItem as CartItemType } from '../../types/CartItem';
import { imagePath } from '../../utils/imagePath';

import styles from './CartItem.module.scss';

type Props = {
  item: CartItemType;
};

export const CartItem = ({ item }: Props) => {
  const { removeFromCart, changeQuantity } = useShop();

  const { id, product, quantity } = item;

  const handleRemove = () => {
    removeFromCart(id);
  };

  const handleDecrease = () => {
    changeQuantity(id, -1);
  };

  const handleIncrease = () => {
    changeQuantity(id, 1);
  };

  const totalPrice = product.price * quantity;

  return (
    <article className={styles.item}>
      <button
        type="button"
        className={styles.removeButton}
        onClick={handleRemove}
        aria-label={`Remove ${product.name} from cart`}
      >
        ×
      </button>

      <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
        <img
          src={imagePath(product.image)}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.title}>
        {product.name}
      </Link>

      <div className={styles.quantity}>
        <button
          type="button"
          onClick={handleDecrease}
          disabled={quantity === 1}
          aria-label={`Decrease quantity of ${product.name}`}
        >
          −
        </button>

        <span>{quantity}</span>

        <button
          type="button"
          onClick={handleIncrease}
          aria-label={`Increase quantity of ${product.name}`}
        >
          +
        </button>
      </div>

      <strong className={styles.price}>${totalPrice}</strong>
    </article>
  );
};
