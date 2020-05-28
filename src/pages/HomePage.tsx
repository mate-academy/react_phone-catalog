import React from 'react';
import { Slider } from '../components/Slider/Slider';
import { PhonesSlider } from '../components/PhonesSlider/PhonesSlider';


export const HomePage = () => (
  <>
    <Slider />
    <PhonesSlider title="Hot prices" />
  </>
);
