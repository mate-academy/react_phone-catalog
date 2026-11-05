import { useCallback, useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { Loader } from '../shared/components/Loader';
import { ProductsSlider } from '../shared/components/ProductsSlider';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const brandNewProducts = [...products]
    .sort((a, b) => b.year - a.year)
    .slice(0, 10);

  const hotPriceProducts = [...products]
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    })
    .slice(0, 10);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.homePageTitle}>Product Catalog</h1>
      <PicturesSlider />

      {isLoading && <Loader />}

      {!isLoading && hasError && (
        <div className={styles.homePageMessage}>
          <h2 className={styles.homePageMessageTitle}>Something went wrong</h2>

          <button
            type="button"
            className={styles.homePageMessageButton}
            onClick={loadProducts}
          >
            Reload
          </button>
        </div>
      )}
      {!isLoading && !hasError && (
        <>
          <ProductsSlider
            title="Brand new models"
            products={brandNewProducts}
            hideDiscount
          />
          <ShopByCategory products={products} />
          <ProductsSlider title="Hot prices" products={hotPriceProducts} />
        </>
      )}
    </div>
  );
};
