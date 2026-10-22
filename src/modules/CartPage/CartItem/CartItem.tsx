import styles from './CartItem.module.scss';
import { CartItem as CartItemType } from '../../../types';

interface CartItemProps {
  item: CartItemType;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  increase,
  decrease,
  remove,
}) => {
  const { id, product, quantity } = item;

  return (
    <div className={styles.item}>
      {/* PRODUCT INFO */}
      <div className={styles.topRow}>
        <button
          className={styles.iconBtn}
          onClick={() => remove(id)}
          aria-label={`Remove ${product.name}`}
        >
          <img src="./img/icons/Close.svg" alt="" />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className={styles.itemImage}
        />

        <span className={styles.itemName}>{product.name}</span>
      </div>

      {/* QUANTITY + PRICE */}
      <div className={styles.bottomRow}>
        <div className={styles.quantity}>
          <button
            className={styles.qtyBtn}
            onClick={() => decrease(id)}
            aria-label={`Decrease quantity of ${product.name}`}
          >
            <img src="./img/icons/Minus.svg" alt="" />
          </button>

          <span className={styles.qtyValue}>{quantity}</span>

          <button
            className={styles.qtyBtn}
            onClick={() => increase(id)}
            aria-label={`Increase quantity of ${product.name}`}
          >
            <img src="./img/icons/Plus.svg" alt="" />
          </button>
        </div>

        <span className={styles.price}>${product.price * quantity}</span>
      </div>
    </div>
  );
};
