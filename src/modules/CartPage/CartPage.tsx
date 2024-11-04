// src/pages/CartPage.tsx
import React from 'react';
import { useCart } from '../../context/CartContext/CartContext';
// import styles from '../../components/ProductCard/ProductCard.module.scss';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalQuantity, totalAmount, clearCart } = useCart();

  console.log('Cart:', cart);

  return (
    <div>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className={styles.itemsContainer}>
          {cart.map(item => (

            <div className={styles.itemCart} key={item.id}>
              <button onClick={() => removeFromCart(item.id)}>x</button>
              <img
                src={`/${item.product.images[0]}`}
                alt={item.product.name}
                className={styles.productCart__image}
              />
              <h3 className={styles.productCart__title}>{item.product.name}</h3>
              <div className={`${styles.productCart__quantity} ${styles.productQuantity}`}>
                <button
                  className={styles.productQuantity__}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <p className={styles.productCart__price}>${item.product.price}</p>

            </div>
          ))}
        </div>
      )}
      <p>Total items: {totalQuantity}</p>
      <p>Total amount: ${totalAmount}</p>
      <button onClick={() => {
        if (window.confirm('Checkout is not implemented yet. Do you want to clear the Cart?')) {
          clearCart();
        }
      }}>Checkout</button>
    </div>
  );
};
