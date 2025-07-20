import { onAuthStateChanged, type User } from 'firebase/auth';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ConfirmationModal } from '../../ConfirmationModal/ConfirmationModal';
import { ThankYouPage } from '../../ThankYouPage/ThankYouPage';

import { auth } from '../../../config/firebase';
import { useCartActionsStore } from '../../../hooks/useCartAndFavorites';
import { clearUserCartInFirebase } from '../../../utils/userDataSync';

import type { Product } from '../../../types/product';
import styles from './CheckoutSection.module.scss';

type CheckoutSectionProps = {
  productsInCart: (Product & { quantity: number; price: number })[];
};

export const CheckoutSection: FC<CheckoutSectionProps> = ({
  productsInCart,
}) => {
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();
  const clearCart = useCartActionsStore((state) => state.clearCart);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const totalItems = productsInCart.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const totalPriceBeforeDiscount = productsInCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const LOGGED_IN_USER_DISCOUNT = 0.05;
  const discount = user ? LOGGED_IN_USER_DISCOUNT : 0;
  const totalPrice = totalPriceBeforeDiscount * (1 - discount);
  const userDiscount = (discount * 100).toFixed(0);

  useEffect(() => {
    if (showThankYouModal || showConfirmationModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showThankYouModal, showConfirmationModal]);

  const handleCheckoutClick = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmCheckout = async () => {
    setShowConfirmationModal(false);

    const randomOrderId = Math.floor(Math.random() * 1000000) + 1;
    setCurrentOrderId(randomOrderId);

    clearCart();

    if (auth.currentUser) {
      try {
        await clearUserCartInFirebase(auth.currentUser.uid);
      } catch (error) {
        console.error('Failed to clear cart on server:', error);
      }
    }

    setShowThankYouModal(true);
  };

  const handleCancelCheckout = () => {
    setShowConfirmationModal(false);
  };

  const handleCloseThankYouModal = () => {
    setShowThankYouModal(false);
    setCurrentOrderId(0);
    navigate('/');
  };

  return (
    <section className={styles.checkOut}>
      <div className={styles.totalTitlePrice}>
        <h2>${totalPrice.toFixed(0)}</h2>
        {user && discount > 0 && (
          <p className={styles.discount}>-{userDiscount}%</p>
        )}
      </div>
      <div className={styles.totalTitleItems}>
        <p>
          Total for {totalItems} items
          {user ? ' (logged in discount applied)' : ''}
        </p>
      </div>
      <hr className={styles.line} />
      <button
        className={styles.checkoutButton}
        onClick={handleCheckoutClick}
      >
        Checkout
      </button>

      <ConfirmationModal
        isOpen={showConfirmationModal}
        message="Confirm your order and clear your cart?"
        onConfirm={handleConfirmCheckout}
        onCancel={handleCancelCheckout}
      />

      <ThankYouPage
        isOpen={showThankYouModal}
        onClose={handleCloseThankYouModal}
        orderId={currentOrderId}
      />
    </section>
  );
};
