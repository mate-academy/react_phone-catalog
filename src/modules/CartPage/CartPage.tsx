import { useCart } from '../shared/context/CartContext';
import { BackButton } from '../shared/components/BackButton';
import { CartItem } from './components/CartItem';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { items, totalPrice, totalQuantity, clearCart } = useCart();

  const handleCheckout = () => {
    // README Cart п.9: confirm — допустимое решение вместо своей модалки
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.back}>
        <BackButton />
      </div>

      <h1 className={styles.title}>Cart</h1>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>Your cart is empty</p>
          <img
            src="./img/cart-is-empty.png"
            alt=""
            className={styles.emptyImage}
          />
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.list}>
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className={styles.summary}>
            <p className={styles.total}>${totalPrice}</p>
            <p className={styles.totalLabel}>
              Total for {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
            </p>

            <button
              type="button"
              className={styles.checkout}
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
