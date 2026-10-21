import { useStore } from '../../context/StoreContext';
import { BackButton } from '../../components/BackButton';
import { CartItem } from '../../components/CartItem';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { cart, clearCart, totalCartQuantity, totalCartPrice } = useStore();

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.cart} data-cy="CartPage">
      <BackButton />

      <h1 className={styles.cart__title}>Cart</h1>

      {cart.length === 0 ? (
        <p className={styles.cart__empty}>Your cart is empty</p>
      ) : (
        <div className="columns is-desktop is-variable is-4">
          <div className="column is-8-desktop">
            <div className={styles.cart__list}>
              {cart.map(item => (
                <CartItem key={item.product.itemId} item={item} />
              ))}
            </div>
          </div>
          <div className="column is-4-desktop">
            <div className={styles.cart__checkout}>
              <span className={styles['cart__checkout-price']}>
                ${totalCartPrice}
              </span>
              <span className={styles['cart__checkout-count']}>
                Total for {totalCartQuantity} item
                {totalCartQuantity > 1 ? 's' : ''}
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
