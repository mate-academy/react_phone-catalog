import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Icon } from '../../components/Icon/Icon';
import { CartItem } from './components/CartItem';
import { formatPrice } from '../../utils/formatPrice';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { items, totalCount, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className="container">
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <Icon name="chevronLeft" />
        Back
      </button>

      <h1 className={styles.title}>Cart</h1>

      {items.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty</p>
      ) : (
        <div className={styles.content}>
          <ul className={styles.list}>
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>

          <div className={styles.summary}>
            <span className={styles.totalPrice}>{formatPrice(totalPrice)}</span>
            <span className={styles.totalCount}>
              Total for {totalCount} {totalCount === 1 ? 'item' : 'items'}
            </span>
            <button
              type="button"
              className={styles.checkoutButton}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
