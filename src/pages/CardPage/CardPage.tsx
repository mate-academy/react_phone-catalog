import { useState } from 'react';
import { BtnBack } from '../../components/BtnBack';
import { CartItem } from '../../components/CartItem';
import { Checkout } from '../../components/Checkout';

import { useCart } from '../../context/CartContext';
import styles from './CardPage.module.scss';
export const CardPage = () => {
  const { cart, clearCart } = useCart();
  const [ordered, setOrdered] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setOrdered(true);
  };

  if (ordered) {
    return (
      <div className={styles.card}>
        <h1 className={styles.card__empty}>Thanks for your order! 🎉</h1>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      {cart.length === 0 ? (
        <h1 className={styles.card__empty}>Your cart is empty</h1>
      ) : (
        <>
          <div className={styles.card__top}>
            <BtnBack />
            <p className={styles.card__title}>Cart</p>
          </div>

          <div className={styles.card__container}>
            <div className={styles.card__cartItem}>
              {cart.map(item => (
                <CartItem
                  key={item.product.itemId}
                  product={item.product}
                  quantity={item.quantity}
                />
              ))}
            </div>

            <Checkout handleCheckout={handleCheckout} />
          </div>
        </>
      )}
    </div>
  );
};
