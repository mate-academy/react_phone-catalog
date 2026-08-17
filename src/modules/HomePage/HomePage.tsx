import { useEffect, useState } from 'react';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { PicturesSlider } from './components/PicturesSlider';
import { Product } from '../shared/types/Product';
import { getProducts } from '../shared/api/products';
import { CategoriesBlock } from './components/CategoriesBlock';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  const newModels = [...products].sort((a, b) => b.year - a.year);

  const hotPrices = [...products]
    .filter(item => item.fullPrice > item.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  return (
    <div className={styles.home}>
      <h1 className={styles['home-title']}>Product Catalog</h1>

      <div className={styles.home__slider}>
        <PicturesSlider />
      </div>

      <div className={styles.home__slider}>
        <ProductsSlider
          title="Brand new models"
          products={newModels}
          isLoading={isLoading}
        />
      </div>

      <div className={styles.home__categories}>
        <CategoriesBlock
          phonesCount={phonesCount}
          tabletCount={tabletsCount}
          accessoriesCount={accessoriesCount}
        />
      </div>

      <div className={styles.home__slider}>
        <ProductsSlider
          title="Hot prices"
          products={hotPrices}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
