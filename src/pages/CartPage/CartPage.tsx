import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { CartItem } from '../../components/CartItem';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    cartItems,
    totalItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.phone.priceDiscount || item.phone.priceRegular;

    return sum + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
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
    <div className={styles.cartPage}>
      <div className={styles.container}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={styles.backButton}
        >
          <img src="img/arrow_left.svg" alt={t('icons.backAlt')} />
          {t('common.back')}
        </button>

        <h1 className={styles.title}>{t('cartPage.title')}</h1>

        {cartItems.length === 0 ? (
          <img
            className={styles.emptyImage}
            src="img/cart-is-empty.png"
            alt={t('cartPage.empty')}
          />
        ) : (
          <div className={styles.content}>
            <div className={styles.items}>
              {cartItems.map(item => (
                <CartItem
                  key={item.phone.id}
                  phone={item.phone}
                  quantity={item.quantity}
                  onRemove={() => removeFromCart(item.phone.id)}
                  onIncrease={() => increaseQuantity(item.phone.id)}
                  onDecrease={() => decreaseQuantity(item.phone.id)}
                />
              ))}
            </div>

            <div className={styles.summary}>
              <div className={styles.totalPrice}>${totalPrice}</div>
              <div className={styles.totalItems}>
                {t('cartPage.totalFor', { count: totalItems })}
              </div>
              <div className={styles.divider} />
              <button
                type="button"
                className={styles.checkout}
                onClick={handleCheckout}
              >
                {t('cartPage.checkout')}
              </button>
            </div>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCancel}
          contentLabel="Checkout Confirmation"
          className={styles.modal}
          overlayClassName={styles.overlay}
          closeTimeoutMS={200}
        >
          <div className={styles.modalContent}>
            <p className={styles.modalText}>
              {t('cartPage.checkoutModal.message')}
            </p>
            <div className={styles.modalButtons}>
              <button
                type="button"
                className={styles.confirmButton}
                onClick={handleConfirm}
              >
                {t('cartPage.checkoutModal.confirm')}
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleCancel}
              >
                {t('cartPage.checkoutModal.cancel')}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
