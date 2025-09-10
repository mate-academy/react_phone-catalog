/* eslint-disable import/extensions */
import React from 'react';
import '@/styles/main.scss';
import classNames from 'classnames';
import styles from './CartPage.module.scss';
import { CartItem } from './components/CartItem/CartItem';
import { BackButton } from '../shared/components/BackButton';
import { useProducts } from '@/hooks/useProducts';
import { CartProduct } from '@/types/CartProduct';

export const CartPage: React.FC = () => {
  const { cart, setCart } = useProducts();

  const updateQty = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.product.id !== productId));
    } else {
      setCart(
        cart.map(item =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const removeItem = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    const flag = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (flag) {
      setCart([]);
    }
  };

  return (
    <main className={classNames(styles.cart_page, 'container')}>
      <div className={styles.cart_page__back}>
        <BackButton href="/"></BackButton>
      </div>
      <h1 className={styles.cart_page__heading}>Cart</h1>
      {cart.length === 0 ? (
        <div className={styles.cart_page__empty}>
          <img
            className={styles['cart_page__empty--image']}
            src="img/cart-is-empty.png"
            alt="Empty cart"
          />
          <p
            className={classNames(
              'text__body',
              styles['cart_page__empty--text'],
            )}
          >
            Your cart is empty
          </p>
        </div>
      ) : (
        <div className={styles.cart_page__functional}>
          <div className={styles.cart_page__items}>
            {cart.map((p: CartProduct) => (
              <CartItem
                key={p.product.id}
                product={p.product}
                quantity={p.quantity}
                onQtyChange={updateQty}
                onRemove={removeItem}
              ></CartItem>
            ))}
          </div>
          <div className={styles.cart_page__checkout}>
            <div className={styles['cart_page__checkout--summary']}>
              <h2 className={styles['cart_page__checkout--price']}>
                ${totalPrice}
              </h2>
              <p
                className={classNames(
                  styles['cart_page__checkout--qty'],
                  'text__small',
                )}
              >
                Total for {totalItems} items
              </p>
            </div>
            <hr />
            <button className="button button__primary" onClick={clearCart}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
