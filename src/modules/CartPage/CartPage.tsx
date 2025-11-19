import React, { useContext } from 'react';
import { CartRecord } from '../../shared/components/CartItem/CartRecord';
import { CartContext } from '../../shared/contexts/CartContext';
import styles from './CartPage.module.scss';
// eslint-disable-next-line max-len
import { NavigationButton } from '../../shared/components/NavigationButton/NavigationButton';

export const CartPage: React.FC = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleIncrement = (id: number) => {
    const increment = cartItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    setCartItems(increment);
  };

  const handleDecrement = (id: number) => {
    const decrement = cartItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }

      return item;
    });

    setCartItems(decrement);
  };

  const handleRemove = (id: number) => {
    const remove = cartItems.filter(item => item.id !== id);

    setCartItems(remove);
  };

  const handleCheckout = () => {
    setCartItems([]);
  };

  return (
    <div className={styles.lid}>
      <NavigationButton title="Back" />
      <h1>Cart</h1>

      <section>
        <div className={styles.container}>
          <div className={styles.cartList}>
            {cartItems.map(item => (
              <CartRecord
                key={item.id}
                item={item}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onRemove={handleRemove}
              />
            ))}

            {cartItems.length === 0 && (
              <div className={styles.empty}>
                <img
                  className={styles.emtyImage}
                  src="/img/cart-is-empty.png"
                  alt="Empty cart"
                />
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <aside className={styles.summary}>
              <p className={styles.totalPrice}>${totalPrice}</p>
              <p className={styles.totalText}>
                Total for {totalQuantity} items
              </p>

              <hr className={styles.divider} />

              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                Checkout
              </button>
            </aside>
          )}
        </div>
      </section>
    </div>
  );
};
