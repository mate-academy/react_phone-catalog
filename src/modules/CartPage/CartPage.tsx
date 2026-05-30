import cn from 'classnames';
import { BackButton } from '../../components/BackButton';
import { BoxButton } from '../../components/BoxButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './CartPage.module.scss';
import { CartItem } from './components';
import { Product } from '../../types/Product';
import { Modal } from '../../components/Modal';
import { useEffect, useState } from 'react';
import { useOverflowHidden } from '../../hooks/useOverflowHidden';
import { LoaderErrorWrapper } from '../../components/LoaderErrorWrapper';
import { init } from '../../store/products/productsSlice';

export const CartPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useAppSelector(state => state.cart);
  const { products, loading, error } = useAppSelector(state => state.products);
  const cartCounter = cart.reduce((acc, item) => item.quantity + acc, 0);
  const dispatch = useAppDispatch();

  type Tipa = {
    product: Product;
    quantity: number;
  };

  const addedItems: Tipa[] = [];

  for (const item of cart) {
    for (const pr of products) {
      if (item.id === pr.itemId) {
        addedItems.push({
          product: pr,
          quantity: item.quantity,
        });
      }
    }
  }

  const total = addedItems.reduce((acc, { product, quantity }) => {
    return acc + product.price * quantity;
  }, 0);

  const cartIsEmpty = addedItems.length === 0;

  useOverflowHidden(isOpen);

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return (
    <LoaderErrorWrapper
      error={error}
      loading={loading}
      reload={() => {
        dispatch(init());
      }}
    >
      <main className={styles.cart}>
        <div className={styles.cart__wrapper}>
          <div className={styles['cart__back-btn']}>
            <BackButton />
          </div>

          <div
            className={cn(styles.cart__modal, {
              [styles['cart__modal--active']]: isOpen,
            })}
          >
            <div className={styles['cart__modal-item']}>
              <Modal
                close={() => {
                  setIsOpen(false);
                }}
              />
            </div>
          </div>

          <h1 className={styles.cart__title}>Cart</h1>

          {cartIsEmpty ? (
            <>
              <p>Your cart is empty</p>
              <div className={styles.cart__bg}></div>
            </>
          ) : (
            <section className={styles.cart__content}>
              <ul className={styles.cart__list}>
                {addedItems.map(item => (
                  <li key={item.product.id} className={styles.cart__item}>
                    <CartItem item={item} />
                  </li>
                ))}
              </ul>

              <div className={styles.cart__summary}>
                <div className={styles.cart__total}>
                  <h2 className={styles.cart__price}>{total}</h2>
                  <p className={styles.cart__itemCount}>
                    Total for {cartCounter} items
                  </p>
                </div>

                <div className={styles.cart__divider}></div>
                <BoxButton
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Checkout
                </BoxButton>
              </div>
            </section>
          )}
        </div>
      </main>
    </LoaderErrorWrapper>
  );
};
