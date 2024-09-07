import { FC } from 'react';

import styles from './newModels.module.scss';

import { ProductsSlider } from '@components/products/products-slider/ProductsSlider';
import { getMostExpensiveProduct } from '@utils/helpers/sortedByPrice';

import { useAppSelector } from '@hooks/hook';

export const NewModels: FC = () => {
  const { products } = useAppSelector(state => state.products);

  const list = getMostExpensiveProduct(products);

  return (
    <section className={styles.newModels}>
      <ProductsSlider title="Brand new models" products={list} />
    </section>
  );
};
