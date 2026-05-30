import React, { useMemo, useState } from 'react';
import classNames from 'classnames';

import { Product, ProductWithQuantity, ThemeType } from '../../types';
import { getProducts } from '../../services';
import { useCart, useTheme, useBodyScrollLock, useLoadData } from '../../hooks';

import { BackButton, InfoMessage } from '../../components';
import { CartList, CartListSkeleton, CheckoutModal } from './components';

import emptyCartImgLight from '../../assets/cart-is-empty-light.png';
import emptyCartImgDark from '../../assets/cart-is-empty-dark.png';
import errorImgLight from '../../assets/loading-error-light.png';
import errorImgDark from '../../assets/loading-error-dark.png';

import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { theme } = useTheme();
  const { cart, clearCart } = useCart();
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useLoadData<Product[]>(getProducts, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    return cart
      .map(cartItem => {
        const product =
          products?.find(p => p.itemId === cartItem.itemId) || null;

        return product ? { ...product, quantity: cartItem.quantity } : null;
      })
      .filter((product): product is ProductWithQuantity => product !== null);
  }, [products, cart]);

  const totalPrice = useMemo(
    () =>
      visibleProducts.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
    [visibleProducts],
  );

  const totalQuantity = useMemo(
    () => visibleProducts.reduce((acc, product) => acc + product.quantity, 0),
    [visibleProducts],
  );

  useBodyScrollLock(isModalOpen);

  const renderEmptyMessage = () => (
    <InfoMessage
      title="Your cart is empty. Let’s fix that – start shopping now!"
      buttonText="Start Shopping"
      buttonLink="/"
      image={theme === ThemeType.Light ? emptyCartImgLight : emptyCartImgDark}
      className={styles['cart-page__message']}
    />
  );

  const renderErrorMessage = () => (
    <InfoMessage
      title="Oops! Something went wrong while loading your cart items."
      buttonText="Try Again"
      onButtonClick={refetch}
      image={theme === ThemeType.Light ? errorImgLight : errorImgDark}
      className={styles['cart-page__message']}
    />
  );

  const renderCartList = () =>
    isLoading ? (
      <CartListSkeleton
        className={styles['cart-page__list']}
        amount={cart.length}
      />
    ) : (
      <CartList
        products={visibleProducts}
        className={styles['cart-page__list']}
      />
    );

  const renderCartSummary = () => (
    <div className={styles['cart-page__summary']}>
      <div
        className={classNames(styles['cart-page__info'], {
          [styles['cart-page__info--loading']]: isLoading,
        })}
      >
        <strong
          className={classNames(styles['cart-page__total-price'], {
            [styles['cart-page__total-price--loading']]: isLoading,
          })}
        >
          {isLoading ? '' : `$${totalPrice}`}
        </strong>
        <p
          className={classNames(styles['cart-page__total-quantity'], {
            [styles['cart-page__total-quantity--loading']]: isLoading,
          })}
        >
          {isLoading ? '' : `Total for ${totalQuantity} items`}
        </p>
      </div>

      <span className={styles['cart-page__decor']} />

      <button
        className={styles['cart-page__checkout-btn']}
        disabled={isLoading}
        onClick={() => setIsModalOpen(true)}
      >
        Checkout
      </button>
    </div>
  );

  return (
    <main className={styles['cart-page']}>
      <section className={styles['cart-page__content']}>
        <BackButton className={styles['cart-page__back-button']} />
        <h1 className={styles['cart-page__title']}>Cart</h1>

        {cart.length === 0 ? (
          renderEmptyMessage()
        ) : isError ? (
          renderErrorMessage()
        ) : (
          <>
            {renderCartList()}
            {renderCartSummary()}
          </>
        )}
      </section>

      {isModalOpen && (
        <CheckoutModal
          onConfirm={() => {
            clearCart();
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
};
