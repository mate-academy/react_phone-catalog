import { useEffect, useState } from 'react';
import { getProducts } from '@/api/products';
import { Product } from '@/types/Product';
import { Loader } from '@/components/Loader';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const hotPriceProducts = [...products]
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  const brandNewProducts = [...products].sort(
    (a, b) => b.year - a.year || b.id - a.id,
  );

  return (
    <div className={styles.page}>
      <h1 className="visually-hidden">Product Catalog</h1>
      <h2 className={styles.welcome}>Welcome to Nice Gadgets store!</h2>

      <PicturesSlider />

      {isLoading && <Loader />}

      {hasError && (
        <div className={styles.error}>
          <p>Something went wrong</p>
          <button type="button" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      )}

      {!isLoading && !hasError && (
        <>
          <ProductsSlider
            title="Brand new models"
            products={brandNewProducts.slice(0, 10)}
            showDiscount={false}
          />
          <ShopByCategory products={products} />
          <ProductsSlider
            title="Hot prices"
            products={hotPriceProducts.slice(0, 10)}
          />
        </>
      )}
    </div>
  );
};
