import { useCart } from '../context/CartContext';
import { CartItems } from '../context/CartContext';
import { Link } from 'react-router-dom';
import styles from './CartItem.module.scss';

type Props = {
  item: CartItems;
  onRemove: (id: string) => void;
};

export const CartItem = ({ item, onRemove }: Props) => {
  const { updateQuantity } = useCart();

  return (
    <div className={styles.item}>
      <div className={styles.container}>
        <button
          className={styles.removeButton}
          onClick={() => onRemove(String(item.id))}
        >
          <img src="/img/catalog/icons/Close.svg" alt="icon close" />
        </button>
        <img src={`/${item.image}`} alt="image" className={styles.itemImage} />
        <Link to={`/${item.category}/${item.id}`}>
          <p className={styles.name}>{item.name}</p>
        </Link>
      </div>
      <div className={styles.counter}>
        <button
          className={`${styles.button} ${styles.removeOne}`}
          onClick={() => updateQuantity(String(item.id), item.quantity - 1)}
          disabled={item.quantity === 1}
        >
          <img src="/img/catalog/icons/Minus.svg" alt="minus" />
        </button>
        <p className={styles.count}>{item.quantity}</p>
        <button
          className={`${styles.button} ${styles.addOne}`}
          onClick={() => updateQuantity(String(item.id), item.quantity + 1)}
        >
          <img src="/img/catalog/icons/Plus.svg" alt="plus" />
        </button>
        <p className={styles.price}>${item.price * item.quantity}</p>
      </div>
    </div>
  );
};
