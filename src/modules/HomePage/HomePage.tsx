import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';
import { PicturesSlider } from './PicturesSlider';
import { CategoriesBlock } from './CategoriesBlock';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { Loader } from '../shared/components/Loader/Loader';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(data => {
        setProducts(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const hotPricesProducts = [...products]
    .filter(p => p.fullPrice > p.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  const brandNewProducts = [...products].sort((a, b) => b.year - a.year);

  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  return (
    <div className={styles.page}>
      <h1 className={styles.hiddenTitle}>Product Catalog</h1>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

      <PicturesSlider />

      {isLoading && <Loader />}

      {hasError && !isLoading && (
        <div className={styles.errorBox}>
          <p>Failed to load products</p>
        </div>
      )}

      {!isLoading && !hasError && (
        <>
          <ProductsSlider title="Hot prices" products={hotPricesProducts} />

          <CategoriesBlock
            phonesCount={phonesCount}
            tabletsCount={tabletsCount}
            accessoriesCount={accessoriesCount}
          />

          <ProductsSlider
            title="Brand new models"
            products={brandNewProducts}
          />
        </>
      )}
    </div>
  );
};
