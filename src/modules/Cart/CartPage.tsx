import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { CartList } from './components/CartList';
import { CartCheckout } from './components/CartCheckout';
import { PageTitle } from '../shared/components/PageTitle';
import { BackButton } from '../shared/components/BackButton';
import { useCartPage } from './useCartPage';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartProducts, totalPrice, totalQuantity, isEmpty } = useCartPage();

  return (
    <div className={styles.container}>
      <BackButton />

      <PageTitle>Cart</PageTitle>
      {isEmpty ? (
        <div className={styles.emptyState}>
          <h2>Your cart is empty</h2>
          <button
            className={styles.continueShopping}
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.listWrapper}>
            <CartList products={cartProducts} />
          </div>

          <div className={styles.checkoutWrapper}>
            <CartCheckout
              totalPrice={totalPrice}
              totalQuantity={totalQuantity}
            />
          </div>
        </div>
      )}
    </div>
  );
};
