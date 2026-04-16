import { useCart } from '@/contexts/CartContext';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { CartItem } from '../shared/components/CartItem';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { cartItems, cartCount, cartTotal, clearCart } = useCart();

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
      <Breadcrumbs items={[{ label: 'Cart' }]} />
      <h1>Cart</h1>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>Your cart is empty</p>
      ) : (
        <div className={styles.layout}>
          <ul className={styles.list}>
            {cartItems.map(item => (
              <li key={item.product.id}>
                <CartItem item={item} />
              </li>
            ))}
          </ul>

          <div className={styles.total}>
            <div className={styles.totalPriceBlock}>
              <p className={styles.totalPrice}>${cartTotal}</p>
              <p className={styles.totalLabel}>Total for {cartCount} items</p>
            </div>

            <hr className={styles.divider} />

            <button className={styles.checkout} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
