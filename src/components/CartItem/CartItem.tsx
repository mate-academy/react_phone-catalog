import styles from './CardItem.module.scss';
import { CartItem as Item } from '../../types/CartItem';
import { useCart } from '../../CartContext';
import { getImageUrl } from '../../utils/getImgUrl';

type Props = {
  item: Item;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { changeQuantity, removeFromCart } = useCart();

  const isMinusDisabled = item.quantity === 1;

  return (
    <div className={styles.cartItem}>
      <button className={styles.remove} onClick={() => removeFromCart(item.id)}>
        ×
      </button>

      <img
        src={getImageUrl(item.image)}
        alt={item.name}
        className={styles.image}
      />

      <p className={styles.name}>{item.name}</p>

      <div className={styles.counter}>
        <button
          onClick={() => changeQuantity(item.id, -1)}
          disabled={isMinusDisabled}
          className={styles.counterBtn}
        >
          −
        </button>

        <span className={styles.quantity}>{item.quantity}</span>

        <button
          onClick={() => changeQuantity(item.id, 1)}
          className={styles.counterBtn}
        >
          +
        </button>
      </div>

      <div className={styles.price}>${item.price}</div>
    </div>
  );
};
