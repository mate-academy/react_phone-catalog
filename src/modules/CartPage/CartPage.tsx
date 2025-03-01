import styles from './CartPage.module.scss';
import { BackLink } from '../components/BackLink';
import { useContext, useState } from 'react';
import { StateContext } from '../hooks/SelectionState';
import { CartItem } from './CartItem';
import { EmptyCart } from './EmptyCart';
import { CheckoutModal } from './CheckoutModal/CheckoutModal';

export const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart } = useContext(StateContext);

  const totalPrice = cart.reduce(
    (total, p) => total + p.product.price * p.quantity,
    0,
  );
  const totalQuantity = cart.reduce((count, p) => count + p.quantity, 0);

  return (
    <section className={styles['cart-page']}>
      <BackLink />
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
              Total for {totalQuantity} item{cart.length > 1 ? 's' : ''}
            </p>
            <button
              className={styles['cart-page__button--checkout']}
              onClick={() => setIsModalOpen(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}

      {isModalOpen && (
        <CheckoutModal
          close={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </section>
  );
};
