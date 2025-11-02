import { useState } from 'react';
import { useAppContext } from 'components/Contexts/AppDataContext';
import styles from './CartSum.module.scss';
import Modal from 'components/Modal/Modal';

const CartSummary = () => {
  const { getCartTotal, getCartItemsCount, clearCart } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    clearCart();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.summary}>
        <p className={styles.total}>${getCartTotal()}</p>
        <p className={styles.itemsCount}>
          Total for {getCartItemsCount()}
          {getCartItemsCount() === 1 ? ' item' : ' items'}
        </p>
        <div className={styles.devider}></div>
        <button
          className={styles.checkoutBtn}
          onClick={handleCheckoutClick}
          disabled={getCartItemsCount() === 0}
        >
          Checkout
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        message="Checkout is not implemented yet. Do you want to clear the Cart?"
        confirmText="Clear Cart"
        cancelText="Keep Items"
      />
    </>
  );
};

export default CartSummary;
