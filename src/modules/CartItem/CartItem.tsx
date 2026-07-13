import { CartItemType } from '../../types/CartItemType';
import styles from './CartItem.styles.module.scss';
import CloseButton from '../../assets/icons/closebutton.svg?react';
import AddIcon from '../../assets/icons/add.svg?react';
import DisabledIcon from '../../assets/icons/disabled.svg?react';
import { useCart } from '../../context/CartContext';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <article className={styles.cartItem}>
      <div className={styles.cartItemHead}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => removeFromCart(item.product.itemId)}
        >
          <CloseButton />
        </button>
        <img
          className={styles.image}
          src={item.product.image}
          alt={item.product.name}
        />
        <h4 className={styles.cartItemName}>{item.product.name}</h4>
      </div>

      <div className={styles.cartItemBot}>
        <div className={styles.counter}>
          <button
            type="button"
            className={styles.counterButton}
            onClick={() => decreaseQuantity(item.product.itemId)}
          >
            <DisabledIcon />
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button
            type="button"
            className={styles.counterButton}
            onClick={() => increaseQuantity(item.product.itemId)}
          >
            <AddIcon />
          </button>
        </div>

        <span className={styles.price}>
          ${item.product.price * item.quantity}
        </span>
      </div>
    </article>
  );
};
