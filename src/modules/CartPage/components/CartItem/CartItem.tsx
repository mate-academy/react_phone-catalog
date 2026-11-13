import { Link } from 'react-router-dom';
import { useShop } from '../../../../context/ShopContext';
import { CartItem as CartItemType } from '../../../../api/types';
import {
  formatMemory,
  formatPrice,
  getProductPrice,
} from '../../../../shared/utils/format';
import styles from './CartItem.module.scss';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useShop();
  const { quantity, product } = item;

  const unitPrice = formatPrice(getProductPrice(product));
  const fullPrice = formatPrice(product.fullPrice ?? product.priceRegular);
  const lineTotal = formatPrice(getProductPrice(product) * quantity);

  return (
    <div className={styles.item}>
      <Link to={`/product/${product.id}`} className={styles.imageLink}>
        <img
          src={product.images[0]}
          alt={product.name}
          className={styles.image}
        />
      </Link>
      <div className={styles.info}>
        <Link to={`/product/${product.id}`} className={styles.title}>
          {formatMemory(product.name)}
        </Link>
        <div className={styles.prices}>
          {unitPrice && <span className={styles.price}>{unitPrice}</span>}
          {fullPrice && <s className={styles.fullPrice}>{fullPrice}</s>}
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.quantityButton}
            onClick={() => updateQuantity(product.id, quantity - 1)}
          >
            -
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button
            type="button"
            className={styles.quantityButton}
            onClick={() => updateQuantity(product.id, quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.right}>
        {lineTotal && <span className={styles.lineTotal}>{lineTotal}</span>}
        <button
          type="button"
          className={styles.removeButton}
          onClick={() => removeFromCart(product.id)}
          aria-label="Remove from cart"
        >
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  );
};
