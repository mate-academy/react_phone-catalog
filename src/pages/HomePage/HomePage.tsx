import { useCallback, useEffect, useMemo, useState } from 'react';

import { getProducts } from '../../api/products';
import { Categories } from '../../components/Categories';
import { Loader } from '../../components/Loader';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Product } from '../../types/Product';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(setProducts)
      .catch(() => {
        setProducts([]);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const hotPriceProducts = useMemo(() => {
    return [...products]
      .sort((productA, productB) => {
        const discountA = productA.fullPrice - productA.price;
        const discountB = productB.fullPrice - productB.price;

        return discountB - discountA;
      })
      .slice(0, 10);
  }, [products]);

  const brandNewProducts = useMemo(() => {
    return [...products]
      .sort((productA, productB) => {
        return productB.year - productA.year;
      })
      .slice(0, 10);
  }, [products]);

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.visuallyHidden}>Product Catalog</h1>

        <h2 className={styles.title}>Welcome to Nice Gadgets</h2>

        <PicturesSlider />

        {isLoading && (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        )}

        {!isLoading && hasError && (
          <div className={styles.messageBlock}>
            <p className={styles.errorMessage}>Something went wrong</p>

            <button
              type="button"
              className={styles.reloadButton}
              onClick={loadProducts}
            >
              Reload
            </button>
          </div>
        )}

        {!isLoading && !hasError && products.length === 0 && (
          <p className={styles.emptyMessage}>There are no products yet</p>
        )}

        {!isLoading && !hasError && products.length > 0 && (
          <>
            <ProductsSlider title="Hot prices" products={hotPriceProducts} />

            <Categories products={products} />

            <ProductsSlider
              title="Brand new models"
              products={brandNewProducts}
            />
          </>
        )}
      </div>
    </section>
  );
};
