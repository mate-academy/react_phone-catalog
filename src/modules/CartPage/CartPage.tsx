// src/pages/CartPage.tsx
import React from 'react';
import { useCart } from '../../context/CartContext/CartContext';
import styles from './CartPage.module.scss';
import { useState } from 'react';
import { BackButton } from '../../components/BackButton/BackButton';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalQuantity, totalAmount, clearCart } = useCart();

  const [activeButtons, setActiveButtons] = useState<{ [key: number]: { increase: boolean; decrease: boolean } }>({});
  const [activeQuantity, setActiveQuantity] = useState<{ [key: number]: boolean}>({});
  const [activeRemoveButton, setActiveRemoveButton] = useState<{
    [key: number]: boolean
  }>({});

  const handleButtonRemove = (item: any) => {
    removeFromCart(item.id);
    setActiveRemoveButton(prev => ({
      ...prev,
      [item.id]: true,
    }))
  }

  const handleButtonPress = (item: any, isIncrease: boolean) => {
    const newQuantity = isIncrease ? item.quantity + 1 : item.quantity - 1;
    if (newQuantity >= 0) {
      updateQuantity(item.id, newQuantity);
      setActiveButtons(prev => ({
        ...prev,
        [item.id]: {
          increase: isIncrease ? true : prev[item.id]?.increase || false,
          decrease: !isIncrease ? true : prev[item.id]?.decrease || false,
        },
      })),

      setActiveQuantity(prev => ({
        ...prev,
        [item.id]: true,
      }))

      setTimeout(() => {
        setActiveButtons(prev => ({
          ...prev,
          [item.id]: {
            increase: false,
            decrease: false,
          },
        }));

        setActiveQuantity(prev => ({
          ...prev,
          [item.id]: false,
        }));

        setActiveRemoveButton(prev => ({
          ...prev,
          [item.id]: false,
        }));
      }, 500);
    }
  };

  return (
    <div className={styles.cartBlock}>
      <BackButton />
      <h1>Cart</h1>
      <div className={styles.cartContainer}>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className={styles.itemsContainer}>
          {cart.map(item => (

            <div className={styles.itemCart} key={item.id}>
              <div className={styles.informationItem}>
                <button
                  className={`${styles.product__removeButton} ${activeRemoveButton[item.id] ? styles.active : ''}`}
                  onClick={() => handleButtonRemove(item)}>x</button>
                <img
                  src={`/${item.product.image}`}
                  alt={item.product.name}
                  className={styles.productCart__image}
                />
                <h3 className={styles.productCart__title}>{item.product.name}</h3>
              </div>
              <div className={styles.quantity}>
                <div className={`${styles.productCart__quantity} ${styles.productQuantity}`}>
                  <button
                    className={
                      activeButtons[item.id]?.decrease
                      ? styles.productQuantity__elementActive
                      : styles.productQuantity__element
                    }
                    onClick={() => handleButtonPress(item, false)}>
                      -
                  </button>
                  <span
                    className={
                      activeQuantity[item.id]
                      ? styles.productQuantity__numberActive
                      : styles.productQuantity__number
                    }
                  >
                  {item.quantity}
                  </span>
                  <button
                    className={
                      activeButtons[item.id]?.increase
                      ? styles.productQuantity__elementActive
                      : styles.productQuantity__element
                    }
                    onClick={() => handleButtonPress(item, true)}>+</button>
                </div>
                <p className={styles.productCart__price}>${item.product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className={styles.cartSummary}>
        <p className={styles.totalAmount}>${totalAmount}</p>
        <p className={styles.totalQuantity}>Total for {totalQuantity} items</p>

        <button
          className={styles.chekoutButton}

          onClick={() => {
          if (window.confirm('Checkout is not implemented yet. Do you want to clear the Cart?')) {
            clearCart();
          }
        }}>Checkout</button>
      </div>
      </div>
    </div>
  );
};
