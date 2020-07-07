import React from 'react';
import Slider from './Slider';
import ProductsSlider from '../../components/ProductSlider/ProductsSlider';
import ShopByCategory from './ShopByCategory';
import {getDiscountPhones , getBrandNewPhones} from '../../helpers/api' 

const HomePage = () => {

  return (
    <div className="home">
      <div className="home__box">
        <Slider />
        <ProductsSlider title="Hot prices" getData={getDiscountPhones}/>
        <ShopByCategory />
        <ProductsSlider title="Brand new models" getData={getBrandNewPhones}/>
      </div>
    </div>
  );
};

export default HomePage;
