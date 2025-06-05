// eslint-disable-next-line max-len
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import { useFiltersContext } from '../../contexts/FiltersContext';
import { useProductsContext } from '../../contexts/ProductsContext';
import { Error } from '../../shared/components/layout/Error';
import { Loader } from '../../shared/components/layout/Loader';
import { PicturesSlider } from '../HomePage/components/PicturesSlider/PicturesSlider';
import { ProductsCategory } from '../HomePage/components/ProductsCategory/ProductsCategory';
import { ProductsSlider } from '../HomePage/components/ProductsSlider/ProductsSlider';

import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const { loading, error } = useProductsContext();
  const { newModels, hotModels } = useFiltersContext();

  return (
    <div className={styles.homepage}>
      <div className={styles.hero}>
        <h1 className={styles.visuallyHidden}>Product Catalog</h1>
        <h1 className={styles.mainTitle}>Welcome to Nice Gadgets store!</h1>
        <PicturesSlider />
      </div>

      {loading && <Loader />}
      {error && <Error message={error} />}

      {!loading && !error && (
        <>
          <div className={styles.productsSection}>
            <ProductsSlider
              products={newModels}
              showDiscount={false}
              title="Brand new models"
            />
          </div>

          <div className={styles.categorySection}>
            <ProductsCategory />
          </div>

          <div className={styles.productsSection}>
            <ProductsSlider
              products={hotModels}
              showDiscount={true}
              title="Hot prices"
            />
          </div>
        </>
      )}
    </div>
  );
};
