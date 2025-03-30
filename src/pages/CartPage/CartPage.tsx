/* eslint-disable react/react-in-jsx-scope */
import { useContext, useState } from 'react';
import cn from 'classnames';
import styles from './CartPage.module.scss';
import { BackLink } from '../../components/BackLink';
import { CartItem } from '../../components/CartItem';
import { ModalDialog } from '../../components/ModalDialog';
import { CartContext } from '../../store/CartContext';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';
import empty from '/img/cart-is-empty.png';

export const CartPage = () => {
  const { cartProducts } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);
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
      <h1
        className={cn({
          [styles.cart__title]: theme === Theme.Light,
          [styles['cart__title-dark']]: theme === Theme.Dark,
        })}
      >
        Cart
      </h1>

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
          <div
            className={cn({
              [styles.cart__right]: theme === Theme.Light,
              [styles['cart__right-dark']]: theme === Theme.Dark,
            })}
          >
            <p
              className={cn({
                [styles['cart__total-price']]: theme === Theme.Light,
                [styles['cart__total-price-dark']]: theme === Theme.Dark,
              })}
            >
              {`$${totalPrice}`}
            </p>
            <p
              className={cn({
                [styles['cart__total-text']]: theme === Theme.Light,
                [styles['cart__total-text-dark']]: theme === Theme.Dark,
              })}
            >
              {`Total for ${totalQuantities} item${cartProducts.length === 1 ? '' : 's'}`}
            </p>
            <div
              className={cn({
                [styles.cart__line]: theme === Theme.Light,
                [styles['cart__line-dark']]: theme === Theme.Dark,
              })}
            ></div>
            <button
              className={cn({
                [styles.cart__button]: theme === Theme.Light,
                [styles['cart__button-dark']]: theme === Theme.Dark,
              })}
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
