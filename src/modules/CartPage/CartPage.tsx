// src/modules/CartPage/CartPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import styles from './CartPage.module.scss';
import { CartItemElement } from '../../components/CartItemElement/CartItemElement';
import { Modal } from '../../components/Modal/Modal';

export const CartPage: React.FC = () => {
  const { cart, clearCart } = useApp();

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmCheckout = () => {
    clearCart(); // Очищаємо весь кошик
    setIsModalOpen(false); // Закриваємо модальне вікно
  };

  const totalAmount = cart.reduce((sum: number, item) => {
    return sum + Number(item.product.price) * item.quantity;
  }, 0);

  const totalItems = cart.reduce((sum: number, item) => {
    return sum + item.quantity;
  }, 0);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.cart}>
      <button
        type="button"
        onClick={handleGoBack}
        className={styles.cart__back}
      >
        <img
          src="/react_phone-catalog/img/icons/arrow-left.svg"
          alt="Arrow"
          className={styles.cart__backIcon}
        />
        <span className={styles.cart__backText}>Back</span>
      </button>

      <h1 className={styles.cart__title}>Cart</h1>

      {cart.length === 0 ? (
        // Варіант, якщо кошик порожній — додали текст
        <p className={styles.cart__empty}>Your cart is empty</p>
      ) : (
        // Варіант, якщо в кошику є товари
        <div className={styles.cart__container}>
          <div className={styles.cart__list}>
            {cart.map(item => (
              <CartItemElement key={item.id} item={item} />
            ))}
          </div>

          {/* блок Summary */}
          <div className={styles.cart__summary}>
            <div className={styles.cart__info}>
              <span className={styles.cart__price}>${totalAmount}</span>
              <span className={styles.cart__count}>
                Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className={styles.cart__line} />

            <button
              type="button"
              className={styles.cart__checkout}
              onClick={() => setIsModalOpen(true)}
            >
              Checkout
            </button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleConfirmCheckout}
            />
          </div>
        </div>
      )}
    </div>
  );
};
