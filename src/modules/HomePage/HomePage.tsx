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
    <div className={styles.homepage}>
      <Header />
      <div className={styles.homepage__content}>
        <h1 className={styles.homepage__title}>
          Welcome to Nice Gadgets store!
        </h1>
        <PictureSlider slides={slidesImport} />
        <div className={styles.homepage_productsslider}>
          <ProductsSlider title="Brand new models" />
        </div>
        <ShopByCategory />
        <div className={styles.homepage_productsslider}>
          <ProductsSlider title="Hot prices" />
        </div>
      </div>
      <Footer />
    </div>
  );
};
