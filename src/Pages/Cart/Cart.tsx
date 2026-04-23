import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../ItemsProvider';
import { CartItem } from '../../components/CartItem/CartItem';
import styles from './Cart.module.scss';

export const Cart = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      setCartItems([]);
    }
  };

  return (
    <section className={styles.cart}>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className={styles.cart__back}
      >
        <img src="img/icons/Arrow_Left.png" alt="Back" />
        Back
      </button>

      <h1 className={styles.cart__title}>Cart</h1>

      <article className={styles.cart__container}>
        {cartItems.map(item => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </article>

      <article className={styles.cart__summary}>
        <p className={styles.cart__total}>${totalPrice}</p>
        <p className={styles.cart__count}>Total for {totalQuantity} items</p>
        <div className={styles.cart__line} />

        <button
          className={styles.cart__checkout}
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          Checkout
        </button>
      </article>
    </section>
  );
};
