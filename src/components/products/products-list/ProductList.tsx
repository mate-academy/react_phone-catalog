import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ProductImage, ProductPrice, ProductSpec } from '@components/products/';

import { ActionButtons, Title } from '@ui/index';

import { getProductUrl } from '@utils/helpers/productUtils';
import { scrollToTop } from '@utils/helpers/scrollToTop';
import { TProduct } from '@utils/types/product.type';

import styles from './ProductList.module.scss';

interface TProps {
  product: TProduct;
  discount?: boolean;
}

export const ProductList: FC<TProps> = memo(({ product, discount }) => {
  const {
    id,
    name,
    image,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    itemId,
    category,
  } = product;
  const { t } = useTranslation();
  const URL = getProductUrl(category, itemId);
  const localAria = t('product.list.aria', { name: name });

  return (
    <article className={styles.item} key={id}>
      <Link
        to={URL}
        className={styles.product}
        onClick={scrollToTop}
        title={localAria}
        aria-label={localAria}
      >
        <ProductImage image={image} name={name} />

        <div className={styles.title}>
          <Title level={3}>{name}</Title>
        </div>
      </Link>

      <ProductPrice price={price} fullPrice={fullPrice} discount={discount} />

      <hr />

      <ProductSpec screen={screen} capacity={capacity} ram={ram} />

      <ActionButtons product={product} />
    </article>
  );
});
