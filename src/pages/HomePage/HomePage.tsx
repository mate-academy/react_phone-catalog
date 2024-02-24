import React from 'react';
import './HomePage.scss';
import '../../blocks/icon.scss';
import '../../components/Slider/Slider.scss';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { BrandNewModels } from '../../components/BrandNewModels/BrandNewModels';
import { Slider } from '../../components/Slider/Slider';

export const HomePage: React.FC = () => {
  return (
    <div className="home">
      <Slider />
      <ProductsSlider />
      <ShopByCategory />
      <BrandNewModels />
    </div>
  );
};
