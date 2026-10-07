import styles from './CartPage.module.scss';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../components/CartItem';
import { useNavigate } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <section className={styles.cart_page}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.cart_page__back_button}
      >
        <img
          className={styles.cart_page__back_button__img}
          src="/img/icons/left.svg"
          alt="Back"
        />
        <p className={styles.cart_page__back_button__title}>Back</p>
      </button>

      <h1 className={styles.cart_page__title}>Cart</h1>

      {cart.length === 0 ? (
        <div className={styles.cart_page__empty}>
          <p className={styles.cart_page__empty__title}>Your cart is empty</p>
          <img
            className={styles.cart_page__empty__img}
            src="/img/cart-is-empty.png"
            alt="Your cart is empty"
          />
        </div>
      ) : (
        <div className={styles.cart_page__content}>
          <div className={styles.cart_page__content__items_list}>
            {cart.map(item => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>

          <div className={styles.cart_page__content__box}>
            <h2 className={styles.cart_page__content__box__price}>
              ${totalPrice}
            </h2>
            <p className={styles.cart_page__content__box__items}>
              Total for {totalItems} items
            </p>
            <button
              type="button"
              onClick={handleCheckout}
              className={styles.cart_page__content__box__button}
            >
              <p className={styles.cart_page__content__box__button__title}>
                Checkout
              </p>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
