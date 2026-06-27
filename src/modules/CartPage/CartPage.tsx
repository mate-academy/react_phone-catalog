import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { CartContext } from '../shared/context/CartContext';
import { BackButton } from '../../components/BackButton';

export const CartPage: React.FC = () => {
  const cartContext = useContext(CartContext);

  const cart = cartContext?.cart || [];

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      cartContext?.clearCart();
    }
  };

  return (
    <section className={styles.cart}>
      <div className="container">
        <BackButton />
        <h1 className={styles.cart__title}>Cart</h1>

        {cart.length === 0 ? (
          <div className={styles.cart__empty}>
            <h2>Your cart is empty 🛒</h2>
          </div>
        ) : (
          <div className={styles.cart__content}>
            <div className={styles.cart__list}>
              {cart.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <button
                    className={styles.cartItem__remove}
                    onClick={() => cartContext?.removeFromCart(item.id)}
                  >
                    ×
                  </button>

                  <Link
                    to={`/product/${item.product.itemId}`}
                    className={styles.cartItem__imgWrapper}
                  >
                    <img
                      src={`/${item.product.image}`}
                      alt={item.product.name}
                      className={styles.cartItem__img}
                    />
                  </Link>

                  {/* Назва */}
                  <Link
                    to={`/product/${item.product.itemId}`}
                    className={styles.cartItem__name}
                  >
                    {item.product.name}
                  </Link>

                  <div className={styles.cartItem__actions}>
                    <button
                      className={styles.cartItem__btn}
                      onClick={() => cartContext?.changeQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className={styles.cartItem__quantity}>
                      {item.quantity}
                    </span>
                    <button
                      className={styles.cartItem__btn}
                      onClick={() => cartContext?.changeQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <h3 className={styles.cartItem__price}>
                    ${item.product.price * item.quantity}
                  </h3>
                </div>
              ))}
            </div>

            <div className={styles.cart__checkout}>
              <h2 className={styles.cart__totalPrice}>${totalPrice}</h2>
              <p className={styles.cart__totalItems}>
                Total for {totalItems} items
              </p>
              <button
                className={styles.cart__checkoutBtn}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
