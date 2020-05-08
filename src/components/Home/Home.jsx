import React from 'react';
import './Home.scss';
import { Slider } from './Slider/Slider';
import { HotPrices } from './HotPrices/HotPrices';

export const Home = () => (
  <div className="home-container">
    <Slider />
    <HotPrices />
  </div>
);
