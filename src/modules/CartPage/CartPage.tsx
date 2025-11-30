import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { useCart } from '../shared/context/CartContext';
import { CartItem } from './components/CartItem';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cart, totalCount, clearCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      clearCart();
    }
  };

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/phones', { replace: true });
    }
  };

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={handleBack}>
        <img src="/img/icons/ArrowLeft.png" alt="Back" />
        Back
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cart.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <div className={styles.grid}>
          <div className={styles.itemsList}>
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryInfo}>
              <h2 className={styles.totalPrice}>${totalPrice}</h2>
              <p className={styles.totalLabel}>Total for {totalCount} items</p>
            </div>

            <div className={styles.divider} />

            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
