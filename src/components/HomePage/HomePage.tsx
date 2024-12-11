import React from 'react';
import cl from './HomePage.module.scss';
import { ImgSlider } from './ImgSlider';
import { NewModels } from './NewModels';
import { Categories } from './Categories';
import { HotPrices } from './HotPrices';

export const HomePage: React.FC = () => {
  return (
    <div className="container">
      <h1 className={cl.title}>Welcome to Nice Gadgets store!</h1>
      <section className={cl.homePageSlider}>
        <ImgSlider />
      </section>

      <section className={cl.homePageSection}>
        <NewModels />
      </section>

      <section className={cl.homePageSection}>
        <Categories />
      </section>

      <section className={cl.homePageSection}>
        <HotPrices />
      </section>
    </div>
  );
};
