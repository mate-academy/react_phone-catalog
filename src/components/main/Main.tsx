import React from 'react';
import styles from './Main.module.scss';
import { SectionDashSlider } from './sectionDashSlider';
import { Slider } from './slider';
import { ShopByCategory } from './shopByCategory/shopByCategory';

export const Main: React.FC = () => {
  return (
    <div className={styles['main']}>
      <SectionDashSlider />
      <Slider title={'Brand new models'}/>
      <ShopByCategory />
      <Slider title={'Hot prices'} discount={true} />
    </div>
  );
};
