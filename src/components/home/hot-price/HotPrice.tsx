import { FC } from 'react';

import styles from './hotPrice.module.scss';

<<<<<<< HEAD
import { ProductsSlider } from '@components/products/products-slider/ProductsSlider';

import { useAppSelector } from '@hooks/hook';
import { getProductWithLargestDiscount } from '@utils/helpers/sortedByPrice';
=======
import { ProductsSlider } from 'components/products/products-slider/ProductsSlider';
import { useAppSelector } from 'hooks/hook';
import { getProductWithLargestDiscount } from 'utils/helpers/sortedByPrice';
>>>>>>> 3d29229bf5a890910a3e7c1d3c6b79a9929789c2

export const HotPrice: FC = () => {
  const { products } = useAppSelector(state => state.products);

  const list = getProductWithLargestDiscount(products);

  return (
    <section className={styles.hotPrice}>
      <ProductsSlider title="Hot prices" products={list} discount={true} />
    </section>
  );
};
