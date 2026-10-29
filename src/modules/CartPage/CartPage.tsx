import { BackButton } from '../../components/BackButton';
import { CartItem } from '../../components/CartItem';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { items, totalCount, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.page}>
      <BackButton />

      <h1 className={styles.title}>Cart</h1>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.message}>Your cart is empty</p>

          <img
            className={styles.emptyImage}
            src="img/cart-is-empty.png"
            alt=""
          />
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.list}>
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <aside className={styles.summary}>
            <p className={styles.total}>${totalPrice}</p>
            <p className={styles.totalText}>
              Total for {totalCount} {totalCount === 1 ? 'item' : 'items'}
            </p>

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
  );
};
