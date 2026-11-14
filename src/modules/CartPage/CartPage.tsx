import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BackLink } from '../shared/components/BackLink/BackLink';
import { useStore } from '../shared/context/StoreContext';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCartPrice,
    totalCartCount,
  } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmCheckout = () => {
    clearCart();
    setIsModalOpen(false);
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartPage__back}>
        <BackLink />
      </div>

      <h1 className={styles.cartPage__title}>Cart</h1>

      {cart.length === 0 ? (
        <div className={styles.cartPage__empty}>
          <img
            src={`${import.meta.env.BASE_URL}img/cart-is-empty.png`}
            alt="Your cart is empty"
            style={{ maxWidth: '260px', width: '100%' }}
          />
          <p className={styles.cartPage__emptyMessage}>Your cart is empty</p>
          <Link to="/phones" className={styles.cartPage__shopLink}>
            Explore our phones
          </Link>
        </div>
      ) : (
        <div className={styles.cartPage__content}>
          <div className={styles.cartPage__itemsList}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className={styles.cartItem__removeBtn}
                  aria-label="Remove item"
                >
                  ✕
                </button>

                <Link
                  to={`/product/${item.product.itemId}`}
                  className={styles.cartItem__imageLink}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${item.product.image}`}
                    alt={item.product.name}
                    className={styles.cartItem__image}
                  />
                </Link>

                <Link
                  to={`/product/${item.product.itemId}`}
                  className={styles.cartItem__name}
                >
                  {item.product.name}
                </Link>

                <div className={styles.cartItem__counter}>
                  <button
                    type="button"
                    disabled={item.quantity <= 1}
                    onClick={() => updateQuantity(item.id, -1)}
                    className={styles.cartItem__counterBtn}
                    aria-label="Decrease quantity"
                  >
                    –
                  </button>
                  <span className={styles.cartItem__count}>
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, 1)}
                    className={styles.cartItem__counterBtn}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <span className={styles.cartItem__price}>
                  ${item.product.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <aside className={styles.summary}>
            <div className={styles.summary__total}>
              <span className={styles.summary__price}>${totalCartPrice}</span>
              <span className={styles.summary__count}>
                Total for {totalCartCount}{' '}
                {totalCartCount === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className={styles.summary__divider} />

            <button
              type="button"
              onClick={handleCheckoutClick}
              className={styles.summary__checkoutBtn}
            >
              Checkout
            </button>
          </aside>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p className={styles.modal__text}>
              Checkout is not implemented yet. Do you want to clear the Cart?
            </p>
            <div className={styles.modal__actions}>
              <button
                type="button"
                onClick={handleConfirmCheckout}
                className={styles.modal__confirmBtn}
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className={styles.modal__cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
