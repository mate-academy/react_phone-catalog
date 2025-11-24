import React, { useContext } from 'react';
import { CartContext } from '../../shared/contexts/CartContext';
// eslint-disable-next-line max-len
import { CartItemList } from '../../shared/components/CartItemList/CartItemList';
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
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecrement = (id: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    );
  };

  const handleRemove = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
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
            <CartItemList
              items={cartItems}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
            />

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
