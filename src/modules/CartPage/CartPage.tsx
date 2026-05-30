import CartItems from '../../components/CartItems';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';
import buttonStyles from '../../components/Button/Button.module.scss';
import { useState } from 'react';
import HistoryBackButton from '../../components/HistoryBackButton/index';
import Button from '../../components/Button/index';

export const CartPage = () => {
  const {
    items,
    increase,
    decrease,
    removeFromCart,
    clearCart,
    totalAmount,
    totalQuantity,
  } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCheckoutClick = () => setIsModalOpen(true);
  const handleConfirm = () => {
    clearCart();
    setIsModalOpen(false);
  };

  const handleCancel = () => setIsModalOpen(false);
  const checkoutIsDisabled = items.length === 0;

  return (
    <div className={styles.cartPage}>
      <nav className={styles.cartPage__nav}>
        <HistoryBackButton />
      </nav>
      <div className={styles.cartPage__title}>
        <h1>Cart</h1>
      </div>
      <div className={styles.cartPage__content}>
        {items.length === 0 ? (
          <p className="massage">Your cart is empty</p>
        ) : (
          items.map(item => (
            <div
              key={item.id}
              className={`${styles['cart-item']} ${styles.cartPage__list}`}
            >
              <CartItems
                product={item.product}
                quantity={item.quantity}
                handleDecrease={() => decrease(item.id)}
                handleIncrease={() => increase(item.id)}
                handleRemoveFromCart={() => removeFromCart(item.id)}
              />
            </div>
          ))
        )}

        {items.length > 0 && (
          <div className={styles.cartPage__productInfo}>
            <div className={styles.cartPage__summary}>
              <p className={styles.cartPage__productPrice}>
                ${Number(totalAmount).toFixed(2)}
              </p>
              <p className={styles.cartPage__totalQuantity}>
                Total for {totalQuantity} items
              </p>
            </div>
            <Button
              className={`${buttonStyles.button} ${styles.cartPage__checkout}`}
              onClick={handleCheckoutClick}
              disabled={checkoutIsDisabled}
            >
              Checkout
            </Button>
          </div>
        )}
        {isModalOpen && (
          <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
              <p>
                Checkout is not implemented yet. Do you want to clear the Cart?
              </p>
              <div className={styles.modalActions}>
                <button onClick={handleConfirm} className={styles.confirm}>
                  Yes
                </button>
                <button onClick={handleCancel} className={styles.cancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
