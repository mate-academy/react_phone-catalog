import { useState } from 'react';

import { Back } from '../shared/components/Back';
import { useCart } from '../shared/context/CartContext';
import { CartProduct } from './components/CartProduct';

import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { cart, getTotalCount, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = cart.reduce((prev, p) => prev + p.price * p.quantity, 0);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleConfirmClear = () => {
    clearCart();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={styles.cart}>
      <div className={styles.cart__wrapper}>
        <Back />

        <h1 className={styles.cart__title}>Cart</h1>

        {!cart.length ? (
          <div className={styles.cart__empty}>
            <span className={styles['cart__empty-title']}>
              Your cart is empty
            </span>

            <img
              className={styles['cart__empty-image']}
              src="./img/cart-is-empty.png"
              alt="Empty shopping cart"
            />
          </div>
        ) : (
          <div className={styles.cart__container}>
            <div className={styles.cart__products}>
              {cart.map(product => (
                <CartProduct key={product.id} product={product} />
              ))}
            </div>

            <div className={styles.cart__checkout}>
              <p className={styles['cart__checkout-title']}>${totalPrice}</p>

              <p className={styles['cart__checkout-total-price']}>
                Total for {getTotalCount()} item{getTotalCount() > 1 && 's'}
              </p>

              <div className={styles['cart__checkout-line']}></div>

              <button
                className={styles['cart__checkout-button']}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className={styles['cart__checkout-modal']}>
            <div className={styles['cart__checkout-modal-content']}>
              <p className={styles['cart__checkout-modal-title']}>
                Checkout is not implemented yet. Do you want to clear the Cart?
              </p>

              <div className={styles['cart__checkout-modal-actions']}>
                <button
                  className={`${styles['cart__checkout-modal-button']}
                    ${styles['cart__checkout-modal-button--confirm']}`}
                  onClick={handleConfirmClear}
                >
                  Yes, clear
                </button>

                <button
                  className={`${styles['cart__checkout-modal-button']}
                    ${styles['cart__checkout-modal-button--cancel']}`}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
