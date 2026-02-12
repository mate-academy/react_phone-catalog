import { useState } from 'react';
import styles from './CartPage.module.scss';
import { Link } from 'react-router-dom';
import { useCart } from '../../CartContext';
import { CartItem } from '../../components/CartItem/CartItem';
import arrowLeft from './../../img/icons/Chevron Arrow Left.svg';

export const CartPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const confirmCheckout = () => {
    clearCart();
    setIsCheckedOut(true);
    setShowConfirm(false);
  };

  return (
    <div className="container">
      <Link to="/" className={styles.backLink}>
        <img src={arrowLeft} alt="Back" />
        <div className={styles.backText}>Back</div>
      </Link>

      <h1 className={styles.title}>Cart</h1>

      {isCheckedOut ? (
        <div className={styles.thanks}>
          <h2>Thanks for your order! 🎉</h2>
          <p>We’re already preparing it for you.</p>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.list}>
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <aside className={styles.summary}>
            <h2 className={styles.total}>${totalPrice}</h2>
            <p className={styles.subtitle}>Total for {totalCount} items</p>

            <button
              className={styles.checkout}
              onClick={() => setShowConfirm(true)}
              disabled={!items.length}
            >
              Checkout
            </button>
          </aside>
        </div>
      )}

      {showConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Confirm purchase</h3>
            <p>
              You are about to buy {totalCount} items for ${totalPrice}.
            </p>

            <div className={styles.actions}>
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
              <button onClick={confirmCheckout}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
