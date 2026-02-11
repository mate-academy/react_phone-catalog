import React from 'react';
import { BackButton } from '../../shared/components/BackButton/BackButton';
// eslint-disable-next-line max-len
import { useCartFavoritesContext } from '../../shared/hooks/useCartFavoritesContext';
import { CartItem } from './components/CartItem';

import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity } =
    useCartFavoritesContext();
  const isEmpty = cart.length === 0;

  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.price * (item.quantity || 1);
  }, 0);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateCartQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    window.open('https://www.apple.com/store', '_blank');
  };

  return (
    <div className={styles.cart}>
      <BackButton />

      <h1 className={styles.cart__title}>Cart</h1>

      {isEmpty ? (
        <div className={styles.cart__empty}>
          <img
            src="public/img/cart-is-empty.png"
            alt="No products"
            className={styles.cart__emptyImage}
          />
        </div>
      ) : (
        <div className={styles.cart__gridContainer}>
          <div className={styles.cart__items}>
            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>

          <div className={styles.cart__footer}>
            <div className={styles.cart__total}>
              <div className={styles.cart__totalPrice}>${totalPrice}</div>

              <div className={styles.cart__totalText}>
                Total for {cart.length} item{cart.length !== 1 ? 's' : ''}
              </div>
            </div>

            <div className={styles.cart__divider} />

            <button className={styles.cart__checkout} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
