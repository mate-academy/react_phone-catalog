import React from 'react';
import { Link } from 'react-router-dom';

import { CartItem, useGlobal } from '../CartContext/CartContext';
import styles from './CartPage.module.scss';
import home from '../../api/buttoms/Right.svg';
import close from '../../api/buttoms/Close.svg';

export const CartPage: React.FC = () => {
  const { cart: rawCart, updateQuantity, removeFromCart } = useGlobal();

  const cart = rawCart as CartItem[];

  const totalPrice = cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0,
  );

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      `You are about to purchase ${totalItems} items for a total of $${totalPrice}. Proceed with order?`,
    );

    if (isConfirmed) {
      cart.forEach(item => removeFromCart(item.id));

      window.alert(
        'Thank you for your purchase! Your order has been successfully placed.',
      );
    }
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        <button
          className={styles.backButton}
          onClick={() => window.history.back()}
        >
          <img src={home} alt="back" />
          Back
        </button>

        <h1 className={styles.title}>Cart</h1>

        {cart.length > 0 ? (
          <div className={styles.content}>
            <div className={styles.itemsList}>
              {cart.map((item: CartItem) => (
                <div key={item.id} className={styles.cartItem}>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <img src={close} alt="remove" />
                  </button>

                  <Link to={`/${item.category || 'phones'}/${item.itemId}`}>
                    <div className={styles.itemInfo}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles.itemImage}
                      />
                      <p className={styles.itemName}>{item.name}</p>
                    </div>
                  </Link>

                  <div className={styles.rightBlock}>
                    <div className={styles.quantityControls}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity === 1}
                      >
                        −
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className={styles.itemPrice}>${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.checkoutPanel}>
              <h2 className={styles.totalPrice}>${totalPrice}</h2>
              <p className={styles.totalCount}>Total for {totalItems} items</p>
              <div className={styles.divider} />

              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <h2 className={styles.empty}>Your cart is empty</h2>
        )}
      </div>
    </div>
  );
};
