import React, { useEffect } from 'react';
import { BrandNew } from '../../components/BrandNew';
import { HomePageSlider } from '../../components/HomePageSlider';
import { HotSlider } from '../../components/HotSlider';
import { ShopByCategory } from '../../components/ShopByCategory';

import './HomePage.scss';

export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page">
      <HomePageSlider />

      <HotSlider />

      <ShopByCategory />

      <BrandNew />
    </div>

  );
};
