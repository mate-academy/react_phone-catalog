import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { assetUrl } from '../../utils/assets';
import { BackButton } from '../BackButton';
import { CartItem } from '../CartItem';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { cart, cartQuantity, clearCart } = useShop();
  const total = cart.reduce(
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
    <div className={`container ${styles.page}`}>
      <BackButton />
      <h1 className="page-title">Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-state">
          <img
            className={styles.emptyImage}
            src={assetUrl('img/cart-is-empty.png')}
            alt=""
          />
          <h2>Your cart is empty</h2>
          <p>Find your next favorite gadget in our catalog.</p>
          <Link className="primary-button" to="/phones">
            Browse phones
          </Link>
        </div>
      ) : (
        <div className={styles.layout}>
          <div className={styles.items}>
            {cart.map(item => (
              <CartItem key={item.product.itemId} item={item} />
            ))}
          </div>
          <aside className={styles.summary} aria-label="Order summary">
            <div aria-live="polite" aria-atomic="true">
              <p className={styles.total}>${total}</p>
              <p className={styles.quantity}>
                Total for {cartQuantity} {cartQuantity === 1 ? 'item' : 'items'}
              </p>
            </div>
            <button
              className={`primary-button ${styles.checkout}`}
              type="button"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};
