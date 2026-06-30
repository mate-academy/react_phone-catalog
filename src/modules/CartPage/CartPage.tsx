import React, { useCallback, useEffect, useState } from 'react';
import { useCart } from '../shared/context/CartContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CartItem } from '../../components/CartItem';
import { EmptyState } from '../../components/EmptyState';
import styles from './CartPage.module.scss';
import { Loader } from '../../components/Loader';
import { CartPageSkeleton } from './CartPageSkeleton';
import { ErrorState } from '../../components/ErrorState';

export const CartPage: React.FC = () => {
  const { items, clear, totalPrice, totalItems } = useCart();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSkeleton, setIsSkeleton] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);

  const totalItemsLabel = `Total for ${totalItems} item${totalItems !== 1 ? 's' : ''}`;

  const init = useCallback(async () => {
    setErrorMessage(null);
    setIsSkeleton(true);
    try {
      const response = await fetch('./api/products.json');

      if (!response.ok) {
        throw new Error();
      }

      await response.json();
    } catch (error) {
      setErrorMessage('Something went wrong while loading your cart.');
    } finally {
      setIsSkeleton(false);
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const handleCheckout = async () => {
    if (window.confirm('Are you sure you want to place an order?')) {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const newId = Math.floor(100000 + Math.random() * 900000);

        setOrderId(newId);
        clear();
        setIsOrderPlaced(true);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Order failed:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.cartPage__loaderWrapper}>
        <Loader />
        <p className={styles.cartPage__loaderText}>Processing your order...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <section className={styles.cartPage}>
        <Breadcrumbs showBreadcrumbs={false} backButton={true} title="Cart" />
        <ErrorState message={errorMessage} onRetry={init} />
      </section>
    );
  }

  if (isOrderPlaced) {
    return (
      <section className={styles.cartPage}>
        <Breadcrumbs showBreadcrumbs={false} backButton={true} title="Cart" />
        <div className={styles.cartPage__success}>
          <EmptyState
            message="Thank you! Your order has been placed."
            imageSrc="./img/success.png"
            alt="Success"
          />
          <p className={styles.cartPage__orderId}>
            Your order ID is: {orderId}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.cartPage}>
      <Breadcrumbs showBreadcrumbs={false} backButton={true} title="Cart" />
      {isSkeleton ? (
        <CartPageSkeleton />
      ) : items.length === 0 ? (
        <EmptyState
          message="Your cart is empty"
          imageSrc="./img/cart-is-empty.png"
          alt="Cart is empty"
        />
      ) : (
        <div className={styles.cartPage__checkout}>
          <div className={styles.cartPage__itemsList}>
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className={styles.cartPage__totalBlock}>
            <div className={styles.cartPage__totalAmount}>
              <h2 className={styles.cartPage__totalPrice}>${totalPrice}</h2>
              <p className={styles.cartPage__totalLabel}>{totalItemsLabel}</p>
            </div>
            <div className={styles.cartPage__line}></div>
            <button
              className={styles.cartPage__checkoutBtn}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
