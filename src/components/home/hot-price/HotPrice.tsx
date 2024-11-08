import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ProductsSlider } from '@components/products/products-slider/ProductsSlider';

import { useProducts } from '@hooks/index';

import styles from './HotPrice.module.scss';

export const HotPrice: FC = () => {
  const { productWithDiscount } = useProducts();
  const { t } = useTranslation();
  const localTitle = t('home.hot');

  return (
    <section className={styles.hotPrice}>
      <ProductsSlider
        title={localTitle}
        products={productWithDiscount}
        discount
      />
    </section>
  );
};
