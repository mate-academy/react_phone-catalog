import { useCart } from '../shared/context/CartContext';
import { EmptyState } from '../shared/components/EmptyState';
import { formatPrice } from '../shared/utils/catalog';
import { CartItemCard } from './components/CartItemCard';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const {
    items,
    totalAmount,
    totalQuantity,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Cart</h1>

      {!items.length && (
        <EmptyState
          title="Your cart is empty"
          description={
            'Add a few favorites and they will show up here ready for checkout.'
          }
        />
      )}

      {!!items.length && (
        <div className={styles.layout}>
          <div className={styles.list}>
            {items.map(item => (
              <CartItemCard
                key={item.id}
                item={item}
                onDecrease={() => updateQuantity(item.id, -1)}
                onIncrease={() => updateQuantity(item.id, 1)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
          </div>

          <aside className={styles.summary}>
            <p className={styles.amount}>{formatPrice(totalAmount)}</p>
            <p className={styles.meta}>Total for {totalQuantity} items</p>
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
    </section>
  );
};
