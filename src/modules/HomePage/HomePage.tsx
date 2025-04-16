import React from 'react';
import style from './HomePage.module.scss';
import { Slider } from './components/Slider/Slider';
import { NewModel } from './components/NewModel/NewModel';
import { Category } from './components/Category/Category';
import { HotPrice } from './components/HotPrice/HotPrice';

export const HomePage: React.FC = () => {
  return (
    <div className={style.page}>
      <Slider />

      <NewModel />

      <Category />

      <HotPrice />
    </div>
  );
};
