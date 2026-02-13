import React, { useState } from 'react';
import { useCart } from '../../../../contexts/CartContext';
import { CheckoutModal } from '../CheckoutModal';
import styles from './CartTotal.module.scss';

export const CartTotal: React.FC = () => {
  const { state } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = state.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const totalQuantity = state.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.cartTotal}>
        <div className={styles.cartTotal__price}>${totalPrice}</div>

        <div className={styles.cartTotal__items}>
          Total for {totalQuantity} item{totalQuantity !== 1 ? 's' : ''}
        </div>

        <button className={styles.cartTotal__button} onClick={handleCheckout}>
          Checkout
        </button>
      </div>

      {isModalOpen && <CheckoutModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};
