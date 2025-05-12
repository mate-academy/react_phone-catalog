import React from 'react';
import { CategoryLinks } from '../components/CategoryLinks/CategoryLinks';
import SliderHotPrices from '../components/SliderHotPrices/SliderHotPrices';
import SliderNewBrands from '../components/SliderNewBrands/SliderNewBrands';

import SliderTop from '../components/SliderTop/SliderTop';


export const HomePage: React.FC = () => (
  <div className="section" id="home">
    <div className="container">
      <h1 id="heading1" className="title">
        Home Page
      </h1>

      <SliderTop />
      <SliderNewBrands />
      <CategoryLinks />
      <SliderHotPrices />
    </div>
  </div>
);
