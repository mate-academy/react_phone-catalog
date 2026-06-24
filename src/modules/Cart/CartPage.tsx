import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalQuantity,
    totalPrice,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    const confirmCheckout = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmCheckout) {
      clearCart();
    }
  };

  if (!cartItems.length) {
    return (
      <div className={styles.cart__emptyWrapper}>
        <h2 className={styles.cart__empty}>Your cart is empty</h2>
        <img
          src="./img/cart-is-empty.png"
          alt="Empty cart"
          className={styles.cart__emptyImage}
        />
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <div className={styles.back}>
        <img src="./img/icons/butnBack.png" alt="Arrow left" />
        <button onClick={() => navigate(-1)} className={styles.buttonBack}>
          Back
        </button>
      </div>

      <h2 className={styles.title}>Cart</h2>

      <div className={styles.cart__content}>
        <div className={styles.cart__items}>
          {cartItems.map(item => (
            <div key={item.id} className={styles.cart__item}>
              <div className={styles.cart__itemLeft}>
                <button
                  className={styles.cart__remove}
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="#4A4D58"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.cart__image}
                />
                <p className={styles.cart__name}>{item.name}</p>
              </div>

              <div className={styles.cart__itemRight}>
                <div className={styles.cart__quantity}>
                  <button
                    className={styles.button__minus}
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label="Decrease quantity"
                    disabled={item.quantity === 1}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <line
                        x1="5"
                        y1="12"
                        x2="19"
                        y2="12"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                  <span className={styles.cart__quantity}>{item.quantity}</span>
                  <button
                    className={styles.button__plus}
                    onClick={() => increaseQuantity(item.id)}
                    aria-label="Increase quantity"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <line
                        x1="12"
                        y1="5"
                        x2="12"
                        y2="19"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="5"
                        y1="12"
                        x2="19"
                        y2="12"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </div>
                <p className={styles.cart__price}>
                  $
                  {(typeof item.price === 'string'
                    ? Number(item.price.replace(/[^0-9.]/g, ''))
                    : item.price) * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cart__summary}>
          <p className={styles.cart__total}>${totalPrice}</p>
          <p className={styles.cart__summaryTotal}>
            Total for {totalQuantity} items
          </p>
          <button className={styles.cart__checkout} onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
