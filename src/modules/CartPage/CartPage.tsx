import { useContext } from 'react';
import styles from './CartPage.module.scss';
import { CartContext } from '../../store/CartContext';
import { useNavigate } from 'react-router-dom';
import { CartItem } from './components/CartItem';

export const CartPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (
      window.confirm(
        'Checkout is not implemented yet. Do you want to clear the Cart?',
      )
    ) {
      clearCart();
    }
  };

  return (
    <div className={styles.cartPage}>
      <button
        type="button"
        className={styles.cartPageBack}
        onClick={() => navigate(-1)}
      >
        <span aria-hidden="true" className={styles.cartPageBackImage} />
        <span className={styles.cartPageBackText}>Back</span>
      </button>

      <h1 className={styles.cartPageTitle}>Cart</h1>

      {cartItems.length === 0 ? (
        <div className={styles.cartPageEmpty}>
          <img
            src="img/cart-is-empty.png"
            alt=""
            className={styles.cartPageEmptyImage}
          />
          <h2 className={styles.cartPageEmptyTitle}>Your cart is empty</h2>
        </div>
      ) : (
        <div className={styles.cartPageContent}>
          <ul className={styles.cartPageList}>
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>

          <div className={styles.cartPageTotal}>
            <p className={styles.cartPageTotalPrice}>${totalPrice}</p>
            <p className={styles.cartPageTotalCount}>
              Total for {totalCount} items
            </p>
            <span className={styles.cartPageDivider} />
            <button
              type="button"
              className={styles.cartPageCheckout}
              onClick={handleCheckout}
            >
              <span className={styles.cartPageCheckoutText}>Checkout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
