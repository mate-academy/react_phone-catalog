import { useContext } from 'react';
import classNames from 'classnames';
import styles from './CartPage.module.scss';

import { CartContext } from '../../context/CartProvider';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CartItem } from '../../components/CartItem';
import { EmptyCart } from '../../components/EmptyCart';

export const CartPage = () => {
  const { cartProducts, clearCart } = useContext(CartContext);

  const totalPrice = cartProducts.reduce((total, currentProduct) => {
    const { price, quantity } = currentProduct;

    return total + price * quantity;
  }, 0);

  const countCartProducts = cartProducts.reduce((totalCount, { quantity }) => {
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
      <Breadcrumbs classNameProps={styles.cart__breadcrumbs} />
      <h1 className={classNames('title', styles.cart__title)}>Cart</h1>

      {countCartProducts ? (
        <>
          <div
            className={classNames(
              styles['cart__block-items'],
              styles['block-items'],
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
                Total for {countCartProducts} items
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
        <EmptyCart />
      )}
    </section>
  );
};
