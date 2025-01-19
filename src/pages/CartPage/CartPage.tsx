/* eslint-disable react/react-in-jsx-scope */
import { useContext, useState } from 'react';
import { BackLink } from '../../components/BackLink';
import { CartItem } from '../../components/CartItem';
import styles from './CartPage.module.scss';
import { CartContext } from '../../store/CartContext';
import empty from '/img/cart-is-empty.png';
import { ModalDialog } from '../../components/ModalDialog';

export const CartPage = () => {
  const { cartProducts } = useContext(CartContext);

  const [modalDialog, setModalDialog] = useState(false);

  const totalPrice = cartProducts.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const totalQuantities = cartProducts.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <section className={styles.cart}>
      <div className={styles['cart__btn-back']}>
        <BackLink />
      </div>
      <h1 className={styles.cart__title}>Cart</h1>

      {cartProducts.length > 0 ? (
        <div className={styles.cart__content}>
          <ul className={styles.cart__left}>
            {cartProducts.map(cartProduct => {
              return (
                <li key={cartProduct.id} className={styles.cart__item}>
                  <CartItem cartProduct={cartProduct} />
                </li>
              );
            })}
          </ul>
          <div className={styles.cart__right}>
            <p className={styles['cart__total-price']}>{`$${totalPrice}`}</p>
            <p className={styles['cart__total-text']}>
              {`Total for ${totalQuantities} item${cartProducts.length === 1 ? '' : 's'}`}
            </p>
            <div className={styles.cart__line}></div>
            <button
              className={styles.cart__button}
              onClick={() => setModalDialog(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.cart__empty}>
          <p className={styles.cart__text}>Your cart is empty</p>
          <img
            src={empty}
            alt="empty_cart"
            className={styles['cart__img-empty']}
          />
        </div>
      )}

      {modalDialog && (
        <ModalDialog
          showModal={modalDialog}
          closeModal={() => setModalDialog(false)}
        />
      )}
    </section>
  );
};
