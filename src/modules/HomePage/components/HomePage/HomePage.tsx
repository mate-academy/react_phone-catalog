import { useCallback } from 'react';
import { PicturesSlider } from '../PicturesSlider';
import { ProductsSlider } from '../ProductsSlider';
import styles from './HomePage.module.scss';
import { ProductWithDetails } from '../../../../_types/products';
import { sortProducts } from '../../../../_services/products';
import { ShopByCategories } from '../ShopByCategory';

export const HomePage = () => {
  const sortByYear = useCallback(
    (initProducts: ProductWithDetails[]) => sortProducts(initProducts, 'year'),
    [],
  );

  const sortByPrice = useCallback(
    (initProducts: ProductWithDetails[]) =>
      sortProducts(initProducts, 'fullPrice'),
    [],
  );

  return (
    <div className={styles.home}>
      <h1 className={styles.home__title}>Product Catalog</h1>
      <div className={styles.home__content}>
        <PicturesSlider />

        <ProductsSlider title={'Brand new models'} sortFn={sortByYear} />

        <ShopByCategories />
        <ProductsSlider title={'Hot prices'} sortFn={sortByPrice} />
      </div>
    </div>
  );
};
