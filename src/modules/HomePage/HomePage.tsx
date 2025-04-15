import React from 'react';
import style from './HomePage.module.scss';
import { Slider } from './components/Slider/Slider';
import { NewModel } from './components/NewModel/NewModel';

export const HomePage: React.FC = () => {
  return (
    <div className={style.page}>
      <Slider />

      <NewModel />

      <div>Category</div>

      <div>Hot price</div>
    </div>
  );
};
