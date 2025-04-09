import React from 'react';
import BigSlider from '../../components/Slider/BigSlider/ BigSlider';

import s from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  return (
    <>
      <h1 hidden>Product Catalog</h1>
      <h1 className={s.title}>Welcome to Nice Gadgets store!</h1>
      <BigSlider />
      <h2 className={s.title}>Brand new models</h2>
      <h2 className={s.title}>Shop by category</h2>

      <h2 className={s.title}>Hot prices</h2>
    </>
  );
};
