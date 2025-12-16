import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { useCart } from '../shared/context/CartContext';
import { CartItem } from './components/CartItem';
import { Container } from '../shared/components/Container';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    totalItems,
    totalPrice,
    removeFromCart,
    increase,
    decrease,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <Container>
      <div className={styles.page}>
        <button
          type="button"
          className={styles.back}
          onClick={() => navigate(-1)}
        >
          ‹ Back
        </button>

        <h1 className={styles.title}>Cart</h1>

        {cart.length === 0 ? (
          <p className={styles.empty}>Your cart is empty</p>
        ) : (
          <div className={styles.content}>
            <div className={styles.list}>
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onInc={increase}
                  onDec={decrease}
                />
              ))}
            </div>

            <aside className={styles.summary}>
              <div className={styles.total}>${totalPrice}</div>
              <div className={styles.subtext}>Total for {totalItems} items</div>

              <div className={styles.divider} />

              <button
                type="button"
                className={styles.checkout}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </aside>
          </div>
        )}
      </div>
    </Container>
  );
};
