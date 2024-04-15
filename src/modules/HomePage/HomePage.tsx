import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider';
import { Categories } from './components/Categories';
import { getHotPriceProducts, getNewProducts } from '../../servises/Products';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductsSlider';

const HomePage: React.FC = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
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
  }, []);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PicturesSlider />
          <ProductsSlider products={newProducts} title="Brand new models" />
          <div className={styles.categoriesContainer}>
            <Categories />
          </div>
          <ProductsSlider products={hotProducts} title="Hot prices" />
        </>
      )}
    </div>
  );
};

export default HomePage;
