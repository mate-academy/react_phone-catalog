import styles from './CartPage.module.scss';
import arrow from '../../images/Icons/arrow-right-white.svg';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../../contexts/cart';
import { CartItemCard } from './CartItem';
import { useCart } from '../../hooks/useCart';

export const CartPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const { clearCart } = useCart();
  const { cartItems, totalQuantityDiff } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <div className={styles.cart}>
      {isModalOpen && (
        <div className={styles.cart__dialogOverlay}>
          <div className={styles.cart__dialogWindow}>
            <h3>
              Checkout is not implemented yet. Do you want to clear the Cart?
            </h3>

            <div className={styles.cart__dialogBtns}>
              <button
                className={styles.cart__dialogBtn}
                onClick={() => {
                  clearCart();
                  setIsModalOpen(false);
                }}
              >
                Confirm
              </button>

              <button
                className={styles.cart__dialogBtn}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.cart__labels}>
        <button className={styles.cart__backBtn} onClick={() => navigate(-1)}>
          <img src={arrow} className={styles.cart__backBtnArrow} />
          Back
        </button>

        <h1 className={styles.cart__mainTitle}>Cart</h1>
      </div>

      <div className={styles.cart__content}>
        {cartItems.length === 0 ? (
          <div className={styles.cart__emptyMessage}>
            <h3>Your cart is empty</h3>
          </div>
        ) : (
          <>
            <ul className={styles.cart__list}>
              {cartItems.map(cartItem => (
                <li className={styles.cart__listItem} key={cartItem.product.id}>
                  <CartItemCard cartItem={cartItem} />
                </li>
              ))}
            </ul>
            <div className={styles.cart__checkoutBunner}>
              <h2 className={styles.cart__totalPrice}>${total}</h2>
              <p className={styles.cart__checkoutText}>
                Total for {totalQuantityDiff + cartItems.length} items
              </p>
              <button
                className={styles.cart__checkoutBtn}
                onClick={() => setIsModalOpen(true)}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
