import React from 'react';
import { Slider } from './Slider/Slider';
import { PhoneSlider } from './PhoneSlider/PhoneSlider';
import { Category } from './Category/Category';

type Props = {
  brandList: Product[];
  hotList: Product[];
  fullList: Product[];
};

export const HomePage: React.FC<Props> = ({ hotList, brandList, fullList }) => {
  return (
    <>
      <Slider />
      <PhoneSlider list={hotList} secName="Hot Prices" />
      <Category list={fullList} />
      <PhoneSlider list={brandList} secName="Brand new models" />
    </>
  );
};
