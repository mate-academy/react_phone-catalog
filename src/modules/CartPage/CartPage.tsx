import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartItem } from './components/CartItem';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, changeQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [isCheckout, setIsCheckout] = useState(false);

  const totalSum = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckout(true);
    setTimeout(() => {
      clearCart();
      setIsCheckout(false);
      alert('Thank you for your order!');
    }, 1500);
  };

  return (
    <div className={styles.cart}>
      <a
        href="#back"
        onClick={e => {
          e.preventDefault();
          navigate(-1);
        }}
        className={styles.cart__back}
      >
        &lt; Back
      </a>

      <h1 className={styles.cart__title}>Cart</h1>

      {cart.length === 0 ? (
        <div className={styles.cart__empty}>
          <h2>Your cart is empty</h2>
          <Link
            to="/phones"
            className={styles.cart__checkoutBtn}
            style={{
              display: 'inline-block',
              width: 'auto',
              padding: '12px 24px',
            }}
          >
            Go to store
          </Link>
        </div>
      ) : (
        <div className={styles.cart__content}>
          <div className={styles.cart__list}>
            {cart.map(({ id, product, quantity }) => (
              <CartItem
                key={id}
                product={product}
                quantity={quantity}
                onRemove={() => removeFromCart(id)}
                onChangeQuantity={delta => changeQuantity(id, delta)}
              />
            ))}
          </div>

          <div className={styles.cart__checkout}>
            <span className={styles.cart__totalPrice}>${totalSum}</span>
            <span className={styles.cart__totalCount}>
              Total for {totalItems} items
            </span>
            <hr className={styles.cart__divider} />
            <button
              type="button"
              disabled={isCheckout}
              onClick={handleCheckout}
              className={styles.cart__checkoutBtn}
            >
              {isCheckout ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
