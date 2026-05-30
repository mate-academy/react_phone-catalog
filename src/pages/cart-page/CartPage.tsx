import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../components/CartItem';
import { CartTotal } from '../../components/CartTotal';
import styles from './CartPage.module.scss';

// Empty cart image (we'll use the same as no-favorites)
import EmptyCartImage from './images/empty-cart.webp';

export const CartPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Back button */}
        <button className={styles.backButton} onClick={handleBack}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t('back')}
        </button>

        {/* Page title */}
        <h1 className={styles.title}>{t('cart')}</h1>

        {cartItems.length === 0 ? (
          // Empty state
          <div className={styles.emptyState}>
            <div className={styles.emptyStateContent}>
              <img src={EmptyCartImage} alt={t('cartEmpty')} className={styles.emptyStateImage} />
              <h2 className={styles.emptyStateTitle}>{t('cartEmpty')}</h2>
              <p className={styles.emptyStateDescription}>{t('cartEmptyDescription')}</p>
              <Link to="/" className={styles.continueShoppingButton}>
                {t('continueShopping')}
              </Link>
            </div>
          </div>
        ) : (
          // Cart content
          <div className={styles.cartContent}>
            {/* Cart items */}
            <div className={styles.cartItems}>
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Cart total */}
            <div className={styles.cartTotalContainer}>
              <CartTotal />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
