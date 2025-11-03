import React from 'react';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { Categories } from './components/Categories';
import { Loader } from '../../components/Loader/Loader';
import { useHomePageData } from './hooks/useHomePageData';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const { hotPrices, newModels, loading, error } = useHomePageData();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try again</button>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <h1 className="visually-hidden">Product Catalog</h1>
      <h2 className={styles.homePage__title}>Welcome to Nice Gadgets store!</h2>
      {/* Banner Slider */}
      <PicturesSlider />
      {/* Brand New Models Section */}
      <ProductsSlider
        title="Brand new models"
        products={newModels}
        className={styles.homePage__section}
      />
      {/* Categories Section */}
      <Categories />

      {/* Hot Prices Section */}
      <ProductsSlider
        title="Hot prices"
        products={hotPrices}
        className={styles.homePage__section}
      />
    </div>
  );
};
