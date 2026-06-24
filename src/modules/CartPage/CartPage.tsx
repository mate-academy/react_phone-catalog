import React, { useContext } from 'react';
import { CartContext } from '../../shared/contexts/CartContext';
import { CartItemList } from '../../shared/components/CartItemList';
import { NavigationButton } from '../../shared/components/NavigationButton';
import styles from './CartPage.module.scss';
import emptyCart from '../../../public/img/cart-is-empty.png';

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
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const handleRemove = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setCartItems([]);
  };

  return (
    <div className={`${styles.lid} container`}>
      <div className={`grid-24 ${styles.grid}`}>
        <NavigationButton title="Back" />

        <h1 className={styles.title}>Cart</h1>

        {cartItems.length === 0 && (
          <div className={styles.empty}>
            <img
              className={styles.emtyImage}
              src={emptyCart}
              alt="Empty cart"
            />
          </div>
        )}

        {cartItems.length > 0 && (
          <div className={styles.cartList}>
            <CartItemList
              items={cartItems}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
            />
          </div>
        )}

        {cartItems.length > 0 && (
          <aside className={styles.summary}>
            <p className={styles.totalPrice}>${totalPrice}</p>
            <p className={styles.totalText}>Total for {totalQuantity} items</p>

            <hr className={styles.divider} />

            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              Checkout
            </button>
          </aside>
        )}
      </div>
    </div>
  );
};
