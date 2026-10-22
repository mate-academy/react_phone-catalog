import type React from 'react';
import { BannerSlider } from './components/BannerSlider';
import { CardSlider } from '../shared/components/CardSlider';
import { useEffect, useState } from 'react';
import type { Product } from '../../types/Product';
import { getAllProducts } from '../../services/services';
import { Categories } from './components/Categories';
import { Loader } from '../shared/components/Loader';
import { ErrorLoading } from '../ProductPage/components/ErrorLoading';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getAllProducts()
      .then(result => setProducts(result))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const sortedByYearProducts = [...products].sort((product1, product2) => {
    const year1 = product1.year ?? 0;
    const year2 = product2.year ?? 0;

    return year2 - year1;
  });

  const sortedByHotPrice = [...products].sort((product1, product2) => {
    const delta1 = product1.priceRegular - product1.priceDiscount;
    const delta2 = product2.priceRegular - product2.priceDiscount;

    return delta2 - delta1;
  });

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return <ErrorLoading />;
  }

  return (
    <>
      <BannerSlider />
      <h1 className={styles.title}>Product Catalog</h1>
      <CardSlider
        title="Brand new models"
        products={sortedByYearProducts.slice(0, 10)}
      />
      <Categories products={products} />
      <CardSlider title="Hot prices" products={sortedByHotPrice.slice(0, 10)} />
    </>
  );
};
