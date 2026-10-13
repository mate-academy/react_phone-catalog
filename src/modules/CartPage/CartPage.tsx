import { useNavigate } from 'react-router-dom';
import { useShopContext } from '../../context/ShopContext';
import { CartItem } from '../../components/CartItem';
import styles from './CartPage.module.scss';
import React from 'react';

export const CartPage = () => {
  const { cartItems, clearCart } = useShopContext();
  const navigate = useNavigate(); // Хук для кнопки "Назад"

  // Считаем общую сумму и количество товаров (ИСПРАВЛЕНО ОТ NaN)
  const totalAmount = cartItems.reduce((sum, item) => {
    const actualPrice =
      item.product.priceDiscount ||
      item.product.price ||
      item.product.priceRegular ||
      0;

    return sum + Number(actualPrice) * item.quantity;
  }, 0);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    // Согласно требованиям, показываем модальное окно (используем стандартный confirm)
    if (
      window.confirm(
        'Checkout is not implemented yet. Do you want to clear the Cart?',
      )
    ) {
      clearCart();
    }
  };

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Back</span>
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cartItems.length > 0 ? (
        <div className={styles.content}>
          <div className={styles.itemsList}>
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className={styles.checkoutBlock}>
            <div className={styles.totalInfo}>
              <span className={styles.totalPrice}>${totalAmount}</span>
              <span className={styles.totalItems}>
                Total for {totalQuantity} items
              </span>
            </div>
            <div className={styles.divider} />
            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>
          <h2>Your cart is empty</h2>
        </div>
      )}
    </div>
  );
};
