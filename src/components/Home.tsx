import React, { FC } from 'react';

import Slider from './Slider';
import Title from './Title';
import ProductSlider from './ProductSlider';
import Category from './Category';

const Home: FC = () => {
  return (
    <div>
      <Slider />
      <Title title="Hot Prices" />
      <ProductSlider />
      <Title title="Shop by category" />
      <Category />
      <Title title="Brand new models" />
      <ProductSlider />
    </div>
  );
};

export default Home;
