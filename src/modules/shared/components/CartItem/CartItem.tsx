import styles from './CartItem.module.scss';

export type CartItemProps = {
  image: string;
  name: string;
  price: number;
  quantity: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
};

export const CartItem = ({
  image,
  name,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) => {
  return (
    <li className={styles.cartItem}>
      <button
        type="button"
        className={styles.cartItem__remove}
        onClick={onRemove}
        aria-label="Remove from cart"
      >
        &times;
      </button>

      <img src={image} alt={name} className={styles.cartItem__image} />

      <p className={styles.cartItem__name}>{name}</p>

      <div className={styles.cartItem__quantity}>
        <button
          type="button"
          className={styles.cartItem__quantityButton}
          onClick={onDecrease}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          &minus;
        </button>

        <span className={styles.cartItem__quantityValue}>{quantity}</span>

        <button
          type="button"
          className={styles.cartItem__quantityButton}
          onClick={onIncrease}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <p className={styles.cartItem__price}>${price * quantity}</p>
    </li>
  );
};
