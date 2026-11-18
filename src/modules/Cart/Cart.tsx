import { useCart } from '../../context/CartContext';
import { CartProduct } from './components/CartItem';
import styles from './Cart.module.scss';
import { BackLink } from '../shared/BackLink';
import { useEffect, useRef, useState } from 'react';
import { Modal } from '../shared/Modal/Modal';

export const Cart = () => {
  const { cart, totalPrice, totalItems, clearCart } = useCart();
  const summaryRef = useRef<HTMLDivElement>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleConfirm = () => {
    clearCart();
    setIsCheckoutOpen(false);
  };

  useEffect(() => {
    summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, []);

  return (
    <section className={styles.cart}>
      <div className="inline-container">
        <BackLink className={styles.cart__backlink} />
        <h1 className={`page-title ${styles.cart__title}`}>Cart</h1>
        <div className={styles.cart__content}>
          <div className={styles.cart__list}>
            {cart.map(cartItem => (
              <CartProduct key={cartItem.product.id} item={cartItem} />
            ))}
          </div>
          <div ref={summaryRef} className={styles.summary}>
            <div className={styles.summary__info}>
              <span className={styles.summary__price}>${totalPrice}</span>
              <span className={styles.summary__items}>
                Total for {totalItems} items
              </span>
            </div>
            <div className="divider"></div>
            <button
              className={`btn ${styles.summary__checkout}`}
              onClick={() => setIsCheckoutOpen(true)}
              disabled={cart.length === 0}
            >
              Checkout
            </button>
            <Modal
              isOpen={isCheckoutOpen}
              onClose={() => setIsCheckoutOpen(false)}
            >
              <p>
                Checkout is not implemented yet. Do you want to clear the Cart?
              </p>
              <div className={styles.modalActions}>
                <button className="btn" onClick={handleConfirm}>
                  Clear cart
                </button>
                <button
                  className="btn btn--secondary"
                  onClick={() => setIsCheckoutOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </section>
  );
};
