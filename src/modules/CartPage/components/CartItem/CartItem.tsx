import styles from './CartItem.module.scss';
import { Product } from '../../../../types/Product';
import { useCart } from '../../../../contexts/CartContext';

type Props = {
  product: Product;
  qty: number | undefined;
};

export const CartItem: React.FC<Props> = ({ product, qty }) => {
  const { removeFromCart, decrease, increase } = useCart();

  return (
    <div className={styles['item-wrapper']}>
      <div className={styles.top}>
        <button
          className={styles['delete-btn']}
          onClick={() => removeFromCart(product.id)}
        >
          <img src="/public/img/icons/Close.svg" alt="Delete"></img>
        </button>
        <img src={product.image} alt={product.name} />
        <p className="name">{product.name}</p>
      </div>

      <div className={styles.bottom}>
        <div className={styles.qtyButtons}>
          <button
            className={`${styles.qtyButton} ${styles.minusButton} ${qty > 1 ? styles.isActive : ''}`}
            onClick={() => decrease(product.id)}
            disabled={qty <= 1}
          >
            <img src="/public/img/icons/Minus.svg" alt="Prev slide"></img>
          </button>
          <p className={styles.qty}>{qty}</p>
          <button
            className={`${styles.qtyButton} ${styles.plustButton} ${styles.isActive}`}
            onClick={() => increase(product.id)}
          >
            <img src="/public/img/icons/Plus.svg" alt="Next slide"></img>
          </button>
        </div>
        <p className={styles.price}>${product.price}</p>
      </div>
    </div>
  );
};
