/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { AnimatedLayout } from '../../shared/Shared_Components/AnimatedComponents/AnimatedLayout';
import { TitleSlider } from './TitleSlider/TitleSlider';
import { NewItems } from './NewItems/NewItems';
import { ShopByCategory } from './ShopByCategory/ShopByCategory';
import { HotPrices } from './HotPrices/HotPrices';

export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatedLayout>
      <section>
        <h1 className="title title__home--h1 title--h1 container">
          Welcome to Nice Gadgets store!
        </h1>

        <TitleSlider />

        <div className="container">
          <NewItems />

          <ShopByCategory />

          <HotPrices />
        </div>
      </section>
    </AnimatedLayout>
  );
};
