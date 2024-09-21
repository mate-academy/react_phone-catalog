import { FC, useEffect, useState } from 'react';
import { PictureSlider } from './components/PictureSlider';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { Category } from './components/Categories/Category';
import { getHotPriceProducts, getNewProducts } from '../../services/Product';

import styles from './HomePage.module.scss';
import { useCatalog } from '../../contexts/CatalogProvider';

export const HomePage: FC = () => {
  const { hotProducts, setHotProducts, newProducts, setNewProducts } =
    useCatalog();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [fetchedHotProducts, fetchedNewProducts] = await Promise.all([
          getHotPriceProducts(),
          getNewProducts(),
        ]);

        setHotProducts(fetchedHotProducts);
        setNewProducts(fetchedNewProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [hotProducts, newProducts, setHotProducts, setNewProducts]);

  return (
    <div className={styles.home}>
      <div>
        <div className={styles.container}>
          <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
        </div>
        <PictureSlider />
      </div>

      <ProductSlider
        mb
        products={newProducts}
        title={'Brand new models'}
        isLoading={isLoading}
      />
      <Category />
      <ProductSlider
        mb
        products={hotProducts}
        title={'Hot prices'}
        showFullPrice={true}
        isLoading={isLoading}
      />
    </div>
  );
};
