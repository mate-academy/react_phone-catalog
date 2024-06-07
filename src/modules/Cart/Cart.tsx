import styles from './Cart.module.scss';
import { useContext, useMemo, useState } from 'react';
import { StateContext } from '../../Store';
import { CartCard } from './components/CartCard';
import classNames from 'classnames';
import { Placeholder } from '../components/Placeholder';
import { Modal } from './components/Modal';
import { useNavigate } from 'react-router-dom';
import { getTotalAmount } from '../../utils/getTotalAmount';

export const Cart = () => {
  const { cart } = useContext(StateContext);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) =>
        item.totalPrice ? accumulator + item.totalPrice : item.price,
      0,
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  const totalAmount = useMemo(() => getTotalAmount(cart), [cart]);

  return (
    <>
      <div
        className={classNames(styles.container, styles.navigation)}
        onClick={goBack}
      >
        <span
          className={classNames(
            styles.navigation__icon,
            styles.navigation__arrow,
            styles['navigation__arrow-left'],
          )}
        />
        <span className={styles.navigation__text}>Back</span>
      </div>

      {isModalOpen && <Modal setIsModalOpen={value => setIsModalOpen(value)} />}

      {cart.length === 0 ? (
        <Placeholder />
      ) : (
        <>
          <section className={classNames(styles.container, styles.cart)}>
            <h1 className={styles.pageHead}>Cart</h1>

            <div className={styles.cart__list}>
              {cart.map(item => (
                <CartCard key={item.id} product={item} />
              ))}
            </div>

            <div className={styles.cart__summary}>
              <div className={styles.cart__price}>
                <span className={styles.cart__sum}>${getTotalPrice()}</span>
                <p className={styles.cart__total}>
                  Total for {totalAmount} {cart.length > 1 ? 'items' : 'item'}
                </p>
              </div>

              <button
                className={styles.cart__checkout}
                onClick={() => setIsModalOpen(true)}
              >
                Checkout
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
};
