import React, { useState } from 'react';
import styles from './CartPage.module.scss';
import { useCart } from '../shared/contexts/CartContext';
import { BackButton } from '../../components/BackButton/BackButton';
import { buildUrl } from '../shared/utils/buildUrl';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const {
    cartItems,
    totalQuantity,
    totalAmount,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    clearCart();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (cartItems.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <BackButton path="/" />
          <h1 className={styles.title}>Cart</h1>
          <div className={styles.imageWrapper}>
            <img
              src="img/cart-is-empty.png"
              alt="Empty Cart"
              className={styles.image}
            />
            <p className={styles.emptyMessage}>Your cart is empty</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <BackButton path="/" />
        <h1 className={styles.title}>Cart</h1>

        <div className={styles.content}>
          <div className={styles.itemsList}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <button
                  className={styles.cartItem__removeButton}
                  onClick={() => removeFromCart(item.id)}
                >
                  <img src="img/icons/remove.png" alt="Remove" />
                </button>

                <Link
                  to={`/product/${item.product.itemId}`}
                  className={styles.cartItem__product}
                >
                  <img
                    src={buildUrl(item.product.image)}
                    alt={item.product.name}
                    className={styles.cartItem__image}
                  />

                  <p className={styles.cartItem__name}>{item.product.name}</p>
                </Link>

                <div className={styles.cartItem__quantityControl}>
                  <button
                    className={styles.cartItem__quantityButton}
                    onClick={() => decrementQuantity(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>

                  <span className={styles.cartItem__quantity}>
                    {item.quantity}
                  </span>

                  <button
                    className={styles.cartItem__quantityButton}
                    onClick={() => incrementQuantity(item.id)}
                  >
                    +
                  </button>
                </div>

                <div className={styles.cartItem__price}>
                  ${item.product.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.summary__total}>${totalAmount}</div>
            <div className={styles.summary__quantity}>
              Total for {totalQuantity} item{totalQuantity !== 1 ? 's' : ''}
            </div>

            <hr className={styles.summary__divider} />

            <button
              className={styles.summary__checkoutButton}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p className={styles.modal__text}>
              Checkout is not implemented yet. Do you want to clear the Cart?
            </p>

            <div className={styles.modal__actions}>
              <button
                className={styles.modal__cancelButton}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className={styles.modal__confirmButton}
                onClick={handleConfirm}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
