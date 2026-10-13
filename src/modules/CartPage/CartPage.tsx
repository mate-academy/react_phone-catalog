import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../shared/context/CartContext';
import { useLanguage } from '../shared/context/LanguageContext';
import { CartItemComponent } from './components/CartItemComponent';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { cartItems, totalAmount, totalQuantity, clearCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmCheckout = () => {
    clearCart();
    setIsModalOpen(false);
  };

  const handleCancelCheckout = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.page}>
      <div className="main-container">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={styles.backButton}
          data-cy="backButton"
        >
          <i className="fas fa-chevron-left" />
          <span>{t('back')}</span>
        </button>

        <h1 className={styles.title}>{t('cart')}</h1>

        {cartItems.length === 0 ? (
          <div className={styles.emptyState}>
            <img
              src="/img/cart-is-empty.png"
              alt="Empty cart"
              className={styles.emptyImage}
            />
            <p className={styles.emptyText}>{t('cartEmpty')}</p>
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.itemsList}>
              {cartItems.map(item => (
                <CartItemComponent key={item.id} item={item} />
              ))}
            </div>

            <div className={styles.summaryBox}>
              <span className={styles.totalPrice}>${totalAmount}</span>
              <span className={styles.totalCount}>
                {t('totalForItems', { count: totalQuantity })}
              </span>

              <div className={styles.divider} />

              <button
                type="button"
                onClick={handleCheckoutClick}
                className={styles.checkoutButton}
              >
                {t('checkout')}
              </button>
            </div>
          </div>
        )}

        {/* Checkout confirmation modal */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <p className={styles.modalText}>{t('checkoutModal')}</p>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={handleConfirmCheckout}
                  className={styles.confirmBtn}
                >
                  {t('confirm')}
                </button>
                <button
                  type="button"
                  onClick={handleCancelCheckout}
                  className={styles.cancelBtn}
                >
                  {t('cancel')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
