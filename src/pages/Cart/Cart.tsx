import { useContext, useState } from 'react';
import { BackButton } from '../../components/BackButton';
import styles from './Cart.module.scss';
import { CartListProduct } from '../../components/CartListProduct';
import { Modal } from '../../components/Modal';
import { CartContext } from '../../context/CartContext';

export const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('Must be used within a CartProvider');
  }

  const { cartItems, removeFromCart } = cartContext;
  const clearCart = () => {
    cartItems.forEach(item => removeFromCart(item.id));
    setIsModalOpen(false);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.finalPrice * item.quantity,
    0,
  );

  return (
    <section className={styles.cartPage}>
      <div className={styles.cartContent}>
        <div className={styles.cartTop}>
          <BackButton />

          <h1 className={styles.cartTitle}>Cart</h1>
        </div>

        <div className={styles.cartItemContainer}>
          {cartItems.map(item => (
            <CartListProduct key={item.id} cartItem={item} />
          ))}
        </div>
        {cartItems.length < 1 && (
          <div className={styles.emptyCart}>
            <span className={styles.emptyCartText}>Your cart is empty</span>

            <img
              className={styles.emptyCartImg}
              src="/img/cart-is-empty.png"
              alt="Cart is empty"
            />
          </div>
        )}
        {cartItems.length > 0 && (
          <div className={styles.checkoutBlock}>
            <div className={styles.priceBlock}>
              <span className={styles.totalPrice}>{`$${totalPrice}`}</span>

              <span className={styles.priceText}>
                Total for {cartItems.length} items
              </span>
            </div>

            <div className={styles.decoration} />

            <button
              className={styles.checkoutButton}
              onClick={() => setIsModalOpen(true)}
            >
              Checkout
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal onConfirm={clearCart} onCancel={() => setIsModalOpen(false)} />
      )}
    </section>
  );
};
