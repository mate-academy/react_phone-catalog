import { FC } from 'react';

import { ProductsSlider } from '@components/products/products-slider/ProductsSlider';

import { useProducts } from '@hooks/useProducts';

import styles from './hotPrice.module.scss';

export const HotPrice: FC = () => {
  const { productWithDiscount } = useProducts();

  return (
    <section className={styles.hotPrice}>
      <ProductsSlider
        title="Hot prices"
        products={productWithDiscount}
        discount
      />
    </section>
  );
};
