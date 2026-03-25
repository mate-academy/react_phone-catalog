import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { CartList } from './components/CartList';
import { CartCheckout } from './components/CartCheckout';
import { PageTitle } from '../shared/components/PageTitle';
import { BackButton } from '../shared/components/BackButton';
import { useCartPage } from './useCartPage';
import { useTitle } from '../../hooks/useTitle';

export const CartPage: React.FC = () => {
  useTitle('Cart');

  const navigate = useNavigate();
  const { cartProducts, totalPrice, totalQuantity, isEmpty } = useCartPage();

  return (
    <div className={styles.container}>
      <BackButton />

      <PageTitle>Cart</PageTitle>
      {isEmpty ? (
        <div className={styles.emptyState}>
          <img
            src="img/cart-is-empty.png"
            alt="Cart is empty"
            className={styles.emptyImage}
          />
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
