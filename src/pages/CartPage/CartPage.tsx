import classNames from 'classnames';
import styles from './CartPage.module.scss';
import { GoBack } from '../../components/GoBack';
import { useContext } from 'react';
import { CartContext } from '../../context/CartProvider';

import cartIsEmpty from '../../assets/cart-is-empty.png';
import { CartItem } from '../../components/CartItem';

export const CartPage = () => {
  const { cartProducts, clearCart } = useContext(CartContext);

  const totalPrice = cartProducts.reduce((totalCount, currentProduct) => {
    const { price, quantity } = currentProduct;

    return totalCount + price * quantity;
  }, 0);

  const cartProductsAmount = cartProducts.reduce((totalCount, { quantity }) => {
    return totalCount + quantity;
  }, 0);

  const handleCheckout = () => {
    const checkout = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    return checkout && clearCart();
  };

  return (
    <section className={classNames('section', styles.cart)}>
      <GoBack classNameProps={styles.cart__back} />

      <h1 className={classNames('title', styles.cart__title)}>Cart</h1>

      {cartProductsAmount ? (
        <>
          <div
            className={classNames(
              styles['cart__product-list'],
              styles['product-list'],
            )}
          >
            {cartProducts.map(cartProduct => (
              <CartItem key={cartProduct.id} product={cartProduct} />
            ))}
          </div>

          <div className={classNames(styles.cart__summary, styles.summary)}>
            <div className={styles.summary__info}>
              <div className={styles['summary__total-price']}>
                ${totalPrice}
              </div>

              <div className={styles['summary__item-count']}>
                Total for {cartProductsAmount} items
              </div>
            </div>

            <hr className="divider" />

            <button
              className={classNames(
                'button',
                styles['summary__checkout-button'],
                {
                  [styles['summary__checkout-button--selected']]: false,
                },
              )}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div className={styles['empty-cart']}>
          <p className={styles['empty-cart__text']}>Your cart is empty</p>
          <img
            src={cartIsEmpty}
            alt="cart-is-empty.png"
            className={styles['empty-cart__img']}
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
};
