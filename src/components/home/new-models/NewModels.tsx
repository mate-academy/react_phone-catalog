import { FC } from 'react';

import styles from './newModels.module.scss';

import { ProductsSlider } from 'components/products/products-slider/ProductsSlider';

import { useAppSelector } from 'hooks/hook';
import { getMostExpensiveProduct } from 'utils/helpers/sortedByPrice';

export const NewModels: FC = () => {
  const { products } = useAppSelector(state => state.products);

  const list = getMostExpensiveProduct(products);

  return (
    <section className={styles.newModels}>
      <ProductsSlider title="Brand new models" products={list} />
    </section>
  );
};
