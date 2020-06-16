import React from 'react';
import Slider from '../../Slider';
import ProductsSlider from './ProductsSlider';
import ShopByCategory from './ShopByCategory';

const HomePage = () => {
  return (
    <div className="home">
      <div className="home__box">
        <Slider />
        <ProductsSlider title="Hot prices" />
        <ShopByCategory />
        <ProductsSlider title="Brand new models" />
      </div>
    </div>
  );
};

export default HomePage;
