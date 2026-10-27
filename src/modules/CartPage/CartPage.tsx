import { Link, useNavigate } from 'react-router-dom';

import { CartItem } from '../../components/CartItem';
import { useShop } from '../../context/ShopContext';
import { imagePath } from '../../utils/imagePath';

import styles from './CartPage.module.scss';

export const CartPage = () => {
  const navigate = useNavigate();

  const { cart, cartQuantity, cartTotal, clearCart } = useShop();

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
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cart.length === 0 ? (
        <div className={styles.empty}>
          <img
            src={imagePath('img/cart-is-empty.png')}
            alt="Empty cart"
            className={styles.emptyImage}
          />

          <h2>Your cart is empty</h2>

          <Link to="/phones" className={styles.shopButton}>
            Start shopping
          </Link>
        </div>
      ) : (
        <div className={styles.layout}>
          <div className={styles.items}>
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className={styles.summary}>
            <h2 className={styles.total}>${cartTotal}</h2>

            <p className={styles.count}>Total for {cartQuantity} items</p>

            <div className={styles.divider} />

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
