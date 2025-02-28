// import React from 'react';
import './HomePage.scss';
// import { Slider } from '../Slider/Slider';
import { SliderSwiper } from '../SliderSwiper/SliderSwiper';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';
import { ProductCard } from '../ProductCard/ProductCard';

export const HomePage = () => {
  return (
    <main className="main__homepage">
      <h1 className="homepage__title">Welcome to Nice Gadgets store!</h1>
      {/* <Slider /> */}
      <SliderSwiper />

      <div className="homepage__product">
        <ProductCard />
      </div>

      <div className="homepage__category">
        <h2 className="category">Shop by category</h2>
        <ShopByCategory />
      </div>
    </main>
  );
};
