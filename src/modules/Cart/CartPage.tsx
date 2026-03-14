import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { ContextProps } from '../../types/ContextProps';
import { CartList } from './components/CartList';
import { CartCheckout } from './components/CartCheckout';
import { ArrowUpIcon } from '../shared/components/Icons';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, products } = useOutletContext<ContextProps>();

  const cartProducts = cart
    .map(cartItem => {
      const productData = products.find(p => p.itemId === cartItem.id)!;

      return {
        ...productData,
        quantity: cartItem.quantity,
      };
    })
    .filter(item => item.id !== undefined);

  const totalPrice = cartProducts.reduce(
    (sum, item) => sum + (item.price || item.fullPrice) * item.quantity,
    0,
  );

  const totalQuantity = cartProducts.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <span className="icon icon--left">
            <ArrowUpIcon />
          </span>
          Back
        </button>

        <h1 className={styles.title}>Cart</h1>

        {cartProducts.length === 0 ? (
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
    </div>
  );
};
