import { BackButton } from '../../components/BackButton';
import { CartItem } from '../../components/CartItem';
import { StatusMessage } from '../../components/StatusMessage';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { cartItems, clearCart } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    const isConfirmed = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      clearCart();
    }
  };

  if (cartItems.length === 0) {
    return <StatusMessage text="Your cart is empty" />;
  }

  return (
    <section className={styles.cart}>
      <BackButton />

      <h1 className={styles.cart__title}>Cart</h1>

      <div className={styles.cart__content}>
        <div className={styles.cart__list}>
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className={styles.cart__summary}>
          <div className={styles.cart__total}>
            <p className={styles.cart__price}>${totalPrice}</p>
            <p className={styles.cart__text}>Total for {totalQuantity} items</p>
          </div>

          <button
            type="button"
            className={styles.cart__button}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
};
