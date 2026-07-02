import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CloseIcon } from '../shared/ui/Icons/Icons';
import styles from './CartPage.module.scss';

const IMG_BASE = import.meta.env.BASE_URL;

export const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Cart</h1>
        <div className={styles.empty}>
          <img
            src={`${IMG_BASE}/img/cart-is-empty.png`}
            alt="Empty cart"
            className={styles.emptyImage}
          />
          <p className={styles.emptyText}>Your cart is empty</p>
          <Link to="/" className={styles.emptyLink}>
            Go shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Cart</h1>

      <div className={styles.layout}>
        <ul className={styles.list}>
          {cartItems.map(item => (
            <li key={item.id} className={styles.item}>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.product.name} from cart`}
              >
                <CloseIcon />
              </button>

              <Link
                to={`/product/${item.product.itemId}`}
                className={styles.itemImageLink}
              >
                <img
                  src={`${IMG_BASE}/${item.product.image}`}
                  alt={item.product.name}
                  className={styles.itemImage}
                  width={64}
                  height={64}
                />
              </Link>

              <Link
                to={`/product/${item.product.itemId}`}
                className={styles.itemName}
              >
                {item.product.name}
              </Link>

              <div className={styles.quantity}>
                <button
                  type="button"
                  className={styles.quantityButton}
                  onClick={() => decreaseQuantity(item.id)}
                  disabled={item.quantity <= 1}
                  aria-label="Diminuir quantidade"
                >
                  −
                </button>
                <span className={styles.quantityValue}>{item.quantity}</span>
                <button
                  type="button"
                  className={styles.quantityButton}
                  onClick={() => increaseQuantity(item.id)}
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
              </div>

              <span className={styles.itemPrice}>
                ${item.product.price * item.quantity}
              </span>
            </li>
          ))}
        </ul>

        <div className={styles.summary}>
          <p className={styles.summaryTotal}>${totalAmount}</p>
          <p className={styles.summaryQuantity}>
            Total for {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
          </p>

          <button
            type="button"
            className={styles.checkoutButton}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
