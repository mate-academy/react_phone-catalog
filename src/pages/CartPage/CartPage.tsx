import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { CartItem } from '../../components/CartItem';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useStore();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      cart.forEach(item => removeFromCart(item.id));
    }
  };

  return (
    <div className={styles.cart} data-cy="CartPage">
      <button
        className={styles.cart__back}
        onClick={() => navigate(-1)}
        data-cy="backButton"
      >
        <i className="fas fa-chevron-left"></i>
        <span>Back</span>
      </button>

      <h1 className={styles.cart__title}>Cart</h1>

      {cart.length === 0 ? (
        <p className={styles.cart__empty}>Your cart is empty</p>
      ) : (
        <div className="columns is-desktop is-variable is-4">
          <div className="column is-8-desktop">
            <div className={styles.cart__list}>
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="column is-4-desktop">
            <div className={styles.cart__checkout}>
              <span className={styles['cart__checkout-price']}>
                ${totalPrice}
              </span>
              <span className={styles['cart__checkout-count']}>
                Total for {totalQuantity} item{totalQuantity > 1 ? 's' : ''}
              </span>

              <div className={styles['cart__checkout-divider']} />

              <button
                className={styles['cart__checkout-btn']}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
