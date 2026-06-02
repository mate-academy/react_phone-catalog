import { useEffect, useState } from 'react';
import { HeroBanner } from './components/HeroBanner';
import { ProductsSlider } from './components/ProductSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { loadProducts } from '../../api/getData';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadingData = async () => {
      setIsLoading(true);
      try {
        const data = await loadProducts('products.json');

        setProducts(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadingData();
  }, []);

  const getModelName = (itemId: string) => {
    return itemId.replace(/-\d+[gt]b/i, '');
  };

  const getUnique = (arr: Product[]) => {
    const seen = new Set<string>();

    return arr.filter(product => {
      const model = getModelName(product.itemId);

      if (seen.has(model)) {
        return false;
      }

      seen.add(model);

      return true;
    });
  };

  const brandNew = getUnique(
    [...products].sort((a, b) => b.year - a.year),
  ).slice(0, 8);

  const hotPrices = getUnique(
    [...products].sort(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    ),
  ).slice(0, 8);

  return (
    <div>
      <h1 className={styles['visually-hidden']}>Product Catalog</h1>

      {isLoading && <Loader />}

      {hasError && <p>Something went wrong</p>}

      {!isLoading && !hasError && (
        <>
          <HeroBanner />
          <ProductsSlider title={'Brand new models'} products={brandNew} />
          <ShopByCategory />
          <ProductsSlider title={'Hot prices'} products={hotPrices} />
        </>
      )}
    </div>
  );
};
