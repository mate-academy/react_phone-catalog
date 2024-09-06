import { FC } from 'react';

import styles from './hotPrice.module.scss';

import { ProductsSlider } from 'components/products/products-slider/ProductsSlider';
import { useAppSelector } from 'hooks/hook';
import { getProductWithLargestDiscount } from 'utils/helpers/sortedByPrice';

export const HotPrice: FC = () => {
  const { products } = useAppSelector(state => state.products);

  const list = getProductWithLargestDiscount(products);

  return (
    <section className={styles.hotPrice}>
      <ProductsSlider title="Hot prices" products={list} discount={true} />
    </section>
  );
};
