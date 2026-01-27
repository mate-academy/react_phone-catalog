import React from 'react';
import styles from './HomePage.module.scss';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { PictureSlider } from './components/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider/ProductsSlider';
import { slides } from './components/PicturesSlider/SlidesContent';
import { ShopByCategory } from './components/ShopByCategory';

export const HomePage: React.FC = () => {
  const slidesImport = slides;

  return (
    <>
      <Header />
      <div className={styles.homepage}>
        <h1 style={{ display: 'none' }}>Product Catalog</h1>
        <h2 className={styles.homepage__title}>
          Welcome to Nice Gadgets store!
        </h2>
        <div className={styles.homepage__section}>
          <PictureSlider slides={slidesImport} />
        </div>
        <div className={styles.homepage__section}>
          <ProductsSlider title="Brand new models" />
        </div>
        <div className={styles.homepage__section}>
          <ShopByCategory />
        </div>
        <div className={styles.homepage__section}>
          <ProductsSlider title="Hot prices" />
        </div>
      </div>
      <Footer />
    </>
  );
};
