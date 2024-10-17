import { FC } from 'react';

import { ProductsSlider } from '@components/products/products-slider/ProductsSlider';

import { useProducts } from '@hooks/useProducts';

import styles from './newModels.module.scss';

export const NewModels: FC = () => {
  const { expensiveProduct } = useProducts();

  return (
    <section className={styles.newModels}>
      <ProductsSlider title="Brand new models" products={expensiveProduct} />
    </section>
  );
};
