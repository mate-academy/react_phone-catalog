import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ArrowIcon from '@/assets/icons/arrow-up.svg?react';
import { CartItem } from '@/modules/products/components/Cart/CartItem';
import { useProductsQuery } from '@/modules/products/queries';
import { useAppSelector } from '@/redux/hooks';
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

  const cartItems = useAppSelector(state => state.cart.items);
  const { data, isLoading, isError, refetch } = useProductsQuery({
    ids: cartItems.map(item => item.id),
  });
  const quantities = new Map(
    cartItems.map(({ id, quantity }) => [id, quantity]),
  );

  const products = data?.items.map(item => {
    const { itemId, image, name, price } = item;
    const quantity = quantities.get(itemId) ?? 0;

    return {
      id: itemId,
      image,
      name,
      quantity,
      totalPrice: price * quantity,
    };
  });

  return (
    <>
      {isLoading && <Loader className={styles.loader} />}
      {isError && (
        <ErrorLabel className={styles.errorLabel} onRetry={refetch} />
      )}
      {data &&
        (data.total === 0 ? (
          <NotFoundLabel
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

            <article className={styles.summury}>
              <div>
                <span className={styles.summury__price}>$2657</span>
                <span className={styles.summury__quantity}>
                  Total for 3 items
                </span>
              </div>
              <Line />
              <AccentButton title="Checkout" className={styles.checkout} />
            </article>
          </div>
        ))}
    </>
  );
};
