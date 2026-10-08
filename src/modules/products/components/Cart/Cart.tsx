import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ArrowIcon from '@/assets/icons/arrow-up.svg?react';
import { CartItem } from '@/modules/products/components/Cart/CartItem';
import { useProductsQuery } from '@/modules/products/queries';
import { clearCart } from '@/redux/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  AccentButton,
  Button,
  ErrorLabel,
  Line,
  Loader,
  NotFoundLabel,
} from '@/shared/components/ui';
import { ROUTES } from '@/shared/constants';

import styles from './Cart.module.scss';

export const Cart = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(state => state.cart.items);
  const { data, isLoading, isError, refetch } = useProductsQuery({
    ids: cartItems.map(item => item.id),
  });
  const quantities = new Map(
    cartItems.map(({ id, quantity }) => [id, quantity]),
  );

  const products =
    data?.items.map(item => {
      const { itemId, image, name, price } = item;
      const quantity = quantities.get(itemId) ?? 0;

      return {
        id: itemId,
        image,
        name,
        quantity,
        totalPrice: price * quantity,
      };
    }) ?? [];

  const { totalQuantity, totalPrice } = products.reduce(
    (acc, item) => ({
      totalQuantity: acc.totalQuantity + item.quantity,
      totalPrice: acc.totalPrice + item.totalPrice,
    }),
    {
      totalQuantity: 0,
      totalPrice: 0,
    },
  );

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      dispatch(clearCart());
    }
  };

  return (
    <>
      {isLoading && <Loader className={styles.loader} />}
      {isError && (
        <ErrorLabel className={styles.errorLabel} onRetry={refetch} />
      )}
      {data &&
        (data.total === 0 ? (
          <NotFoundLabel
            title={t('yourCartIsEmpty')}
            handleClick={() => navigate(ROUTES.HOME)}
            className={styles.notFoundLabel}
          />
        ) : (
          <div className={styles.cart} aria-label="Cart Page">
            <Button className={styles.backButton} onClick={() => navigate(-1)}>
              <ArrowIcon className={styles.backButton__arrow} />
              <span className={styles.backButton__text}>{t('back')}</span>
            </Button>
            <h1 className={styles.title}>{t('cart')}</h1>

            <div className={styles.products}>
              {products?.map(item => (
                <CartItem key={item.id} cartProduct={item} />
              ))}
            </div>

            <article className={styles.summary}>
              <div>
                <span
                  className={styles.summary__price}
                >{`$${totalPrice}`}</span>
                <span className={styles.summary__quantity}>
                  {`${t('totalFor')} ${totalQuantity} ${t(totalQuantity > 1 ? 'items' : 'item')}`}
                </span>
              </div>
              <Line />
              <AccentButton
                title={t('checkout')}
                className={styles.checkout}
                onClick={handleCheckout}
              />
            </article>
          </div>
        ))}
    </>
  );
};
