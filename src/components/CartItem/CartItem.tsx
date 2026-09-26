import styles from './CartItem.module.scss';
import { CartItem as CartItemType } from '../../types/CartItem';
import { useCart } from '../../hooks/useCart';

type CartItemProps = {
  item: CartItemType;
};

export const CartItem = ({ item }: CartItemProps) => {
  const {
    handleRemoveFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  } = useCart();

  return (
    <div className={styles.cart}>
      <div className={styles.product}>
        <button
          className={styles.removeButton}
          onClick={() => handleRemoveFromCart(item.itemId)}
        >
          X
        </button>
        <img src={item.image} alt={item.name} className={styles.image} />
        <p className={styles.title}>{item.name}</p>
      </div>
      <div className={styles.details}>
        <div className={styles.buttons}>
          <button
            className={styles.quantityButton}
            onClick={() => handleDecreaseQuantity(item.itemId)}
          >
            -
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button
            className={styles.quantityButton}
            onClick={() => handleIncreaseQuantity(item.itemId)}
          >
            +
          </button>
        </div>
        <p className={styles.price}>${item.price}</p>
      </div>
    </div>
  );
};
