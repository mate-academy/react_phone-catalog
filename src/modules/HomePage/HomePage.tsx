import { useEffect, useMemo, useState } from 'react';

import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getProducts } from '../shared/api/products';
import { Product } from '../shared/types/Product';
import { getDiscount } from '../shared/utils/products';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const brandNewProducts = useMemo(() => {
    return [...products]
      .sort((firstProduct, secondProduct) => {
        return secondProduct.year - firstProduct.year;
      })
      .slice(0, 12);
  }, [products]);

  const hotPriceProducts = useMemo(() => {
    return [...products]
      .sort((firstProduct, secondProduct) => {
        return getDiscount(secondProduct) - getDiscount(firstProduct);
      })
      .slice(0, 12);
  }, [products]);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <section>
        <h1>Product Catalog</h1>
        <p>Something went wrong</p>
      </section>
    );
  }

  return (
    <div className={styles.home}>
      <h1 className="visually-hidden">Product Catalog</h1>

      <h2 className={styles.welcome}>Welcome to Nice Gadgets store!</h2>

      <PicturesSlider />

      <ProductsSlider title="Brand new models" products={brandNewProducts} />

      <ShopByCategory products={products} />

      <ProductsSlider title="Hot prices" products={hotPriceProducts} />
    </div>
  );
};
