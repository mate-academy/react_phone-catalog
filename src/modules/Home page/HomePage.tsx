import React from 'react';
import { Slider } from './components/Slider/Slider';
import './HomePage.scss';
import { Phone } from './components/Phones/Phone';
import { Categories } from './components/Category/Categories';
import { HotPrices } from './components/HotPrices/HotPrices';

export const HomePage: React.FC = () => {
  return (
    <section className="home">
      <h1 className="home__title container">Welcome to Nice Gadgets store!</h1>
      <Slider />
      <Phone />
      <Categories />
      <HotPrices />
    </section>
  );
};
