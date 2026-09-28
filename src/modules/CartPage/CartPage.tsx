import { useNavigate } from 'react-router-dom';

import { useCart } from '../shared/context/CartContext';
import { getAssetUrl } from '../shared/utils/assets';
import { CartItem } from './components/CartItem';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartQuantity, clearCart, totalAmount } = useCart();

  const handleCheckout = () => {
    const shouldClearCart = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (shouldClearCart) {
      clearCart();
    }
  };

  return (
    <section>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <i className="fa-solid fa-chevron-left" />
        Back
      </button>

      <h1>Cart</h1>

      {cartItems.length === 0 ? (
        <div className={styles.empty}>
          <img src={getAssetUrl('img/cart-is-empty.png')} alt="" />
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className={styles.cartLayout}>
          <div className={styles.items}>
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                product={item.product}
                quantity={item.quantity}
              />
            ))}
          </div>

          <aside className={styles.summary}>
            <strong>${totalAmount}</strong>
            <span>
              Total for {cartQuantity} {cartQuantity === 1 ? 'item' : 'items'}
            </span>

            <button type="button" onClick={handleCheckout}>
              Checkout
            </button>
          </aside>
        </div>
      )}
    </section>
  );
};
