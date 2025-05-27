import { Link } from 'react-router-dom';
import { CartItem } from '../../components/CartItem/CartItem';
import { useCart } from '../../utils/CartContext';

import styles from '../CartPage/CartPageStyles.module.scss';

export function CartPage() {
  const { state, clearCart } = useCart();

  const handleCheckout = () => {
    const confirmed = confirm('Checkout is not implemented yet. Do you want to clear the Cart?');
    if (confirmed) {
      clearCart();
    }
  };

  if (state.items.length === 0) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.emptyCart}>
          <h1>Your Cart</h1>
          <p className={styles.emptyMessage}>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <Link to={`/`} className={styles.backToCat}>
        <p className={styles.categoryRight}>&lt;</p>
        <p className={styles.categoryBack}>Back</p>
      </Link>
      <div className={styles.cartHeader}>
        <h1>Cart</h1>
      </div>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          {state.items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className={styles.cartSummary}>
          <div className={styles.summaryRow}>
            <span className={styles.totalAmount}>${state.totalAmount}</span>
          </div>
          <div className={styles.summaryRow2}>
            <span>
              <p className={styles.itemCount}>
                Total for {state.totalQuantity} {state.totalQuantity === 1 ? 'item' : 'items'}
              </p>
            </span>
          </div>
          <div className={styles.line}></div>
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
