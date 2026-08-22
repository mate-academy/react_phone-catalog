import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { Icon } from '../shared/components/Icon';
import { EmptyMessage } from '../shared/components/RequestStatus';
import { CartItemRow } from './components/CartItemRow';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, totalQuantity, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className={`container ${styles.page}`}>
      <button
        type="button"
        className={styles.page__back}
        onClick={() => navigate(-1)}
      >
        <Icon name="arrow-left" />
        Back
      </button>

      <h1 className={styles.page__title}>Cart</h1>

      {cartItems.length === 0 ? (
        <EmptyMessage
          message="Your cart is empty"
          image="img/cart-is-empty.png"
        />
      ) : (
        <div className={styles.page__layout}>
          <ul className={styles.page__list}>
            {cartItems.map(item => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </ul>

          <div className={styles.page__summary}>
            <p className={styles.page__total}>${totalPrice}</p>
            <p className={styles.page__count}>
              {`Total for ${totalQuantity} item${totalQuantity === 1 ? '' : 's'}`}
            </p>

            <button
              type="button"
              className={styles.page__checkout}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
