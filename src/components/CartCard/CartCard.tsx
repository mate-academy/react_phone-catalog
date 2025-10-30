import { CartItem, useAppContext } from 'components/Contexts/AppDataContext';
import styles from './CartCard.module.scss';
import Close from 'assets/icons/close.svg';
import { Link } from 'react-router-dom';
import Plus from 'assets/icons/plus.svg';
import Minus from 'assets/icons/minus.svg';

type Props = {
  item: CartItem;
};

const CartCard = ({ item }: Props) => {
  const { updateCartQuantity, removeFromCart } = useAppContext();

  const handleDecrease = () => {
    updateCartQuantity(item.product.id, item.quantity - 1);
  };

  const handleIncrease = () => {
    updateCartQuantity(item.product.id, item.quantity + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <button
          className={styles.closeBtn}
          onClick={() => removeFromCart(item.product.id)}
        >
          <img className={styles.close} src={Close} alt="Remove item" />
        </button>

        <Link to="/" className={styles.device_link}>
          <img
            className={styles.img}
            src={item.product.images[0]}
            alt={item.product.name}
          />
        </Link>

        <p className={styles.title}>{item.product.name}</p>
      </div>

      <div className={styles.right}>
        <div className={styles.counter}>
          <button
            className={`${styles.btn} ${item.quantity === 1 ? styles.btnDisabled : ''}`}
            onClick={handleDecrease}
            disabled={item.quantity === 1}
            aria-label="Decrease quantity"
          >
            <img className={styles.btn_icon} src={Minus} alt="decrease" />
          </button>

          <span className={styles.quantity}>{item.quantity}</span>
          <button
            className={styles.btn}
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            <img className={styles.btn_icon} src={Plus} alt="increase" />
          </button>
        </div>

        <p className={styles.price}>
          $
          {(item.product.priceDiscount ?? item.product.priceRegular) *
            item.quantity}
        </p>
      </div>
    </div>
  );
};

export default CartCard;
