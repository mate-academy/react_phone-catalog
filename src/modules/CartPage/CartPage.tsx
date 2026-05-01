import { useCart } from '../../context';
import { CartItem } from './components/CartItem';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { cartItems, totalAmount, totalQuantity, clearCart } = useCart();

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Cart</h1>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>Your cart is empty</p>
      ) : (
        <div className={styles.content}>
          <div className={styles.items}>
            {cartItems.map(item => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          <div className={styles.checkout}>
            <p className={styles.total}>${totalAmount}</p>
            <p className={styles.totalLabel}>
              Total for {totalQuantity} item{totalQuantity !== 1 ? 's' : ''}
            </p>
            <hr className={styles.divider} />
            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
