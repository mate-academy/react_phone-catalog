import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../components/CartItem';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';

const checkoutMessage =
  'Checkout is not implemented yet. Do you want to clear the Cart?';

export const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalCount,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (window.confirm(checkoutMessage)) {
      clearCart();
    }
  };

  return (
    <div className={styles.page}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.backBtn}
      >
        ‹ Back
      </button>

      <div className={styles.titleRow}>
        <h1 className={styles.title}>Cart</h1>
        {cart.length > 0 && (
          <button type="button" className={styles.clearBtn} onClick={clearCart}>
            Clear cart
          </button>
        )}
      </div>

      {cart.length > 0 ? (
        <div className={styles.content}>
          <div className={styles.itemsList}>
            {cart.map(item => (
              <CartItem
                key={item.product.id}
                item={item}
                onRemove={removeFromCart}
                onQuantityChange={updateQuantity}
              />
            ))}
          </div>

          <div className={styles.totalBlock}>
            <span className={styles.totalPrice}>${totalPrice}</span>
            <span className={styles.totalItems}>
              Total for {totalCount} items
            </span>
            <div className={styles.divider} />
            <button
              type="button"
              className={styles.checkoutBtn}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.emptyMessage}>Your cart is empty.</div>
      )}
    </div>
  );
};
