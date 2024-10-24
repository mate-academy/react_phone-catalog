import { useContext } from 'react';
import { StateContext } from '../../contex/State';
import styles from './CartPage.module.scss';
import { BackLink } from '../../components/BackLink';
import { CartItem } from './components/CartItem';
import { EmptyCart } from './components/EmptyCart';

export const CartPage = () => {
  const { cart } = useContext(StateContext);

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  return (
    <section className={styles['cart-page']}>
      <BackLink className={styles['cart-page__back']} />
      <h1 className={styles['cart-page__title']}>Cart</h1>
      {cart.length ? (
        <div className={styles['cart-page__container']}>
          <ul className={styles['cart-page__list']}>
            {cart.map(product => {
              return (
                <li key={product.id}>
                  <CartItem product={product} />
                </li>
              );
            })}
          </ul>
          <div className={styles['cart-page__total']}>
            <p className={styles['cart-page__total-price']}>${totalPrice}</p>
            <p className={styles['cart-page__total-desc']}>
              Total for {cart.length} item{cart.length > 1 ? 's' : ''}
            </p>
            <button className={styles['cart-page__checkout']}>Checkout</button>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </section>
  );
};
