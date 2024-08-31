import React from 'react';
import styles from './HomePage.module.scss';
import { AppContext } from '../../AppContext';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Categories } from '../../components/Categories';
import { PicturesSlider } from '../../components/PicturesSlider';

export const HomePage: React.FC = () => {
  const { products } = React.useContext(AppContext);

  const getBrandNewProducts = React.useMemo(() => {
    const latestYear = products?.reduce((year, product) => {
      if (product.year > year) {
        return product.year;
      }

      return year;
    }, 0);

    return products?.filter(product => product.year === latestYear) || null;
  }, [products]);

  const getHotPriceProducts = React.useMemo(() => {
    return (
      products
        ?.filter(product => product.price !== product.fullPrice) // products with discount
        .sort((product1, product2) => {
          const discount1 = product1.fullPrice - product1.price;
          const discount2 = product2.fullPrice - product2.price;

          return discount2 - discount1;
        }) || null
    );
  }, [products]);

  return (
    <>
      <h1 className={styles.header}>Product Catalog</h1>
      <PicturesSlider />

      {/* Slider for Brand New block */}
      <ProductsSlider title="Brand new models" products={getBrandNewProducts} />

      <Categories />

      {/* Slider for Hot Prices block */}
      <ProductsSlider title="Hot prices" products={getHotPriceProducts} />

      <hr style={{ border: 0, margin: 0 }} />
    </>
  );
};
