import React, { useEffect, useState } from 'react';
import { useCart } from '../shared/context/CartContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CartItem } from '../../components/CartItem';
import { EmptyState } from '../../components/EmptyState';
import styles from './CartPage.module.scss';
import { delay } from '../../utils';
import { Loader } from '../../components/Loader';
import { CartPageSkeleton } from './CartPageSkeleton';

export const CartPage: React.FC = () => {
  const { items, clear, totalPrice, totalItems } = useCart();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSkeleton, setIsSkeleton] = useState(true);
  const [orderId, setOrderId] = useState<number | null>(null);

  useEffect(() => {
    const init = async () => {
      setIsSkeleton(true);
      await delay(800);
      setIsSkeleton(false);
    };

    init();
  }, []);

  const handleCheckout = async () => {
    if (window.confirm('Are you sure you want to place an order?')) {
      setLoading(true);
      const newId = Math.floor(100000 + Math.random() * 900000);

      await delay(2000);

      setOrderId(newId);
      clear();
      setIsOrderPlaced(true);
      setLoading(false);
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
              <p className={styles.cartPage__totalLabel}>
                Total for {totalItems} item{totalItems !== 1 ? 's' : ''}
              </p>
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
