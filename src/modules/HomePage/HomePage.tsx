import React, { useEffect, useState } from 'react';
import { PicturesSlider } from '../../components/PicturesSlider';
import { CategoryBlock } from '../../components/CategoryBlock';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getProductList, Product } from '../../api/products';

import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProductList().then(products => {
      setAllProducts(products);
    });
  }, []);

  const brandNew = [...allProducts]
    .sort((a, b) => (b.year || 0) - (a.year || 0))
    .slice(0, 10);
  const hotPrices = [...allProducts]
    .filter(p => p.fullPrice && p.price && p.fullPrice > p.price)
    .sort((a, b) => {
      const discountA = (a.fullPrice || 0) - (a.price || 0);
      const discountB = (b.fullPrice || 0) - (b.price || 0);

      return discountB - discountA;
    })
    .slice(0, 10);

  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__titleContainer}>
        <h1 className="visuallyHidden">Product Catalog</h1>
        <h2 className={styles.homePage__title}>
          Welcome to Nice Gadgets store!
        </h2>
      </div>
      <section
        className={`${styles.homePage__section} ${styles.homePage__picturesSlider}`}
      >
        <PicturesSlider />
      </section>
      <section
        className={`${styles.homePage__section} ${styles.homePage__productsSlider}`}
      >
        <ProductsSlider
          title="Brand new models"
          products={brandNew}
          isFullPrice={true}
        />
      </section>
      <section
        className={`${styles.homePage__section} ${styles.homePage__categoryBlock}`}
      >
        <CategoryBlock />
      </section>
      <section
        className={`${styles.homePage__section} ${styles.homePage__productsSlider}`}
      >
        <ProductsSlider title="Hot prices" products={hotPrices} />
      </section>
    </div>
  );
};
