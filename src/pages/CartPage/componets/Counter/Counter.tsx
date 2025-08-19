import { updateQuantity } from '../../../../shared/utils/cart/updateQuantity';
import { useProducts } from '../../../../shared/context/ProductsContext';
import minusActive from '../../../../assets/icons/cart_icons/MinusActive.svg';
import minusIco from '../../../../assets/icons/cart_icons/Minus.svg';
import plusIco from '../../../../assets/icons/cart_icons/plus.svg';
import styles from './Counter.module.scss';

type CounterProps = {
  id: string;
  quantity: number;
};

export const Counter: React.FC<CounterProps> = ({ id, quantity }) => {
  const { cartItems, setCartItems } = useProducts();

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1, cartItems, setCartItems);
    }
  };

  const handleIncrease = () => {
    updateQuantity(id, quantity + 1, cartItems, setCartItems);
  };

  return (
    <div className={styles.counter}>
      <button
        className={`${styles.counter__item} ${quantity > 1 ? '' : styles.counter__minus}`}
        onClick={handleDecrease}
      >
        <img
          src={quantity > 1 ? minusActive : minusIco}
          alt="Decrease quantity"
        />
      </button>
      <span className={styles.counter__countValue}>{quantity}</span>
      <button className={styles.counter__item} onClick={handleIncrease}>
        <img src={plusIco} alt="Increase quantity" />
      </button>
    </div>
  );
};
