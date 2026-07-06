import styles from './CartItemCard.module.scss';
import { useCart } from '../../context/CartContext';
import minusActive from './img/buttons/minus-active.png';
import minusDisabled from './img/buttons/minus-disabled.png';
import plusActive from './img/buttons/plus-active.png';
import deleteIcon from './img/buttons/delete.png';

interface Props {
  id: string;
  image: string;
  name: string;
  price: string;
  count: number;
}

export const CartItemCard = ({ id, image, name, price, count }: Props) => {
  const { updateQuantity, removeFromCart } = useCart();

  const isMinusDisabled = count <= 1;

  return (
    <div className={styles.CartItemCard}>
      <div className={styles.topRow}>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => removeFromCart(id)}
          aria-label="Remove from cart"
        >
          <img src={deleteIcon} alt="delete icon" />
        </button>

        <img src={image} alt="product image" className={styles.productImage} />

        <p className={styles.productName}>{name}</p>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.quantityButton}
            onClick={() => updateQuantity(id, -1)}
            disabled={isMinusDisabled}
          >
            <img
              src={isMinusDisabled ? minusDisabled : minusActive}
              alt="minus"
            />
          </button>

          <span className={styles.count}>{count}</span>

          <button
            type="button"
            className={styles.quantityButton}
            onClick={() => updateQuantity(id, 1)}
          >
            <img src={plusActive} alt="plus" />
          </button>
        </div>

        <p className={styles.productPrice}>{price}</p>
      </div>
    </div>
  );
};
