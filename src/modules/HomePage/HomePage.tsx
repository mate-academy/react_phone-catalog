import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import type { Product } from '../../types/Product';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch('api/products.json')
      .then(response => response.json())
      .then((data: Product[]) => setProducts(data))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const brandNew = products
    .filter(product => product.category === 'phones')
    .sort((a, b) => b.year - a.year)
    .slice(0, 12);

  const hotPrices = products
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 12);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <PicturesSlider />

      {isLoading && <Loader />}

      {hasError && (
        <div className={styles.message}>
          <p>Something went wrong</p>

          <button
            type="button"
            className={styles.reload}
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      )}

      {!isLoading && !hasError && (
        <>
          <ProductsSlider
            title="Brand new models"
            products={brandNew}
            showDiscount={false}
          />
          <ShopByCategory products={products} />
          <ProductsSlider title="Hot prices" products={hotPrices} />
        </>
      )}
    </div>
  );
};
