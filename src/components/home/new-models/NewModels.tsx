import { FC } from 'react';

import styles from './newModels.module.scss';

<<<<<<< HEAD
import { ProductsSlider } from '@components/products/products-slider/ProductsSlider';
import { getMostExpensiveProduct } from '@utils/helpers/sortedByPrice';

import { useAppSelector } from '@hooks/hook';
=======
import { ProductsSlider } from 'components/products/products-slider/ProductsSlider';

import { useAppSelector } from 'hooks/hook';
import { getMostExpensiveProduct } from 'utils/helpers/sortedByPrice';
>>>>>>> 3d29229bf5a890910a3e7c1d3c6b79a9929789c2

export const NewModels: FC = () => {
  const { products } = useAppSelector(state => state.products);

  const list = getMostExpensiveProduct(products);

  return (
    <section className={styles.newModels}>
      <ProductsSlider title="Brand new models" products={list} />
    </section>
  );
};
