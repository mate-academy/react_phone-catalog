import React from 'react';
import Header from '../shared/components/Header/Header';
import Footer from '../shared/components/Footer/Footer';
import ProductsSlider from './components/ProductSlider/ProductSlider';
import PictureSlider from './components/PictureSlider/PictureSlider';
import ShopByCategory from './components/ShopByCategory/ShopByCategory';
import ProductsSliderNew from './components/ProductSliderNew/ProductSliderNew';

import styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />

      <h1 className={styles.visuallyHidden}>Product Catalog</h1>

      <PictureSlider />

      <ProductsSliderNew />

      <ShopByCategory />

      <ProductsSlider />

      <Footer />
    </div>
  );
};

export default HomePage;
