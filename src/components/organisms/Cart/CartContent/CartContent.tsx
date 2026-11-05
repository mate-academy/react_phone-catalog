import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@/app/router/routes';
import { useProductRatings } from '@/entities/product/model/product-ratings.queries';

import { Typography } from '@/components/atoms';

import { ImageWithFallback } from '../../ImageWithFallback';
import { CartCheckout } from '../CartCheckout';
import { CartItem } from '../CartItem';

import type { CartContentData } from './CartContent.types';

import emptyCartImage from '/img/cart-is-empty.webp';

import styles from './CartContent.module.scss';

export const CartContent = ({ data }: { data: CartContentData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: ratings = [] } = useProductRatings();
  const ratingsMap = useMemo(
    () => new Map(ratings.map((item) => [item.namespaceId, item])),
    [ratings],
  );

  if (data.items.length > 0 && data.isPending) {
    return (
      <div className={styles.content}>
        <div className={styles.items}>
          {data.items.map((item) => (
            <CartItem
              key={item.productId}
              isLoading
            />
          ))}
        </div>
      </div>
    );
  }

  if (data.cartProducts.length === 0 && !data.isError) {
    return (
      <ImageWithFallback
        src={emptyCartImage}
        alt={t('cartIsEmpty')}
        className={styles.emptyCart}
      />
    );
  }

  if (data.isError) {
    return <Typography variant="h3">{t('error')}</Typography>;
  }

  return (
    <div className={styles.content}>
      <div className={styles.items}>
        {data.cartProducts.map((product) => {
          return (
            <CartItem
              product={product}
              rating={ratingsMap.get(product.namespace_id)}
              key={product.id}
            />
          );
        })}
      </div>

      <CartCheckout
        items={data.cartProducts.map((product) => ({
          price: product.price,
          count: product.quantity,
        }))}
        onCheckout={() => navigate(ROUTES.CHECKOUT)}
      />
    </div>
  );
};
