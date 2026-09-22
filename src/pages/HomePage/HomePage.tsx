import { useEffect, useState, useMemo } from 'react';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { getProducts } from '../../api/api';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  const hotPriceProducts = useMemo(() => {
    return [...products]
      .filter(p => p.fullPrice > p.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
  }, [products]);

  const brandNewProducts = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year);
  }, [products]);

  return (
    <div className={styles.home} data-cy="HomePage">
      <h1 className={styles['visually-hidden']}>Product Catalog</h1>
      <h2 className={styles.home__title}>{'Welcome to Nice Gadgets store!'}</h2>
      <PicturesSlider />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ProductsSlider
            title="Brand new models"
            products={brandNewProducts}
          />
          <ShopByCategory products={products} />
          <ProductsSlider title="Hot prices" products={hotPriceProducts} />
        </>
      )}
    </div>
  );
};
