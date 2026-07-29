import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Icon } from '@/components/Icon';
import { CartItemRow } from './components/CartItemRow';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, setQuantity, clearCart } = useCart();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

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
      <button
        type="button"
        className={styles.back}
        onClick={() => navigate(-1)}
      >
        <Icon name="chevron-left" />
        Back
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cartItems.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty</p>
      ) : (
        <div className={styles.content}>
          <ul className={styles.list}>
            {cartItems.map(item => (
              <CartItemRow
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onQuantityChange={setQuantity}
              />
            ))}
          </ul>

          <div className={styles.summary}>
            <p className={styles.total}>${totalPrice}</p>
            <p className={styles.totalLabel}>
              Total for {totalQuantity} item{totalQuantity === 1 ? '' : 's'}
            </p>

            <button
              type="button"
              className={styles.checkout}
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
