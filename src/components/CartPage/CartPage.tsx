import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { BackBtn } from '../BackBtn';
import { CartProduct } from '../CartProduct';
import { CartModal } from '../CartModal';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { cartItems, getTotalPrice, getTotalQuantity, clearCart } = useCart();

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
    <div className={styles.cart}>
      <BackBtn />
      <h1 className={styles.cart__header}>Cart</h1>

      {cartItems.length > 0 ? (
        <div className={styles.cart__content}>
          <div className={styles.cart__list}>
            {cartItems.map(({ product }) => (
              <CartProduct product={product} key={product.itemId} />
            ))}
          </div>

          <div className={styles.cart__summary}>
            <div className={styles.cart__summaryInfo}>
              <span className={styles.cart__summaryPrice}>
                ${getTotalPrice()}
              </span>
              <span className={styles.cart__summaryQuantity}>
                Total for {getTotalQuantity()} items
              </span>
            </div>
            <div className={styles.cart__summaryLine}></div>
            <button
              className={styles.cart__summaryBtn}
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
            <CartModal
              isOpen={isModalOpen}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          </div>
        </div>
      ) : (
        <div className={styles.cart__empty}>
          <span>Your cart is empty 😢</span>
          <img
            src="./img/cart-is-empty.png"
            alt="Empty cart"
            className={styles.cart__emptyImage}
          />
        </div>
      )}
    </div>
  );
};
