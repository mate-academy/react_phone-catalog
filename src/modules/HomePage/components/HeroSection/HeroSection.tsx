import style from './HeroSection.module.scss';
import React from 'react';



import { Slider } from './slider/Slider';

export const HeroSection: React.FC = () => {
  

  return (
    <div className={style.hero}>
      <div className={style.wrapper}>
        <h1 className={style.title}>Welcome to Nice Gadgets store!</h1>

        <Slider />
      </div>
    </div>
  );
};
