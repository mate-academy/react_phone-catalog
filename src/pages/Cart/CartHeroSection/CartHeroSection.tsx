import { BackButton } from '@/components/UI/BackButton';
import styles from './CartHeroSection.module.scss';
import React, { useState } from 'react';
import { CartProductCard } from '@/components/UI/CartProductCard';
import { useCart } from '@/context/CartContext';
import { Modal } from '@/components/UI/Modal';
import { useTranslation } from 'react-i18next';

export const CartHeroSection: React.FC = () => {
  const { cart, getTotalPrice, getTotalItems } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <>
      <BackButton />
      <div className={styles.cartHeroContainer}>
        <h1 className={styles.cartHeroTitle}>
          {t('productCatalog.titleCart')}
        </h1>
        {cart.length > 0 ? (
          <div className={styles.cartContentWrapper}>
            <div className={styles.cartItems}>
              {cart.map(product => (
                <CartProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className={styles.cartTotal}>
              <div className={styles.wrapperCartTotal}>
                <h2 className={styles.cartTotalPrice}>${getTotalPrice()}</h2>
                <p className={styles.cartTotalItems}>
                  {t('common.items', { count: getTotalItems() })}
                </p>
                <button
                  className={styles.cartTotalBtn}
                  onClick={() => setIsModalOpen(true)}
                >
                  <p className={styles.cartTotalBtnText}>
                    {t('buttons.checkout')}
                  </p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.emptyStateContainer}>
            <p className={styles.noItemsMessage}>{t('common.emptyCart')}</p>
            <img
              src="img/cart-is-empty.png"
              alt="Cart is empty"
              className={styles.cartNotFoundImg}
            />
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.checkoutModalContent}>
          <h2 className={styles.modalTitle}>{t('modal.inDevTitle')}</h2>
          <p className={styles.modalText}>{t('modal.inDevText1')}</p>
          <p className={styles.modalText}>{t('modal.inDevText2')}</p>
          <button
            className={styles.modalCloseButton}
            onClick={() => setIsModalOpen(false)}
          >
            {t('modal.ok')}
          </button>
        </div>
      </Modal>
    </>
  );
};
