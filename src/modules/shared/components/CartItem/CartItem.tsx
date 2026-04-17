import classNames from 'classnames';
import type { CartItem as CartItemType } from '@/types/CartItem';
import { useCart } from '@/contexts/CartContext';
import closeIcon from '@/assets/icons/icon-close.svg';
import minusIcon from '@/assets/icons/icon-minus.svg';
import plusIcon from '@/assets/icons/icon-plus.svg';
import styles from './CartItem.module.scss';

type Props = {
  item: CartItemType;
};

export const CartItem = ({ item }: Props) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, quantity } = item;

  const handleDecrement = () => updateQuantity(product.id, quantity - 1);
  const handleIncrement = () => updateQuantity(product.id, quantity + 1);

  return (
    <div className={styles.root}>
      <div className={styles.topRow}>
        <button
          className={styles.closeBtn}
          onClick={() => removeFromCart(product.id)}
          aria-label="Remove from cart"
        >
          <img src={closeIcon} alt="" />
        </button>

        <img
          src={`./${product.image}`}
          alt={product.name}
          className={styles.image}
        />

        <span className={styles.name}>{product.name}</span>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.counter}>
          <button
            className={classNames(styles.counterBtn, styles.counterMinus)}
            onClick={handleDecrement}
            disabled={quantity === 1}
            aria-label="Decrease quantity"
          >
            <img src={minusIcon} alt="" />
          </button>
          <span className={styles.counterValue}>{quantity}</span>
          <button
            className={classNames(styles.counterBtn, styles.counterPlus)}
            onClick={handleIncrement}
            aria-label="Increase quantity"
          >
            <img src={plusIcon} alt="" />
          </button>
        </div>
        <p className={styles.price}>${product.price * quantity}</p>
      </div>
    </div>
  );
};
