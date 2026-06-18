import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CartItemRow } from '../shared/components/CartItemRow';
import { clearCart } from '../../features/cartAndFavoritesSlice';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.shop.cart);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      dispatch(clearCart());
    }
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        <div className={styles.backButtonWrapper}>
          <Link to="/phones" className={styles.backButton}>
            <img
              src="/img/arrow-left.svg"
              alt="Back"
              className={styles.backArrow}
            />
            Back
          </Link>
        </div>

        <h1 className={styles.title}>Cart</h1>

        {cart.length === 0 ? (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <Link to="/phones" className={styles.shopButton}>
              Go to catalog
            </Link>
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.itemsList}>
              {cart.map(item => (
                <CartItemRow key={item.itemId} item={item} />
              ))}
            </div>

            <div className={styles.summaryBlock}>
              <span className={styles.totalPrice}>${totalPrice}</span>
              <p className={styles.totalCount}>
                Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </p>
              <div className={styles.divider} />
              <button
                type="button"
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
